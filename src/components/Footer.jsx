import { motion } from 'framer-motion';

const Footer = () => {
  const footerSections = [
    {
      title: 'Productos',
      links: [
        { name: 'CARMOTION Basic', href: '#precios' },
        { name: 'CARMOTION Premium', href: '#precios' },
        { name: 'CARMOTION Pro', href: '#precios' },
        { name: 'Accesorios', href: '#' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nosotros', href: '#' },
        { name: 'Garantía', href: '#' },
        { name: 'Términos y Condiciones', href: '#' },
        { name: 'Política de Privacidad', href: '#' },
      ],
    },
    {
      title: 'Soporte',
      links: [
        { name: 'Preguntas Frecuentes', href: '#' },
        { name: 'Manual de Usuario', href: '#' },
        { name: 'Instalación', href: '#como-funciona' },
        { name: 'Contacto', href: '#contacto' },
      ],
    },
  ];

  return (
    <footer className="bg-dark-900 border-t border-white/10">
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4">
              CAR<span className="text-blue-500">MOTION</span>
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6">
              Protección vehicular premium con tecnología aeronáutica. 
              Líderes en Argentina desde 2020.
            </p>
            <div className="flex gap-3">
              {['📘', '📷', '🐦', '💼'].map((emoji, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                >
                  {emoji}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-bold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2025 CARMOTION Argentina. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
