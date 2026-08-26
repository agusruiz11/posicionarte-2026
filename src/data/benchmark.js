/**
 * Datos del Benchmark Inmobiliario.
 *
 * Antes el año vivía suelto en cinco lugares y estaban desalineados: la
 * metadata de /inmobiliarias, el título del botón y el asunto del mail decían
 * 2025, mientras que el archivo real y el nombre de descarga decían 2026. El
 * visitante veía "2025" en Google y descargaba un PDF "2026".
 *
 * Todo sale de acá. Para publicar la edición siguiente se cambia el año y la
 * ruta del archivo, y el resto del sitio se actualiza solo.
 */

export const BENCHMARK = {
  anio: 2026,
  titulo: 'Benchmark Inmobiliario',
  tituloCompleto: 'Benchmark Inmobiliario Argentina 2026',
  mercado: 'Argentina 2026',
  archivo: '/benchmark-inmobiliario-2026.pdf',
  nombreDescarga: 'Benchmark-Inmobiliario-Posicionarte-2026.pdf',
};

export default BENCHMARK;
