import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og-image';

export const alt = 'Servicios de Posicionarte Online';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    etiqueta: 'Servicios',
    titulo: 'Soluciones para cada objetivo.',
    bajada: 'Google Ads, Meta Ads, SEO/AEO, Diseño Web, Contenido y Estrategia.',
  });
}
