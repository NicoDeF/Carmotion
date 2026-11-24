import { motion } from 'framer-motion';
import logo from '/images/logosinletras.png';

const GOLD = '#C9A84C';
const EASE = [0.25, 0.1, 0.25, 1];

const NAV = [
  { name: 'Galería',     id: 'galeria' },
  { name: 'Precios',     id: 'precios' },
  { name: 'Instalación', id: 'instalacion' },
  { name: 'Prensa',      id: 'prensa' },
  { name: 'Contacto',    id: 'contacto' },
];

const CONTACT = [
  { label: 'WhatsApp',  value: '+54 9 11 7121-7804',          href: 'https://wa.me/5491171217804', external: true },
  { label: 'Correo',    value: 'contacto@carmotion.com.ar',   href: 'mailto:contacto@carmotion.com.ar' },
  { label: 'Instagram', value: '@carmotionar',                href: 'https://www.instagram.com/carmotionar/', external: true },
  { label: 'Ubicación', value: 'Buenos Aires, Argentina' },
];

const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
};

// Aparición escalonada de las columnas
const col = {
  hidden: { opacity: 0, y: 18 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE } }),
};

// Link con subrayado que crece de izquierda a derecha
const FooterLink = ({ children, ...props }) => (
  <a
    {...props}
    className="group relative inline-block text-sm text-white/80 hover:text-white transition-colors duration-300 font-light font-body"
  >
    {children}
    <span className="absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" style={{ background: GOLD }} />
  </a>
);

const Label = ({ children }) => (
  <p className="text-[9px] tracking-[0.4em] text-white/40 font-mono uppercase mb-5">{children}</p>
);

const FooterRolex = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Línea dorada que se dibuja desde el centro */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: EASE }}
        className="h-px w-full origin-center"
        style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66 20%, ${GOLD} 50%, ${GOLD}66 80%, transparent)` }}
      />
      {/* Brillo dorado muy tenue arriba */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-60"
        style={{ background: `radial-gradient(60% 100% at 50% 0%, ${GOLD}14, transparent 70%)` }}
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 lg:px-12 pt-16 md:pt-24 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Marca */}
          <motion.div
            variants={col} custom={0} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
            className="md:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="" className="h-12 w-auto object-contain" />
              <span className="text-2xl tracking-[0.2em] text-white font-display">CARMOTION</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-light font-body">
              Cobertores plegables para autos, camionetas, motos y UTVs. Protección premium que se arma en minutos y queda instalada en tu cochera.
            </p>
            <a
              href="https://wa.me/5491171217804"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden inline-flex items-center gap-3 mt-8 border border-white/25 hover:border-white px-6 py-3 text-[10px] tracking-[0.25em] text-white font-light font-body transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
              <span className="relative group-hover:text-black transition-colors duration-500">ESCRIBINOS POR WHATSAPP</span>
              <span className="relative group-hover:text-black group-hover:translate-x-1 transition-all duration-500">→</span>
            </a>
          </motion.div>

          {/* Navegación */}
          <motion.div
            variants={col} custom={1} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
            className="md:col-span-3"
          >
            <Label>Navegación</Label>
            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.id}>
                  <FooterLink href={`#${n.id}`} onClick={(e) => { e.preventDefault(); scrollTo(n.id); }}>
                    {n.name}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div
            variants={col} custom={2} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-40px' }}
            className="md:col-span-4"
          >
            <Label>Contacto</Label>
            <dl className="space-y-4">
              {CONTACT.map((c) => (
                <div key={c.label} className="flex items-baseline justify-between gap-6 pb-4 border-b border-white/[0.06] last:border-0">
                  <dt className="text-[10px] tracking-[0.25em] text-white/40 font-mono uppercase shrink-0">{c.label}</dt>
                  <dd className="text-right min-w-0 break-words">
                    {c.href ? (
                      <FooterLink href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        {c.value}
                      </FooterLink>
                    ) : (
                      <span className="text-sm text-white/80 font-light font-body">{c.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Barra inferior */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mt-16 md:mt-24 pt-8 border-t border-white/[0.06] flex flex-col-reverse md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left space-y-2">
            <p className="text-[10px] tracking-[0.2em] text-white/40 font-light font-body">
              © {year} CARMOTION ARGENTINA. TODOS LOS DERECHOS RESERVADOS.
            </p>
            <p className="text-[10px] text-white/30 font-light font-body">
              Developed by{' '}
              <a href="mailto:nicodf87@gmail.com" className="text-white/45 hover:text-white/70 transition-colors underline decoration-dotted">
                nicodf87@gmail.com
              </a>
            </p>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-3 text-[10px] tracking-[0.3em] text-white/50 hover:text-white transition-colors duration-300 font-mono"
          >
            VOLVER ARRIBA
            <span className="w-8 h-8 border border-white/20 group-hover:border-white/60 flex items-center justify-center transition-colors duration-300">
              <svg className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterRolex;
