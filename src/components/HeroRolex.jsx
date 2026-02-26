import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * HeroRolex — Componente unificado
 *
 * Reemplaza HeroRolex + ScrollStacker en uno solo.
 *
 * ARQUITECTURA:
 * ─────────────
 * - Contenedor: height = N * 100vh → provee el espacio de scroll
 * - Panel sticky top:0 height:100vh → siempre visible
 * - Scroll listener nativo → calcula escena activa
 * - AnimatePresence mode="sync" → nueva escena entra desde abajo
 *   mientras la anterior sale hacia arriba (se "pisan")
 * - Videos: controlados por isActive, sin IntersectionObserver
 *
 * ESCENAS:
 * ─────────
 * 0. Video intro fullscreen         ← arranca inmediato
 * 1. Imagen brand CARMOTION
 * 2. Paso I  — Posicionar
 * 3. Paso II — Desplegar
 * 4. Paso III — Proteger
 * 5. Video CTA final
 */

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
    src: "/images/_MG_3235.jpg",
    label: "EXCELENCIA",
    heading: ["En cada", "detalle."],
    sub: "Ingeniería de precisión para la protección\nde su inversión vehicular.",
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

const TOTAL          = SCENES.length;
const VH_PER_SCENE   = 100; // vh de scroll por escena

// ─── Escena individual ────────────────────────────────────────────────────────
const Scene = ({ scene, isActive }) => {
  const videoRef = useRef(null);
  const isVideo  = scene.type === "video";
  const isCenter = scene.align === "center";

  // Control de video — directo por isActive, sin observer
  useEffect(() => {
    const vid = videoRef.current;
    if (!isVideo || !vid) return;

    if (isActive) {
      // Pequeño delay para que la animación de entrada termine
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

      {/* TEXTO */}
      <div
        className={`absolute z-10 ${
          isCenter
            ? "inset-0 flex flex-col items-center justify-center text-center px-8"
            : "bottom-16 md:bottom-24 left-8 md:left-16 lg:left-24 max-w-2xl"
        }`}
      >
        {/* Eyebrow */}
        <motion.span
          key={`label-${scene.id}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="block text-[9px] md:text-[10px] tracking-[0.5em] text-white/35 font-mono mb-4 md:mb-5 uppercase"
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
                ? "clamp(3rem, 9vw, 8rem)"
                : "clamp(2.4rem, 6vw, 5.5rem)",
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
          className={`h-px w-12 bg-white/25 ${isCenter ? "mx-auto my-6" : "my-5"}`}
        />

        {/* Subtítulo */}
        {scene.sub && (
          <motion.p
            key={`sub-${scene.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.52, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-gray-400 text-sm md:text-base font-light leading-relaxed whitespace-pre-line"
          >
            {scene.sub}
          </motion.p>
        )}

        {/* CTA */}
        {scene.cta && (
          <motion.div
            key={`cta-${scene.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62 }}
            className={isCenter ? "mt-10" : "mt-7"}
          >
            <motion.a
              href={scene.cta.href}
              whileHover={{ backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="inline-block border border-white/40 text-white text-[10px] tracking-[0.3em] font-mono px-10 py-4 transition-colors duration-300"
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
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

// ─── Indicador lateral tipo Rolex ─────────────────────────────────────────────
const SideIndicator = ({ activeIndex }) => (
  <div className="fixed right-5 md:right-8 top-1/2 -translate-y-1/2 z-[200] flex flex-col gap-3 pointer-events-none">
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

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const top        = container.getBoundingClientRect().top;
      const scrolledPx = -(top);                          // px desde el inicio del componente
      const sceneH     = (VH_PER_SCENE / 100) * window.innerHeight;
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
  }, []);

  // Variantes — la clave del efecto "pisarse":
  // enter desde abajo con border-radius (parece una hoja que emerge)
  // exit hacia arriba con leve scale y fade
  const variants = {
    enter: (dir) => ({
      y:            dir > 0 ? "100%" : "-6%",
      scale:        dir > 0 ? 1.0    : 0.97,
      borderRadius: dir > 0 ? "14px 14px 0 0" : "0px",
      opacity:      dir > 0 ? 1      : 0.7,
      zIndex:       20,
    }),
    center: {
      y:            "0%",
      scale:        1,
      borderRadius: "0px",
      opacity:      1,
      zIndex:       20,
      transition: {
        y:            { duration: 0.8,  ease: [0.32, 0, 0.15, 1] },
        scale:        { duration: 0.8,  ease: [0.32, 0, 0.15, 1] },
        borderRadius: { duration: 0.55, ease: "easeOut" },
        opacity:      { duration: 0.45 },
      },
    },
    exit: (dir) => ({
      y:            dir > 0 ? "-6%" : "100%",
      scale:        dir > 0 ? 0.97 : 1.0,
      borderRadius: dir > 0 ? "0px" : "14px 14px 0 0",
      opacity:      dir > 0 ? 0    : 1,
      zIndex:       10,
      transition: {
        y:            { duration: 0.8,  ease: [0.32, 0, 0.15, 1] },
        scale:        { duration: 0.8,  ease: [0.32, 0, 0.15, 1] },
        opacity:      { duration: 0.45 },
      },
    }),
  };

  return (
    <>
      {/*
       * CONTENEDOR: da el espacio de scroll total
       * TOTAL * 100vh = cuánto hay que scrollear para ver todo
       * + 100vh extra para que la última escena se vea completa
       */}
      <section
        ref={containerRef}
        id="inicio"
        className="relative bg-black"
        style={{ height: `${TOTAL * VH_PER_SCENE + 100}vh` }}
      >
        {/*
         * PANEL STICKY: siempre visible mientras scrolleás el contenedor
         * overflow:hidden corta las escenas que entran/salen
         */}
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

          {/* Counter top-right */}
          <div className="absolute top-8 right-16 md:top-10 md:right-20 z-30 pointer-events-none select-none">
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

      {/* Indicador fuera del section para que no herede overflow:hidden */}
      <SideIndicator activeIndex={activeIndex} />
    </>
  );
};

export default HeroRolex;