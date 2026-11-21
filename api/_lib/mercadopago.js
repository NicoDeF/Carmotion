/**
 * Cliente mínimo de la API de Mercado Pago (Checkout Pro).
 * Env: MP_ACCESS_TOKEN (servidor, secreto). PUBLIC_URL = URL pública https del sitio
 * (en Vercel, ej. https://carmotion.com.ar) para back_urls y webhook.
 */
import { notifyOrder } from './order.js';

const API = 'https://api.mercadopago.com';

export const mpToken = () => process.env.MP_ACCESS_TOKEN || null;

export async function mpFetch(path, { method = 'GET', body, idempotencyKey } = {}) {
  const r = await fetch(`${API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${mpToken()}`,
      'Content-Type': 'application/json',
      ...(idempotencyKey ? { 'X-Idempotency-Key': idempotencyKey } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(20000),
  });
  return { status: r.status, data: await r.json().catch(() => null) };
}

/** URL pública del sitio: PUBLIC_URL si está, si no el Origin del navegador (dev). */
export function siteUrl(req) {
  const fromEnv = process.env.PUBLIC_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  const origin = req.headers?.origin;
  if (origin && /^https?:\/\/[\w.-]+(:\d+)?$/.test(origin)) return origin;
  return 'http://localhost:3000';
}

/** El webhook solo funciona con una URL https pública (MP no llega a localhost). */
export const webhookEnabled = () => /^https:\/\//.test(process.env.PUBLIC_URL || '');

/** Arma el aviso de venta a partir de un pago aprobado (datos guardados en metadata). */
export async function notifyFromPayment(payment) {
  const m = payment.metadata || {};
  await notifyOrder({
    orderId: payment.external_reference || m.order_id || '(sin id)',
    provider: 'Mercado Pago',
    paymentId: payment.id,
    linesText: m.lines_text || payment.description || '',
    totalPesos: payment.transaction_amount,
    installments: payment.installments,
    customer: {
      name: m.customer_name || '',
      email: m.customer_email || payment.payer?.email || '',
      phone: m.customer_phone || '',
      address: m.customer_address || '',
      city: m.customer_city || '',
      province: m.customer_province || '',
      zip: m.customer_zip || '',
    },
  });
}
