import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppButtonRolex = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // ⚠️ CAMBIAR ESTE NÚMERO POR EL TUYO
  const phoneNumber = '5491123456789'; // Formato: 549 + código área + número
  const message = '¡Hola! Me interesa CARMOTION Premium. ¿Podrían brindarme más información?';
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      {/* Botón Principal */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: 'spring', stiffness: 200 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-8 right-8 z-50 group"
        aria-label="Contactar por WhatsApp"
      >
        {/* Contenedor del botón */}
        <div className="relative">
          {/* Sombra/Glow sutil */}
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
              opacity: isHovered ? 0.3 : 0.2,
            }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-green-500 rounded-full blur-lg"
          />
          
          {/* Botón principal - Estilo NIC.ar */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-16 h-16 md:w-18 md:h-18 bg-green-500 hover:bg-green-600 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 border-2 border-white/20"
          >
            {/* Ícono de WhatsApp */}
            <svg
              className="w-9 h-9 md:w-10 md:h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            
            {/* Badge de notificación (opcional) */}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2.5, type: 'spring' }}
              className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black"
            />
          </motion.div>
        </div>

        {/* Tooltip estilo NIC.ar */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute right-20 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
            >
              {/* Contenedor del tooltip */}
              <div className="bg-white text-black px-4 py-3 rounded-lg shadow-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  {/* Icono de mensaje */}
                  <svg 
                    className="w-5 h-5 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                    />
                  </svg>
                  
                  {/* Texto */}
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Consultas y Asesoramiento
                    </p>
                    <p className="text-xs text-gray-600">
                      Respondemos en minutos
                    </p>
                  </div>
                </div>
                
                {/* Flecha del tooltip */}
                <div className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.a>

      {/* Texto flotante inicial (desaparece después de 5 segundos) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.5 }}
        className="fixed bottom-28 right-8 z-40"
      >
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 8, duration: 1 }}
          className="bg-white text-gray-900 px-4 py-2 rounded-lg shadow-xl border border-gray-200 max-w-xs"
        >
          <p className="text-sm font-medium">
            👋 ¿Necesitas ayuda? Escríbenos
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default WhatsAppButtonRolex;