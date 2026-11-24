import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatARS, MAX_QTY } from '../data/products';

const CartDrawerRolex = () => {
  const { lines, total, count, drawerOpen, closeDrawer, setQty, remove, openCheckout } = useCart();

  return (
    <AnimatePresence>
      {drawerOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[61] w-full sm:w-[420px] bg-[#0a0a0a] border-l border-white/[0.08] flex flex-col"
            role="dialog"
            aria-label="Carrito"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-8 h-[72px] border-b border-white/[0.06]">
              <span className="text-[10px] tracking-[0.4em] text-white/60 font-mono">
                CARRITO {count > 0 && `(${count})`}
              </span>
              <button
                onClick={closeDrawer}
                className="text-[10px] tracking-[0.3em] text-white/60 hover:text-white transition-colors font-mono"
              >
                CERRAR
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="text-white/60 text-sm font-light font-body mb-6">Tu carrito está vacío.</p>
                  <button
                    onClick={() => {
                      closeDrawer();
                      document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[10px] tracking-[0.3em] border border-white/20 px-6 py-3 text-white/70 hover:bg-white hover:text-black transition-colors font-mono"
                  >
                    VER MODELOS
                  </button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {lines.map((l) => (
                    <li key={l.id} className="pb-6 border-b border-white/[0.06]">
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <span className="text-white text-sm tracking-[0.25em] font-mono">{l.label}</span>
                        <span className="text-white font-light">${formatARS(l.price * l.qty)}</span>
                      </div>
                      <p className="text-gray-400 text-xs font-light font-body mb-4">{l.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-white/15">
                          <button
                            onClick={() => setQty(l.id, l.qty - 1)}
                            className="w-9 h-9 text-white/60 hover:text-white hover:bg-white/5"
                            aria-label="Restar"
                          >−</button>
                          <span className="w-9 text-center text-sm text-white font-mono">{l.qty}</span>
                          <button
                            onClick={() => setQty(l.id, l.qty + 1)}
                            disabled={l.qty >= MAX_QTY}
                            className="w-9 h-9 text-white/60 hover:text-white hover:bg-white/5 disabled:opacity-30"
                            aria-label="Sumar"
                          >+</button>
                        </div>
                        <button
                          onClick={() => remove(l.id)}
                          className="text-[9px] tracking-[0.3em] text-white/50 hover:text-white/70 font-mono"
                        >
                          QUITAR
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {lines.length > 0 && (
              <div className="px-6 md:px-8 py-6 border-t border-white/[0.06]">
                <div className="flex justify-between items-baseline mb-6">
                  <span className="text-[10px] tracking-[0.4em] text-white/60 font-mono">TOTAL</span>
                  <span className="text-white text-2xl font-light">
                    <span className="text-[10px] text-white/50 font-mono mr-2">ARS $</span>
                    {formatARS(total)}
                  </span>
                </div>
                <motion.button
                  onClick={openCheckout}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 text-[10px] tracking-[0.35em] font-mono text-black"
                  style={{ background: '#C9A84C' }}
                >
                  FINALIZAR COMPRA
                </motion.button>
                <p className="text-center text-[9px] tracking-[0.2em] text-white/45 font-mono mt-4">
                  PAGO SEGURO CON PAYWAY · HASTA 3 CUOTAS SIN INTERÉS
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawerRolex;
