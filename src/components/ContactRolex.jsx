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
          window.gtag('event', 'form_submit', {
            event_category: 'contact',
            event_label: 'contact_form',
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
          <span className="text-[10px] tracking-[0.4em] text-gray-500 font-light mb-4 block font-body">
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
            <p className="text-gray-400 text-xs mt-2 font-body font-light">
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
            <p className="text-gray-400 text-xs mt-2 font-body font-light">
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
          className="space-y-6 md:space-y-8 border border-white/20 p-5 md:p-10 lg:p-14"
        >
          <div>
            <label className="block text-[10px] tracking-[0.3em] text-gray-500 mb-4 font-light font-body">
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
            <label className="block text-[10px] tracking-[0.3em] text-gray-500 mb-4 font-light font-body">
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
            <label className="block text-[10px] tracking-[0.3em] text-gray-500 mb-4 font-light font-body">
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
            <label className="block text-[10px] tracking-[0.3em] text-gray-500 mb-4 font-light font-body">
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
