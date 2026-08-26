/**
 * Datos de la marca y de contacto.
 *
 * Un solo lugar. Antes el handle de Instagram estaba escrito de dos formas
 * distintas dentro del mismo repo (`posicionarteonline` en el JSON-LD del
 * layout, `posicionarte.online` en el navbar y el footer), y el teléfono vivía
 * repetido dentro de cuatro enlaces de WhatsApp.
 *
 * Todo lo que sea un dato de la agencia sale de acá: metadata, JSON-LD,
 * footer, enlaces sociales y de WhatsApp.
 */

export const SITE_URL = 'https://posicionarte.online';

export const MARCA = {
  nombre: 'Posicionarte Online',
  nombreCorto: 'Posicionarte',
  claim: 'Sin paquetes. A medida.',
  descripcion:
    'Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  fundacion: '2023',
  idioma: 'es-AR',
};

export const CONTACTO = {
  // E.164, que es el formato que pide schema.org y el que usa wa.me
  telefono: '+5491172360193',
  telefonoVisible: '+54 9 11 7236-0193',
  whatsapp: '5491172360193',
  // La casilla que se publica y que el equipo revisa a diario.
  email: 'agencia@posicionarte.online',
  // Remitente de los mails automáticos de lead. Existe, pero se lee menos.
  emailRemitente: 'contacto@posicionarte.online',
  crm: 'https://crm.posicionarte.online',
};

/**
 * La agencia trabaja 100% online: no hay oficina que reciba gente y no van a
 * tener perfil de Google Business. Por eso no se declara dirección postal —
 * ni en el schema ni en el footer. Se indica la zona de origen y el país, que
 * es lo que sí es cierto y lo que ubica a la marca.
 */
export const UBICACION = {
  pais: 'AR',
  paisNombre: 'Argentina',
  zona: 'Caballito, CABA',
  visible: 'Caballito, CABA — Argentina',
  remoto: true,
};

export const HORARIOS = [
  // Confirmado por Posi. Va al JSON-LD como openingHoursSpecification.
  { dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], desde: '09:00', hasta: '18:00' },
];

/**
 * Perfiles sociales. Van al `sameAs` del JSON-LD, que es lo que Google usa
 * para resolver la entidad "Posicionarte Online" y vincularla con sus redes.
 *
 * El handle correcto de Instagram es @posicionarte.online, confirmado por Posi.
 * El JSON-LD viejo del layout declaraba `posicionarteonline`, que no existe.
 */
export const REDES = {
  instagram: 'https://www.instagram.com/posicionarte.online/',
  linkedin: 'https://www.linkedin.com/company/posicionarte-online',
  facebook: 'https://www.facebook.com/posicionarteonline',
};

export const SERVICIOS = [
  { slug: 'google-ads', nombre: 'Google Ads', resumen: 'Captar demanda que ya existe.' },
  { slug: 'meta-ads', nombre: 'Meta Ads', resumen: 'Generar demanda y reconocimiento.' },
  { slug: 'seo-aeo', nombre: 'SEO / AEO', resumen: 'Visibilidad orgánica, incluyendo buscadores con IA.' },
  { slug: 'diseno-web', nombre: 'Diseño Web', resumen: 'Sitios rápidos, medibles y orientados a conversión.' },
  { slug: 'social-content', nombre: 'Social Media & Content', resumen: 'Presencia consistente con criterio.' },
  { slug: 'estrategia', nombre: 'Estrategia Digital', resumen: 'El plan antes que las herramientas.' },
];

/** Rutas públicas. Alimenta el sitemap y el llms.txt. */
export const RUTAS = [
  { path: '/', prioridad: 1.0, frecuencia: 'monthly' },
  { path: '/servicios', prioridad: 0.9, frecuencia: 'monthly' },
  { path: '/casos', prioridad: 0.8, frecuencia: 'monthly' },
  { path: '/inmobiliarias', prioridad: 0.9, frecuencia: 'monthly' },
  { path: '/contacto', prioridad: 0.7, frecuencia: 'yearly' },
  { path: '/privacidad', prioridad: 0.3, frecuencia: 'yearly' },
  { path: '/terminos', prioridad: 0.3, frecuencia: 'yearly' },
];
