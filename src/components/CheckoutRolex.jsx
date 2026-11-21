import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { formatARS, PAYMENT_METHODS, INSTALLMENTS } from '../data/products';

/**
 * CheckoutRolex — datos de envío + tarjeta.
 * La tarjeta viaja por HTTPS a /api/checkout, que la tokeniza en Payway y cobra.
 * No se guarda en ningún lado (ni en el navegador ni en el servidor).
 */

const PAYWAY_ENV = import.meta.env.VITE_PAYWAY_ENV === 'production' ? 'production' : 'sandbox';

const PROVINCIAS = [
  'CABA', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos',
  'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro',
  'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
  'Tierra del Fuego', 'Tucumán',
];

const inputCls =
  'w-full bg-transparent border border-white/15 px-4 py-3 text-sm text-white placeholder-white/25 ' +
  'focus:border-[#C9A84C] focus:outline-none transition-colors font-body';
// Selects: fondo sólido + color-scheme oscuro para que la lista desplegable
// no se abra blanca (texto blanco sobre blanco en Windows), y flecha propia.
const selectCls =
  'select-dark w-full cursor-pointer border border-white/15 ' +
  'pl-4 pr-10 py-3 text-sm text-white focus:border-[#C9A84C] focus:outline-none transition-colors font-body ' +
  '[&>option]:bg-[#0a0a0a] [&>option]:text-white';
const labelCls = 'block text-[9px] tracking-[0.3em] text-white/60 font-mono mb-2';

const Field = ({ label, className = '', children }) => (
  <label className={`block ${className}`}>
    <span className={labelCls}>{label}</span>
    {children}
  </label>
);

const SectionTitle = ({ n, children }) => (
  <h3 className="flex items-center gap-3 text-[10px] tracking-[0.4em] text-white/70 font-mono mb-6">
    <span className="text-[#C9A84C]">{n}</span>{children}
  </h3>
);

const CheckoutRolex = () => {
  const { lines, total, checkoutOpen, closeCheckout, clear } = useCart();
  const formRef = useRef(null);
  const [phase, setPhase] = useState('form'); // form | processing | success
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [method, setMethod] = useState(PAYMENT_METHODS[0].id);
  const [installments, setInstallments] = useState(1);

  const handleClose = () => {
    if (phase === 'processing') return;
    closeCheckout();
    setTimeout(() => { setPhase('form'); setError(''); setResult(null); }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phase === 'processing') return;
    setError('');
    setPhase('processing');

    const fd = new FormData(formRef.current);
    const customer = Object.fromEntries(
      ['name', 'email', 'phone', 'address', 'city', 'province', 'zip'].map((k) => [k, fd.get(k)])
    );

    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.id, qty: l.qty })),
          card: {
            number: cardNumber,
            expMonth: fd.get('card_exp_month'),
            expYear: fd.get('card_exp_year'),
            cvv: fd.get('card_cvv'),
            holder: fd.get('card_holder'),
            docType: fd.get('card_doc_type'),
            docNumber: fd.get('card_doc_number'),
          },
          paymentMethodId: Number(method),
          installments: Number(installments),
          customer,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.ok) throw new Error(data.message || 'El pago no pudo procesarse.');

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'purchase', {
          transaction_id: data.orderId,
          value: data.totalPesos,
          currency: 'ARS',
          items: lines.map((l) => ({ item_id: l.id, item_name: l.label, price: l.price, quantity: l.qty })),
        });
      }

      setResult(data);
      clear();
      setPhase('success');
    } catch (err) {
      setError(err.message || 'Ocurrió un error. Intentá nuevamente.');
      setPhase('form');
    }
  };

  const processing = phase === 'processing';

  return (
    <AnimatePresence>
      {checkoutOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[70] bg-black overflow-y-auto"
          role="dialog"
          aria-label="Checkout"
        >
          {/* Top bar */}
          <div className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-white/[0.06]">
            <div className="max-w-6xl mx-auto px-4 md:px-8 h-[64px] flex items-center justify-between">
              <span className="text-white tracking-[0.25em] text-sm font-display">CARMOTION · CHECKOUT</span>
              <button
                onClick={handleClose}
                disabled={processing}
                className="text-[10px] tracking-[0.3em] text-white/60 hover:text-white disabled:opacity-30 font-mono"
              >
                {phase === 'success' ? 'CERRAR' : 'VOLVER'}
              </button>
            </div>
          </div>

          {phase === 'success' ? (
            <div className="max-w-xl mx-auto px-4 md:px-8 py-24 text-center">
              <span className="block text-[9px] tracking-[0.5em] text-[#C9A84C] font-mono mb-6">PAGO APROBADO</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-[0.1em] text-white mb-8" style={{ fontFamily: 'serif' }}>
                GRACIAS POR TU COMPRA.
              </h2>
              <p className="text-gray-300 font-light font-body leading-relaxed mb-2">
                Tu pedido <span className="text-white font-mono">{result?.orderId}</span> fue confirmado.
              </p>
              <p className="text-gray-400 font-light font-body leading-relaxed mb-12">
                Te contactamos por WhatsApp o email para coordinar la entrega.
              </p>
              <button
                onClick={handleClose}
                className="text-[10px] tracking-[0.3em] border border-white/25 px-8 py-4 text-white hover:bg-white hover:text-black transition-colors font-mono"
              >
                VOLVER AL SITIO
              </button>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-12" noValidate={false}>
                {/* 01 Contacto */}
                <section>
                  <SectionTitle n="01">CONTACTO</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="NOMBRE Y APELLIDO" className="sm:col-span-2">
                      <input name="name" required autoComplete="name" className={inputCls} />
                    </Field>
                    <Field label="EMAIL">
                      <input name="email" type="email" required autoComplete="email" className={inputCls} />
                    </Field>
                    <Field label="TELÉFONO / WHATSAPP">
                      <input name="phone" type="tel" required autoComplete="tel" className={inputCls} />
                    </Field>
                  </div>
                </section>

                {/* 02 Envío */}
                <section>
                  <SectionTitle n="02">ENVÍO</SectionTitle>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="DIRECCIÓN" className="sm:col-span-2">
                      <input name="address" required autoComplete="street-address" className={inputCls} />
                    </Field>
                    <Field label="CIUDAD">
                      <input name="city" required autoComplete="address-level2" className={inputCls} />
                    </Field>
                    <Field label="PROVINCIA">
                      <select name="province" required defaultValue="" className={selectCls}>
                        <option value="" disabled>Seleccionar</option>
                        {PROVINCIAS.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </Field>
                    <Field label="CÓDIGO POSTAL">
                      <input name="zip" required autoComplete="postal-code" className={inputCls} />
                    </Field>
                  </div>
                </section>

                {/* 03 Pago */}
                <section>
                  <SectionTitle n="03">PAGO CON TARJETA</SectionTitle>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <Field label="TARJETA" className="col-span-2">
                      <select value={method} onChange={(e) => setMethod(e.target.value)} className={selectCls}>
                        {PAYMENT_METHODS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
                      </select>
                    </Field>
                    <Field label="CUOTAS" className="col-span-2">
                      <select value={installments} onChange={(e) => setInstallments(e.target.value)} className={selectCls}>
                        {INSTALLMENTS.map((n) => (
                          <option key={n} value={n}>
                            {n === 1 ? `1 pago de $${formatARS(total)}` : `${n} cuotas de $${formatARS(Math.ceil(total / n))}`}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="NÚMERO DE TARJETA" className="col-span-2 sm:col-span-4">
                      <input
                        name="card_number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••• •••• •••• ••••"
                        className={`${inputCls} font-mono tracking-[0.15em]`}
                      />
                    </Field>
                    <Field label="VTO. MES">
                      <input name="card_exp_month" inputMode="numeric" autoComplete="cc-exp-month" required maxLength={2} placeholder="MM" className={inputCls} />
                    </Field>
                    <Field label="VTO. AÑO">
                      <input name="card_exp_year" inputMode="numeric" autoComplete="cc-exp-year" required maxLength={2} placeholder="AA" className={inputCls} />
                    </Field>
                    <Field label="CÓD. SEGURIDAD" className="col-span-2">
                      <input name="card_cvv" inputMode="numeric" autoComplete="cc-csc" required maxLength={4} placeholder="CVV" className={inputCls} />
                    </Field>
                    <Field label="TITULAR (COMO FIGURA EN LA TARJETA)" className="col-span-2 sm:col-span-4">
                      <input name="card_holder" autoComplete="cc-name" required className={`${inputCls} uppercase`} />
                    </Field>
                    <Field label="TIPO DOC.">
                      <select name="card_doc_type" defaultValue="dni" className={selectCls}>
                        <option value="dni">DNI</option>
                        <option value="cuil">CUIL</option>
                        <option value="cuit">CUIT</option>
                      </select>
                    </Field>
                    <Field label="NÚMERO DOC." className="col-span-1 sm:col-span-3">
                      <input name="card_doc_number" inputMode="numeric" required className={inputCls} />
                    </Field>
                  </div>
                </section>

                {error && (
                  <p className="text-sm text-red-400 font-body border border-red-400/30 px-4 py-3" role="alert">{error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={processing || lines.length === 0}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-5 text-[11px] tracking-[0.35em] font-mono text-black disabled:opacity-40"
                  style={{ background: '#C9A84C' }}
                >
                  {processing ? 'PROCESANDO PAGO…' : `PAGAR ARS $${formatARS(total)}`}
                </motion.button>
                <p className="text-center text-[9px] tracking-[0.2em] text-white/45 font-mono">
                  PAGO PROCESADO POR PAYWAY · TUS DATOS VIAJAN CIFRADOS Y NO SE GUARDAN{PAYWAY_ENV === 'sandbox' ? ' · MODO PRUEBA' : ''}
                </p>
              </form>

              {/* Resumen */}
              <aside className="lg:sticky lg:top-[100px] h-fit border border-white/[0.08] p-6 md:p-8 bg-white/[0.02]">
                <h3 className="text-[10px] tracking-[0.4em] text-white/50 font-mono mb-6">RESUMEN</h3>
                <ul className="space-y-4 mb-6">
                  {lines.map((l) => (
                    <li key={l.id} className="flex justify-between gap-4 text-sm">
                      <span className="text-white/80 font-mono tracking-[0.15em]">{l.qty} × {l.label}</span>
                      <span className="text-white font-light">${formatARS(l.price * l.qty)}</span>
                    </li>
                  ))}
                </ul>
                <div className="h-px bg-white/[0.08] mb-4" />
                <div className="flex justify-between text-sm text-gray-400 font-body mb-2">
                  <span>Envío</span><span>A coordinar</span>
                </div>
                <div className="flex justify-between items-baseline mt-4">
                  <span className="text-[10px] tracking-[0.4em] text-white/60 font-mono">TOTAL</span>
                  <span className="text-white text-2xl font-light">${formatARS(total)}</span>
                </div>
              </aside>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CheckoutRolex;
