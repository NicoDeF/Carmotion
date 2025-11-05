import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryRolex = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = [
    { src: '/images/_MG_3130.jpg', title: 'ELEGANCIA' },
    { src: '/images/_MG_3134.jpg', title: 'PRECISIÓN' },
    { src: '/images/_MG_3169.jpg', title: 'INNOVACIÓN' },
    { src: '/images/_MG_3184.jpg', title: 'INGENIERÍA' },
    { src: '/images/_MG_3262.jpg', title: 'PERFECCIÓN' },
    { src: '/images/_MG_3296.jpg', title: 'EXCELENCIA' },
  ];

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="galeria" className="bg-black py-32 lg:py-48">
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
            COLECCIÓN
          </h2>
          <p className="text-sm tracking-[0.3em] text-gray-500 font-light">
            CADA ÁNGULO REVELA PERFECCIÓN
          </p>
        </motion.div>

        {/* Main Image Display */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[70vh] cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={images[currentImage].src}
                alt={images[currentImage].title}
                className="w-full h-full object-cover"
              />
              
              {/* Title Overlay */}
              <div className="absolute bottom-12 left-12">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-3xl font-light tracking-[0.3em] text-white"
                  style={{ fontFamily: 'serif' }}
                >
                  {images[currentImage].title}
                </motion.h3>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors font-light"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors font-light"
          >
            ›
          </button>

          {/* Progress Indicator */}
          <div className="absolute bottom-12 right-12 flex gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`transition-all duration-500 ${
                  index === currentImage 
                    ? 'w-12 h-px bg-white' 
                    : 'w-8 h-px bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-6 gap-4 mt-12">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative h-24 overflow-hidden transition-all duration-300 ${
                index === currentImage 
                  ? 'opacity-100 border-2 border-white' 
                  : 'opacity-40 hover:opacity-70'
              }`}
            >
              <img
                src={image.src}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center cursor-pointer"
          >
            <button
              className="absolute top-8 right-8 text-white text-5xl hover:text-gray-300 transition-colors"
              onClick={() => setLightboxOpen(false)}
            >
              ×
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={images[currentImage].src}
              alt={images[currentImage].title}
              className="max-w-[90%] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryRolex;
