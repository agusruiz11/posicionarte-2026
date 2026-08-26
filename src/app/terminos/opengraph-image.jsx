import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og-image';

export const alt = 'Posicionarte Online';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    etiqueta: 'Legales',
    titulo: 'Términos de uso',
    bajada: 'Condiciones de uso del sitio de Posicionarte Online.',
  });
}
