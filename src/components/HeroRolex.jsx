import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroRolex = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const slides = [
    {
      image: '/images/_MG_3235.jpg',
      title: 'CARMOTION',
      subtitle: 'Dedicados a la protección',
    },
    {
      image: '/images/IMG_20250413_135647.jpg',
      title: 'EXCELENCIA',
      subtitle: 'En cada detalle',
    },
    {
      image: '/images/_MG_3233.jpg',
      title: 'PROTECCIÓN TOTAL',
      subtitle: 'Lona de alta densidad para máxima resistencia',
    },
    {
      image: '/images/_MG_3191.jpg',
      title: 'PRECISIÓN',
      subtitle: 'Sistema totalmente hidráulico',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="inicio" className="relative h-screen overflow-hidden bg-black">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slides[currentSlide].image})`,
              filter: 'brightness(0.4)'
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              {/* Label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-[10px] tracking-[0.4em] text-gray-500 mb-6 font-body font-light"
              >
                PROTECCIÓN VEHICULAR PREMIUM
              </motion.p>

              {/* Title */}
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide text-white mb-6 font-display"
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide text-gray-300 font-display"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="mt-12"
              >
                <a 
                  href="#caracteristicas"
                  className="inline-block text-[11px] tracking-[0.2em] border border-white/40 px-10 py-4 text-white hover:bg-white hover:text-black transition-all duration-500 font-body font-light"
                >
                  DESCUBRIR MÁS
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border border-white/30 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div 
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Progress Dots */}
      <div className="absolute bottom-12 right-12 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-500 ${
              index === currentSlide 
                ? 'w-8 h-[2px] bg-white' 
                : 'w-2 h-[2px] bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroRolex;
