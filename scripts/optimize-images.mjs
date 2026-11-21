/**
 * Genera versiones web de las fotos de originales/ → public/images/opt/
 * (los originales viven fuera de public/ para no inflar el deploy)
 *
 *   npm run images
 *
 * Por cada foto crea:
 *   <nombre>-800.webp   (grilla / tarjetas)
 *   <nombre>-1600.webp  (lightbox / secciones)
 *   <nombre>-2400.webp  (fondos a pantalla completa: hero)
 * y escribe src/data/images.json con { nombre: { w, h } } (proporción real,
 * para reservar el espacio y que la página no "salte" al cargar).
 *
 * Los originales no se modifican. Solo procesa lo que cambió.
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const SRC = 'originales';
const OUT = 'public/images/opt';
const MANIFEST = 'src/data/images.json';
const SIZES = [800, 1600, 2400];
const EXT = /\.(jpe?g|png)$/i;
// logo: se usa tal cual · og-image: vista previa al compartir (public/og-image.jpg, 1200px jpg)
const SKIP = new Set(['logosinletras.png', 'og-image.jpg']);

const base = (f) => f.replace(EXT, '');

await fs.mkdir(OUT, { recursive: true });
const files = (await fs.readdir(SRC)).filter((f) => EXT.test(f) && !SKIP.has(f));

let manifest = {};
try { manifest = JSON.parse(await fs.readFile(MANIFEST, 'utf8')); } catch { /* primera vez */ }

let before = 0;
let after = 0;
for (const file of files) {
  const input = path.join(SRC, file);
  const name = base(file);
  const stat = await fs.stat(input);
  before += stat.size;

  const outputs = SIZES.map((w) => path.join(OUT, `${name}-${w}.webp`));
  const fresh = await Promise.all(outputs.map((o) => fs.stat(o).then((s) => s.mtimeMs >= stat.mtimeMs).catch(() => false)));

  // .rotate() aplica la orientación EXIF (fotos de celular giradas)
  const meta = await sharp(input).rotate().metadata();
  const rotated = (meta.orientation || 1) >= 5;
  const w = rotated ? meta.height : meta.width;
  const h = rotated ? meta.width : meta.height;
  manifest[name] = { w, h };

  if (!fresh.every(Boolean)) {
    for (const [i, size] of SIZES.entries()) {
      await sharp(input)
        .rotate()
        .resize({ width: size, height: size, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: size > 1000 ? 80 : 75 })
        .toFile(outputs[i]);
    }
  }
  const sizes = await Promise.all(outputs.map((o) => fs.stat(o).then((s) => s.size)));
  after += sizes[0];
  console.log(`${file.padEnd(28)} ${(stat.size / 1024).toFixed(0).padStart(6)} KB → ${sizes.map((s) => (s / 1024).toFixed(0) + ' KB').join(' / ')}  (${w}×${h})`);
}

await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + '\n');
console.log(`\nTotal originales: ${(before / 1048576).toFixed(1)} MB → versiones 800px: ${(after / 1048576).toFixed(1)} MB`);
