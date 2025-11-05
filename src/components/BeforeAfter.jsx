import { motion } from 'framer-motion';

const BeforeAfter = () => {
  const benefits = [
    {
      icon: '✓',
      title: 'Protección 360°',
      description: 'Cobertura completa contra todos los elementos',
    },
    {
      icon: '✓',
      title: 'Instalación Rápida',
      description: 'Despliegue en menos de 5 minutos',
    },
    {
      icon: '✓',
      title: 'Portabilidad Total',
      description: 'Llévalo contigo donde sea que vayas',
    },
    {
      icon: '✓',
      title: 'Durabilidad Extrema',
      description: 'Materiales aeronáuticos con garantía de 10 años',
    },
  ];

  return (
    <section className="bg-dark-800 py-20 lg:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-3">
            PROTECCIÓN REAL
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            El Antes y Después Que Cambia Todo
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            De expuesto a los elementos, a completamente protegido en minutos
          </p>
        </motion.div>

        {/* Comparison Images */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl group"
          >
            <img
              src="/images/_MG_3353.jpg"
              alt="Auto sin protección"
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 bg-dark-900/90 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="text-xl font-semibold">❌ Sin Protección</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden shadow-2xl group"
          >
            <img
              src="/images/_MG_3233.jpg"
              alt="Auto con CARMOTION"
              className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6 bg-blue-500/90 backdrop-blur-sm px-6 py-3 rounded-lg">
              <span className="text-xl font-semibold">✅ Con CARMOTION</span>
            </div>
          </motion.div>
        </div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="text-3xl font-bold mb-8">¿Por Qué Miles Eligen CARMOTION?</h3>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-dark-700 p-6 rounded-xl hover:bg-dark-600 transition-all duration-300 hover:transform hover:scale-105 flex items-start gap-4"
            >
              <div className="bg-green-500 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">{benefit.title}</h4>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
