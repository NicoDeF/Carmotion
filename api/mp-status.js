/**
 * GET /api/mp-status?payment_id=123 — estado real de un pago (consultado a MP),
 * para la pantalla de regreso. No devuelve datos personales.
 *
 * En desarrollo (sin webhook público) también registra la venta aprobada acá,
 * para poder probar el circuito completo en localhost.
 */
import { mpFetch, mpToken, webhookEnabled, notifyFromPayment } from './_lib/mercadopago.js';

const notified = new Set(); // evita avisos duplicados al recargar (solo dev)

export default async function handler(req, res) {
  const q = req.query || Object.fromEntries(new URL(req.url, 'http://x').searchParams);
  const id = String(q.payment_id || '');
  if (!mpToken()) return res.status(503).json({ ok: false, message: 'Mercado Pago no está configurado.' });
  if (!/^\d+$/.test(id)) return res.status(400).json({ ok: false, message: 'payment_id inválido.' });

  try {
    const { status, data: p } = await mpFetch(`/v1/payments/${id}`);
    if (status !== 200 || !p) return res.status(404).json({ ok: false, message: 'Pago no encontrado.' });

    if (p.status === 'approved' && !webhookEnabled() && !notified.has(id)) {
      notified.add(id);
      await notifyFromPayment(p);
    }

    return res.status(200).json({
      ok: true,
      status: p.status, // approved | pending | in_process | rejected | ...
      statusDetail: p.status_detail,
      orderId: p.external_reference,
      totalPesos: p.transaction_amount,
      installments: p.installments,
    });
  } catch (err) {
    console.error('[MP] Error consultando pago:', err.message);
    return res.status(502).json({ ok: false, message: 'No pudimos consultar el pago.' });
  }
}
