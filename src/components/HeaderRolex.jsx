import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '/images/logosinletras.png';

const HeaderRolex = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    // FIX: cerrar menú primero, esperar a que la animación termine (300ms),
    // y recién ahí scrollear. Si no, el cierre del menú cambia el layout
    // y el smooth scroll se cancela o va a la posición incorrecta.
    setMobileMenuOpen(false);

    const doScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({ top: elementTop - 72, behavior: 'smooth' });
      }
    };

    // Si el menú estaba abierto, esperar a que cierre; si no, scrollear ya
    if (mobileMenuOpen) {
      setTimeout(doScroll, 350);
    } else {
      doScroll();
    }
  };

  const navLinks = [
    { name: 'GALERÍA',  id: 'galeria' },
    { name: 'PRECIOS',  id: 'precios' },
  ];

  return (
    <>
      {/* Textura carbono — SVG inline como background */}
      <style>{`
        .carbon-header {
          background-color: #0d0d0d;
          background-image:
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.015) 0px,
              rgba(255,255,255,0.015) 1px,
              transparent 1px,
              transparent 6px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255,255,255,0.015) 0px,
              rgba(255,255,255,0.015) 1px,
              transparent 1px,
              transparent 6px
            );
        }
        .carbon-header-scrolled {
          background-color: #080808;
          background-image:
            repeating-linear-gradient(
              45deg,
              rgba(255,255,255,0.018) 0px,
              rgba(255,255,255,0.018) 1px,
              transparent 1px,
              transparent 6px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255,255,255,0.018) 0px,
              rgba(255,255,255,0.018) 1px,
              transparent 1px,
              transparent 6px
            );
        }
      `}</style>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-white/[0.06] ${
          scrolled ? 'carbon-header-scrolled shadow-[0_1px_20px_rgba(0,0,0,0.8)]' : 'carbon-header'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={logo}
                alt="CARMOTION"
                className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-75"
              />
              <span className="text-white text-lg md:text-xl tracking-[0.2em] font-display">
                CARMOTION
              </span>
            </motion.button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center space-x-10">
              {navLinks.map((link) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-[11px] tracking-[0.2em] text-gray-500 hover:text-white transition-colors duration-300 font-light font-body"
                >
                  {link.name}
                </motion.button>
              ))}

              {/* Instagram link */}
              <motion.a
                href="https://instagram.com/carmotionar"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-[11px] tracking-[0.2em] text-gray-500 hover:text-white transition-colors duration-300 font-light font-body group"
              >
                {/* Instagram icon */}
                <svg
                  className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors duration-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                SEGUINOS
              </motion.a>
            </div>

            {/* Desktop CTA */}
            <motion.a
              href="#contacto"
              onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}
              whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="hidden lg:inline-block text-[10px] tracking-[0.2em] border border-white/25 px-6 py-2.5 text-white transition-all duration-300 font-light font-body"
            >
              CONSULTAR
            </motion.a>

            {/* Mobile toggle */}
            <button
              className="lg:hidden text-[11px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors font-light font-body"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 'CERRAR' : 'MENÚ'}
            </button>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="lg:hidden border-t border-white/[0.06] overflow-hidden"
              >
                <div className="py-6 space-y-1">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.name}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => scrollToSection(link.id)}
                      className="block w-full py-3 text-[11px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors text-left font-light font-body"
                    >
                      {link.name}
                    </motion.button>
                  ))}

                  {/* Instagram mobile */}
                  <motion.a
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.08 }}
                    href="https://instagram.com/carmotionar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 py-3 text-[11px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors font-light font-body"
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    SEGUINOS
                  </motion.a>

                  {/* Mobile CTA */}
                  <motion.a
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navLinks.length + 1) * 0.08 }}
                    href="#contacto"
                    onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}
                    className="block w-full mt-4 py-3 text-[11px] tracking-[0.2em] border border-white/25 text-center text-white hover:bg-white hover:text-black transition-all duration-300 font-light font-body"
                  >
                    CONSULTAR
                  </motion.a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </motion.header>
    </>
  );
};

export default HeaderRolex;