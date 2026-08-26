import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og-image';

export const alt = 'Posicionarte Online — Agencia de marketing digital';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    titulo: 'Construimos el sistema digital de tu negocio.',
    bajada: 'Web, ads, SEO, contenido, IA y automatización. Sin paquetes rígidos.',
  });
}
