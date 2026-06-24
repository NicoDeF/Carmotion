import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EASE = [0.25, 0.1, 0.25, 1];

const IMAGES = [
  { src: '/images/camio.png',                label: 'Ford protegido' },
  { src: '/images/nave.png',                 label: 'Corvette protegido' },
  { src: '/images/utv.jpeg',                 label: 'UTV protegido' },
  { src: '/images/nico.jpeg',                 label: 'Carmotion en uso' },
  { src: '/images/_MG_3136.jpg',             label: 'Sistema abierto' },
  { src: '/images/wa1.png',                  label: 'Verde — exterior' },
  { src: '/images/wa2.png',                  label: 'Instalación urbana' },
  { src: '/images/wa3.png',                  label: 'Espacio abierto' },
  { src: '/images/IMG_20251226_183358.jpg',   label: 'Vista interior' },
  { src: '/images/IMG_20260115_130739.jpg',   label: 'Detalle lateral' },
  { src: '/images/wa9.jpg',                  label: 'Cobertor en campo' },
  { src: '/images/wa4.jpeg',                 label: 'Instalación residencial' },
  { src: '/images/wa5.jpeg',                 label: 'Audi protegido' },
  { src: '/images/wa6.jpeg',                 label: 'Vista completa' },
  { src: '/images/wa7.jpeg',                 label: 'Despliegue abierto' },
  { src: '/images/wa8.jpeg',                 label: 'Verde — jardín' },
  { src: '/images/_MG_3184_1.jpg',           label: 'Sistema desplegado' },
  { src: '/images/_MG_3191_1.jpg',           label: 'Detalle de anclaje' },
  { src: '/images/_MG_3412_1.jpg',           label: 'Vista lateral' },
  { src: '/images/_MG_3134_1.jpg',           label: 'Cobertor en uso' },
  { src: '/images/_MG_3249_1.jpg',           label: 'Instalación premium' },
];

// Distribuye imágenes en columnas para efecto masonry real
const splitColumns = (items, cols) => {
  const columns = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => {
    columns[i % cols].push({ ...item, originalIndex: i });
  });
  return columns;
};

// Alturas variables por layout — asimetría visual adaptada a cada breakpoint
const HEIGHTS_3COL = [
  [260, 340, 200, 300, 220, 360, 240],
  [320, 200, 300, 240, 360, 220, 280],
  [200, 300, 360, 220, 280, 320, 240],
];

const HEIGHTS_2COL = [
  [240, 300, 200, 280, 220, 320, 260, 200, 280, 240],
  [280, 220, 300, 240, 320, 200, 260, 280, 220, 300],
];

// En mobile 1 columna usamos aspect-ratio en vez de alturas fijas
// para que las fotos se vean completas

// Hook: cantidad de columnas según ancho de pantalla
const useColumnCount = () => {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCols(1);
      else if (w < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return cols;
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ image, index, total, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft')  onPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="fixed inset-0 z-[999] flex items-center justify-center"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ duration: 0.4, ease: [0.32, 0, 0.15, 1] }}
        className="relative z-10 max-w-5xl w-full mx-4 md:mx-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={image.src}
          alt={image.label}
          className="w-full max-h-[80vh] object-contain"
          draggable={false}
        />
        <div className="flex items-center justify-between mt-4 px-1">
          <span className="text-[10px] tracking-[0.4em] text-white/30 font-mono uppercase">
            {image.label}
          </span>
          <span className="text-[10px] tracking-[0.3em] text-white/20 font-mono tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 text-[10px] tracking-[0.4em] text-white/30 hover:text-white font-mono transition-colors duration-200"
      >
        CERRAR ✕
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/15 text-white/40 hover:text-white hover:border-white/40 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </motion.div>
  );
};

// ─── GalleryRolex ─────────────────────────────────────────────────────────────
const GalleryRolex = () => {
  const [selected, setSelected] = useState(null);
  const cols = useColumnCount();

  const open  = useCallback((i) => setSelected(i), []);
  const close = useCallback(() => setSelected(null), []);
  const prev  = useCallback(() => setSelected(i => (i - 1 + IMAGES.length) % IMAGES.length), []);
  const next  = useCallback(() => setSelected(i => (i + 1) % IMAGES.length), []);

  const columns = useMemo(() => splitColumns(IMAGES, cols), [cols]);

  // Seleccionar alturas según columnas
  const heights = cols === 3 ? HEIGHTS_3COL : HEIGHTS_2COL;

  return (
    <section id="galeria" className="py-16 md:py-24 lg:py-36">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
          className="mb-10 md:mb-16"
        >
          <span className="block text-[9px] tracking-[0.5em] text-white/25 font-mono mb-4 uppercase">
            Galería — CARMOTION
          </span>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight text-white leading-none"
            style={{ fontFamily: 'serif' }}
          >
            En detalle.
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0, 0, 0.2, 1], delay: 0.2 }}
            style={{ originX: 0 }}
            className="h-px w-20 bg-white/20 mt-5"
          />
        </motion.div>

        {/* Masonry — columnas responsivas */}
        <div className="flex gap-2 md:gap-3 items-start">
          {columns.map((col, colIdx) => (
            <div key={`${cols}-${colIdx}`} className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
              {col.map((image, rowIdx) => {
                // En 1 columna (mobile): aspect-ratio en vez de altura fija
                const isMobile = cols === 1;
                const h = isMobile ? undefined : heights[colIdx % cols][rowIdx % heights[0].length];

                return (
                  <motion.button
                    key={image.originalIndex}
                    onClick={() => open(image.originalIndex)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{
                      duration: 0.75,
                      delay: colIdx * 0.08 + rowIdx * 0.06,
                      ease: [0, 0, 0.2, 1],
                    }}
                    whileHover="hover"
                    className="relative overflow-hidden focus:outline-none w-full shrink-0 block"
                    style={isMobile ? { aspectRatio: '4/3' } : { height: `${h}px` }}
                    aria-label={`Ver ${image.label}`}
                  >
                    <motion.img
                      src={image.src}
                      alt={image.label}
                      className="absolute inset-0 w-full h-full object-cover"
                      draggable={false}
                      variants={{ hover: { scale: 1.05 } }}
                      transition={{ duration: 0.6, ease: EASE }}
                    />

                    {/* Overlay hover */}
                    <motion.div
                      className="absolute inset-0 bg-black/55 flex items-end p-3 md:p-4"
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-[9px] tracking-[0.4em] text-white/70 font-mono uppercase leading-relaxed">
                        {image.label}
                      </span>
                    </motion.div>

                    {/* Ícono expandir */}
                    <motion.div
                      className="absolute top-3 right-3"
                      initial={{ opacity: 0 }}
                      variants={{ hover: { opacity: 1 } }}
                      transition={{ duration: 0.25 }}
                    >
                      <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            image={IMAGES[selected]}
            index={selected}
            total={IMAGES.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default GalleryRolex;
