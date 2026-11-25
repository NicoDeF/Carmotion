import { motion } from 'framer-motion';
import { PRODUCTS, formatARS } from '../data/products';
import { useCart } from '../context/CartContext';

/**
 * PricingRolex — Sección de precios
 * Va entre ProductShowcaseRolex e IncludesRolex en AppRolex
 * Fondo: #0a0a0a (alternado con la sección anterior)
 */

const plans = PRODUCTS;

const scrollToContact = () => {
  const el = document.getElementById('contacto');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const PricingRolex = () => {
  const { add } = useCart();

  return (
    <section id="precios" className="py-20 md:py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="block text-[9px] tracking-[0.5em] text-white/45 font-mono mb-6 uppercase">
            INVERSIÓN
          </span>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.12em] text-white mb-8"
            style={{ fontFamily: 'serif' }}
          >
            VALORES DE PROTECCIÓN.
          </h2>
          <p className="text-gray-300 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed font-body">
            10% de descuento pagando en efectivo.<br />
            Tarjeta hasta 3 cuotas sin interés — todos los medios aceptados.
          </p>
          <p className="mt-4 text-[10px] tracking-[0.25em] font-mono uppercase" style={{ color: '#C9A84C' }}>
            Envío e instalación no incluidos · se cotizan aparte —{' '}
            <a href="https://wa.me/5491171217804?text=Hola%2C%20quiero%20consultar%20por%20env%C3%ADo%20e%20instalaci%C3%B3n" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted hover:text-white">consultar</a>
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0, 0, 0.2, 1] }}
              className="relative flex flex-col"
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span
                    className="text-[8px] tracking-[0.35em] font-mono px-4 py-1.5"
                    style={{ background: '#C9A84C', color: '#000' }}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`flex flex-col flex-1 p-6 md:p-10 border transition-colors duration-500 ${
                  plan.highlight
                    ? 'bg-white/[0.03] glow-gold'
                    : 'border-white/8 bg-transparent'
                }`}
                style={plan.highlight ? { borderColor: 'rgba(201, 168, 76, 0.35)' } : {}}
              >
                {/* Label */}
                <div className="mb-8">
                  <span className="text-[10px] tracking-[0.4em] text-white/50 font-mono uppercase">
                    {plan.label}
                  </span>
                  <p className="text-gray-300 text-sm font-light mt-2 leading-relaxed font-body">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 md:mb-10">
                  <span className="block text-[9px] tracking-[0.3em] text-white/45 font-mono mb-1">
                    ARS $
                  </span>
                  <span className="text-white font-light text-3xl leading-none">
                    {formatARS(plan.price)}
                  </span>
                </div>

                {/* Divisor */}
                <div className="h-px bg-white/8 mb-8" />

                {/* Includes */}
                <ul className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                  {plan.includes.map((item, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.15 + j * 0.07 }}
                      className="flex items-start gap-3 text-gray-300 text-sm font-light font-body"
                    >
                      <span className="text-white/40 font-mono text-xs mt-0.5 shrink-0 leading-none">—</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  onClick={() => add(plan.id)}
                  whileHover={{ backgroundColor: '#fff', color: '#000' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className={`w-full py-4 text-[10px] tracking-[0.3em] font-mono border transition-colors duration-300 ${
                    plan.highlight ? 'text-white' : 'border-white/15 text-white/50'
                  }`}
                  style={plan.highlight ? { borderColor: 'rgba(201, 168, 76, 0.5)' } : {}}
                >
                  AGREGAR AL CARRITO
                </motion.button>
                <button
                  onClick={scrollToContact}
                  className="mt-3 text-[9px] tracking-[0.3em] text-white/50 hover:text-white/70 transition-colors font-mono"
                >
                  O CONSULTAR DISPONIBILIDAD
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nota al pie */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-center text-gray-500 text-[10px] md:text-xs font-mono tracking-[0.2em] mt-8 md:mt-12"
        >
          PRECIOS SUJETOS A VARIACIÓN · CONSULTAR STOCK DISPONIBLE
        </motion.p>

      </div>
    </section>
  );
};

export default PricingRolex;
