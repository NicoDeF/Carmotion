import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HowItWorksRolex = () => {
  const videoRef = useRef(null);
  const videoSectionRef = useRef(null);

  const steps = [
    {
      number: 'I',
      title: 'POSICIONAR',
      description: 'Estacione su vehículo en la ubicación deseada. CARMOTION se adapta a cualquier superficie.',
      image: '/images/_MG_3353_1.jpg',
    },
    {
      number: 'II',
      title: 'DESPLEGAR',
      description: 'El sistema hidráulico despliega el cobertor en segundos, sin esfuerzo.',
      image: '/images/_MG_3347_1.jpg',
    },
    {
      number: 'III',
      title: 'PROTEGER',
      description: 'Protección total activada. Resistencia certificada contra elementos extremos.',
      image: '/images/_MG_3338_1_1.jpg',
    },
  ];

  const { scrollYProgress } = useScroll({
    target: videoSectionRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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

  return (
    <section id="como-funciona" className="bg-black">
      {/* Video Section */}
      <div
        ref={videoSectionRef}
        className="relative w-full min-h-screen overflow-hidden"
      >
        {/* Video Background */}
        <motion.video
          ref={videoRef}
          src="/videos/Video_03-1.mp4"
          loop
          muted
          playsInline
          preload="auto"
          style={{ scale, opacity }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-12">

          {/* Main Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-center max-w-4xl flex-1 flex flex-col justify-center"
          >
            <motion.h3
              className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide text-white mb-8 font-display leading-tight"
              style={{
                textShadow: '0 4px 40px rgba(0,0,0,0.9), 0 2px 20px rgba(0,0,0,0.8)',
              }}
            >
              Cuida lo que más
              <br />
              <span className="font-medium">te importa</span>
            </motion.h3>

            {/* Decorative line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-[1px] bg-white/60 mx-auto mb-12"
            />

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <motion.a
                href="#contacto"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(255,255,255,0.4)',
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-block border-2 border-white/90 rounded-full text-white text-[11px] tracking-[0.2em] font-light px-16 py-6 hover:bg-white hover:text-black transition-all duration-500 shadow-2xl backdrop-blur-sm font-body"
                style={{
                  boxShadow: '0 4px 30px rgba(0,0,0,0.6)',
                }}
              >
                CONTÁCTENOS
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.5,
              delay: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="mt-auto"
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-white/50 text-[10px] tracking-[0.3em] font-light font-body">
                DESCUBRA MÁS
              </span>
              <svg
                className="w-6 h-6 text-white/50"
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
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative group"
                  >
                    {/* Decorative lines */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="absolute -top-8 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="absolute top-0 -left-4 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent z-20"
                    />
                    
                    {/* Image container */}
                    <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                      <motion.div
                        className="relative w-full h-full"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      >
                        <img
                          src={step.image}
                          alt={step.title}
                          className="w-full h-full object-cover"
                          style={{
                            filter: 'contrast(1.05) brightness(0.95)',
                          }}
                        />
                        
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Inner border */}
                        <div className="absolute inset-8 border border-white/10 pointer-events-none" />
                      </motion.div>
                      
                      {/* Step number */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 1 }}
                        className="absolute bottom-8 right-8 flex items-center justify-center w-20 h-20 border-2 border-white/30 backdrop-blur-sm bg-black/30"
                      >
                        <span className="text-4xl font-light text-white font-display">
                          {step.number}
                        </span>
                      </motion.div>
                    </div>
                    
                    {/* Decorative lines (opposite side) */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="absolute -bottom-8 right-0 h-[1px] bg-gradient-to-l from-transparent via-white/40 to-transparent z-20"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 1.2 }}
                      className="absolute bottom-0 -right-4 w-[1px] bg-gradient-to-t from-transparent via-white/40 to-transparent z-20"
                    />
                  </motion.div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="relative">
                    <span className="absolute -left-4 -top-8 text-8xl md:text-9xl font-light text-white/5 font-display">
                      {step.number}
                    </span>
                    
                    <div className="relative z-10">
                      <span className="text-[10px] tracking-[0.3em] text-gray-500 font-light mb-4 block font-body">
                        PASO {step.number}
                      </span>
                      <h4 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-6 md:mb-8 text-white font-display">
                        {step.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-base md:text-lg font-light font-body">
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
