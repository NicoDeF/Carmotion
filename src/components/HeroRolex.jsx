import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCENES = [
  {
    id: "intro",
    type: "video",
    src: "/videos/CarMOtion_01.mp4",
    label: "PROTECCIÓN VEHICULAR PREMIUM",
    heading: ["CARMOTION"],
    sub: "Dedicados a la protección",
    cta: { label: "DESCUBRIR MÁS", href: "#tecnologia" },
    align: "center",
  },
  {
    id: "brand",
    type: "image",
    src: "/images/_MG_3189.jpg",
    label: "PROTECCIÓN PREMIUM",
    heading: ["Acero y", "resistencia."],
    sub: "Estructura de acero inoxidable y lona Oxford 600D.\nDiseñado para proteger su vehículo de todo.",
    cta: null,
    align: "left",
  },
  {
    id: "paso-1",
    type: "image",
    src: "/images/_MG_3353_1.jpg",
    label: "PASO I",
    heading: ["Posicionar."],
    sub: "Estacione su vehículo en la ubicación deseada.\nCARMOTION se adapta a cualquier superficie.",
    cta: null,
    align: "left",
  },
  {
    id: "paso-2",
    type: "image",
    src: "/images/_MG_3347_1.jpg",
    label: "PASO II",
    heading: ["Desplegar."],
    sub: "El sistema despliega el cobertor en minutos,\nsin herramientas ni esfuerzo.",
    cta: null,
    align: "left",
  },
  {
    id: "paso-3",
    type: "image",
    src: "/images/_MG_3338_1_1.jpg",
    label: "PASO III",
    heading: ["Proteger."],
    sub: "Protección total activada. Resistencia certificada\ncontra granizo, viento y rayos UV.",
    cta: null,
    align: "left",
  },
  {
    id: "cta",
    type: "video",
    src: "/videos/Video_03-1.mp4",
    label: "CARMOTION",
    heading: ["Su vehículo", "lo merece."],
    sub: null,
    cta: { label: "SOLICITAR INFORMACIÓN", href: "#contacto" },
    align: "center",
  },
];

const TOTAL = SCENES.length;

// FIX: Hook para VH_PER_SCENE adaptativo — en mobile el gesto de scroll
// es más corto, así que cada escena necesita más vh de recorrido
const useSceneHeight = () => {
  const [vh, setVh] = useState(50);

  useEffect(() => {
    const update = () => {
      setVh(window.innerWidth < 768 ? 70 : 50);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return vh;
};

// ─── Escena individual ────────────────────────────────────────────────────────
const Scene = ({ scene, isActive }) => {
  const videoRef = useRef(null);
  const isVideo  = scene.type === "video";
  const isCenter = scene.align === "center";

  useEffect(() => {
    const vid = videoRef.current;
    if (!isVideo || !vid) return;

    if (isActive) {
      const t = setTimeout(() => {
        vid.play().catch(() => {});
      }, 200);
      return () => clearTimeout(t);
    } else {
      vid.pause();
      vid.currentTime = 0;
    }
  }, [isActive, isVideo]);

  return (
    <div className="absolute inset-0" style={{ overflow: "hidden", borderRadius: "inherit" }}>

      {/* MEDIA */}
      <div className="absolute inset-0">
        {isVideo ? (
          <video
            ref={videoRef}
            src={scene.src}
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.52) contrast(1.06)" }}
          />
        ) : (
          <img
            src={scene.src}
            alt={scene.heading.join(" ")}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.52) contrast(1.04)" }}
            draggable={false}
          />
        )}
      </div>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isCenter
            ? "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      {/* TEXTO — FIX: padding más generoso en mobile para no pegarse al borde */}
      <div
        className={`absolute z-10 ${
          isCenter
            ? "inset-0 flex flex-col items-center justify-center text-center px-6 md:px-8"
            : "bottom-12 md:bottom-24 left-6 md:left-16 lg:left-24 right-6 md:right-auto max-w-2xl"
        }`}
      >
        {/* Eyebrow */}
        <motion.span
          key={`label-${scene.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="block text-[9px] md:text-[10px] tracking-[0.5em] text-white/35 font-mono mb-3 md:mb-5 uppercase"
        >
          {scene.label}
        </motion.span>

        {/* Heading */}
        {scene.heading.map((line, i) => (
          <motion.h1
            key={`h-${scene.id}-${i}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.18 + i * 0.13,
              ease: [0, 0, 0.2, 1],
            }}
            className="block font-light tracking-tight text-white leading-[1.03]"
            style={{
              fontSize: isCenter
                ? "clamp(2.2rem, 9vw, 8rem)"
                : "clamp(2rem, 6vw, 5.5rem)",
              textShadow: "0 2px 32px rgba(0,0,0,0.5)",
            }}
          >
            {line}
          </motion.h1>
        ))}

        {/* Divisor */}
        <motion.div
          key={`div-${scene.id}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.0, delay: 0.42, ease: [0, 0, 0.2, 1] }}
          style={{ originX: isCenter ? 0.5 : 0 }}
          className={`h-px w-12 bg-white/25 ${isCenter ? "mx-auto my-5 md:my-6" : "my-4 md:my-5"}`}
        />

        {/* Subtítulo */}
        {scene.sub && (
          <motion.p
            key={`sub-${scene.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-gray-400 text-xs md:text-base font-light leading-relaxed whitespace-pre-line"
          >
            {scene.sub}
          </motion.p>
        )}

        {/* CTA — FIX: botón más grande en mobile para mejor touch target */}
        {scene.cta && (
          <motion.div
            key={`cta-${scene.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62 }}
            className={isCenter ? "mt-8 md:mt-10" : "mt-6 md:mt-7"}
          >
            <motion.a
              href={scene.cta.href}
              whileHover={{ backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="inline-block border border-white/40 text-white text-[10px] tracking-[0.3em] font-mono px-8 md:px-10 py-4 transition-colors duration-300"
            >
              {scene.cta.label}
            </motion.a>
          </motion.div>
        )}
      </div>

      {/* Scroll hint — solo en la primera escena */}
      {scene.id === "intro" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[8px] tracking-[0.4em] text-white/25 font-mono">SCROLL</span>
            <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

// ─── Indicador lateral — FIX: oculto en mobile para no tapar contenido ───────
const SideIndicator = ({ activeIndex }) => (
  <div className="hidden md:flex fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-[200] flex-col gap-3 pointer-events-none">
    {SCENES.map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width:           i === activeIndex ? 20 : 3,
          height:          2,
          backgroundColor: i === activeIndex
            ? "rgba(255,255,255,0.9)"
            : "rgba(255,255,255,0.2)",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-full"
      />
    ))}
  </div>
);

// ─── Principal ────────────────────────────────────────────────────────────────
const HeroRolex = () => {
  const containerRef             = useRef(null);
  const [activeIndex, setActive] = useState(0);
  const [direction,  setDir]     = useState(1);
  const vhPerScene               = useSceneHeight();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const top        = container.getBoundingClientRect().top;
      const scrolledPx = -(top);
      const sceneH     = (vhPerScene / 100) * window.innerHeight;
      const raw        = scrolledPx / sceneH;
      const next       = Math.max(0, Math.min(TOTAL - 1, Math.floor(raw)));

      setActive(prev => {
        if (next !== prev) setDir(next > prev ? 1 : -1);
        return next;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [vhPerScene]);

  const variants = {
    enter: (dir) => ({
      y:            dir > 0 ? "100%" : "-5%",
      scale:        dir > 0 ? 1.0    : 0.95,
      borderRadius: dir > 0 ? "14px 14px 0 0" : "0px",
      opacity:      dir > 0 ? 1      : 0.6,
      zIndex:       20,
    }),
    center: {
      y:            "0%",
      scale:        1,
      borderRadius: "0px",
      opacity:      1,
      zIndex:       20,
      transition: {
        y:            { duration: 0.5,  ease: [0.32, 0, 0.15, 1] },
        scale:        { duration: 0.5,  ease: [0.32, 0, 0.15, 1] },
        borderRadius: { duration: 0.35, ease: "easeOut" },
        opacity:      { duration: 0.25 },
      },
    },
    exit: (dir) => ({
      y:            dir > 0 ? "-5%" : "100%",
      scale:        dir > 0 ? 0.95 : 1.0,
      borderRadius: dir > 0 ? "0px" : "14px 14px 0 0",
      opacity:      dir > 0 ? 0    : 1,
      zIndex:       10,
      transition: {
        y:            { duration: 0.5,  ease: [0.32, 0, 0.15, 1] },
        scale:        { duration: 0.5,  ease: [0.32, 0, 0.15, 1] },
        opacity:      { duration: 0.25 },
      },
    }),
  };

  return (
    <>
      <section
        ref={containerRef}
        id="inicio"
        className="relative bg-black"
        style={{ height: `${TOTAL * vhPerScene + 100}vh` }}
      >
        <div
          className="sticky top-0 overflow-hidden bg-black"
          style={{ height: "100vh" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
              style={{ willChange: "transform, opacity, border-radius" }}
            >
              <Scene scene={SCENES[activeIndex]} isActive={true} />
            </motion.div>
          </AnimatePresence>

          {/* Counter — FIX: posición adaptada en mobile */}
          <div className="absolute top-6 right-6 md:top-10 md:right-20 z-30 pointer-events-none select-none">
            <motion.span
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-[9px] tracking-[0.35em] text-white/20 font-mono tabular-nums"
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
            </motion.span>
          </div>
        </div>
      </section>

      <SideIndicator activeIndex={activeIndex} />
    </>
  );
};

export default HeroRolex;