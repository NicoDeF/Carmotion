import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '/dist/images/logosinletras.png';

const HeaderRolex = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll a secciones - calcula altura real del header
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // obtener la altura actual del header (por si cambia en responsive)
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 96;

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
    { name: 'CONTACTO', id: 'contacto' },
    { name: 'TECNOLOGÍA', id: 'tecnologia' },
    { name: 'EXPERIENCIA', id: 'como-funciona' },
    { name: 'FOTOS', id: 'galeria' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#343438] backdrop-blur-xl border-b border-white/10'
          : 'bg-[#343438]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* Logo + Texto */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={logo}
              alt="CARMOTION Logo"
              className="h-10 w-auto sm:h-12 md:h-14 lg:h-16 object-contain transition-transform duration-300"
              style={{
                filter: 'brightness(0.85) contrast(1.2)',
              }}
            />
            <span className="text-base sm:text-xl md:text-2xl lg:text-3xl tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.25em] font-normal font-audiowide text-white whitespace-nowrap">
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
                className="relative text-xs tracking-[0.2em] text-gray-300 hover:text-white transition-colors duration-300 font-light group"
              >
                {link.name}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white text-sm tracking-[0.2em]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? 'CERRAR' : 'MENÚ'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-8 border-t border-white/10"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="block w-full py-4 text-sm tracking-[0.2em] text-gray-300 hover:text-white transition-colors text-center"
              >
                {link.name}
              </button>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default HeaderRolex;
