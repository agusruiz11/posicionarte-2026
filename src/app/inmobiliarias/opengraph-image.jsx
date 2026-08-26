import { ogImage, OG_SIZE, OG_TYPE } from '@/lib/og-image';
import { BENCHMARK } from '@/data/benchmark';

export const alt = 'Benchmark Inmobiliario — Posicionarte Online';
export const size = OG_SIZE;
export const contentType = OG_TYPE;

export default function Image() {
  return ogImage({
    etiqueta: 'Inmobiliarias',
    titulo: `Descargá gratis el ${BENCHMARK.titulo}`,
    bajada: `Estrategias digitales que están funcionando ahora. ${BENCHMARK.mercado}.`,
  });
}
