import { motion } from 'framer-motion';

const IncludesRolex = () => {
  const includes = [
    {
      icon: '🔩',
      title: 'ESTRUCTURA COMPLETA',
      subtitle: 'Acero Inoxidable',
      description: 'Lista para ensamblar, con todos los componentes y herrajes incluidos.',
    },
    {
      icon: '🛡️',
      title: 'LONA PREMIUM',
      subtitle: 'Oxford 600D',
      description: 'Con tratamiento UV, impermeable y resistente al granizo.',
    },
    {
      icon: '⚙️',
      title: 'SISTEMA HIDRÁULICO',
      subtitle: 'Apertura Sin Esfuerzo',
      description: 'Mecanismo suave y preciso para abrir y cerrar en segundos.',
    },
    {
      icon: '🔧',
      title: 'KIT DE ANCLAJE',
      subtitle: '5 Posiciones',
      description: 'Universal para cemento, baldosas, tierra o césped.',
    },
    {
      icon: '📋',
      title: 'MANUAL + VIDEO',
      subtitle: 'Instalación Guiada',
      description: 'Instrucciones claras paso a paso para un armado perfecto.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-black py-24 md:py-32 lg:py-40 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] text-gray-500 font-light mb-4 block font-body">
            TODO INCLUIDO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white mb-6 font-display">
            ¿QUÉ INCLUYE?
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed font-body">
            Recibí todo lo necesario para proteger tu vehículo desde el primer día.
            Sin costos ocultos. Sin sorpresas.
          </p>
        </motion.div>

        {/* Items Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {includes.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative p-8 md:p-10 border border-white/10 hover:border-white/30 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.05]">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/20 group-hover:border-white/40 transition-colors duration-500" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/20 group-hover:border-white/40 transition-colors duration-500" />
                
                {/* Icon */}
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                
                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-[11px] tracking-[0.2em] text-white font-light font-body">
                    {item.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.15em] text-gray-500 font-light font-body">
                    {item.subtitle}
                  </p>
                  <p className="text-gray-400 text-sm leading-relaxed pt-3 font-light font-body">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* CTA Card */}
          <motion.div
            variants={itemVariants}
            className="group relative md:col-span-2 lg:col-span-1"
          >
            <div className="relative p-8 md:p-10 border border-white/30 bg-white/[0.05] h-full flex flex-col justify-center items-center text-center">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/40" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/40" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-white/40" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-white/40" />
              
              <p className="text-white/60 text-[11px] tracking-[0.2em] mb-4 font-light font-body">
                ENVÍOS A TODO EL PAÍS
              </p>
              <p className="text-3xl md:text-4xl font-light text-white tracking-wide font-display mb-6">
                GARANTÍA TOTAL
              </p>
              <motion.a
                href="#contacto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block border border-white/50 text-white text-[10px] tracking-[0.2em] px-8 py-4 hover:bg-white hover:text-black transition-all duration-500 font-light font-body"
              >
                CONSULTÁ AHORA
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default IncludesRolex;
