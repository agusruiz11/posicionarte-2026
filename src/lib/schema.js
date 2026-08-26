/**
 * JSON-LD.
 *
 * Antes había un solo bloque `LocalBusiness` sin teléfono, sin dirección, sin
 * horarios y sin `priceRange` — justo los campos que Google usa para armar el
 * panel local. Acá quedan los tres grafos que corresponden hoy y un
 * constructor de `FAQPage` para cuando existan las preguntas.
 *
 * Regla: el structured data tiene que describir lo que la página muestra. No
 * se declara un `FAQPage` sin preguntas visibles, ni `AggregateRating` sin
 * reseñas reales — eso es penalización de Google, no un atajo.
 */

import { MARCA, CONTACTO, UBICACION, HORARIOS, REDES, SERVICIOS, SITE_URL } from '@/data/marca';

const sameAs = Object.values(REDES).filter(Boolean);

/**
 * Los horarios van en el `contactPoint`, no en un `openingHoursSpecification`.
 * Esa propiedad pertenece a `LocalBusiness` y describe cuándo abre un local;
 * acá lo que existe es una franja en la que se atiende, no una puerta.
 */
function horariosDeAtencion() {
  if (!HORARIOS?.length) return undefined;
  return HORARIOS.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.dias,
    opens: h.desde,
    closes: h.hasta,
  }));
}

/**
 * La agencia es 100% remota: no hay local, no hay dirección postal y no van a
 * tener perfil de Google Business. Por eso NO se declara `LocalBusiness` ni
 * `ProfessionalService` con dirección: sería reclamar una presencia local que
 * no existe, y Google penaliza el structured data que no se corresponde con la
 * realidad del negocio.
 *
 * En su lugar, una `Organization` con su catálogo de servicios y el área que
 * cubre. Es lo mismo que hace cualquier agencia distribuida.
 */
const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: MARCA.nombre,
  alternateName: MARCA.nombreCorto,
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: MARCA.logo },
  image: MARCA.logo,
  description: MARCA.descripcion,
  slogan: MARCA.claim,
  foundingDate: MARCA.fundacion,
  email: CONTACTO.email,
  telephone: CONTACTO.telefono,
  sameAs,
  knowsLanguage: ['es-AR'],
  areaServed: { '@type': 'Country', name: UBICACION.paisNombre },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: CONTACTO.telefono,
    email: CONTACTO.email,
    contactType: 'sales',
    availableLanguage: ['es'],
    areaServed: UBICACION.pais,
    ...(horariosDeAtencion() && { hoursAvailable: horariosDeAtencion() }),
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de marketing digital',
    itemListElement: SERVICIOS.map((s) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: s.nombre,
        description: s.resumen,
        serviceType: s.nombre,
        provider: { '@id': `${SITE_URL}/#organization` },
        areaServed: { '@type': 'Country', name: UBICACION.paisNombre },
      },
    })),
  },
};

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: MARCA.nombre,
  description: MARCA.descripcion,
  inLanguage: MARCA.idioma,
  publisher: { '@id': `${SITE_URL}/#organization` },
};

/** Grafo que va en el layout, en todas las páginas. */
export const schemaSitio = {
  '@context': 'https://schema.org',
  '@graph': [organization, website],
};

/**
 * Constructor de FAQPage. Usarlo solo cuando las preguntas estén visibles en
 * la página: el structured data tiene que reflejar el contenido, no agregarlo.
 *
 *   faqSchema([{ pregunta: '…', respuesta: '…' }])
 */
export function faqSchema(preguntas = []) {
  if (!preguntas.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: preguntas.map((p) => ({
      '@type': 'Question',
      name: p.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: p.respuesta },
    })),
  };
}

/** Constructor de BreadcrumbList, para cuando existan `/servicios/[slug]` y `/casos/[slug]`. */
export function breadcrumbSchema(items = []) {
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.nombre,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
