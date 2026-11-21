/**
 * POST /api/mp-preference — crea una preferencia de Mercado Pago Checkout Pro.
 * Body: { items: [{id, qty}], customer: {...} }  →  { ok, initPoint, orderId }
 * El navegador redirige a initPoint; MP vuelve a /?mp=success|failure|pending.
 */
import { validateCart, validateCustomer, newOrderId, linesSummary } from './_lib/order.js';
import { mpFetch, mpToken, siteUrl, webhookEnabled } from './_lib/mercadopago.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Método no permitido.' });
  }
  if (!mpToken()) {
    return res.status(503).json({ ok: false, message: 'Mercado Pago no está configurado.' });
  }

  const cart = validateCart(req.body?.items);
  if (cart.error) return res.status(400).json({ ok: false, message: cart.error });
  const cust = validateCustomer(req.body?.customer);
  if (cust.error) return res.status(400).json({ ok: false, message: cust.error });

  const { lines } = cart;
  const c = cust.customer;
  const orderId = newOrderId();
  const base = siteUrl(req);
  const [firstName, ...rest] = c.name.split(/\s+/);

  const preference = {
    items: lines.map((l) => ({
      id: l.id,
      title: `CARMOTION ${l.label}`,
      description: l.description,
      quantity: l.qty,
      unit_price: l.unitPrice,
      currency_id: 'ARS',
    })),
    payer: {
      name: firstName,
      surname: rest.join(' '),
      email: c.email,
      address: { street_name: c.address, zip_code: c.zip },
    },
    external_reference: orderId,
    statement_descriptor: 'CARMOTION',
    back_urls: {
      success: `${base}/?mp=success`,
      failure: `${base}/?mp=failure`,
      pending: `${base}/?mp=pending`,
    },
    // auto_return exige back_urls https; en localhost el cliente vuelve con el botón de MP
    ...(base.startsWith('https://') ? { auto_return: 'approved' } : {}),
    ...(webhookEnabled() ? { notification_url: `${base}/api/mp-webhook?source_news=webhooks` } : {}),
    payment_methods: { installments: 12 },
    metadata: {
      order_id: orderId,
      lines_text: linesSummary(lines),
      customer_name: c.name,
      customer_email: c.email,
      customer_phone: c.phone,
      customer_address: c.address,
      customer_city: c.city,
      customer_province: c.province,
      customer_zip: c.zip,
    },
  };

  let r;
  try {
    r = await mpFetch('/checkout/preferences', { method: 'POST', body: preference, idempotencyKey: orderId });
  } catch (err) {
    console.error('[MP] Error de red creando preferencia:', err.message);
    return res.status(502).json({ ok: false, message: 'No pudimos contactar a Mercado Pago. Intentá de nuevo.' });
  }

  if (!r.data?.init_point) {
    console.error('[MP] Preferencia rechazada', r.status, JSON.stringify(r.data));
    return res.status(502).json({ ok: false, message: 'No pudimos iniciar el pago con Mercado Pago.' });
  }

  return res.status(200).json({ ok: true, orderId, initPoint: r.data.init_point });
}
