import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const VideoShowcaseRolex = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoLoaded) return;

    if (isInView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView, videoLoaded]);

  return (
    <section 
      id="tecnologia"
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-end overflow-hidden bg-black scroll-mt-16"
    >
      {/* Video Background */}
      {isInView && (
        <motion.video
          ref={videoRef}
          src="/videos/CarMOtion_01.mp4"
          loop
          muted
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            scale,
            opacity,
            filter: "brightness(0.65) contrast(1.1) saturate(1.1)",
          }}
          className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000"
        />
      )}

      {/* Placeholder mientras carga */}
      {!videoLoaded && isInView && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-700 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/95 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full pb-12 md:pb-16 lg:pb-20 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8 md:space-y-10">
          
          {/* Title */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-gray-200 text-2xl md:text-3xl lg:text-4xl tracking-wide font-light font-display"
            style={{
              textShadow: '0 2px 10px rgba(0,0,0,0.8)',
            }}
          >
            PROTECCIÓN EN ACCIÓN
          </motion.p>

          {/* CTA Button */}
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
              className="inline-block border-2 border-white/90 rounded-full text-white text-[11px] tracking-[0.2em] font-light px-14 py-5 hover:bg-white hover:text-black transition-all duration-500 shadow-xl backdrop-blur-sm font-body"
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
