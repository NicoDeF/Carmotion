/**
 * POST /api/checkout — ejecuta el pago con Payway (ex Decidir) Ventas Online v2.
 *
 * Flujo (todo server-side, la credencial nunca llega al navegador):
 *  1. POST {base}/tokens con los datos de la tarjeta → token + bin.
 *  2. Recalcula el total desde el catálogo y POST {base}/payments.
 *  Auth: header `apikey` — clave pública para /tokens, privada para /payments.
 *  El sitio tiene Cybersource activo: /payments lleva `fraud_detection` (retail).
 *  Los datos de la tarjeta NO se guardan ni se loguean.
 *
 * Funciona como Vercel Serverless Function y también montado en Express
 * (server/dev-server.js) para desarrollo local.
 *
 * Env:
 *   PAYWAY_ENV=sandbox|production
 *   PAYWAY_PUBLIC_KEY=...  PAYWAY_PRIVATE_KEY=...  PAYWAY_SITE_ID=...
 *   PAYWAY_API_URL=...    (obligatorio en producción; sandbox tiene default)
 *   (legacy: PAYWAY_CLIENT_ID + PAYWAY_CLIENT_SECRET → apikey "id:secret" para ambos)
 *   Aviso de pedidos por mail: ver api/_lib/order.js
 */
import { PAYMENT_METHODS, INSTALLMENTS, totalWithInstallments } from '../src/data/products.js';
import { str, validateCart, validateCustomer, newOrderId, linesSummary, notifyOrder } from './_lib/order.js';

const SANDBOX_URL = 'https://developers.decidir.com/api/v2';

function paywayConfig() {
  const { PAYWAY_ENV, PAYWAY_PUBLIC_KEY, PAYWAY_PRIVATE_KEY, PAYWAY_CLIENT_ID, PAYWAY_CLIENT_SECRET, PAYWAY_API_URL } =
    process.env;
  const production = PAYWAY_ENV === 'production';
  const baseUrl = PAYWAY_API_URL || (production ? null : SANDBOX_URL);
  if (!baseUrl) return null;
  const base = baseUrl.replace(/\/$/, '');
  if (PAYWAY_PUBLIC_KEY && PAYWAY_PRIVATE_KEY) {
    return { baseUrl: base, publicKey: PAYWAY_PUBLIC_KEY, privateKey: PAYWAY_PRIVATE_KEY };
  }
  if (PAYWAY_CLIENT_ID && PAYWAY_CLIENT_SECRET) {
    const k = `${PAYWAY_CLIENT_ID}:${PAYWAY_CLIENT_SECRET}`;
    return { baseUrl: base, publicKey: k, privateKey: k };
  }
  return null;
}

async function paywayPost(cfg, path, body, apikey) {
  const r = await fetch(`${cfg.baseUrl}${path}`, {
    method: 'POST',
    headers: { apikey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  return { status: r.status, data: await r.json().catch(() => null) };
}

// Código de provincia (ISO 3166-2:AR sin prefijo) que pide Cybersource.
const PROVINCE_CODES = {
  CABA: 'C', 'Buenos Aires': 'B', Catamarca: 'K', Chaco: 'H', Chubut: 'U', Córdoba: 'X',
  Corrientes: 'W', 'Entre Ríos': 'E', Formosa: 'P', Jujuy: 'Y', 'La Pampa': 'L',
  'La Rioja': 'F', Mendoza: 'M', Misiones: 'N', Neuquén: 'Q', 'Río Negro': 'R', Salta: 'A',
  'San Juan': 'J', 'San Luis': 'D', 'Santa Cruz': 'Z', 'Santa Fe': 'S',
  'Santiago del Estero': 'G', 'Tierra del Fuego': 'V', Tucumán: 'T',
};

/** Datos de prevención de fraude (Cybersource, vertical retail) para /payments. */
function fraudDetection(order, deviceId) {
  const c = order.customer;
  const [firstName, ...rest] = c.name.split(/\s+/);
  const address = {
    city: c.city,
    country: 'AR',
    customer_id: 'guest', // Cybersource rechaza un email acá (compra como invitado)
    email: c.email,
    first_name: firstName,
    last_name: rest.join(' ') || firstName,
    phone_number: c.phone.replace(/\D/g, '') || c.phone,
    postal_code: c.zip,
    state: PROVINCE_CODES[c.province] || 'B',
    street1: c.address,
  };
  return {
    send_to_cs: true,
    channel: 'Web',
    device_unique_id: deviceId,
    bill_to: address,
    purchase_totals: { currency: 'ARS', amount: order.amountCents },
    customer_in_site: {
      days_in_site: 0,
      is_guest: true,
      password: '',
      num_of_transactions: 0,
      cellphone_number: address.phone_number,
      street: c.address,
    },
    retail_transaction_data: {
      ship_to: address,
      days_to_delivery: '10',
      dispatch_method: 'domicilio',
      tax_voucher_required: false,
      items: order.lines.map((l) => ({
        code: l.id,
        description: (l.description || l.label).slice(0, 100),
        name: l.label,
        sku: l.id,
        total_amount: l.unitPrice * l.qty * 100,
        quantity: l.qty,
        unit_price: l.unitPrice * 100,
      })),
    },
  };
}

const ALLOWED_METHODS = new Set(PAYMENT_METHODS.map((m) => m.id));
const ALLOWED_INSTALLMENTS = new Set(INSTALLMENTS);

function validate(body) {
  const { items, card = {}, paymentMethodId, installments, customer = {} } = body || {};

  const cart = validateCart(items);
  if (cart.error) return cart;

  const cardData = {
    number: String(card.number ?? '').replace(/\D/g, ''),
    expMonth: String(card.expMonth ?? '').trim().padStart(2, '0'),
    expYear: String(card.expYear ?? '').trim().slice(-2),
    cvv: String(card.cvv ?? '').trim(),
    holder: str(card.holder, 60).toUpperCase(),
    docType: ['dni', 'cuil', 'cuit'].includes(card.docType) ? card.docType : 'dni',
    docNumber: String(card.docNumber ?? '').replace(/\D/g, ''),
  };
  if (!/^\d{13,19}$/.test(cardData.number)) return { error: 'Número de tarjeta inválido.' };
  const month = Number(cardData.expMonth);
  if (!/^\d{2}$/.test(cardData.expMonth) || month < 1 || month > 12) return { error: 'Mes de vencimiento inválido.' };
  if (!/^\d{2}$/.test(cardData.expYear)) return { error: 'Año de vencimiento inválido.' };
  if (!/^\d{3,4}$/.test(cardData.cvv)) return { error: 'Código de seguridad inválido.' };
  if (!cardData.holder) return { error: 'Falta el titular de la tarjeta.' };
  if (!/^\d{7,11}$/.test(cardData.docNumber)) return { error: 'Número de documento inválido.' };
  if (!ALLOWED_METHODS.has(Number(paymentMethodId))) return { error: 'Medio de pago no aceptado.' };
  if (!ALLOWED_INSTALLMENTS.has(Number(installments))) return { error: 'Cantidad de cuotas inválida.' };

  const cust = validateCustomer(customer);
  if (cust.error) return cust;

  const { lines } = cart;
  // Total a cobrar: incluye el recargo por cuotas (p. ej. 6 cuotas +20%).
  const totalPesos = totalWithInstallments(cart.totalPesos, Number(installments));
  return {
    order: {
      lines,
      totalPesos,
      amountCents: totalPesos * 100, // Payway: amount es entero en centavos
      card: cardData,
      paymentMethodId: Number(paymentMethodId),
      installments: Number(installments),
      customer: cust.customer,
    },
  };
}

function rejectionMessage(data) {
  const reason =
    data?.status_details?.error?.reason?.description ||
    data?.status_details?.error?.type ||
    data?.validation_errors?.map((e) => e.param || e.code).join(', ') ||
    data?.error_type;
  return reason ? `Pago no aprobado (${reason}).` : 'El pago no fue aprobado. Probá con otra tarjeta.';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Método no permitido.' });
  }

  const cfg = paywayConfig();
  if (!cfg) {
    return res.status(503).json({ ok: false, message: 'Pagos no configurados (faltan credenciales de Payway).' });
  }

  const { order, error } = validate(req.body);
  if (error) return res.status(400).json({ ok: false, message: error });

  order.siteTransactionId = newOrderId();
  // ID de dispositivo para Cybersource: lo genera el navegador junto con el script
  // de device fingerprint (src/utils/deviceFingerprint.js). Si no llega, usamos uno propio.
  const deviceId = str(req.body?.deviceId, 128).replace(/[^A-Za-z0-9_-]/g, '')
    || order.siteTransactionId.replace(/\W/g, '');

  // 1) Tokenizar la tarjeta
  let tokenRes;
  try {
    const c = order.card;
    tokenRes = await paywayPost(cfg, '/tokens', {
      card_number: c.number,
      card_expiration_month: c.expMonth,
      card_expiration_year: c.expYear,
      security_code: c.cvv,
      card_holder_name: c.holder,
      card_holder_identification: { type: c.docType, number: c.docNumber },
      fraud_detection: { device_unique_identifier: deviceId },
    }, cfg.publicKey);
  } catch (err) {
    console.error('[PAYWAY] Error de red en /tokens:', err.message);
    return res.status(502).json({ ok: false, message: 'No pudimos contactar al procesador de pagos. Intentá de nuevo.' });
  } finally {
    delete order.card; // no retener datos de tarjeta más de lo necesario
  }

  if (tokenRes.status === 401 || tokenRes.status === 403) {
    console.error('[PAYWAY] Credenciales rechazadas en /tokens');
    return res.status(502).json({ ok: false, message: 'Error de configuración de pagos. Contactanos por WhatsApp.' });
  }
  if (!tokenRes.data?.id) {
    const params = tokenRes.data?.validation_errors?.map((e) => e.param).join(', ');
    return res.status(400).json({ ok: false, message: `Revisá los datos de la tarjeta${params ? ` (${params})` : ''}.` });
  }

  // 2) Ejecutar el pago
  const payload = {
    site_transaction_id: order.siteTransactionId,
    token: tokenRes.data.id,
    payment_method_id: order.paymentMethodId,
    bin: tokenRes.data.bin,
    amount: order.amountCents,
    currency: 'ARS',
    installments: order.installments,
    description: `CARMOTION ${linesSummary(order.lines)}`.slice(0, 100),
    payment_type: 'single',
    sub_payments: [],
    fraud_detection: fraudDetection(order, deviceId),
  };

  let data;
  let httpStatus;
  try {
    ({ status: httpStatus, data } = await paywayPost(cfg, '/payments', payload, cfg.privateKey));
  } catch (err) {
    console.error('[PAYWAY] Error de red:', err.message);
    return res.status(502).json({ ok: false, message: 'No pudimos contactar al procesador de pagos. Intentá de nuevo.' });
  }

  if (data?.status === 'approved') {
    await notifyOrder({
      orderId: order.siteTransactionId,
      provider: 'Payway',
      paymentId: data.id,
      linesText: order.lines.map((l) => `${l.qty} × ${l.label}  $${l.unitPrice * l.qty}`).join('\n'),
      totalPesos: order.totalPesos,
      installments: order.installments,
      customer: order.customer,
    });
    return res.status(200).json({
      ok: true,
      orderId: order.siteTransactionId,
      paymentId: data.id,
      totalPesos: order.totalPesos,
    });
  }

  console.warn('[PAYWAY] Pago no aprobado', httpStatus, JSON.stringify(data));
  if (httpStatus === 401 || httpStatus === 403) {
    return res.status(502).json({ ok: false, message: 'Error de configuración de pagos. Contactanos por WhatsApp.' });
  }
  return res.status(402).json({ ok: false, status: data?.status ?? null, message: rejectionMessage(data) });
}
