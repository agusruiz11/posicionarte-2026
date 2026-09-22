/**
 * Cartera de clientes. Fuente única para el muro de marcas.
 *
 * Antes los clientes vivían adentro de `CaseStudies.jsx`, mezclados con el
 * JSX: cada alta o baja era tocar un componente y arriesgar el build, y no
 * había forma de ocultar a alguien sin borrarlo. Acá cambiar la cartera es
 * editar datos.
 *
 * Reglas que codifica este archivo:
 *
 * - `autorizado: false` oculta la marca sin borrarla. Publicar el nombre de un
 *   cliente sin su OK es un problema real, no formal.
 * - `estado` dice qué se puede afirmar. `activo` es cliente hoy. `entregado`
 *   es un trabajo terminado, el cliente ya no paga y el sitio sigue online: se
 *   muestra el trabajo, no se promete relación. `desarrollo` es un trabajo en
 *   curso sin nada para enlazar todavía.
 * - `rubro` es el filtro que un prospecto usa de verdad: "¿trabajaron con
 *   alguien como yo?". El filtro por servicio que había antes devolvía
 *   "Google Ads: 3", que es el peor número posible para mostrar.
 * - `servicios` usa los mismos slugs que `SERVICIOS` en marca.js. FULL POSI
 *   no es un servicio sino una modalidad, así que se desglosa en lo que
 *   incluye.
 * - `grupo` enlaza marcas de un mismo dueño (Blindex y Ekoglass). No cambia
 *   nada visible por ahora; queda para no perder el dato.
 *
 * Los logos viven aparte, en `logos-clientes.js`, porque son imports
 * estáticos de imágenes y este archivo tiene que poder leerse en el servidor.
 */

export const RUBROS = [
  { id: 'inmobiliaria',   nombre: 'Inmobiliaria' },
  { id: 'construccion',   nombre: 'Construcción y arquitectura' },
  { id: 'salud',          nombre: 'Salud y estética' },
  { id: 'educacion',      nombre: 'Educación' },
  { id: 'deporte',        nombre: 'Deporte' },
  { id: 'ecommerce',      nombre: 'E-commerce' },
  { id: 'turismo',        nombre: 'Turismo' },
  { id: 'profesionales',  nombre: 'Servicios profesionales' },
  { id: 'tecnologia',     nombre: 'Tecnología' },
  { id: 'entretenimiento', nombre: 'Entretenimiento y música' },
];

export const ESTADOS = {
  activo:     { etiqueta: 'Cliente actual' },
  entregado:  { etiqueta: 'Trabajo entregado' },
  desarrollo: { etiqueta: 'En desarrollo' },
};

export const TECNOLOGIAS = {
  react:      'React / Next.js',
  wordpress:  'WordPress',
  tiendanube: 'Tienda Nube',
};

export const CLIENTES = [
  // ── Activos ────────────────────────────────────────────────────────────────
  {
    slug: 'coa',
    nombre: 'Sello Ambiental COA',
    descripcion: 'Comisión de Sostenibilidad en el Deporte del Comité Olímpico Argentino',
    rubro: 'deporte',
    servicios: ['diseno-web'],
    tecnologia: 'wordpress',
    estado: 'activo',
    desde: '2025-04',
    sitio: 'https://selloambientalcoa.org.ar/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'futbol-queens',
    nombre: 'Fútbol Queens',
    descripcion: 'Fútbol femenino en Buenos Aires',
    rubro: 'deporte',
    servicios: ['google-ads', 'meta-ads', 'social-content'],
    tecnologia: null,
    estado: 'activo',
    desde: '2025-02',
    sitio: 'https://futbolqueens.com/',
    instagram: 'https://www.instagram.com/futbolqueens/',
    autorizado: true,
  },
  {
    slug: 'maxcer',
    nombre: 'Maxcer',
    descripcion: 'Servicios eléctricos profesionales',
    rubro: 'construccion',
    servicios: ['google-ads', 'diseno-web'],
    tecnologia: 'react',
    estado: 'activo',
    desde: '2025-04',
    sitio: 'https://maxcer.com.ar/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'florida-aventura',
    nombre: 'Florida Aventura',
    descripcion: 'Alquiler de autos en Florida, Estados Unidos',
    rubro: 'turismo',
    servicios: ['diseno-web', 'google-ads', 'meta-ads', 'social-content'],
    tecnologia: 'react',
    estado: 'activo',
    desde: '2025-07',
    sitio: 'https://www.floridaaventura.com/',
    instagram: 'https://www.instagram.com/floridaaventura/',
    autorizado: true,
  },
  {
    slug: 'miguel-dodorico',
    nombre: "Miguel D'Odorico",
    descripcion: 'Inmobiliaria en Buenos Aires',
    rubro: 'inmobiliaria',
    servicios: ['google-ads', 'meta-ads', 'social-content'],
    tecnologia: null,
    estado: 'activo',
    desde: '2025-10',
    sitio: 'https://www.migueldodorico.com/',
    instagram: 'https://www.instagram.com/migueldodorico/',
    autorizado: true,
  },
  {
    slug: 'sustain',
    nombre: 'Sustain',
    descripcion: 'Infraestructura de impacto ambiental sobre blockchain',
    rubro: 'tecnologia',
    servicios: ['diseno-web'],
    tecnologia: 'react',
    estado: 'activo',
    desde: '2026-03',
    sitio: 'https://sustaintoken.org/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'sanyser',
    nombre: 'Sanyser',
    descripcion: 'Sanitarios y servicios para obra',
    rubro: 'construccion',
    servicios: ['diseno-web', 'social-content'],
    tecnologia: 'react',
    estado: 'activo',
    desde: '2026-03',
    sitio: 'https://sanyser.com.ar/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'sonido-outflow',
    nombre: 'Outflow',
    descripcion: 'Escuela de DJ y alquiler de sonido',
    rubro: 'entretenimiento',
    servicios: ['google-ads', 'diseno-web', 'social-content'],
    tecnologia: 'react',
    estado: 'activo',
    desde: '2026-06',
    sitio: 'https://outflow.com.ar/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'piel-y-estetica',
    nombre: 'Centro Piel y Estética',
    descripcion: 'Clínica de dermatología y estética en zona norte',
    rubro: 'salud',
    servicios: ['google-ads', 'meta-ads', 'social-content'],
    tecnologia: null,
    estado: 'activo',
    desde: null,
    sitio: 'https://www.pielyestetica.com/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'renoir',
    nombre: 'Renoir',
    descripcion: 'Anteojos de sol, venta online',
    rubro: 'ecommerce',
    servicios: ['meta-ads'],
    tecnologia: null,
    estado: 'activo',
    desde: '2026-07',
    sitio: 'https://renoir.ar/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'makena',
    nombre: 'Makena',
    descripcion: 'Club y cantina con música en vivo',
    rubro: 'entretenimiento',
    servicios: ['meta-ads'],
    tecnologia: null,
    estado: 'activo',
    desde: '2026-07',
    sitio: null,
    instagram: 'https://www.facebook.com/makenaclub/',
    autorizado: true,
  },
  {
    slug: 'tienda-de-puntos',
    nombre: 'Tienda de Puntos',
    descripcion: 'Programa de puntos y fidelización para comercios',
    rubro: 'tecnologia',
    servicios: ['google-ads', 'meta-ads', 'social-content'],
    tecnologia: null,
    estado: 'activo',
    desde: '2026-09',
    sitio: 'https://tiendadepuntos.com/',
    instagram: null,
    autorizado: true,
  },

  // ── En desarrollo ──────────────────────────────────────────────────────────
  {
    slug: 'blindex',
    nombre: 'Blindex',
    descripcion: 'Vidrios y aberturas',
    rubro: 'construccion',
    servicios: ['diseno-web'],
    tecnologia: 'react',
    estado: 'desarrollo',
    desde: '2026-08',
    sitio: null,
    instagram: null,
    grupo: 'conejero',
    autorizado: true,
  },
  {
    slug: 'ekoglass',
    nombre: 'Ekoglass',
    descripcion: 'Doble vidriado hermético',
    rubro: 'construccion',
    servicios: ['diseno-web'],
    tecnologia: 'react',
    estado: 'desarrollo',
    desde: '2026-08',
    sitio: null,
    instagram: null,
    grupo: 'conejero',
    autorizado: true,
  },

  // ── Trabajos entregados ────────────────────────────────────────────────────
  {
    slug: 'take-off',
    nombre: 'Take Off English',
    descripcion: 'Academia de inglés',
    rubro: 'educacion',
    servicios: ['diseno-web', 'google-ads'],
    tecnologia: 'react',
    estado: 'entregado',
    desde: '2025-12',
    sitio: 'https://takeoffenglish.ar/',
    instagram: 'https://www.instagram.com/_takeoffenglish/',
    autorizado: true,
  },
  {
    slug: 'vuotto',
    nombre: 'Estudio Vuotto',
    descripcion: 'Estudio jurídico especializado en sucesiones',
    rubro: 'profesionales',
    servicios: ['diseno-web', 'google-ads'],
    tecnologia: 'wordpress',
    estado: 'entregado',
    desde: '2024-10',
    sitio: 'https://www.estudiovuotto.com.ar/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'tesio-vuotto',
    nombre: 'Tesio & Vuotto',
    descripcion: 'Consultores asociados',
    rubro: 'profesionales',
    servicios: ['diseno-web'],
    tecnologia: 'wordpress',
    estado: 'entregado',
    desde: null,
    sitio: 'https://tesioyvuottoestudio.com/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'lizze',
    nombre: 'Lizze',
    descripcion: 'Tienda online de moda',
    rubro: 'ecommerce',
    servicios: ['diseno-web', 'google-ads'],
    tecnologia: 'tiendanube',
    estado: 'entregado',
    desde: null,
    sitio: 'https://lizze.ar/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'cerrame-la-ocho',
    nombre: 'Cerrame la Ocho',
    descripcion: 'Podcast de gastronomía y competitividad',
    rubro: 'entretenimiento',
    servicios: ['diseno-web'],
    tecnologia: 'react',
    estado: 'entregado',
    desde: null,
    sitio: 'https://cerramelaocho.com/',
    instagram: null,
    grupo: 'conejero',
    autorizado: true,
  },
  {
    slug: 'el-recreo',
    nombre: 'El Recreo Fútbol',
    descripcion: 'Canchas de fútbol',
    rubro: 'deporte',
    servicios: ['diseno-web'],
    tecnologia: 'react',
    estado: 'entregado',
    desde: null,
    sitio: 'https://elrecreofutbol.com/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'cabanas-arcangeles',
    nombre: 'Cabañas Arcángeles',
    descripcion: 'Cabañas en Bariloche, Lago Gutiérrez',
    rubro: 'turismo',
    servicios: ['diseno-web'],
    tecnologia: 'react',
    estado: 'entregado',
    desde: null,
    sitio: 'https://xn--cabaasarcangeles-9tb.com/',
    instagram: null,
    autorizado: true,
  },
  {
    slug: 'ves-arquitectura',
    nombre: 'VES Arquitectura',
    descripcion: 'Estudio de arquitectura',
    rubro: 'construccion',
    servicios: ['diseno-web'],
    tecnologia: 'wordpress',
    estado: 'entregado',
    desde: null,
    sitio: 'https://vesarquitectura.com.ar/',
    instagram: null,
    autorizado: true,
  },
];

/** Los que se pueden mostrar, en el orden en que están definidos. */
export const CLIENTES_PUBLICOS = CLIENTES.filter((c) => c.autorizado);

export function rubroDe(id) {
  return RUBROS.find((r) => r.id === id)?.nombre || id;
}

/** "Desde 2025" a partir de 'YYYY-MM'. */
export function desdeAnio(desde) {
  return desde ? desde.slice(0, 4) : null;
}
