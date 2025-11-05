import { motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: 'CARMOTION Basic',
      tag: 'ESTÁNDAR',
      price: '$1.200',
      description: 'Protección completa para autos compactos',
      features: [
        'Sistema completo de protección',
        'Estructura de aluminio',
        'Instalación incluida',
        'Garantía 5 años',
        'Soporte técnico',
        'Envío gratis Argentina',
      ],
      featured: false,
    },
    {
      name: 'CARMOTION Premium',
      tag: '⭐ MÁS POPULAR',
      price: '$1.500',
      description: 'Para SUVs y vehículos premium',
      features: [
        'Todo lo de Basic +',
        'Estructura reforzada',
        'Control remoto motorizado',
        'Garantía 10 años',
        'Servicio premium 24/7',
        'Financiación 12 cuotas',
      ],
      featured: true,
    },
    {
      name: 'CARMOTION Pro',
      tag: 'PROFESIONAL',
      price: '$1.900',
      description: 'Para flotas y vehículos XL',
      features: [
        'Todo lo de Premium +',
        'Dimensiones extendidas',
        'Múltiples unidades descuento',
        'Garantía extendida 15 años',
        'Mantenimiento incluido',
        'Consultoría personalizada',
      ],
      featured: false,
    },
  ];

  const scrollToContact = () => {
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="precios" className="bg-dark-800 py-20 lg:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-3">
            INVERSIÓN INTELIGENTE
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Un Precio. Protección Infinita.
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Invierte una vez, protege para siempre. Garantía de 10 años incluida.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-3xl p-8 transition-all duration-300 ${
                plan.featured
                  ? 'bg-gradient-to-br from-blue-600 to-blue-700 transform scale-105 shadow-2xl border-2 border-blue-400'
                  : 'bg-dark-700 hover:bg-dark-600 border border-white/10'
              }`}
            >
              {/* Tag */}
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                plan.featured ? 'bg-white/20' : 'bg-blue-500'
              }`}>
                {plan.tag}
              </div>

              {/* Plan Name */}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold">
                  <span className="text-2xl text-gray-400">USD</span> {plan.price}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-300 mb-8">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                      plan.featured ? 'bg-white/20' : 'bg-green-500'
                    }`}>
                      ✓
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                onClick={scrollToContact}
                className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 ${
                  plan.featured
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                } hover:transform hover:scale-105`}
              >
                {plan.featured ? 'Comprar Ahora' : 'Solicitar Información'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Financing Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-dark-700 rounded-2xl p-8 text-center max-w-4xl mx-auto"
        >
          <h4 className="text-2xl font-bold mb-4">💳 Opciones de Financiación</h4>
          <p className="text-gray-400">
            12 cuotas sin interés con todas las tarjetas | Mercado Pago | Transferencia bancaria
            <br />
            <strong className="text-blue-500">Descuento especial 5% por pago en efectivo</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
