import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og-image';

export const alt = 'Posicionarte Online';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    etiqueta: 'Legales',
    titulo: 'Política de privacidad',
    bajada: 'Qué datos recolectamos, para qué los usamos y cómo ejercer tus derechos.',
  });
}
