/**
 * Servidor local para /api/* en desarrollo.
 * Vite (puerto 3000) hace proxy de /api → este server (puerto 4000).
 * En producción (Vercel) cada archivo de api/ es una función.
 *
 *   npm run dev:api
 */
import 'dotenv/config';
import express from 'express';
import checkout from '../api/checkout.js';
import mpPreference from '../api/mp-preference.js';
import mpWebhook from '../api/mp-webhook.js';
import mpStatus from '../api/mp-status.js';

const app = express();
app.use(express.json({ limit: '50kb' }));
app.post('/api/checkout', checkout);
app.post('/api/mp-preference', mpPreference);
app.post('/api/mp-webhook', mpWebhook);
app.get('/api/mp-status', mpStatus);

const PORT = Number(process.env.API_PORT) || 4000;
app.listen(PORT, () => {
  console.log(`API local en http://localhost:${PORT}`);
  console.log(`  Payway: ${process.env.PAYWAY_ENV || 'sandbox'} · Mercado Pago: ${process.env.MP_ACCESS_TOKEN ? 'configurado' : 'sin token'}`);
});
