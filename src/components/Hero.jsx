import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    '/images/_MG_3353.jpg',
    '/images/_MG_3271.jpg',
    '/images/_MG_3169.jpg',
    '/images/_MG_3262.jpg',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section id="inicio" className="relative h-screen overflow-hidden mt-20">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentSlide]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/80 to-dark-900/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Protección Total.
              <br />
              <span className="text-blue-500">Diseño Invisible.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Garaje portátil de aluminio aeronáutico. Protege tu inversión contra granizo, 
              lluvia, sol extremo y vandalismo. Instalación en minutos, protección de por vida.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#precios" className="btn-primary inline-block">
                Ver Precios
              </a>
              <a href="#como-funciona" className="btn-secondary inline-block">
                Cómo Funciona
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 slider-dot ${
              index === currentSlide 
                ? 'w-10 bg-white active' 
                : 'w-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
