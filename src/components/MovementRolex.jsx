import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

export default function MovementRolex() {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);

  // Raw mouse position (-0.5 to 0.5)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring smoothing
  const springX = useSpring(rawX, { stiffness: 70, damping: 18 });
  const springY = useSpring(rawY, { stiffness: 70, damping: 18 });

  // Map to rotation angles
  const rotateY = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);

  // Specular light that shifts with tilt
  const shineX = useTransform(springX, [-0.5, 0.5], ['0%', '100%']);
  const shineY = useTransform(springY, [-0.5, 0.5], ['0%', '100%']);

  // Auto-rotation when not hovered
  useEffect(() => {
    if (hovered) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      // Two slightly different frequencies = organic, non-mechanical movement
      rawX.set(Math.sin(t * 0.38) * 0.22);
      rawY.set(Math.sin(t * 0.27) * 0.08);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [hovered, rawX, rawY]);

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      style={{ background: '#040404' }}
      className="relative overflow-hidden py-24 md:py-44"
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(255,255,255,0.022) 0%, transparent 72%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="block text-[9px] tracking-[0.5em] text-white/45 font-mono mb-5 uppercase">
            CARMOTION
          </span>
          <h2
            className="text-4xl md:text-6xl font-light tracking-[0.1em] text-white mb-6"
            style={{ fontFamily: 'serif' }}
          >
            El producto.
          </h2>
          <div className="h-px w-10 mx-auto" style={{ background: 'rgba(201,168,76,0.45)' }} />
        </motion.div>

        {/* 3D showcase */}
        <div
          ref={containerRef}
          className="relative max-w-3xl mx-auto select-none cursor-none"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ perspective: '1400px' }}
        >
          <motion.div
            style={{ rotateY, rotateX }}
            className="relative will-change-transform"
          >
            {/* Image */}
            <img
              src="/images/_MG_3184_1.jpg"
              alt="CARMOTION — Sistema desplegado"
              className="w-full block"
              draggable={false}
              style={{ filter: 'contrast(1.06) brightness(0.92)' }}
            />

            {/* Specular highlight — simulates light bouncing with tilt */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: useTransform(
                  [springX, springY],
                  ([x, y]) =>
                    `radial-gradient(ellipse 60% 60% at ${50 + x * 80}% ${50 + y * 80}%, rgba(255,255,255,0.1) 0%, transparent 70%)`
                ),
              }}
            />

            {/* Edge vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: 'inset 0 0 60px rgba(0,0,0,0.5)',
              }}
            />
          </motion.div>

          {/* Reflection */}
          <div
            className="pointer-events-none"
            style={{
              transform: 'scaleY(-1)',
              opacity: 0.1,
              filter: 'blur(5px)',
              marginTop: 2,
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 55%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 55%)',
            }}
          >
            <img
              src="/images/_MG_3184_1.jpg"
              className="w-full block"
              draggable={false}
            />
          </div>
        </div>

        {/* Specs row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 md:mt-24 flex flex-wrap justify-center gap-10 md:gap-24 border-t border-white/[0.06] pt-10"
        >
          {[
            ['ESTRUCTURA', 'Acero inoxidable AISI 304'],
            ['COBERTURA', 'Lona Oxford 600D'],
            ['GARANTÍA', 'Total incluida'],
            ['ANCLAJE', '7 puntos de fijación'],
          ].map(([label, value]) => (
            <div key={label} className="text-center">
              <span className="block text-[8px] tracking-[0.45em] text-white/40 font-mono mb-2 uppercase">
                {label}
              </span>
              <span className="text-sm font-light text-white/55 font-body">{value}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
