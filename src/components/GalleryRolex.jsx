import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { img, srcSet, dims } from '../utils/img';

const EASE = [0.25, 0.1, 0.25, 1];

// name = archivo en public/images sin extensión (versiones web: npm run images)
const IMAGES = [
  { name: 'camio',                label: 'Ford protegido' },
  { name: 'nave',                 label: 'Corvette protegido' },
  { name: 'utv',                  label: 'UTV protegido' },
  { name: 'nico',                 label: 'Carmotion en uso' },
  { name: '_MG_3136',             label: 'Sistema abierto' },
  { name: 'wa1',                  label: 'Verde — exterior' },
  { name: 'wa2',                  label: 'Instalación urbana' },
  { name: 'wa3',                  label: 'Espacio abierto' },
  { name: 'IMG_20251226_183358',  label: 'Vista interior' },
  { name: 'IMG_20260115_130739',  label: 'Detalle lateral' },
  { name: 'wa9',                  label: 'Cobertor en campo' },
  { name: 'wa4',                  label: 'Instalación residencial' },
  { name: 'wa5',                  label: 'Audi protegido' },
  { name: 'wa6',                  label: 'Vista completa' },
  { name: 'wa7',                  label: 'Despliegue abierto' },
  { name: 'wa8',                  label: 'Verde — jardín' },
  { name: '_MG_3184_1',           label: 'Sistema desplegado' },
  { name: '_MG_3191_1',           label: 'Detalle de anclaje' },
  { name: '_MG_3412_1',           label: 'Vista lateral' },
  { name: '_MG_3134_1',           label: 'Cobertor en uso' },
  { name: '_MG_3249_1',           label: 'Instalación premium' },
].map((im) => {
  const { w, h } = dims(im.name);
  // Proporción real de la foto; las muy verticales (celular 9:20) se limitan a 2:3
  // para que una sola foto no ocupe toda la columna.
  return { ...im, ratio: Math.max(w / h, 2 / 3) };
});

// Masonry balanceado: cada foto va a la columna más corta (según su proporción),
// así las columnas terminan parejas y ninguna foto se recorta.
const splitColumns = (items, cols) => {
  const columns = Array.from({ length: cols }, () => []);
  const heights = Array(cols).fill(0);
  items.forEach((item, i) => {
    const c = heights.indexOf(Math.min(...heights));
    columns[c].push({ ...item, originalIndex: i });
    heights[c] += 1 / item.ratio;
  });
  return columns;
};

// Hook: cantidad de columnas según ancho de pantalla
const useColumnCount = () => {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 1024) setCols(2);
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
          src={img(image.name, 1600)}
          srcSet={srcSet(image.name)}
          sizes="(min-width: 1024px) 1024px, 100vw"
          alt={image.label}
          className="w-full max-h-[80vh] object-contain"
          draggable={false}
        />
        <div className="flex items-center justify-between mt-4 px-1">
          <span className="text-[10px] tracking-[0.4em] text-white/50 font-mono uppercase">
            {image.label}
          </span>
          <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 text-[10px] tracking-[0.4em] text-white/50 hover:text-white font-mono transition-colors duration-200"
      >
        CERRAR ✕
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center border border-white/15 text-white/60 hover:text-white hover:border-white/40 transition-all duration-200"
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
          <span className="block text-[9px] tracking-[0.5em] text-white/45 font-mono mb-4 uppercase">
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

        {/* Stats — social proof */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0, 0, 0.2, 1] }}
          className="flex flex-wrap items-center gap-8 md:gap-16 mb-12 md:mb-16 pb-12 border-b border-white/[0.06]"
        >
          <div>
            <span className="block text-4xl md:text-6xl font-light text-white leading-none">+100</span>
            <span className="block text-[9px] tracking-[0.45em] text-white/45 font-mono mt-2 uppercase">Vehículos protegidos</span>
          </div>
          <div className="w-px h-10 bg-white/[0.08] hidden sm:block" />
          <div>
            <span className="block text-4xl md:text-6xl font-light text-white leading-none">4</span>
            <span className="block text-[9px] tracking-[0.45em] text-white/45 font-mono mt-2 uppercase">Modelos disponibles</span>
          </div>
          <div className="w-px h-10 bg-white/[0.08] hidden sm:block" />
          <div>
            <span className="block text-4xl md:text-6xl font-light text-white leading-none">100%</span>
            <span className="block text-[9px] tracking-[0.45em] text-white/45 font-mono mt-2 uppercase">Garantía incluida</span>
          </div>
        </motion.div>

        {/* Masonry — columnas responsivas */}
        <div className="flex gap-2 md:gap-3 items-start">
          {columns.map((col, colIdx) => (
            <div key={`${cols}-${colIdx}`} className="flex flex-col gap-2 md:gap-3 flex-1 min-w-0">
              {col.map((image, rowIdx) => {
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
                    className="relative overflow-hidden focus:outline-none w-full shrink-0 block bg-white/[0.03]"
                    style={{ aspectRatio: image.ratio }}
                    aria-label={`Ver ${image.label}`}
                  >
                    <motion.img
                      src={img(image.name, 800)}
                      srcSet={srcSet(image.name, [800, 1600])}
                      sizes={cols === 3 ? '(min-width: 1280px) 400px, 33vw' : '50vw'}
                      loading="lazy"
                      decoding="async"
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
