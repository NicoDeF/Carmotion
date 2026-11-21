/**
 * Servidor local para /api/* en desarrollo.
 * Vite (puerto 3000) hace proxy de /api → este server (puerto 4000).
 * En producción (Vercel) se usa api/checkout.js directamente como función.
 *
 *   npm run dev:api
 */
import 'dotenv/config';
import express from 'express';
import checkout from '../api/checkout.js';

const app = express();
app.use(express.json({ limit: '50kb' }));
app.post('/api/checkout', checkout);

const PORT = Number(process.env.API_PORT) || 4000;
app.listen(PORT, () => {
  console.log(`API local en http://localhost:${PORT} (Payway: ${process.env.PAYWAY_ENV || 'sandbox'})`);
});
