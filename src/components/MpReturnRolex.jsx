import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatARS } from '../data/products';

/**
 * MpReturnRolex — pantalla de regreso desde Mercado Pago (/?mp=success|failure|pending).
 * No confía en los parámetros de la URL: consulta el estado real del pago a /api/mp-status.
 */

const COPY = {
  approved: { tag: 'PAGO APROBADO', title: 'GRACIAS POR TU COMPRA.', body: 'Te contactamos por WhatsApp o email para coordinar la entrega.', tone: '#C9A84C' },
  pending: { tag: 'PAGO PENDIENTE', title: 'ESTAMOS ESPERANDO TU PAGO.', body: 'Cuando Mercado Pago lo acredite te avisamos. Si pagaste en efectivo puede demorar hasta 48 hs.', tone: '#C9A84C' },
  rejected: { tag: 'PAGO NO APROBADO', title: 'NO SE PUDO COMPLETAR EL PAGO.', body: 'No se realizó ningún cobro. Podés intentar nuevamente con otro medio de pago.', tone: '#f87171' },
};

const stripParams = () => {
  try {
    window.history.replaceState(null, '', window.location.pathname + window.location.hash);
  } catch { /* no-op */ }
};

const MpReturnRolex = () => {
  const { clear, lines, openDrawer } = useCart();
  const [state, setState] = useState(null); // { kind, orderId, totalPesos } | { kind: 'loading' }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const back = params.get('mp');
    if (!back) return;

    const paymentId = params.get('payment_id') || params.get('collection_id');
    stripParams();

    if (!paymentId || paymentId === 'null') {
      // El cliente volvió sin pagar (botón "volver al sitio" o canceló)
      setState({ kind: back === 'pending' ? 'pending' : 'rejected' });
      return;
    }

    setState({ kind: 'loading' });
    fetch(`/api/mp-status?payment_id=${encodeURIComponent(paymentId)}`)
      .then((r) => r.json())
      .then((d) => {
        if (!d.ok) throw new Error();
        const kind = d.status === 'approved' ? 'approved'
          : ['pending', 'in_process', 'authorized'].includes(d.status) ? 'pending'
          : 'rejected';
        if (kind === 'approved' || kind === 'pending') clear();
        if (kind === 'approved' && typeof window.gtag === 'function') {
          window.gtag('event', 'purchase', { transaction_id: d.orderId, value: d.totalPesos, currency: 'ARS' });
        }
        setState({ kind, orderId: d.orderId, totalPesos: d.totalPesos });
      })
      .catch(() => setState({ kind: back === 'success' ? 'pending' : 'rejected' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => setState(null);
  const copy = state && COPY[state.kind];

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/95 backdrop-blur flex items-center justify-center px-4"
          role="dialog"
          aria-label="Resultado del pago"
        >
          {state.kind === 'loading' ? (
            <p className="text-[10px] tracking-[0.4em] text-white/60 font-mono">CONFIRMANDO TU PAGO…</p>
          ) : (
            <div className="max-w-xl text-center">
              <span className="block text-[9px] tracking-[0.5em] font-mono mb-6" style={{ color: copy.tone }}>{copy.tag}</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-[0.1em] text-white mb-8" style={{ fontFamily: 'serif' }}>
                {copy.title}
              </h2>
              {state.orderId && (
                <p className="text-gray-300 font-body mb-2">
                  Pedido <span className="text-white font-mono">{state.orderId}</span>
                  {state.totalPesos ? <> · ${formatARS(state.totalPesos)}</> : null}
                </p>
              )}
              <p className="text-gray-400 font-body leading-relaxed mb-12">{copy.body}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {state.kind === 'rejected' && lines.length > 0 && (
                  <button
                    onClick={() => { close(); openDrawer(); }}
                    className="text-[10px] tracking-[0.3em] px-8 py-4 text-black font-mono"
                    style={{ background: '#C9A84C' }}
                  >
                    VOLVER AL CARRITO
                  </button>
                )}
                <button
                  onClick={close}
                  className="text-[10px] tracking-[0.3em] border border-white/25 px-8 py-4 text-white hover:bg-white hover:text-black transition-colors font-mono"
                >
                  VOLVER AL SITIO
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MpReturnRolex;
