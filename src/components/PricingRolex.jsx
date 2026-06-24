import { motion } from 'framer-motion';

/**
 * PricingRolex — Sección de precios
 * Va entre ProductShowcaseRolex e IncludesRolex en AppRolex
 * Fondo: #0a0a0a (alternado con la sección anterior)
 */

const plans = [
  {
    id: 'moto',
    label: 'MOTO',
    price: '699.000',
    currency: 'ARS $',
    badge: null,
    description: 'Para motos y scooters de cualquier cilindrada.',
    includes: [
      'Estructura de acero inoxidable',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '3,3 × 1,4 × 1,9 m (largo/alto/ancho)',
    ],
    cta: 'CONSULTAR DISPONIBILIDAD',
    href: '#contacto',
    highlight: false,
  },
  {
    id: 'auto',
    label: 'AUTO',
    price: '1.549.000',
    currency: 'ARS $',
    badge: null,
    description: 'Para sedanes, hatchbacks y utilitarios compactos.',
    includes: [
      'Estructura de acero inoxidable',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '5,5 × 2,5 × 2,4 m (largo/alto/ancho)',
    ],
    cta: 'CONSULTAR DISPONIBILIDAD',
    href: '#contacto',
    highlight: false,
  },
  {
    id: 'camioneta',
    label: 'CAMIONETA',
    price: '1.749.000',
    currency: 'ARS $',
    badge: 'MÁS ELEGIDO',
    description: 'Para pickups, SUVs y vehículos de mayor porte.',
    includes: [
      'Estructura de acero inoxidable reforzada',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '6 × 2,7 × 2,8 m (largo/alto/ancho)',
    ],
    cta: 'CONSULTAR DISPONIBILIDAD',
    href: '#contacto',
    highlight: true,
  },
  {
    id: 'fullsize',
    label: 'FULLSIZE',
    price: '1.999.000',
    currency: 'ARS $',
    badge: null,
    description: 'Para camionetas grandes, doble cabina y vehículos de trabajo.',
    includes: [
      'Estructura de acero inoxidable reforzada',
      'Lona Oxford 600D impermeable',
      'Amortiguadores de despliegue',
      'Anclaje en 7 puntos',
      '6,8 × 2,8 × 2,8 m (largo/alto/ancho)',
    ],
    cta: 'CONSULTAR DISPONIBILIDAD',
    href: '#contacto',
    highlight: false,
  },
];

const scrollToContact = () => {
  const el = document.getElementById('contacto');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const PricingRolex = () => {
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
          <span className="block text-[9px] tracking-[0.5em] text-white/25 font-mono mb-6 uppercase">
            INVERSIÓN
          </span>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.12em] text-white mb-8"
            style={{ fontFamily: 'serif' }}
          >
            VALORES DE PROTECCIÓN.
          </h2>
          <p className="text-gray-400 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed font-body">
            10% de descuento pagando en efectivo.<br />
            Tarjeta en cuotas sin interés — todos los medios aceptados.
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
                  <span className="bg-white text-black text-[8px] tracking-[0.35em] font-mono px-4 py-1.5">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Card */}
              <div
                className={`flex flex-col flex-1 p-6 md:p-10 border transition-colors duration-500 ${
                  plan.highlight
                    ? 'border-white/20 bg-white/[0.03]'
                    : 'border-white/8 bg-transparent'
                }`}
              >
                {/* Label */}
                <div className="mb-8">
                  <span className="text-[10px] tracking-[0.4em] text-white/30 font-mono uppercase">
                    {plan.label}
                  </span>
                  <p className="text-gray-400 text-sm font-light mt-2 leading-relaxed font-body">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 md:mb-10">
                  <span className="block text-[9px] tracking-[0.3em] text-white/25 font-mono mb-1">
                    {plan.currency}
                  </span>
                  <span className="text-white font-light text-3xl leading-none">
                    {plan.price}
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
                      className="flex items-start gap-3 text-gray-400 text-sm font-light font-body"
                    >
                      <span className="text-white/20 font-mono text-xs mt-0.5 shrink-0 leading-none">—</span>
                      {item}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.button
                  onClick={scrollToContact}
                  whileHover={{
                    backgroundColor: plan.highlight ? '#fff' : '#fff',
                    color: '#000',
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className={`w-full py-4 text-[10px] tracking-[0.3em] font-mono border transition-colors duration-300 ${
                    plan.highlight
                      ? 'border-white/30 text-white'
                      : 'border-white/15 text-white/50'
                  }`}
                >
                  {plan.cta}
                </motion.button>
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
          className="text-center text-gray-700 text-[10px] md:text-xs font-mono tracking-[0.2em] mt-8 md:mt-12"
        >
          PRECIOS SUJETOS A VARIACIÓN · CONSULTAR STOCK DISPONIBLE
        </motion.p>

      </div>
    </section>
  );
};

export default PricingRolex;
