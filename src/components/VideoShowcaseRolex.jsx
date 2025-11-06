import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VideoShowcaseRolex = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  // Efecto de parallax y opacidad con scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  // Reproduce/Pausa automáticamente según el scroll
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <motion.video
        ref={videoRef}
        src="/videos/CarMOtion_01.mp4"
        loop
        muted
        playsInline
        preload="auto"
        style={{
          scale,
          opacity,
          filter: "brightness(0.65) contrast(1.1) saturate(1.1)",
        }}
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm motion-safe:blur-0 transition-all duration-1000"
      />

      {/* Overlay oscuro y elegante */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.2em] text-white mb-6"
          style={{ fontFamily: "serif" }}
        >
          DESCUBRA MÁS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base tracking-[0.3em] mb-12 font-light"
        >
          PROTECCIÓN EN ACCIÓN
        </motion.p>

        <motion.a
          href="#contacto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="inline-block border border-white/30 text-white text-xs md:text-sm tracking-[0.3em] font-light px-12 py-4 hover:bg-white hover:text-black transition-all duration-500"
        >
          SOLICITAR INFORMACIÓN
        </motion.a>
      </div>
    </section>
  );
};

export default VideoShowcaseRolex;
