import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// ─── Easing curves intencionalmente "watchmaker" ───────────────────────────────
const EASE_LUXURY = [0.25, 0.1, 0.25, 1];
const EASE_DECELERATE = [0, 0, 0.2, 1];
const SLIDE_DURATION = 0.9;
const AUTOPLAY_MS = 4500;

const GalleryRolex = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection]     = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(new Set());
  const [isInView, setIsInView]       = useState(false);
  const [isPaused, setIsPaused]       = useState(false);
  const [cornerKey, setCornerKey]     = useState(0); // para reanimar corners
  const sectionRef   = useRef(null);
  const autoplayRef  = useRef(null);
  const progressRef  = useRef(null);
  const [progress, setProgress] = useState(0);

  const images = [
    '/images/_MG_3152_1.jpg',
    '/images/_MG_3184_1.jpg',
    '/images/_MG_3191_1.jpg',
    '/images/_MG_3412_1.jpg',
    '/images/_MG_3134_1.jpg',
    '/images/_MG_3249_1.jpg',
  ];

  // ─── Intersection Observer ─────────────────────────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ─── Preload imágenes adyacentes ───────────────────────────────────────────
  useEffect(() => {
    if (!isInView) return;
    const toPreload = [
      currentIndex,
      (currentIndex + 1) % images.length,
      (currentIndex - 1 + images.length) % images.length,
    ];
    toPreload.forEach(idx => {
      if (imagesLoaded.has(idx)) return;
      const img = new Image();
      img.src = images[idx];
      img.onload = () => setImagesLoaded(prev => new Set([...prev, idx]));
    });
  }, [currentIndex, isInView]);

  // ─── Paginar ───────────────────────────────────────────────────────────────
  const paginate = useCallback((dir) => {
    setDirection(dir);
    setCurrentIndex(prev => (prev + dir + images.length) % images.length);
    setCornerKey(k => k + 1);
    setProgress(0);
  }, [images.length]);

  // ─── Autoplay con barra de progreso ───────────────────────────────────────
  useEffect(() => {
    if (!isInView || isPaused) {
      clearInterval(autoplayRef.current);
      clearInterval(progressRef.current);
      return;
    }

    setProgress(0);
    const TICK = 50;

    progressRef.current = setInterval(() => {
      setProgress(p => {
        const next = p + (TICK / AUTOPLAY_MS) * 100;
        return next >= 100 ? 100 : next;
      });
    }, TICK);

    autoplayRef.current = setTimeout(() => {
      paginate(1);
    }, AUTOPLAY_MS);

    return () => {
      clearInterval(progressRef.current);
      clearTimeout(autoplayRef.current);
    };
  }, [currentIndex, isInView, isPaused, paginate]);

  // ─── Variantes de slide: cross-dissolve + drift suave ────────────────────
  // Sin scale raro. La imagen nueva entra desde un leve desplazamiento
  // y hace fade in mientras la anterior sale con fade out.
  // Mucho más limpio que el push con scale.
  const slideVariants = {
    enter: (dir) => ({
      opacity: 0,
      x: dir > 0 ? 40 : -40,
      filter: 'brightness(0.6)',
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: 'brightness(1)',
      transition: {
        duration: SLIDE_DURATION,
        ease: EASE_DECELERATE,
      },
    },
    exit: (dir) => ({
      opacity: 0,
      x: dir > 0 ? -40 : 40,
      filter: 'brightness(0.6)',
      transition: {
        duration: SLIDE_DURATION * 0.6,
        ease: EASE_LUXURY,
      },
    }),
  };

  // ─── Thumbnail indicator activo: línea deslizante ────────────────────────
  const thumbRef = useRef(null);

  return (
    <section
      id="galeria"
      ref={sectionRef}
      className="relative bg-[#080808] py-24 md:py-36 overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* ── Grain overlay sutil ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-12">

        {/* ── Header ───────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE_DECELERATE }}
          className="mb-14 flex flex-col items-start gap-2"
        >
          <span className="text-[9px] tracking-[0.5em] text-white/25 font-mono uppercase">
            Galería — Carmotion
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] text-white leading-none">
            En detalle.
          </h2>
          {/* Línea divisora animada */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: EASE_DECELERATE, delay: 0.2 }}
            style={{ originX: 0 }}
            className="h-px w-24 bg-white/20 mt-1"
          />
        </motion.div>

        {/* ── Carrusel principal ───────────────────────────────────────── */}
        <div className="relative">

          {/* Contenedor de imagen con aspect ratio fijo */}
          <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#111]">

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                {imagesLoaded.has(currentIndex) ? (
                  <img
                    src={images[currentIndex]}
                    alt={`CARMOTION — imagen ${currentIndex + 1} de ${images.length}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  // Skeleton luxury: shimmer sobre negro
                  <div className="w-full h-full bg-[#111] overflow-hidden relative">
                    <motion.div
                      className="absolute inset-0"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
                      }}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* ── Corner brackets — se reaniman en cada slide ────────── */}
            <CornerBrackets key={cornerKey} />

            {/* ── Contador de imagen (top right) ─────────────────────── */}
            <div className="absolute top-4 right-5 z-20">
              <AnimatePresence mode="wait">
                <motion.span
                  key={currentIndex}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.4, ease: EASE_LUXURY }}
                  className="text-[10px] tracking-[0.3em] text-white/40 font-mono tabular-nums"
                >
                  {String(currentIndex + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* ── Botones de navegación ───────────────────────────────── */}
            <NavButton
              direction="prev"
              onClick={() => paginate(-1)}
              className="left-4 md:left-6"
            />
            <NavButton
              direction="next"
              onClick={() => paginate(1)}
              className="right-4 md:right-6"
            />
          </div>

          {/* ── Barra de progreso autoplay ──────────────────────────── */}
          <div className="h-px w-full bg-white/8 mt-0 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-white/50"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0, ease: 'linear' }}
            />
          </div>
        </div>

        {/* ── Thumbnails con indicador activo ─────────────────────────── */}
        <div ref={thumbRef} className="flex gap-2 md:gap-3 mt-6 items-end">
          {images.map((image, idx) => {
            const isActive = idx === currentIndex;
            return (
              <motion.button
                key={idx}
                onClick={() => {
                  const dir = idx > currentIndex ? 1 : -1;
                  setDirection(dir);
                  setCurrentIndex(idx);
                  setCornerKey(k => k + 1);
                  setProgress(0);
                }}
                whileTap={{ scale: 0.96 }}
                className="relative flex-1 overflow-hidden focus:outline-none"
                style={{ aspectRatio: '4/3' }}
                aria-label={`Ver imagen ${idx + 1}`}
                aria-current={isActive ? 'true' : 'false'}
              >
                {/* Thumbnail image */}
                <motion.div
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1 : 0.97,
                  }}
                  transition={{ duration: 0.5, ease: EASE_LUXURY }}
                  className="w-full h-full"
                >
                  {isInView ? (
                    <img
                      src={image}
                      alt=""
                      aria-hidden="true"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/5" />
                  )}
                </motion.div>

                {/* Borde activo animado */}
                <motion.div
                  className="absolute inset-0 border border-white"
                  animate={{ opacity: isActive ? 0.6 : 0 }}
                  transition={{ duration: 0.4, ease: EASE_LUXURY }}
                />

                {/* Línea activa inferior */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-white"
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE_DECELERATE }}
                  style={{ originX: 0 }}
                />
              </motion.button>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// ─── Corner Brackets: se dibujan al entrar cada slide ─────────────────────────
const CornerBrackets = () => {
  const corners = [
    { className: 'top-0 left-0', style: { borderTop: '1px solid', borderLeft: '1px solid' } },
    { className: 'top-0 right-0', style: { borderTop: '1px solid', borderRight: '1px solid' } },
    { className: 'bottom-0 left-0', style: { borderBottom: '1px solid', borderLeft: '1px solid' } },
    { className: 'bottom-0 right-0', style: { borderBottom: '1px solid', borderRight: '1px solid' } },
  ];

  return (
    <>
      {corners.map((corner, i) => (
        <motion.div
          key={i}
          className={`absolute z-20 w-8 h-8 md:w-10 md:h-10 pointer-events-none ${corner.className}`}
          style={{ ...corner.style, borderColor: 'rgba(255,255,255,0.35)' }}
          initial={{ opacity: 0, scale: 1.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            delay: 0.1 + i * 0.06,
            ease: EASE_DECELERATE,
          }}
        />
      ))}
    </>
  );
};

// ─── NavButton ────────────────────────────────────────────────────────────────
const NavButton = ({ direction, onClick, className }) => {
  const isNext = direction === 'next';

  return (
    <motion.button
      onClick={onClick}
      whileHover="hover"
      whileTap={{ scale: 0.92 }}
      initial="rest"
      animate="rest"
      className={`absolute z-20 top-1/2 -translate-y-1/2 ${className}
        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center
        bg-black/20 backdrop-blur-md border border-white/15
        focus:outline-none focus-visible:ring-1 focus-visible:ring-white/50`}
      aria-label={isNext ? 'Siguiente imagen' : 'Imagen anterior'}
    >
      {/* Fondo hover */}
      <motion.div
        className="absolute inset-0 bg-white"
        variants={{ rest: { opacity: 0 }, hover: { opacity: 0.08 } }}
        transition={{ duration: 0.25 }}
      />

      {/* Flecha — se desplaza levemente en hover */}
      <motion.svg
        className="w-4 h-4 md:w-5 md:h-5 text-white relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        variants={{
          rest:  { x: 0, opacity: 0.6 },
          hover: { x: isNext ? 3 : -3, opacity: 1 },
        }}
        transition={{ duration: 0.25, ease: EASE_LUXURY }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d={isNext ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
        />
      </motion.svg>
    </motion.button>
  );
};

export default GalleryRolex;