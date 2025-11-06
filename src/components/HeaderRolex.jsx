import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeaderRolex = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'COLECCIÓN', href: '#galeria' },
    { name: 'TECNOLOGÍA', href: '#caracteristicas' },
    { name: 'EXPERIENCIA', href: '#como-funciona' },
    { name: 'CONTACTO', href: '#contacto' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/95 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <motion.div 
            className="text-2xl tracking-[0.3em] font-light"
            whileHover={{ scale: 1.05 }}
            style={{ fontFamily: 'serif' }}
          >
            CARMOTION
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-[0.2em] text-gray-300 hover:text-white transition-colors duration-300 font-light"
              >
                {link.name}
              </a>
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
            className="lg:hidden py-8 border-t border-white/10"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-4 text-sm tracking-[0.2em] text-gray-300 hover:text-white transition-colors text-center"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default HeaderRolex;
