import { motion } from 'framer-motion';

const FooterRolex = () => {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-16 md:py-24">
        
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-4xl font-light tracking-wide text-white mb-4 font-display">
            CARMOTION
          </h3>
          <p className="text-[10px] tracking-[0.3em] text-gray-500 font-light font-body">
            PROTECCIÓN PREMIUM
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-16 pb-16 border-b border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 mb-3 font-light font-body">
                TELÉFONO
              </p>
              <a 
                href="https://wa.me/5491171217804"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-light hover:text-gray-300 transition-colors font-body"
              >
                +54 9 11 7121-7804
              </a>
            </div>
            
            <div>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 mb-3 font-light font-body">
                CORREO
              </p>
              <a 
                href="mailto:contacto@carmotion.com.ar"
                className="text-white font-light hover:text-gray-300 transition-colors font-body"
              >
                contacto@carmotion.com.ar
              </a>
            </div>
            
            <div>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 mb-3 font-light font-body">
                UBICACIÓN
              </p>
              <p className="text-white font-light font-body">Buenos Aires, Argentina</p>
            </div>

            <div>
              <p className="text-[10px] tracking-[0.3em] text-gray-500 mb-3 font-light font-body">
                INSTAGRAM
              </p>
              <a 
                href="https://www.instagram.com/carmotionar/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-light hover:text-gray-300 transition-colors inline-flex items-center justify-center gap-2 font-body"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @carmotionar
              </a>
            </div>
          </div>
        </motion.div>
       
        {/* Copyright */}
        <div className="space-y-4 text-center">
          <p className="text-[10px] tracking-[0.2em] text-gray-600 font-light font-body">
            © 2025 CARMOTION ARGENTINA. TODOS LOS DERECHOS RESERVADOS.
          </p>
          
          {/* Dev Credit */}
          <div className="pt-4 border-t border-white/5">
            <p className="text-[10px] text-gray-700 font-light font-body">
              Developed by{' '}
              <a 
                href="mailto:nicodf87@gmail.com"
                className="text-gray-500 hover:text-gray-400 transition-colors underline decoration-dotted"
              >
                nicodf87@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterRolex;
