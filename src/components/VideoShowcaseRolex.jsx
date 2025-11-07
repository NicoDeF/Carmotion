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
      className="relative w-full min-h-screen flex items-end overflow-hidden bg-black"
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
        className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000"
      />

      {/* Overlay oscuro con degradado más fuerte hacia abajo */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95 pointer-events-none" />

      {/* Contenido en la parte inferior */}
      <div className="relative z-10 w-full pb-12 md:pb-16 lg:pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10">
          {/* Texto: PROTECCIÓN EN ACCIÓN */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-gray-200 text-2xl md:text-3xl lg:text-4xl tracking-[0.25em] font-light font-playfair"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            PROTECCIÓN EN ACCIÓN
          </motion.p>

          {/* Botón: SOLICITAR INFORMACIÓN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.a
              href="#contacto"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(255,255,255,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-block border-2 border-white/90 rounded-full text-white text-xs md:text-sm tracking-[0.25em] font-medium px-14 py-5 hover:bg-white hover:text-black transition-all duration-500 shadow-xl backdrop-blur-sm font-playfair"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              SOLICITAR INFORMACIÓN
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoShowcaseRolex;