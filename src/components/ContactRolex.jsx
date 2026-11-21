import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactRolex = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
      const response = await fetch('https://formspree.io/f/xvgdoqyj', {
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
        
        if (window.gtag) {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17630288057/L7dhCOO0laccELmx49ZB',
            value: 1.0,
            currency: 'ARS',
          });
        }
        
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
    <section id="contacto" className="bg-black py-20 md:py-32 lg:py-48 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-12 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] text-gray-400 font-light mb-4 block font-body">
            HABLEMOS
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-white font-display">
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
            <p className="text-green-400 text-[11px] tracking-[0.2em] font-body">
              ✅ MENSAJE ENVIADO CORRECTAMENTE
            </p>
            <p className="text-gray-300 text-xs mt-2 font-body font-light">
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
            <p className="text-red-400 text-[11px] tracking-[0.2em] font-body">
              ❌ ERROR AL ENVIAR
            </p>
            <p className="text-gray-300 text-xs mt-2 font-body font-light">
              Por favor intente nuevamente
            </p>
          </motion.div>
        )}

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <a
            href="https://wa.me/5491171217804"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full border border-white/20 py-5 text-white text-[11px] tracking-[0.3em] font-mono hover:bg-white hover:text-black transition-all duration-500"
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            CHATEÁ POR WHATSAPP
          </a>
          <div className="flex items-center gap-4 mt-8">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-[10px] tracking-[0.3em] text-white/40 font-mono">O</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-8 border border-white/20 p-5 md:p-10 lg:p-14"
        >
          <div>
            <label className="block text-[10px] tracking-[0.3em] text-gray-400 mb-4 font-light font-body">
              NOMBRE COMPLETO *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base font-light tracking-wide focus:outline-none focus:border-white transition-colors disabled:opacity-50 font-body"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.3em] text-gray-400 mb-4 font-light font-body">
              CORREO ELECTRÓNICO *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base font-light tracking-wide focus:outline-none focus:border-white transition-colors disabled:opacity-50 font-body"
              placeholder="correo@ejemplo.com"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.3em] text-gray-400 mb-4 font-light font-body">
              TELÉFONO *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base font-light tracking-wide focus:outline-none focus:border-white transition-colors disabled:opacity-50 font-body"
              placeholder="+54 11 1234-5678"
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.3em] text-gray-400 mb-4 font-light font-body">
              CONSULTA
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              disabled={status === 'sending'}
              className="w-full bg-transparent border-b border-white/20 py-4 text-white text-base font-light tracking-wide focus:outline-none focus:border-white transition-colors resize-none disabled:opacity-50 font-body"
              placeholder="Cuéntenos sobre su vehículo..."
            />
          </div>

          <div className="pt-8">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full border border-white/30 text-white text-[11px] tracking-[0.25em] font-light py-6 hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed font-body"
            >
              {status === 'sending' ? 'ENVIANDO...' : 'SOLICITAR ASESORAMIENTO'}
            </button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default ContactRolex;
