import { useState } from 'react';
import { motion } from 'framer-motion';

const ContactRolex = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  });

  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Gracias por su interés. Un asesor se contactará en breve.");
      setFormData({ name: '', email: '', phone: '', city: '', message: '' });
    } else {
      alert("Hubo un problema al enviar el mensaje. Intente nuevamente.");
    }
  } catch (error) {
    console.error("Error al enviar formulario:", error);
    alert("Error al conectar con el servidor.");
  }
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
            className="text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.15em] md:tracking-[0.2em] mb-8 text-white"
            style={{ fontFamily: 'Saira Semi Condensed, sans-serif' }}
          >
            CONTACTO
          </h2>
        </motion.div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-[#919090]/10 border border-white/20 rounded-2xl p-10 shadow-xl backdrop-blur-md"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* Nombre */}
            <div>
              <label className="block text-xs tracking-[0.3em] text-gray-400 mb-3 font-light">
                NOMBRE COMPLETO
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors"
                placeholder="Juan Pérez"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block text-xs tracking-[0.3em] text-gray-400 mb-3 font-light">
                CORREO ELECTRÓNICO
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors"
                placeholder="correo@ejemplo.com"
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-xs tracking-[0.3em] text-gray-400 mb-3 font-light">
                TELÉFONO
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors"
                placeholder="+54 11 1234-5678"
              />
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-xs tracking-[0.3em] text-gray-400 mb-3 font-light">
                CIUDAD
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors"
                placeholder="Buenos Aires"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-xs tracking-[0.3em] text-gray-400 mb-3 font-light">
                MENSAJE
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white text-lg font-light tracking-wider focus:outline-none focus:border-white transition-colors resize-none"
                placeholder="Cuéntenos sobre su vehículo o consulta..."
              />
            </div>

            {/* Botón */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={sending}
                className="w-full border border-white/30 text-white text-sm tracking-[0.3em] font-light py-6 hover:bg-white hover:text-black transition-all duration-500"
              >
                {sending ? 'ENVIANDO...' : 'SOLICITAR ASESORAMIENTO'}
              </button>
            </div>
          </form>

          {status && (
            <p className="text-center text-sm text-gray-300 mt-6">{status}</p>
          )}
        </motion.div>

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
              <p className="text-xs tracking-[0.3em] text-gray-500 mb-3 font-light">TELÉFONO</p>
              <p className="text-white font-light">+54 11 1234-5678</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-500 mb-3 font-light">CORREO</p>
              <p className="text-white font-light">info@carmotion.com.ar</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] text-gray-500 mb-3 font-light">UBICACIÓN</p>
              <p className="text-white font-light">Buenos Aires, Argentina</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactRolex;
