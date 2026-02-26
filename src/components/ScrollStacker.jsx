import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * ScrollStacker — Rolex-style scroll-driven scene compositor
 *
 * Arquitectura:
 * - Contenedor externo con height = N * 100vh → da "espacio" de scroll
 * - Panel interno sticky 100vh → se queda fijo mientras scrolleás
 * - useScroll trackea el progreso dentro del contenedor
 * - Cada escena define su rango [enter, peak, exit] dentro de [0, 1]
 * - Videos se play/pause según visibilidad de su escena
 */

// ─── Definición de escenas ─────────────────────────────────────────────────────
// enter:  progreso donde empieza a aparecer
// peak:   progreso donde está 100% visible
// exit:   progreso donde termina de desaparecer
// type: "video" | "image"
const SCENES = [
  {
    id: "scene-intro",
    type: "video",
    src: "/videos/CarMOtion_01.mp4",
    enter: 0,
    peak: 0.08,
    exit: 0.28,
    label: "PROTECCIÓN EN ACCIÓN",
    heading: "Cuida lo que\nmás te importa.",
    sub: null,
    cta: null,
  },
  {
    id: "scene-step-1",
    type: "image",
    src: "/images/_MG_3353_1.jpg",
    enter: 0.22,
    peak: 0.32,
    exit: 0.48,
    label: "PASO I",
    heading: "Posicionar.",
    sub: "Estacione su vehículo en la ubicación deseada.\nCARMOTION se adapta a cualquier superficie.",
    cta: null,
  },
  {
    id: "scene-step-2",
    type: "image",
    src: "/images/_MG_3347_1.jpg",
    enter: 0.42,
    peak: 0.52,
    exit: 0.68,
    label: "PASO II",
    heading: "Desplegar.",
    sub: "El sistema despliega el cobertor en minutos,\nsin herramientas ni esfuerzo.",
    cta: null,
  },
  {
    id: "scene-step-3",
    type: "image",
    src: "/images/_MG_3338_1_1.jpg",
    enter: 0.62,
    peak: 0.72,
    exit: 0.88,
    label: "PASO III",
    heading: "Proteger.",
    sub: "Protección total activada. Resistencia\ncertificada contra granizo, viento y UV.",
    cta: null,
  },
  {
    id: "scene-cta",
    type: "video",
    src: "/videos/Video_03-1.mp4",
    enter: 0.82,
    peak: 0.9,
    exit: 1.0,
    label: "CARMOTION",
    heading: "Su vehículo\nlo merece.",
    sub: null,
    cta: { label: "SOLICITAR INFORMACIÓN", href: "#contacto" },
  },
];

// ─── Utilidad: mapear progress a opacity dentro de un rango ───────────────────
function sceneOpacity(progress, enter, peak, exit) {
  if (progress < enter) return 0;
  if (progress < peak) return (progress - enter) / (peak - enter);
  if (progress < exit) return 1;
  // fade out en el último 30% del exit range
  const fadeStart = exit - (exit - peak) * 0.4;
  if (progress < fadeStart) return 1;
  return 1 - (progress - fadeStart) / (exit - fadeStart);
}

function sceneScale(progress, enter, peak, exit) {
  if (progress < enter) return 1.06;
  if (progress < peak) {
    const t = (progress - enter) / (peak - enter);
    return 1.06 - t * 0.06; // 1.06 → 1.00
  }
  return 1.0;
}

// ─── Hook: progreso del scroll dentro del contenedor ──────────────────────────
function useScrollProgress(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Suavizar levemente para que no sea tan abrupto
  const smooth = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001,
  });
  return smooth;
}

// ─── Componente de escena individual ──────────────────────────────────────────
const Scene = ({ scene, progress, index }) => {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const isVideo = scene.type === "video";

  // Calcular valores de animación del progreso
  const [opacity, setOpacity] = useState(0);
  const [scale, setScaleVal] = useState(1.06);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    return progress.on("change", (v) => {
      const op = sceneOpacity(v, scene.enter, scene.peak, scene.exit);
      const sc = sceneScale(v, scene.enter, scene.peak, scene.exit);
      setOpacity(op);
      setScaleVal(sc);
      // Texto visible cuando la escena está al menos 60% opaca
      setTextVisible(op > 0.6);

      // Control de video
      if (isVideo && videoRef.current && videoReady) {
        if (op > 0.05) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
    });
  }, [progress, scene, isVideo, videoReady]);

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        // pointer-events solo cuando es la escena dominante
        pointerEvents: opacity > 0.5 ? "auto" : "none",
        zIndex: Math.round(opacity * 10),
      }}
    >
      {/* ── Media: video o imagen ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${scale})`, transition: "transform 0.05s linear" }}
      >
        {isVideo ? (
          <>
            {opacity > 0 && (
              <video
                ref={videoRef}
                src={scene.src}
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={() => setVideoReady(true)}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "brightness(0.55) contrast(1.08)" }}
              />
            )}
            {/* Skeleton mientras carga */}
            {!videoReady && opacity > 0 && (
              <div className="absolute inset-0 bg-[#0a0a0a]">
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)",
                  }}
                />
              </div>
            )}
          </>
        ) : (
          <img
            src={scene.src}
            alt={scene.heading}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: "brightness(0.55) contrast(1.05)" }}
            loading="lazy"
            draggable={false}
          />
        )}
      </div>

      {/* ── Gradiente overlay ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 pointer-events-none" />

      {/* ── Contenido textual ─────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-16 lg:px-24">

        {/* Label */}
        <AnimatePresence>
          {textVisible && (
            <motion.span
              key="label"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[9px] md:text-[10px] tracking-[0.5em] text-white/35 font-mono mb-4 block"
            >
              {scene.label}
            </motion.span>
          )}
        </AnimatePresence>

        {/* Heading — línea a línea */}
        <AnimatePresence>
          {textVisible &&
            scene.heading.split("\n").map((line, i) => (
              <motion.h2
                key={`h-${i}`}
                initial={{ opacity: 0, y: 20 + i * 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -(10 + i * 5) }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + i * 0.12,
                  ease: [0, 0, 0.2, 1],
                }}
                className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.05]"
                style={{ textShadow: "0 2px 30px rgba(0,0,0,0.8)" }}
              >
                {line}
              </motion.h2>
            ))}
        </AnimatePresence>

        {/* Línea divisora */}
        <AnimatePresence>
          {textVisible && (
            <motion.div
              key="divider"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0, 0, 0.2, 1] }}
              style={{ originX: 0 }}
              className="h-px w-16 bg-white/30 my-5"
            />
          )}
        </AnimatePresence>

        {/* Subtítulo */}
        <AnimatePresence>
          {textVisible && scene.sub && (
            <motion.p
              key="sub"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-gray-400 text-sm md:text-base font-light leading-relaxed font-body max-w-md whitespace-pre-line"
            >
              {scene.sub}
            </motion.p>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <AnimatePresence>
          {textVisible && scene.cta && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6"
            >
              <motion.a
                href={scene.cta.href}
                whileHover={{
                  backgroundColor: "rgba(255,255,255,1)",
                  color: "#000",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.4 }}
                className="inline-block border border-white/50 text-white text-[10px] tracking-[0.25em] font-mono px-10 py-4 hover:bg-white hover:text-black transition-colors duration-400 backdrop-blur-sm"
              >
                {scene.cta.label}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Número de escena (decorativo, esquina superior derecha) ───── */}
      <div className="absolute top-8 right-8 md:top-10 md:right-12 pointer-events-none">
        <AnimatePresence>
          {textVisible && (
            <motion.span
              key="idx"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[9px] tracking-[0.3em] text-white/20 font-mono tabular-nums"
            >
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(SCENES.length).padStart(2, "0")}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Progress dots laterales ──────────────────────────────────────────────────
const ProgressDots = ({ progress }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    return progress.on("change", (v) => {
      // Encontrar la escena con mayor opacidad
      let maxOp = 0;
      let maxIdx = 0;
      SCENES.forEach((s, i) => {
        const op = sceneOpacity(v, s.enter, s.peak, s.exit);
        if (op > maxOp) {
          maxOp = op;
          maxIdx = i;
        }
      });
      setActive(maxIdx);
    });
  }, [progress]);

  return (
    <div className="fixed right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {SCENES.map((scene, i) => (
        <div key={i} className="relative flex items-center justify-center w-3 h-3">
          <motion.div
            animate={{
              width: i === active ? 6 : 3,
              height: i === active ? 6 : 3,
              backgroundColor:
                i === active ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)",
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="rounded-full"
          />
        </div>
      ))}
    </div>
  );
};

// ─── Scroll hint inicial ───────────────────────────────────────────────────────
const ScrollHint = ({ progress }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    return progress.on("change", (v) => {
      setVisible(v < 0.04);
    });
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none"
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[9px] tracking-[0.4em] text-white/35 font-mono"
          >
            SCROLL
          </motion.span>
          <motion.div
            animate={{ scaleY: [1, 0.6, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-white/30"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── Componente principal ─────────────────────────────────────────────────────
const ScrollStacker = () => {
  const containerRef = useRef(null);
  const progress = useScrollProgress(containerRef);

  // Altura total = N escenas × 100vh + 1 extra para respirar
  const totalHeight = `${SCENES.length * 100 + 50}vh`;

  return (
    <div
      ref={containerRef}
      id="tecnologia"
      className="relative bg-black"
      style={{ height: totalHeight }}
    >
      {/* ── Panel sticky: ocupa exactamente 100vh, siempre visible ──── */}
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ── Todas las escenas apiladas, controladas por opacity ───── */}
        {SCENES.map((scene, i) => (
          <Scene
            key={scene.id}
            scene={scene}
            progress={progress}
            index={i}
          />
        ))}

        {/* ── UI superpuesta ─────────────────────────────────────────── */}
        <ProgressDots progress={progress} />
        <ScrollHint progress={progress} />
      </div>
    </div>
  );
};

export default ScrollStacker;
