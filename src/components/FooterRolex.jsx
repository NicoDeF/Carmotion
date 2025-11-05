import { motion } from 'framer-motion';

const FooterRolex = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 
            className="text-4xl font-light tracking-[0.3em] text-white mb-6"
            style={{ fontFamily: 'serif' }}
          >
            CARMOTION
          </h3>
          <p className="text-xs tracking-[0.3em] text-gray-500 font-light">
            PROTECCIÓN PREMIUM DESDE 2020
          </p>
        </motion.div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-16 text-center md:text-left">
          <div>
            <h4 className="text-xs tracking-[0.3em] text-gray-500 mb-6 font-light">
              COLECCIÓN
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#galeria" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Premium
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Professional
                </a>
              </li>
              <li>
                <a href="#galeria" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Executive
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] text-gray-500 mb-6 font-light">
              SERVICIOS
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Instalación
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Mantenimiento
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Garantía
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] text-gray-500 mb-6 font-light">
              EMPRESA
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Historia
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.3em] text-gray-500 mb-6 font-light">
              LEGAL
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Términos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors font-light">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-8 mb-16 pb-16 border-b border-white/10">
          {['Instagram', 'Facebook', 'LinkedIn', 'YouTube'].map((social) => (
            <a
              key={social}
              href="#"
              className="text-xs tracking-[0.2em] text-gray-500 hover:text-white transition-colors font-light"
            >
              {social}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-gray-600 font-light">
            © 2025 CARMOTION ARGENTINA. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterRolex;
