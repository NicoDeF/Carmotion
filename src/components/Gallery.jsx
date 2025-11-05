import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const images = [
    '/images/_MG_3130.jpg',
    '/images/_MG_3134.jpg',
    '/images/_MG_3169.jpg',
    '/images/_MG_3184.jpg',
    '/images/_MG_3262.jpg',
    '/images/_MG_3296.jpg',
    '/images/_MG_3193.jpg',
    '/images/_MG_3194.jpg',
    '/images/_MG_3189.jpg',
  ];

  return (
    <section id="galeria" className="bg-dark-900 py-20 lg:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-3">
            GALERÍA
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Vélo en Acción
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Imágenes reales de CARMOTION protegiendo vehículos premium en Argentina
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setLightboxImage(image)}
              className="relative h-80 rounded-2xl overflow-hidden cursor-pointer group"
            >
              <img
                src={image}
                alt={`CARMOTION en uso ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <span className="text-white font-semibold bg-blue-500 px-6 py-2 rounded-full">
                  Click para ampliar 🔍
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-8 right-8 text-white text-5xl hover:text-blue-500 transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              ×
            </motion.button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              src={lightboxImage}
              alt="Imagen ampliada"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
