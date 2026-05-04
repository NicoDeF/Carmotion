import { motion } from 'framer-motion';

const mentions = [
  {
    outlet: "La Nación",
    title: "Es argentino y su pasión por los autos lo llevó a crear un negocio impensado",
    excerpt:
      "Con una inversión inicial de US$25.000, los socios trajeron 55 unidades de las cuales ya tienen vendidas la mitad.",
    url: "https://www.lanacion.com.ar/propiedades/construccion-y-diseno/es-argentino-y-su-pasion-por-los-autos-lo-llevo-a-crear-un-negocio-impensado-nid01052026/",
    logo: "/logos/lanacion.webp",
    image: "/images/prensa-lanacion.jpg",
  },
];

const PressRolex = () => {
  return (
    <section id="prensa" className="py-20 md:py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0, 0, 0.2, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <span className="block text-[9px] tracking-[0.5em] text-white/25 font-mono mb-6 uppercase">
            MEDIOS
          </span>
          <h2
            className="text-3xl md:text-5xl lg:text-6xl font-light tracking-[0.12em] text-white"
            style={{ fontFamily: 'serif' }}
          >
            CARMOTION EN LA PRENSA.
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {mentions.map((m, i) => (
            <motion.a
              key={m.url}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: [0, 0, 0.2, 1] }}
              whileHover={{ y: -4 }}
              className="group flex flex-col border border-white/10 bg-white/[0.02] hover:border-white/20 transition-colors duration-500 w-full md:w-[420px] overflow-hidden"
            >
              {/* Image preview */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={m.image}
                  alt={m.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'brightness(0.85) contrast(1.05)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6 md:p-8">
                {/* Logo */}
                <div className="mb-6">
                  <img
                    src={m.logo}
                    alt={m.outlet}
                    className="h-5 w-auto object-contain opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </div>

                {/* Divider */}
                <div className="h-px bg-white/8 mb-6" />

                {/* Title */}
                <h3 className="text-base md:text-lg font-light text-white leading-relaxed mb-4 flex-1">
                  {m.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-gray-600 font-light leading-relaxed mb-8 line-clamp-3">
                  {m.excerpt}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] text-white/40 font-mono group-hover:text-white/70 transition-colors duration-300">
                  <span>LEER NOTA</span>
                  <svg
                    className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default PressRolex;
