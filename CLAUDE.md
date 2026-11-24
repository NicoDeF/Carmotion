# CARMOTION — Landing + tienda (estilo Rolex, fondo negro)

Repo: https://github.com/NicoDeF/Carmotion

## Stack
- React 18 + Vite 5 + Tailwind 3 + framer-motion
- Funciones serverless en `api/` (deploy en Vercel)
- `server/dev-server.js`: Express para correr la API en local

## Comandos
- `npm run dev` — frontend (Vite)
- `npm run dev:api` — API local (Express)
- `npm run build` — build de producción en `dist/` (se commitea)
- `npm run images` — `scripts/optimize-images.mjs`: genera webp 800/1600/2400 desde `originales/` a `public/images/opt/`

## Estructura
- `src/AppRolex.jsx` — app principal; secciones en `src/components/*Rolex.jsx`
- `src/context/CartContext.jsx` — carrito
- `src/data/products.js` — catálogo (precios: fuente de verdad, también la usa la API)
- `src/data/images.json` + `src/utils/img.js` — galería y srcset
- `src/components/GalleryRolex.jsx` — galería masonry de fotos **y videos** mezclados (`{ video, w, h }`); el orden está elegido para que los videos no queden pegados en la misma columna
- `public/videos/<nombre>.mp4` + `<nombre>-poster.webp` — videos de la galería, comprimidos con ffmpeg (H.264 CRF 27–31, +faststart); se cargan sólo al estar en pantalla
- `api/checkout.js` — pago con tarjeta (Payway: clave pública → /tokens, privada → /payments, con datos antifraude Cybersource)
- `api/mp-preference.js`, `api/mp-webhook.js`, `api/mp-status.js` — Mercado Pago Checkout Pro
- `api/_lib/` — lógica compartida (validación de pedido, aviso por mail, cliente MP)

## Pagos con tarjeta (Payway)
- Cuotas: 1 y 3 sin interés, 6 con 20% de recargo (`INSTALLMENTS` / `INSTALLMENT_SURCHARGE` en `products.js`); el recargo se cobra en el server
- Sandbox: `developers.decidir.com`; Cybersource exige `fraud_detection` y `customer_id` no puede ser un email
- Pendiente producción: script de device fingerprint en el navegador (TODO en `api/checkout.js`), variables en Vercel, claves productivas

## Diseño
- Negro + dorado `#C9A84C`, títulos `font-display` (Archivo Black), etiquetas `font-mono` con tracking amplio, curva `[0.25, 0.1, 0.25, 1]`
- Header: transparente sobre el hero → vidrio oscuro al scrollear, se oculta al bajar, indicador dorado de sección activa, menú mobile a pantalla completa
- Footer y sección YouTube usan línea dorada superior + acentos dorados

## Variables de entorno
Ver `.env.example` (Payway, SMTP opcional, Mercado Pago, `PUBLIC_URL`). Nunca commitear `.env`.

## Ramas
- `checkout` — la más actual (tienda, Payway, Mercado Pago, imágenes y videos optimizados, header/footer/YouTube rediseñados)
- `main` — desactualizada (nov 2025), todavía sin mergear lo nuevo
- `rama-b-dev`, `rama-c-nuevos`, `rama-d`, `optionalrealise` — trabajo anterior

## Convenciones
- Commits en español con prefijo tipo `feat:`, `build:`
- Las imágenes originales van en `originales/` (fuera de `public/`); sólo se sirven las optimizadas
- Fotos nuevas: ponerlas en `originales/` y correr `npm run images` (no borra las webp de fotos eliminadas: hay que borrarlas a mano y sacarlas de `images.json`)
- Nunca poner archivos a mano en `dist/`: se regenera en cada build
