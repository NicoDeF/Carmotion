import { motion } from 'framer-motion';

const HowItWorksRolex = () => {
  const steps = [
    {
      number: 'I',
      title: 'POSICIONAR',
      description: 'Estacione su vehículo en la ubicación deseada. CARMOTION se adapta a cualquier superficie.',
      image: '/images/_MG_3353.jpg',
    },
    {
      number: 'II',
      title: 'DESPLEGAR',
      description: 'El sistema de pistones de gas despliega la estructura de aluminio aeronáutico en minutos.',
      image: '/images/_MG_3152.jpg',
    },
    {
      number: 'III',
      title: 'PROTEGER',
      description: 'Protección total activada. Resistencia certificada contra elementos extremos.',
      image: '/images/_MG_3271.jpg',
    },
  ];

  return (
    <section id="como-funciona" className="bg-black py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-32"
        >
          <h2 
            className="text-5xl md:text-7xl font-light tracking-[0.2em] mb-8 text-white"
            style={{ fontFamily: 'serif' }}
          >
            SIMPLICIDAD
          </h2>
          <p className="text-sm tracking-[0.3em] text-gray-500 font-light">
            TRES PASOS HACIA LA PERFECCIÓN
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-48">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`grid md:grid-cols-2 gap-16 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                <div className="relative h-[500px] overflow-hidden">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                <div className="relative">
                  {/* Roman Numeral Background */}
                  <span 
                    className="absolute -left-4 -top-8 text-9xl font-light text-white/5"
                    style={{ fontFamily: 'serif' }}
                  >
                    {step.number}
                  </span>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <span className="text-sm tracking-[0.3em] text-gray-500 font-light mb-4 block">
                      PASO {step.number}
                    </span>
                    <h3 
                      className="text-4xl md:text-5xl font-light tracking-[0.2em] mb-8 text-white"
                      style={{ fontFamily: 'serif' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-lg font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksRolex;
