import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GOLD = '#C9A84C';
const EASE = [0.25, 0.1, 0.25, 1];

// ID del video de YouTube: lo que viene después de "v=" en la URL
// Ej: https://youtube.com/watch?v=ABC123xyz → "ABC123xyz"
const YOUTUBE_ID = 'FDz7hq8WbdY';
const DURATION = '5:00 MIN';

const FEATURES = [
  { number: '01', title: 'SIN HERRAMIENTAS ESPECIALES', desc: 'Solo lo básico que ya tenés en casa' },
  { number: '02', title: 'PASO A PASO DETALLADO',       desc: 'Cada etapa explicada claramente' },
  { number: '03', title: 'SOPORTE DISPONIBLE',          desc: 'Asistencia por WhatsApp si lo necesitás' },
];

// Esquina decorativa que se "dibuja" al entrar en pantalla
const Corner = ({ className, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.9, delay, ease: EASE }}
    className={`absolute w-12 h-12 md:w-16 md:h-16 z-10 pointer-events-none ${className}`}
    style={{ borderColor: GOLD }}
  />
);

const YouTubeShowcaseRolex = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`);

  return (
    <section id="instalacion" className="relative overflow-hidden py-24 md:py-32 lg:py-40">
      {/* Línea dorada superior (mismo recurso que el footer) */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        className="absolute top-0 inset-x-0 h-px origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66 20%, ${GOLD} 50%, ${GOLD}66 80%, transparent)` }}
      />
      {/* Halo dorado detrás del video */}
      <div
        className="pointer-events-none absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-[1400px] aspect-[2/1]"
        style={{ background: `radial-gradient(50% 50% at 50% 50%, ${GOLD}1f, transparent 70%)` }}
      />
      <div className="relative max-w-6xl mx-auto px-5 md:px-6 lg:px-12">

        {/* Encabezado: mismo patrón que la galería (etiqueta mono + título + línea) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="block text-[10px] tracking-[0.5em] font-mono mb-4 uppercase" style={{ color: GOLD }}>
            Instructivo de armado
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white font-display">
            INSTALACIÓN SIMPLE
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0, 0, 0.2, 1] }}
            className="h-px w-24 mx-auto mt-6 mb-6"
            style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)` }}
          />
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed font-body">
            Mirá el video paso a paso y descubrí lo fácil que es armar tu CARMOTION.
            En minutos tenés tu vehículo protegido.
          </p>
        </motion.div>

        {/* Video */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, delay: 0.1, ease: EASE }}
          className="relative"
        >
          <Corner className="-top-3 -left-3 md:-top-4 md:-left-4 border-t border-l" delay={0.3} />
          <Corner className="-top-3 -right-3 md:-top-4 md:-right-4 border-t border-r" delay={0.4} />
          <Corner className="-bottom-3 -left-3 md:-bottom-4 md:-left-4 border-b border-l" delay={0.5} />
          <Corner className="-bottom-3 -right-3 md:-bottom-4 md:-right-4 border-b border-r" delay={0.6} />

          <div
            className="relative aspect-video bg-black overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
            style={{ outline: `1px solid ${GOLD}40`, outlineOffset: 0 }}
          >
            <AnimatePresence mode="wait">
              {!isPlaying ? (
                <motion.button
                  key="poster"
                  onClick={() => setIsPlaying(true)}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.45, ease: EASE }}
                  className="group absolute inset-0 w-full h-full cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
                  aria-label="Reproducir el instructivo de armado"
                >
                  {/* Miniatura real del video, con zoom lento al pasar el mouse */}
                  <img
                    src={thumb}
                    onError={() => setThumb(`https://i.ytimg.com/vi/${YOUTUBE_ID}/hqdefault.jpg`)}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-[1.04] transition-transform duration-[1400ms] ease-out"
                  />
                  {/* Viñeta para que el botón y los textos se lean */}
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.6)_100%)]" />

                  {/* Botón play con anillo que respira */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="relative">
                      <motion.span
                        className="absolute inset-0 rounded-full border"
                        style={{ borderColor: `${GOLD}99` }}
                        animate={{ scale: [1, 1.45], opacity: [0.7, 0] }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <div
                        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-[0_0_40px_rgba(201,168,76,0.35)] group-hover:shadow-[0_0_60px_rgba(201,168,76,0.6)]"
                        style={{ background: GOLD }}
                      >
                        <svg
                          className="w-7 h-7 md:w-8 md:h-8 ml-1 text-black"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    <p
                      className="mt-6 px-4 py-2 bg-black/60 backdrop-blur-sm border text-[10px] tracking-[0.35em] font-mono opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ color: GOLD, borderColor: `${GOLD}40` }}
                    >
                      REPRODUCIR VIDEO
                    </p>
                  </div>

                  {/* Duración */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-white/15">
                    <span className="text-white/80 text-[10px] tracking-[0.2em] font-mono">{DURATION}</span>
                  </div>
                </motion.button>
              ) : (
                <motion.iframe
                  key="player"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                  title="CARMOTION — Instructivo de armado"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Características */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-16 md:mt-20 border-t" style={{ borderColor: `${GOLD}40` }}>
          {FEATURES.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: EASE }}
              className={`group text-center px-6 py-10 ${i > 0 ? 'md:border-l border-t md:border-t-0 border-white/[0.08]' : ''}`}
            >
              <span
                className="block text-3xl font-light font-display transition-opacity duration-500 opacity-70 group-hover:opacity-100"
                style={{ color: GOLD }}
              >
                {item.number}
              </span>
              <h4 className="text-[10px] tracking-[0.25em] text-white mt-5 mb-3 font-light font-body">{item.title}</h4>
              <p className="text-gray-400 text-sm font-light font-body">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouTubeShowcaseRolex;
