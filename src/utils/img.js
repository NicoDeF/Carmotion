/**
 * Fotos optimizadas generadas por `npm run images` desde originales/ → public/images/opt.
 * Para agregar una foto: ponerla en originales/, correr `npm run images` y usarla por nombre.
 *   img('_MG_3189', 1600)  → '/images/opt/_MG_3189-1600.webp'
 *   srcSet('_MG_3189')     → '... 800w, ... 1600w, ... 2400w'
 *   dims('_MG_3189')       → { w, h } proporción real
 */
import MANIFEST from '../data/images.json';

export const SIZES = [800, 1600, 2400];

export const img = (name, size = 1600) => `/images/opt/${name}-${size}.webp`;

export const srcSet = (name, sizes = SIZES) => sizes.map((s) => `${img(name, s)} ${s}w`).join(', ');

export const dims = (name) => MANIFEST[name] || { w: 4, h: 3 };
