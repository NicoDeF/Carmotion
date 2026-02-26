import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ScrollStacker — Arquitectura definitiva correcta
 *
 * CÓMO FUNCIONA:
 * ─────────────
 * 1. Un div contenedor con height = N * 100vh provee el espacio de scroll
 * 2. Dentro hay un div sticky top:0 height:100vh — siempre visible
 * 3. Un scroll listener nativo calcula qué escena mostrar
 * 4. Las escenas se muestran con AnimatePresence:
 *    - La nueva entra desde abajo (y: "100%") con border-radius en top
 *    - La anterior sale hacia arriba (y: "-8%") con opacity fade
 *    - Se superponen durante la transición → efecto "pisarse"
 *
 * VIDEOS:
 * ───────
 * Controlados directamente por activeIndex, sin IntersectionObserver
 * que era el bug principal. Cada video tiene su ref y se play/pause
 * según si su índice === activeIndex.
 */

const SCENES = [
  {
    id: "video-intro",
    type: "video",
    src: "/videos/CarMOtion_01.mp4",
    label: "PROTECCIÓN EN ACCIÓN",
    heading: ["Cuida lo que", "más te importa."],
    sub: null,
    cta: null,
    align: "center",
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
    id: "video-cta",
    type: "video",
    src: "/videos/Video_03-1.mp4",
    label: "CARMOTION",
    heading: ["Su vehículo", "lo merece."],
    sub: null,
    cta: { label: "SOLICITAR INFORMACIÓN", href: "#contacto" },
    align: "center",
  },
];

const SCENE_HEIGHT = 90; // vh por escena — cuánto scroll hay que hacer para pasar a la siguiente

// ─── Escena individual ────────────────────────────────────────────────────────
const Scene = ({ scene, isActive }) => {
  const videoRef = useRef(null);
  const isVideo  = scene.type === "video";
  const isCenter = scene.align === "center";

  // FIX: controlar video directamente por isActive, no por observer
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    if (isActive) {
      // pequeño delay para que la transición de entrada termine
      const t = setTimeout(() => {
        videoRef.current?.play().catch(() => {});
      }, 300);
      return () => clearTimeout(t);
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive, isVideo]);

  return (
    <div className="absolute inset-0" style={{ borderRadius: "inherit", overflow: "hidden" }}>

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
            style={{ filter: "brightness(0.55) contrast(1.06)" }}
          />
        ) : (
          <img
            src={scene.src}
            alt={scene.heading.join(" ")}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.55) contrast(1.04)" }}
            draggable={false}
          />
        )}
      </div>

      {/* OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isCenter
            ? "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 30%, rgba(0,0,0,0.85) 100%)",
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
        <span className="block text-[9px] md:text-[10px] tracking-[0.5em] text-white/35 font-mono mb-4 md:mb-5 uppercase">
          {scene.label}
        </span>

        {scene.heading.map((line, i) => (
          <motion.h2
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0, 0, 0.2, 1] }}
            className="block font-light tracking-tight text-white leading-[1.03]"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
              textShadow: "0 2px 30px rgba(0,0,0,0.5)",
            }}
          >
            {line}
          </motion.h2>
        ))}

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0, 0, 0.2, 1] }}
          style={{ originX: isCenter ? 0.5 : 0 }}
          className={`h-px w-12 bg-white/25 ${isCenter ? "mx-auto my-6" : "my-5"}`}
        />

        {scene.sub && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-gray-400 text-sm md:text-base font-light leading-relaxed whitespace-pre-line"
          >
            {scene.sub}
          </motion.p>
        )}

        {scene.cta && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className={isCenter ? "mt-10" : "mt-7"}
          >
            <motion.a
              href={scene.cta.href}
              whileHover={{ backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="inline-block border border-white/40 text-white text-[10px] tracking-[0.3em] font-mono px-10 py-4"
            >
              {scene.cta.label}
            </motion.a>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ─── Indicador lateral ────────────────────────────────────────────────────────
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
            : "rgba(255,255,255,0.25)",
        }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="rounded-full"
      />
    ))}
  </div>
);

// ─── Principal ────────────────────────────────────────────────────────────────
const ScrollStacker = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex]   = useState(0);
  const [prevIndex,   setPrevIndex]     = useState(null);
  const [direction,   setDirection]     = useState(1); // 1=hacia adelante, -1=hacia atrás

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const rect       = container.getBoundingClientRect();
      const scrolledPx = -rect.top; // px scrolleados dentro del contenedor

      if (scrolledPx < 0) {
        setActiveIndex(0);
        return;
      }

      // Cada escena ocupa SCENE_HEIGHT vh de scroll
      const sceneHeightPx = (SCENE_HEIGHT / 100) * window.innerHeight;
      const raw           = scrolledPx / sceneHeightPx;
      const newIndex      = Math.min(Math.floor(raw), SCENES.length - 1);

      setActiveIndex(prev => {
        if (newIndex !== prev) {
          setDirection(newIndex > prev ? 1 : -1);
          setPrevIndex(prev);
        }
        return newIndex;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Variantes de animación:
  // La nueva escena entra desde abajo con border-radius (efecto "hoja")
  // La anterior se va hacia arriba con leve scale-down y opacity
  const variants = {
    enter: (dir) => ({
      y:            dir > 0 ? "100%" : "-8%",
      scale:        dir > 0 ? 1 : 0.96,
      borderRadius: dir > 0 ? "14px 14px 0 0" : "0px",
      opacity:      dir > 0 ? 1 : 0.5,
    }),
    center: {
      y:            "0%",
      scale:        1,
      borderRadius: "0px",
      opacity:      1,
      transition: {
        y:            { duration: 0.75, ease: [0.32, 0, 0.15, 1] },
        scale:        { duration: 0.75, ease: [0.32, 0, 0.15, 1] },
        borderRadius: { duration: 0.5,  ease: "easeOut" },
        opacity:      { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      y:       dir > 0 ? "-8%" : "100%",
      scale:   dir > 0 ? 0.96  : 1,
      opacity: dir > 0 ? 0     : 1,
      transition: {
        y:       { duration: 0.75, ease: [0.32, 0, 0.15, 1] },
        scale:   { duration: 0.75, ease: [0.32, 0, 0.15, 1] },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <>
      {/*
       * CONTENEDOR: altura = N escenas × SCENE_HEIGHT vh
       * + 100vh para que la última escena se vea completa
       * Esta altura ES el scroll — sin ella no funciona nada
       */}
      <div
        ref={containerRef}
        id="tecnologia"
        className="relative bg-black"
        style={{ height: `calc(${SCENES.length * SCENE_HEIGHT}vh + 100vh)` }}
      >
        {/*
         * PANEL STICKY: siempre visible en pantalla
         * Todas las escenas viven aquí, AnimatePresence maneja
         * cuál se muestra y la transición entre ellas
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
              <Scene
                scene={SCENES[activeIndex]}
                isActive={true}
              />

              {/* Counter */}
              <div className="absolute top-8 right-8 md:top-10 md:right-12 z-20 pointer-events-none select-none">
                <span className="text-[9px] tracking-[0.35em] text-white/20 font-mono tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(SCENES.length).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Indicador fuera del contenedor para que no herede overflow:hidden */}
      <SideIndicator activeIndex={activeIndex} />
    </>
  );
};

export default ScrollStacker;