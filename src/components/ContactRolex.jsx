import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactRolex = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle, sending, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar
    if (!formData.name || !formData.email || !formData.phone) {
      alert('⚠️ Por favor complete todos los campos obligatorios');
      return;
    }
    
    if (!formData.email.includes('@')) {
      alert('⚠️ Por favor ingrese un email válido');
      return;
    }
    
    setStatus('sending');
    
    try {
      // CAMBIAR 'xpznqwer' POR TU FORM ID DE FORMSPREE
      const response = await fetch('https://formspree.io/f/mnnoeoow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message || 'Sin mensaje adicional',
          _subject: `Nuevo consulta CARMOTION - ${formData.name}`,
        }),
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
        
        // Google Analytics (si lo tienes)
        if (window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'contact',
            event_label: 'contact_form',
          });
        }
        
        // Opcional: También notificar por WhatsApp
        const whatsappMsg = `Nuevo contacto: ${formData.name} - ${formData.email}`;
        // Descomentar si quieres notificación automática:
        // window.open(`https://wa.me/5491123456789?text=${encodeURIComponent(whatsappMsg)}`, '_blank');
        
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error('Error al enviar');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contacto" className="bg-black py-32 lg:py-48 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h2 
            className="text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-8 text-white px-4 font-playfair"
            style={{ fontFamily: 'serif' }}
          >
            CONTACTO
          </h2>

        </motion.div>

        {/* Status Messages */}
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 border border-green-500/30 bg-green-500/10 text-center"
          >
            <p className="text-green-400 text-sm tracking-wider">
              ✅ MENSAJE ENVIADO CORRECTAMENTE
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Nos contactaremos a la brevedad
            </p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-6 border border-red-500/30 bg-red-500/10 text-center"
          >
            <p className="text-red-400 text-sm tracking-wider">
              ❌ ERROR AL ENVIAR
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Por favor intente nuevamente
            </p>
          </motion.div>
        )}

        {/* Form */}
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      onSubmit={handleSubmit}
      className="space-y-8 border border-white/40 p-10 md:p-14 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
      >
          <div>
            <label className="block text-xs tracking-[0.3em] text-gray-500 mb-4 font-light">
              NOMBRE COMPLETO *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors disabled:opacity-50"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.3em] text-gray-500 mb-4 font-light">
              CORREO ELECTRÓNICO *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors disabled:opacity-50"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.3em] text-gray-500 mb-4 font-light">
              TELÉFONO *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors disabled:opacity-50"
              placeholder="+54 11 1234-5678"
            />
          </div>

          <div>
            <label className="block text-xs tracking-[0.3em] text-gray-500 mb-4 font-light">
              CONSULTA
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors resize-none disabled:opacity-50"
              placeholder="Cuéntenos sobre su vehículo..."
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full border border-white/30 text-white text-sm tracking-[0.3em] font-light py-6 hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'ENVIANDO...' : 'SOLICITAR ASESORAMIENTO'}
            </button>
          </div>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 pt-24 border-t border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-500 mb-3 font-light">
                TELÉFONO
              </p>
              <a 
                href="https://wa.me/5491123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-light hover:text-gray-300 transition-colors"
              >
                +54 11 1234-5678
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-500 mb-3 font-light">
                CORREO
              </p>
              <a 
                href="mailto:contacto@carmotion.com.ar"
                className="text-white font-light hover:text-gray-300 transition-colors"
              >
                info@carmotion.com.ar
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-500 mb-3 font-light">
                UBICACIÓN
              </p>
              <p className="text-white font-light">Buenos Aires, Argentina</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactRolex;