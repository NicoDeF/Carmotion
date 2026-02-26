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
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 72;
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementTop - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'INICIO', id: 'inicio' },
    { name: 'TECNOLOGÍA', id: 'caracteristicas' },
    { name: 'GALERÍA', id: 'galeria' },
    { name: 'CONTACTO', id: 'contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-sm'
          : 'bg-black'
      } border-b border-white/10`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo + Text */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img
              src={logo}
              alt="CARMOTION"
              className="h-12 md:h-14 lg:h-16 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
            />
            <span className="text-white text-lg md:text-xl tracking-[0.2em] font-display">
              CARMOTION
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="nav-link text-[11px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors duration-300 font-light font-body pb-1"
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.a
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contacto');
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden lg:inline-block text-[10px] tracking-[0.2em] border border-white/30 px-6 py-2.5 hover:bg-white hover:text-black transition-all duration-300 font-light font-body"
          >
            CONSULTAR
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[11px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors font-light font-body"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 'CERRAR' : 'MENÚ'}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="lg:hidden border-t border-white/10 overflow-hidden"
            >
              <div className="py-6 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full py-3 text-[11px] tracking-[0.2em] text-gray-400 hover:text-white transition-colors text-left font-light font-body"
                  >
                    {link.name}
                  </motion.button>
                ))}
                
                {/* Mobile CTA */}
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contacto');
                  }}
                  className="block w-full mt-4 py-3 text-[11px] tracking-[0.2em] border border-white/30 text-center text-white hover:bg-white hover:text-black transition-all duration-300 font-light font-body"
                >
                  CONSULTAR
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default HeaderRolex;