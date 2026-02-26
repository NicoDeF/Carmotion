import { useState } from 'react';
import { motion } from 'framer-motion';

const YouTubeShowcaseRolex = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  // IMPORTANTE: Reemplazar con el ID real del video de YouTube
  // El ID es lo que viene después de "v=" en la URL
  // Ejemplo: https://youtube.com/watch?v=ABC123xyz -> el ID es "ABC123xyz"
  const youtubeId = 'FDz7hq8WbdY';

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const features = [
    { number: '01', title: 'SIN HERRAMIENTAS ESPECIALES', desc: 'Solo lo básico que ya tenés en casa' },
    { number: '02', title: 'PASO A PASO DETALLADO', desc: 'Cada etapa explicada claramente' },
    { number: '03', title: 'SOPORTE DISPONIBLE', desc: 'Asistencia por WhatsApp si lo necesitás' },
  ];

  return (
    <section id="instalacion" className="bg-black py-24 md:py-32 lg:py-40 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] text-gray-500 font-light mb-4 block font-body">
            INSTRUCTIVO DE ARMADO
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white mb-6 font-display">
            INSTALACIÓN SIMPLE
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed font-body">
            Mirá el video paso a paso y descubrí lo fácil que es armar tu CARMOTION.
            En minutos tenés tu vehículo protegido.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative corners */}
          <div className="absolute -top-4 -left-4 w-16 h-16 border-t border-l border-white/20 z-10" />
          <div className="absolute -top-4 -right-4 w-16 h-16 border-t border-r border-white/20 z-10" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 border-b border-l border-white/20 z-10" />
          <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b border-r border-white/20 z-10" />

          {/* Video wrapper */}
          <div className="relative aspect-video bg-gray-900 overflow-hidden">
            {!isPlaying ? (
              // Placeholder con botón de play
              <div 
                onClick={handlePlay}
                className="absolute inset-0 cursor-pointer group"
              >
                {/* Thumbnail placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />
                
                {/* Overlay con patrón sutil */}
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                  }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-xl scale-150 group-hover:bg-white/30 transition-all duration-500" />
                    
                    {/* Button */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 border-2 border-white/80 rounded-full flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover:bg-white/10 transition-all duration-300">
                      <svg 
                        className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </motion.div>
                  
                  <p className="mt-6 text-white/60 text-[11px] tracking-[0.2em] font-light font-body">
                    CLICK PARA REPRODUCIR
                  </p>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-6 right-6 bg-black/70 backdrop-blur-sm px-4 py-2 border border-white/20">
                  <span className="text-white/80 text-[10px] tracking-[0.15em] font-light font-body">
                    5:00 MIN
                  </span>
                </div>
              </div>
            ) : (
              // YouTube iframe
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title="CARMOTION - Instructivo de Armado"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            )}
          </div>
        </motion.div>

        {/* Features below video */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {features.map((item, index) => (
            <div key={index} className="text-center py-6 border-t border-white/10">
              <span className="text-3xl font-light text-white/20 font-display">
                {item.number}
              </span>
              <h4 className="text-[10px] tracking-[0.2em] text-white mt-4 mb-2 font-light font-body">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm font-light font-body">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default YouTubeShowcaseRolex;
