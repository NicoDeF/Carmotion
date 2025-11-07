import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HowItWorksRolex = () => {
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const steps = [
    {
      number: 'I',
      title: 'POSICIONAR',
      description: 'Estacione su vehículo en la ubicación deseada. CARMOTION se adapta a cualquier superficie.',
      image: '/images/_MG_3353.jpg',
    },
    {
      number: 'II',
      title: 'DESPLEGAR',
      description: 'El sistema de pistones de gas despliega la estructura de aluminio aeronáutico en minutos.',
      image: '/images/_MG_3152.jpg',
    },
    {
      number: 'III',
      title: 'PROTEGER',
      description: 'Protección total activada. Resistencia certificada contra elementos extremos.',
      image: '/images/_MG_3271.jpg',
    },
  ];

  // Textos que aparecerán sobre el video
  const videoTexts = [
    {
      title: "ALUMINIO AERONÁUTICO",
      subtitle: "Tecnología de la industria aeroespacial",
    },
    {
      title: "RESISTENCIA EXTREMA",
      subtitle: "Certificado contra vientos de 80 km/h",
    },
    {
      title: "CONTROL REMOTO",
      subtitle: "Despliegue automático inteligente",
    },
  ];

  // Parallax para el video
  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Auto-play del video
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
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Cambiar texto del video cada 4 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % videoTexts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="como-funciona" className="bg-black">
      {/* Título principal - SIN padding superior, pegado al video anterior */}
      <div className="pt-0 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h2 
              className="text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-8 text-white px-4 font-playfair"
            >
              SIMPLICIDAD
            </h2>
            <p className="text-sm tracking-[0.3em] text-gray-500 font-light font-playfair">
              TRES PASOS HACIA LA PERFECCIÓN
            </p>
          </motion.div>
        </div>
      </div>

      {/* Video Section con textos estilo Rolex GMT */}
      <div
        ref={videoSectionRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {/* Video Background con parallax */}
        <motion.video
          ref={videoRef}
          src="/videos/Video_03-1.mp4"
          loop
          muted
          playsInline
          preload="auto"
          style={{
            scale,
            opacity,
          }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 pointer-events-none" />

        {/* Textos animados estilo Rolex GMT */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            {videoTexts.map((text, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentTextIndex === index ? 1 : 0,
                  y: currentTextIndex === index ? 0 : 20,
                }}
                transition={{ duration: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Título principal */}
                <motion.h3
                  className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-[0.15em] text-white mb-6 font-playfair"
                  style={{
                    textShadow: '0 4px 30px rgba(0,0,0,0.9), 0 0 60px rgba(0,0,0,0.7)',
                  }}
                >
                  {text.title}
                </motion.h3>

                {/* Subtítulo */}
                <motion.p
                  className="text-base md:text-xl lg:text-2xl tracking-[0.2em] text-gray-200 font-light font-playfair"
                  style={{
                    textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                  }}
                >
                  {text.subtitle}
                </motion.p>

                {/* Línea decorativa */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: currentTextIndex === index ? '120px' : 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-[1px] bg-white/50 mt-8"
                />
              </motion.div>
            ))}

            {/* Indicadores de progreso */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3">
              {videoTexts.map((_, index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 rounded-full bg-white/30"
                  animate={{
                    backgroundColor: currentTextIndex === index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                    scale: currentTextIndex === index ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-xs tracking-[0.3em] font-light font-playfair">
              DESLICE
            </span>
            <svg
              className="w-6 h-6 text-white/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Steps Section */}
      <div className="py-24 md:py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="space-y-32 md:space-y-48">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`grid md:grid-cols-2 gap-12 md:gap-16 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="relative h-[400px] md:h-[500px] overflow-hidden border border-white/10">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="relative">
                    {/* Roman Numeral Background */}
                    <span 
                      className="absolute -left-4 -top-8 text-8xl md:text-9xl font-light text-white/5 font-playfair"
                    >
                      {step.number}
                    </span>
                    
                    {/* Content */}
                    <div className="relative z-10">
                      <span className="text-xs md:text-sm tracking-[0.3em] text-gray-500 font-light mb-4 block font-playfair">
                        PASO {step.number}
                      </span>
                      <h4 
                        className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-6 md:mb-8 text-white font-playfair"
                      >
                        {step.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksRolex;