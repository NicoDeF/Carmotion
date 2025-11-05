import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Posiciona tu Vehículo',
      description: 'Estaciona tu auto en el área designada. CARMOTION funciona en cocheras, calles, patios y cualquier superficie plana.',
      image: '/images/_MG_3353.jpg',
    },
    {
      number: 2,
      title: 'Despliega la Estructura',
      description: 'Sistema de apertura automática con pistones de gas. La estructura de aluminio aeronáutico se despliega suavemente en segundos.',
      image: '/images/_MG_3152.jpg',
    },
    {
      number: 3,
      title: 'Protección Activada',
      description: 'Tu vehículo queda completamente protegido. Estructura resistente a vientos de 80 km/h y granizo de hasta 3cm de diámetro.',
      image: '/images/_MG_3271.jpg',
    },
  ];

  return (
    <section id="como-funciona" className="bg-dark-900 py-20 lg:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-3">
            SIMPLE Y RÁPIDO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Cómo Funciona en 3 Pasos
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Protección profesional sin complicaciones. Tan fácil como 1-2-3.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="card group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-64 -m-6 mb-6 overflow-hidden rounded-t-2xl">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent" />
                
                {/* Step Number */}
                <div className="absolute top-6 left-6 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
