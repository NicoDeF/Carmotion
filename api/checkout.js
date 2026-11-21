/**
 * POST /api/checkout — ejecuta el pago con Payway (ex Decidir) Ventas Online v2.
 *
 * Flujo (todo server-side, la credencial nunca llega al navegador):
 *  1. POST {base}/tokens con los datos de la tarjeta → token + bin.
 *  2. Recalcula el total desde el catálogo y POST {base}/payments.
 *  Auth: header `apikey: <client_id>:<client_secret>`.
 *  Los datos de la tarjeta NO se guardan ni se loguean.
 *
 * Funciona como Vercel Serverless Function y también montado en Express
 * (server/dev-server.js) para desarrollo local.
 *
 * Env:
 *   PAYWAY_ENV=sandbox|production
 *   PAYWAY_CLIENT_ID=...  PAYWAY_CLIENT_SECRET=...
 *   PAYWAY_API_URL=...    (obligatorio en producción; sandbox tiene default)
 *   (opcional, aviso de pedidos por mail) SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS ORDER_EMAIL_TO
 */
import { PRODUCT_MAP, PAYMENT_METHODS, INSTALLMENTS, MAX_QTY } from '../src/data/products.js';

const SANDBOX_URL = 'https://api-sandbox.payway.com.ar/api/v2';

function paywayConfig() {
  const { PAYWAY_ENV, PAYWAY_CLIENT_ID, PAYWAY_CLIENT_SECRET, PAYWAY_API_URL } = process.env;
  const production = PAYWAY_ENV === 'production';
  const baseUrl = PAYWAY_API_URL || (production ? null : SANDBOX_URL);
  if (!PAYWAY_CLIENT_ID || !PAYWAY_CLIENT_SECRET || !baseUrl) return null;
  return { baseUrl: baseUrl.replace(/\/$/, ''), apikey: `${PAYWAY_CLIENT_ID}:${PAYWAY_CLIENT_SECRET}` };
}

async function paywayPost(cfg, path, body) {
  const r = await fetch(`${cfg.baseUrl}${path}`, {
    method: 'POST',
    headers: { apikey: cfg.apikey, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });
  return { status: r.status, data: await r.json().catch(() => null) };
}

const ALLOWED_METHODS = new Set(PAYMENT_METHODS.map((m) => m.id));
const ALLOWED_INSTALLMENTS = new Set(INSTALLMENTS);

const str = (v, max = 120) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function validate(body) {
  const { items, card = {}, paymentMethodId, installments, customer = {} } = body || {};

  if (!Array.isArray(items) || items.length === 0) return { error: 'El carrito está vacío.' };

  const lines = [];
  for (const it of items) {
    const product = PRODUCT_MAP[it?.id];
    const qty = Number(it?.qty);
    if (!product) return { error: 'Producto inválido en el carrito.' };
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return { error: 'Cantidad inválida.' };
    lines.push({ id: product.id, label: product.label, qty, unitPrice: product.price });
  }

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

  const c = {
    name: str(customer.name),
    email: str(customer.email),
    phone: str(customer.phone, 40),
    address: str(customer.address, 200),
    city: str(customer.city, 80),
    province: str(customer.province, 80),
    zip: str(customer.zip, 12),
  };
  if (!c.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email) || !c.phone || !c.address || !c.city || !c.zip) {
    return { error: 'Faltan datos de contacto o envío.' };
  }

  const totalPesos = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  return {
    order: {
      lines,
      totalPesos,
      amountCents: totalPesos * 100, // Payway: amount es entero en centavos
      card: cardData,
      paymentMethodId: Number(paymentMethodId),
      installments: Number(installments),
      customer: c,
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

async function notifyOrder(order, payment) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ORDER_EMAIL_TO } = process.env;
  const summary = [
    `Pedido ${order.siteTransactionId} — APROBADO (pago Payway #${payment.id})`,
    '',
    ...order.lines.map((l) => `${l.qty} × ${l.label}  $${l.unitPrice * l.qty}`),
    `TOTAL: $${order.totalPesos} — ${order.installments} cuota(s)`,
    '',
    `Cliente: ${order.customer.name} · ${order.customer.email} · ${order.customer.phone}`,
    `Envío: ${order.customer.address}, ${order.customer.city}, ${order.customer.province} (${order.customer.zip})`,
  ].join('\n');

  console.log('\n[ORDER]\n' + summary + '\n');
  if (!SMTP_HOST || !ORDER_EMAIL_TO) return;

  try {
    const { default: nodemailer } = await import('nodemailer');
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    });
    await transport.sendMail({
      from: SMTP_USER || ORDER_EMAIL_TO,
      to: ORDER_EMAIL_TO,
      replyTo: order.customer.email,
      subject: `Nueva venta CARMOTION — ${order.siteTransactionId}`,
      text: summary,
    });
  } catch (err) {
    console.error('[ORDER] No se pudo enviar el mail del pedido:', err.message);
  }
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

  order.siteTransactionId = `CM-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

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
    });
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
    description: `CARMOTION ${order.lines.map((l) => `${l.qty}x${l.label}`).join(' ')}`.slice(0, 100),
    payment_type: 'single',
    sub_payments: [],
  };

  let data;
  let httpStatus;
  try {
    ({ status: httpStatus, data } = await paywayPost(cfg, '/payments', payload));
  } catch (err) {
    console.error('[PAYWAY] Error de red:', err.message);
    return res.status(502).json({ ok: false, message: 'No pudimos contactar al procesador de pagos. Intentá de nuevo.' });
  }

  if (data?.status === 'approved') {
    await notifyOrder(order, data);
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
