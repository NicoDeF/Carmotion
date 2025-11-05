import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: '✈️',
      title: 'Aluminio Aeronáutico',
      description: 'Estructura fabricada con aleación de aluminio grado aviación. La misma tecnología que protege aviones comerciales ahora cuida tu vehículo.',
    },
    {
      icon: '⚡',
      title: 'Sistema de Apertura Rápida',
      description: 'Pistones de gas industriales permiten despliegue suave y controlado en menos de 5 minutos. Sin esfuerzo físico requerido.',
    },
    {
      icon: '🛡️',
      title: 'Resistencia Extrema',
      description: 'Probado contra vientos de 80 km/h, granizo de 3cm de diámetro y temperaturas extremas de -20°C a +60°C.',
    },
    {
      icon: '🌧️',
      title: '100% Impermeable',
      description: 'Tejido técnico de alta densidad con tratamiento anti-UV. Protección total contra lluvia, nieve y humedad.',
    },
    {
      icon: '🎒',
      title: 'Portabilidad Total',
      description: 'Se pliega en bolsa de transporte compacta. Llévalo en viajes, a la playa, eventos deportivos o donde lo necesites.',
    },
    {
      icon: '🔧',
      title: 'Instalación Profesional',
      description: 'Incluye instalación profesional y capacitación completa. Soporte técnico premium durante toda la vida útil del producto.',
    },
  ];

  return (
    <section id="caracteristicas" className="bg-dark-800 py-20 lg:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-3">
            TECNOLOGÍA PREMIUM
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Características Que Marcan la Diferencia
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            No es solo una carpa. Es ingeniería aeronáutica aplicada a la protección vehicular.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card group"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
