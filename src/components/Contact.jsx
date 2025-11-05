import { useState } from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vehicle: 'Compacto / Sedán',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('¡Gracias por tu consulta! Te contactaremos pronto.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      vehicle: 'Compacto / Sedán',
      message: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="bg-dark-800 py-20 lg:py-32">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-blue-500 font-semibold text-sm uppercase tracking-wider mb-3">
            CONTACTO
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo Para Proteger Tu Inversión?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Contáctanos ahora y recibe asesoramiento personalizado sin compromiso
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-8">Información de Contacto</h3>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 bg-dark-700 p-6 rounded-xl">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📧
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Email</h4>
                  <p className="text-gray-400">info@carmotion.com.ar</p>
                  <p className="text-gray-400">ventas@carmotion.com.ar</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-dark-700 p-6 rounded-xl">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📱
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">WhatsApp</h4>
                  <p className="text-gray-400">+54 11 1234-5678</p>
                  <p className="text-gray-400 text-sm">Lun a Vie: 9:00 - 18:00hs</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-dark-700 p-6 rounded-xl">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1">Oficinas</h4>
                  <p className="text-gray-400">Buenos Aires, Argentina</p>
                  <p className="text-gray-400 text-sm">Atención con cita previa</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {['📘', '📷', '🐦', '💼'].map((emoji, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-14 h-14 bg-dark-700 rounded-full flex items-center justify-center text-2xl hover:bg-blue-500 transition-colors"
                >
                  {emoji}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-dark-700 p-8 rounded-2xl">
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan Pérez"
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Teléfono / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+54 11 1234-5678"
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Tipo de Vehículo
                </label>
                <select
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option>Compacto / Sedán</option>
                  <option>SUV / Camioneta</option>
                  <option>Pick-up / Van</option>
                  <option>Otro</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Cuéntanos sobre tu necesidad..."
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105"
              >
                Enviar Consulta
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
