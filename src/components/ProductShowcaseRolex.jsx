import { motion } from 'framer-motion';

const ProductShowcaseRolex = () => {
  const features = [
    {
      title: 'ALUMINIO AERONÁUTICO',
      description: 'Aleación grado aviación con resistencia certificada a condiciones extremas.',
      number: '01',
    },
    {
      title: 'SISTEMA INTELIGENTE',
      description: 'Despliegue automatizado en menos de 5 minutos mediante pistones de gas.',
      number: '02',
    },
    {
      title: 'GARANTÍA EXTENDIDA',
      description: '10 años de protección respaldada por ingeniería de precisión suiza.',
      number: '03',
    },
  ];

  return (
    <section id="discover" className="bg-black py-32 lg:py-48">
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
          className="text-center mb-32"
        >
          <h2 
          className="text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-8 text-white px-4"
          style={{ fontFamily: 'serif' }}
          >
            PRECISIÓN ABSOLUTA
          </h2>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light tracking-wide px-6">
            Cada elemento de CARMOTION ha sido diseñado con la máxima atención al detalle.
            Una fusión perfecta entre ingeniería aeronáutica y elegancia contemporánea.
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
                <span className="text-8xl font-light text-white/5 absolute left-1/2 transform -translate-x-1/2 -top-4 group-hover:text-white/10 transition-colors duration-700">
                  {feature.number}
                </span>
                <span className="text-2xl font-light text-white/30 relative z-10">
                  {feature.number}
                </span>
              </div>
              <h3 className="text-sm tracking-[0.3em] mb-6 text-white font-light">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-light">
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
