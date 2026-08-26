import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og-image';

export const alt = 'Contacto — Posicionarte Online';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    etiqueta: 'Contacto',
    titulo: 'Hablemos.',
    bajada: 'Contanos sobre tu proyecto y armamos el plan que necesita.',
  });
}
