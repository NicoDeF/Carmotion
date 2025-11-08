import { motion } from 'framer-motion';

const ProductShowcaseRolex = () => {
  const features = [
    {
      title: 'ACERO INOXIDABLE',
      description: 'Construido para perdurar. Su estructura combina resistencia avanzada y protección total frente a los elementos, asegurando una presencia impecable incluso en las condiciones más extremas.',
      number: '01',
    },
    {
      title: 'LONA OXFORD 600D',
      description: 'Confeccionada en tela Oxford 600D premium, diseñada para resistir la lluvia, el sol y el granizo. Su composición impermeable y anti-UV ofrece una protección total y duradera en cualquier entorno.',
      number: '02',
    },
    {
    title: 'MEDIDAS DISPONIBLES',
      description: 'Diseñadas para autos y camionetas, nuestras cubiertas se adaptan con precisión a distintos tamaños y estilos de vehículo.',
      number: '03',
      },
    {
      title: 'SISTEMA HIDRAULICO',
      description: 'Gracias a su mecanismo hidráulico, la apertura y el cierre se realizan de manera rápida y sencilla, sin necesidad de esfuerzo manual.',
      number: '04',
    },
    {
      title: 'CONSTRUIDA PARA DURAR',
      description: 'La estructura soporta hasta 300 kg y puede anclarse firmemente al piso, ofreciendo máxima seguridad y estabilidad durante su uso.',
      number: '05',
    },
  ];

  return (
    <section id="caracteristicas" className="bg-black py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-32"
        >
          <div className="relative h-[70vh] overflow-hidden">
            <img
              src="/images/_MG_3262.jpg"
              alt="CARMOTION Premium"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-32 font-playfair"
        >
          <h2 
          className="text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-8 text-white px-4 font-playfair"
          style={{ fontFamily: 'serif' }}
          >
            CUIDA LO QUE TE MOVILIZA.
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light tracking-wide px-6 font-playfair">
            Cada elemento de CARMOTION ha sido diseñado con la máxima atención al detalle.
            Una fusión perfecta entre ingeniería  y elegancia.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-16 lg:gap-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center group"
            >
              <div className="mb-8 relative">
                <span className="text-8xl font-light text-white/5 absolute left-1/2 transform -translate-x-1/2 -top-4 group-hover:text-white/10 transition-colors duration-700 font-playfair">
                  {feature.number}
                </span>
                <span className="text-2xl font-light text-white/30 relative z-10 font-playfair">
                  {feature.number}
                </span>
              </div>
              <h3 className="text-sm tracking-[0.3em] mb-6 text-white font-light font-playfair">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-light font-playfair">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseRolex;
