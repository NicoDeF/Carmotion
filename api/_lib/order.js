/**
 * Lógica compartida entre medios de pago (Payway, Mercado Pago):
 * validación de carrito y cliente contra el catálogo, IDs de pedido y aviso de venta.
 * El prefijo `_` evita que Vercel lo publique como endpoint.
 */
import { PRODUCT_MAP, MAX_QTY } from '../../src/data/products.js';

export const str = (v, max = 120) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

/** Recalcula el carrito desde el catálogo: el precio nunca sale del navegador. */
export function validateCart(items) {
  if (!Array.isArray(items) || items.length === 0) return { error: 'El carrito está vacío.' };
  const lines = [];
  for (const it of items) {
    const product = PRODUCT_MAP[it?.id];
    const qty = Number(it?.qty);
    if (!product) return { error: 'Producto inválido en el carrito.' };
    if (!Number.isInteger(qty) || qty < 1 || qty > MAX_QTY) return { error: 'Cantidad inválida.' };
    lines.push({ id: product.id, label: product.label, description: product.description, qty, unitPrice: product.price });
  }
  const totalPesos = lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
  return { lines, totalPesos };
}

export function validateCustomer(customer = {}) {
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
  return { customer: c };
}

export const newOrderId = () => `CM-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export const linesSummary = (lines) => lines.map((l) => `${l.qty}x${l.label}`).join(' ');

/**
 * Registra la venta en el log y, si hay SMTP configurado, manda un mail.
 * SMTP_HOST/SMTP_USER/SMTP_PASS/ORDER_EMAIL_TO, o como alternativa la cuenta de
 * Gmail del formulario de contacto (EMAIL_USER/EMAIL_PASS).
 */
export async function notifyOrder({ orderId, provider, paymentId, linesText, totalPesos, installments, customer }) {
  const summary = [
    `Pedido ${orderId} — APROBADO (${provider} #${paymentId})`,
    '',
    linesText,
    `TOTAL: $${totalPesos}${installments ? ` — ${installments} cuota(s)` : ''}`,
    '',
    `Cliente: ${customer.name} · ${customer.email} · ${customer.phone}`,
    `Envío: ${customer.address}, ${customer.city}, ${customer.province} (${customer.zip})`,
  ].join('\n');

  console.log('\n[ORDER]\n' + summary + '\n');

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ORDER_EMAIL_TO, EMAIL_USER, EMAIL_PASS } = process.env;
  let transportOpts;
  let to = ORDER_EMAIL_TO;
  let from = SMTP_USER || ORDER_EMAIL_TO;
  if (SMTP_HOST && ORDER_EMAIL_TO) {
    transportOpts = {
      host: SMTP_HOST,
      port: Number(SMTP_PORT) || 587,
      secure: Number(SMTP_PORT) === 465,
      auth: SMTP_USER ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
    };
  } else if (EMAIL_USER && EMAIL_PASS) {
    transportOpts = { service: 'gmail', auth: { user: EMAIL_USER, pass: EMAIL_PASS } };
    to = ORDER_EMAIL_TO || EMAIL_USER;
    from = EMAIL_USER;
  } else {
    return;
  }

  try {
    const { default: nodemailer } = await import('nodemailer');
    await nodemailer.createTransport(transportOpts).sendMail({
      from,
      to,
      replyTo: customer.email,
      subject: `Nueva venta CARMOTION — ${orderId}`,
      text: summary,
    });
  } catch (err) {
    console.error('[ORDER] No se pudo enviar el mail del pedido:', err.message);
  }
}
