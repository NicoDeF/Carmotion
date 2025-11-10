import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryRolex = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Imágenes originales
  const images = [
    '/images/_MG_3152.jpg',
    '/images/_MG_3184.jpg',
    '/images/_MG_3191.jpg',
    '/images/_MG_3412.jpg',
    '/images/_MG_3271.jpg',
    '/images/_MG_3249.jpg',
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = images.length - 1;
      if (nextIndex >= images.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <section id="galeria" className="relative bg-black py-24 md:py-32 lg:py-48 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black" />
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        {/* Carousel Container */}
        <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {/* Main Image - Sin textos ni overlays */}
              <div className="relative w-full max-w-5xl aspect-video group">
                <motion.img
                  src={images[currentIndex]}
                  alt={`Imagen ${currentIndex + 1}`}
                  className="w-full h-full object-cover shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Solo esquinas decorativas minimalistas */}
                <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-white/30" />
                <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/30" />
                <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-white/30" />
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-white/30" />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            onClick={() => paginate(-1)}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-white/40 hover:border-white bg-black/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => paginate(1)}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-white/40 hover:border-white bg-black/30 backdrop-blur-sm hover:bg-black/60 transition-all duration-300"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-3 mt-12 flex-wrap">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-16 h-16 md:w-20 md:h-20 overflow-hidden transition-all duration-300 border ${
                index === currentIndex
                  ? 'border-white border-2 opacity-100'
                  : 'border-white/20 opacity-40 hover:opacity-80'
              }`}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>

        {/* Counter minimalista */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-8 text-white/40 text-sm tracking-[0.3em] font-light"
        >
          {currentIndex + 1} / {images.length}
        </motion.div>
      </div>
    </section>
  );
};

export default GalleryRolex;