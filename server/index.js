/**
 * Servidor de PRODUCCIÓN (Hostinger, app Node.js).
 * - Sirve la web compilada desde dist/ (npm run build)
 * - Atiende /api/* (pagos Payway / Mercado Pago y avisos de venta)
 *
 *   npm run build && npm start
 *
 * Variables: se cargan en hPanel (Node.js → Variables de entorno). En local lee .env.
 */
import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import checkout from '../api/checkout.js';
import mpPreference from '../api/mp-preference.js';
import mpWebhook from '../api/mp-webhook.js';
import mpStatus from '../api/mp-status.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', true);

// API
app.use('/api', express.json({ limit: '50kb' }));
app.post('/api/checkout', checkout);
app.post('/api/mp-preference', mpPreference);
app.post('/api/mp-webhook', mpWebhook);
app.get('/api/mp-status', mpStatus);
app.all('/api/*splat', (_req, res) => res.status(404).json({ ok: false, message: 'No encontrado' }));

// Web: archivos con hash (assets/) se cachean 1 año; el resto 1 hora; index.html sin caché
app.use('/assets', express.static(path.join(DIST, 'assets'), { immutable: true, maxAge: '1y' }));
app.use(express.static(DIST, { maxAge: '1h', index: false }));
app.get('/{*splat}', (_req, res) => {
  res.set('Cache-Control', 'no-cache');
  res.sendFile(path.join(DIST, 'index.html'));
});

const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`CARMOTION en puerto ${PORT} · Payway: ${process.env.PAYWAY_ENV || 'sandbox'}`);
});
