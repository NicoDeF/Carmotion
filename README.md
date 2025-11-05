# 🚗 CARMOTION - Landing Page Premium

Landing page profesional construida con **React** y **Tailwind CSS** para CARMOTION, el garaje portátil premium.

## ✨ Características

- ⚛️ **React 18** - Framework moderno y performante
- 🎨 **Tailwind CSS** - Estilos utility-first
- 🎬 **Framer Motion** - Animaciones suaves y profesionales
- 📱 **100% Responsive** - Diseño adaptativo para todos los dispositivos
- 🎯 **SEO Optimizado** - Meta tags y estructura semántica
- ⚡ **Vite** - Build tool ultra-rápido
- 🖼️ **Galería con Lightbox** - Visualización de imágenes profesional

## 📦 Estructura del Proyecto

```
carmotion-react/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navegación principal
│   │   ├── Hero.jsx            # Hero con slider
│   │   ├── BeforeAfter.jsx     # Comparación antes/después
│   │   ├── HowItWorks.jsx      # Cómo funciona (3 pasos)
│   │   ├── Features.jsx        # Características del producto
│   │   ├── Gallery.jsx         # Galería de imágenes
│   │   ├── Pricing.jsx         # Planes y precios
│   │   ├── Contact.jsx         # Formulario de contacto
│   │   └── Footer.jsx          # Pie de página
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos globales + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Instalación y Uso

### Opción 1: Desarrollo Local

```bash
# 1. Ir al directorio del proyecto
cd /home/claude/carmotion-react

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:3000`

### Opción 2: Build para Producción

```bash
# Crear build optimizado
npm run build

# Preview del build
npm run preview
```

Los archivos optimizados estarán en la carpeta `dist/`

## 🎨 Personalización

### Colores

Los colores están definidos en `tailwind.config.js`:

```javascript
colors: {
  dark: {
    900: '#0f0f0f',  // Fondo más oscuro
    800: '#1a1a1a',  // Fondo oscuro principal
    700: '#2a2a2a',  // Cards
    600: '#3a3a3a',  // Hover states
  }
}
```

### Imágenes

Las imágenes están referenciadas desde `/mnt/user-data/uploads/`. Para producción, deberás:

1. Copiar las imágenes a la carpeta `public/images/`
2. Actualizar las rutas en los componentes

```javascript
// Antes
'/mnt/user-data/uploads/_MG_3353.jpg'

// Después
'/images/_MG_3353.jpg'
```

### Contenido

Cada sección es un componente independiente en `src/components/`. Edita el contenido directamente en cada archivo.

## 🎬 Agregar Videos/GIFs

Para agregar videos o GIFs al slider del Hero:

```javascript
// En Hero.jsx
const slides = [
  '/images/video1.mp4',  // Video
  '/images/demo.gif',    // GIF animado
  '/images/photo1.jpg',  // Foto estática
];
```

## 📱 Componentes Principales

### Header
- Navegación sticky con efecto blur
- Menu responsive para móvil
- Botón CTA destacado

### Hero
- Slider automático con 4 slides
- Controles de navegación
- Texto hero con llamadas a la acción

### Gallery
- Grid responsive
- Lightbox para ampliar imágenes
- Animaciones al hacer hover

### Pricing
- 3 planes de precios
- Plan destacado (Premium)
- Botones de CTA integrados

### Contact
- Formulario funcional
- Validación de campos
- Información de contacto

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

1. Conecta tu repositorio GitHub
2. Build command: `npm run build`
3. Publish directory: `dist`

### Otras opciones
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📊 SEO

La landing page incluye:
- ✅ Meta tags optimizados
- ✅ Estructura semántica HTML5
- ✅ Alt text en imágenes
- ✅ Sitemap automático (con plugin)
- ✅ Performance optimizado

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

## 📦 Dependencias

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "framer-motion": "^10.16.4",
  "tailwindcss": "^3.3.5",
  "vite": "^5.0.0"
}
```

## 🎯 Próximos Pasos

1. **Agregar videos/GIFs**: Subir e integrar en el Hero
2. **Conectar formulario**: Integrar con backend o servicio (EmailJS, Formspree)
3. **Analytics**: Agregar Google Analytics o similar
4. **Optimizar imágenes**: Comprimir y convertir a WebP
5. **Agregar testimonios reales**: Reemplazar placeholders

## 💡 Sugerencias

- Usa **Lighthouse** para medir performance
- Prueba en múltiples dispositivos
- Configura **Google Search Console**
- Implementa **schema.org** para SEO avanzado

## 📞 Soporte

Si tienes dudas sobre la implementación:
1. Revisa la documentación de [React](https://react.dev)
2. Consulta [Tailwind CSS docs](https://tailwindcss.com)
3. Explora [Framer Motion](https://www.framer.com/motion/)

---

**¡Tu landing page está lista para despegar! 🚀**
