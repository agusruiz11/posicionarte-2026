import { RUTAS, SITE_URL } from '@/data/marca';

/**
 * Sitemap generado desde `src/data/marca.js`.
 *
 * Antes era un XML estático en `public/`: cada ruta nueva había que acordarse
 * de agregarla a mano, y no tenía `lastmod`, así que Google no tenía señal de
 * frescura. Ahora sumar una ruta al array de RUTAS alcanza.
 */
export default function sitemap() {
  const ahora = new Date();
  return RUTAS.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: ahora,
    changeFrequency: r.frecuencia,
    priority: r.prioridad,
  }));
}
