import { motion } from 'framer-motion';

const includes = [
  {
    number: '01',
    title: 'ESTRUCTURA COMPLETA',
    subtitle: 'Acero Inoxidable',
    description: 'Lista para ensamblar, con todos los componentes y herrajes incluidos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-14 h-14">
        <rect x="3" y="3" width="18" height="18" rx="0" />
        <path d="M3 8h18M3 16h18M8 3v18M16 3v18" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'LONA PREMIUM',
    subtitle: 'Oxford 600D',
    description: 'Con tratamiento UV, impermeable y resistente al granizo.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-14 h-14">
        <path d="M12 2L3 7v5c0 5 4 9 9 10 5-1 9-5 9-10V7L12 2z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'SISTEMA HIDRÁULICO',
    subtitle: 'Apertura Sin Esfuerzo',
    description: 'Mecanismo suave y preciso para abrir y cerrar en segundos.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-14 h-14">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'KIT DE ANCLAJE',
    subtitle: '5 Posiciones',
    description: 'Universal para cemento, baldosas, tierra o césped.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-14 h-14">
        <circle cx="12" cy="5" r="3" />
        <path d="M12 8v13M9 19l3 3 3-3M5 12h4M15 12h4" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'MANUAL + VIDEO',
    subtitle: 'Instalación Guiada',
    description: 'Instrucciones claras paso a paso para un armado perfecto.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} className="w-14 h-14">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
        <path d="M14 2v6h6M10 13l3 2-3 2v-4z" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0, 0, 0.2, 1] } },
};

const IncludesRolex = () => {
  return (
    <section className="py-16 md:py-24 lg:py-40 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-20 md:mb-28"
        >
          <span className="block text-[9px] tracking-[0.5em] text-white/25 font-mono mb-6 uppercase">
            TODO INCLUIDO
          </span>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.12em] text-white mb-8"
            style={{ fontFamily: 'serif' }}
          >
            ¿QUÉ INCLUYE?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed font-body">
            Todo lo necesario para proteger tu vehículo desde el primer día.<br />
            Sin costos ocultos. Sin sorpresas.
          </p>
        </motion.div>

        {/* Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]"
        >
          {includes.map((item) => (
            <motion.div
              key={item.number}
              variants={itemVariants}
              className="group relative bg-[#0a0a0a] p-10 md:p-14 hover:bg-white/[0.04] transition-colors duration-500"
            >
              {/* Number */}
              <span className="block text-[9px] tracking-[0.4em] text-white/15 font-mono mb-8">
                {item.number}
              </span>

              {/* Icon */}
              <div className="text-white/30 group-hover:text-white/60 transition-colors duration-500 mb-8">
                {item.icon}
              </div>

              {/* Content */}
              <h3 className="text-sm tracking-[0.25em] text-white font-mono mb-3">
                {item.title}
              </h3>
              <p className="text-[11px] tracking-[0.2em] text-white/30 font-mono mb-6">
                {item.subtitle}
              </p>
              <div className="h-px bg-white/8 mb-6" />
              <p className="text-gray-500 text-base leading-relaxed font-light font-body">
                {item.description}
              </p>
            </motion.div>
          ))}

          {/* CTA Cell */}
          <motion.div
            variants={itemVariants}
            className="group relative bg-[#0a0a0a] md:col-span-2 lg:col-span-1 p-10 md:p-14 flex flex-col justify-center items-center text-center hover:bg-white/[0.04] transition-colors duration-500"
          >
            <span className="block text-[9px] tracking-[0.5em] text-white/25 font-mono mb-6">
              ENVÍOS A TODO EL PAÍS
            </span>
            <h3
              className="text-3xl md:text-4xl font-light tracking-[0.1em] text-white mb-8"
              style={{ fontFamily: 'serif' }}
            >
              GARANTÍA<br />TOTAL
            </h3>
            <motion.a
              href="#contacto"
              whileHover={{ backgroundColor: '#fff', color: '#000' }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.25 }}
              className="inline-block border border-white/30 text-white text-[10px] tracking-[0.3em] px-10 py-4 font-mono transition-colors duration-300"
            >
              CONSULTÁ AHORA
            </motion.a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default IncludesRolex;
