/**
 * POST /api/mp-webhook — notificaciones de Mercado Pago.
 * No confiamos en el contenido de la notificación: con el id volvemos a pedir
 * el pago a la API de MP y solo si está `approved` registramos la venta.
 * Requiere PUBLIC_URL https (Vercel). MP reintenta si no respondemos 200/201.
 */
import { mpFetch, mpToken, notifyFromPayment } from './_lib/mercadopago.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ ok: true });
  if (!mpToken()) return res.status(200).json({ ok: true });

  const q = req.query || Object.fromEntries(new URL(req.url, 'http://x').searchParams);
  const type = q.type || q.topic || req.body?.type;
  const id = q['data.id'] || q.id || req.body?.data?.id;

  if (type !== 'payment' || !/^\d+$/.test(String(id || ''))) {
    return res.status(200).json({ ok: true, ignored: true });
  }

  try {
    const { status, data: payment } = await mpFetch(`/v1/payments/${id}`);
    if (status !== 200 || !payment) {
      console.warn('[MP] Webhook: no se pudo leer el pago', id, status);
      return res.status(500).json({ ok: false }); // MP reintenta
    }
    console.log(`[MP] Webhook pago ${id}: ${payment.status} (${payment.external_reference})`);
    if (payment.status === 'approved') await notifyFromPayment(payment);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[MP] Webhook error:', err.message);
    return res.status(500).json({ ok: false });
  }
}
