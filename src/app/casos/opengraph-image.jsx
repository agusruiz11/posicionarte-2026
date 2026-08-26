import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og-image';

export const alt = 'Clientes y casos de Posicionarte Online';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    etiqueta: 'Casos',
    titulo: 'Resultados que hablan.',
    bajada: 'Proyectos reales de clientes que confiaron en nuestra metodología.',
  });
}
