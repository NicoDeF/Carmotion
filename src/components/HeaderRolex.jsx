import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import logo from '/images/logosinletras.png';
import { useCart } from '../context/CartContext';

const GOLD = '#C9A84C';
const EASE = [0.25, 0.1, 0.25, 1];
const HEADER_H = 72; // alto compacto (scrolleado); arriba de todo es 88

const NAV_LINKS = [
  { name: 'GALERÍA', id: 'galeria' },
  { name: 'PRECIOS', id: 'precios' },
  { name: 'PRENSA',  id: 'prensa'  },
];

const InstagramIcon = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const CartButton = () => {
  const { count, openDrawer } = useCart();
  return (
    <button
      onClick={openDrawer}
      aria-label={`Carrito (${count})`}
      className="relative flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/75 hover:text-white transition-colors duration-300 font-light font-body"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12l-1 13H7L6 7zm3 0V5a3 3 0 016 0v2" />
      </svg>
      <span className="hidden sm:inline">CARRITO</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[9px] font-mono text-black"
            style={{ background: GOLD }}
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

// Link de navegación: subrayado que crece desde el centro + indicador de sección activa
const NavLink = ({ link, active, onClick }) => (
  <button
    onClick={onClick}
    className={`group relative py-2 text-[11px] tracking-[0.22em] font-light font-body transition-colors duration-300 ${
      active ? 'text-white' : 'text-white/65 hover:text-white'
    }`}
  >
    {link.name}
    <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
    {active && (
      <motion.span
        layoutId="nav-active"
        className="absolute left-0 right-0 -bottom-0.5 h-px"
        style={{ background: GOLD }}
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
      />
    )}
  </button>
);

const HeaderRolex = () => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null);
  const lastY = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  // Fondo al scrollear + se esconde bajando y reaparece subiendo
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 40);
    const delta = y - lastY.current;
    if (Math.abs(delta) > 6) setHidden(delta > 0 && y > 320);
    lastY.current = y;
  });

  // Sección activa según lo que está en pantalla
  useEffect(() => {
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
          else setActive((cur) => (cur === e.target.id ? null : cur));
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Menú mobile: bloquear scroll del fondo y cerrar con Escape
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const scrollToSection = (sectionId) => {
    // Cerrar el menú primero y esperar su animación: si no, el cambio de layout
    // cancela el smooth scroll o lo manda a la posición equivocada.
    const wasOpen = menuOpen;
    setMenuOpen(false);
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.pageYOffset - HEADER_H;
      window.scrollTo({ top, behavior: 'smooth' });
    };
    if (wasOpen) setTimeout(doScroll, 450);
    else doScroll();
  };

  const showBar = !hidden || menuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: showBar ? 0 : -110, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Fondo: transparente sobre el hero, vidrio oscuro al scrollear */}
        <div
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            scrolled || menuOpen
              ? 'bg-black/70 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.06]'
              : 'bg-gradient-to-b from-black/70 via-black/30 to-transparent border-b border-transparent'
          }`}
        />

        <nav className="relative max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div
            className="flex items-center justify-between transition-[height] duration-500 ease-out"
            style={{ height: scrolled ? HEADER_H : 88 }}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
              aria-label="CARMOTION — volver al inicio"
            >
              <img
                src={logo}
                alt=""
                className={`w-auto object-contain transition-all duration-500 ease-out group-hover:opacity-80 ${
                  scrolled ? 'h-10 md:h-11' : 'h-12 md:h-14'
                }`}
              />
              <span className="text-white text-lg md:text-xl tracking-[0.2em] font-display">CARMOTION</span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-10">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.id} link={link} active={active === link.id} onClick={() => scrollToSection(link.id)} />
              ))}
              <a
                href="https://instagram.com/carmotionar"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-2 py-2 text-[11px] tracking-[0.22em] text-white/65 hover:text-white transition-colors duration-300 font-light font-body"
              >
                <InstagramIcon />
                SEGUINOS
                <span className="absolute left-0 right-0 -bottom-0.5 h-px bg-white/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center" />
              </a>
            </div>

            {/* Desktop cart + CTA */}
            <div className="hidden lg:flex items-center gap-8">
              <CartButton />
              <a
                href="#contacto"
                onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}
                className="group relative overflow-hidden text-[10px] tracking-[0.25em] border border-white/25 hover:border-white px-6 py-2.5 text-white font-light font-body transition-colors duration-500"
              >
                {/* Relleno que sube desde abajo */}
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" />
                <span className="relative group-hover:text-black transition-colors duration-500">CONSULTAR</span>
              </a>
            </div>

            {/* Mobile cart + hamburguesa */}
            <div className="lg:hidden flex items-center gap-5">
              <CartButton />
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={menuOpen}
                className="relative w-9 h-9 flex items-center justify-center"
              >
                <motion.span
                  className="absolute h-px w-6 bg-white"
                  animate={menuOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute h-px bg-white"
                  animate={menuOpen ? { rotate: -45, y: 0, width: 24 } : { rotate: 0, y: 4, width: 16 }}
                  style={{ right: 6 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </button>
            </div>
          </div>
        </nav>

        {/* Progreso de lectura */}
        <motion.div
          className="absolute left-0 right-0 bottom-0 h-px origin-left"
          style={{ scaleX: progress, background: GOLD, opacity: scrolled ? 0.7 : 0 }}
        />
      </motion.header>

      {/* Menú mobile: pantalla completa */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.35, delay: 0.1 } }}
            transition={{ duration: 0.4, ease: EASE }}
            className="lg:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex-1 flex flex-col justify-center px-8 pt-24 pb-10">
              <span className="text-[9px] tracking-[0.5em] text-white/40 font-mono mb-8">MENÚ</span>
              <ul className="space-y-2">
                {[...NAV_LINKS, { name: 'CONTACTO', id: 'contacto' }].map((link, i) => (
                  <li key={link.id} className="overflow-hidden">
                    <motion.button
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '110%', transition: { duration: 0.3, ease: EASE } }}
                      transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      onClick={() => scrollToSection(link.id)}
                      className="flex items-baseline gap-4 py-2 text-left"
                    >
                      <span className="text-[10px] font-mono text-white/30 tabular-nums">0{i + 1}</span>
                      <span
                        className={`text-4xl tracking-[0.06em] font-display transition-colors duration-300 ${
                          active === link.id ? '' : 'text-white'
                        }`}
                        style={active === link.id ? { color: GOLD } : undefined}
                      >
                        {link.name}
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                className="mt-auto pt-12 border-t border-white/10 flex items-center justify-between"
              >
                <a
                  href="https://instagram.com/carmotionar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-white/70 hover:text-white transition-colors font-light font-body"
                >
                  <InstagramIcon />
                  @CARMOTIONAR
                </a>
                <a
                  href="https://wa.me/5491171217804"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] tracking-[0.2em] text-white/70 hover:text-white transition-colors font-light font-body"
                >
                  WHATSAPP →
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderRolex;
