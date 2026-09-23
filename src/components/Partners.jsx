import React from 'react';
import hostingerClaro from '@/assets/images/partners/hostinger-partner-claro.svg';
import hostingerOscuro from '@/assets/images/partners/hostinger-partner-oscuro.svg';
import tiendanubePositivo from '@/assets/images/partners/tiendanube-partner-silver-positivo.svg';
import tiendanubeNegativo from '@/assets/images/partners/tiendanube-partner-silver-negativo.svg';

/**
 * Sellos de partner. Los archivos son los oficiales de cada programa y se
 * usan tal cual: sin recolorear, sin recortar, sin texto encima.
 *
 * Reglas que vienen de las guías de uso y que este componente respeta:
 *
 *  - Tiendanube (guía Silver): tamaño mínimo 80 px de ancho, zona de respeto
 *    alrededor equivalente a la altura de la "T" del logotipo, versión
 *    positiva sobre fondos claros y negativa sobre oscuros, y nunca combinado
 *    con otros sellos de partner "en la misma composición sin separación
 *    visual clara". Por eso cada sello va en su propia caja, con aire y un
 *    separador entre ambos.
 *  - Hostinger: pastilla blanca o negra según el fondo; acá se elige la que
 *    contrasta con el tema (negra sobre claro, blanca sobre oscuro).
 *
 * El texto de al lado usa las frases que Tiendanube pide para el nivel Silver
 * ("agencia partner acreditada", "ecosistema oficial") y evita las que prohíbe
 * ("elite", "premium", "exclusiva", "una de las mejores").
 *
 * El cambio claro/oscuro es por CSS (`dark:` del tema), así el servidor manda
 * las dos versiones y no hay parpadeo al hidratar.
 */

const PARTNERS = [
  {
    id: 'tiendanube',
    nombre: 'Tiendanube Partner Silver',
    alt: 'Sello Tiendanube Partner Silver',
    claro: tiendanubePositivo,
    oscuro: tiendanubeNegativo,
    // 497x180: a 44 px de alto son 121 px de ancho, por encima del mínimo de 80.
    alto: 'h-11',
    texto: 'Agencia partner acreditada del Programa de Agencias de Tiendanube.',
    href: 'https://www.tiendanube.com/socios',
  },
  {
    id: 'hostinger',
    nombre: 'Hostinger Partner',
    alt: 'Sello Hostinger Partner',
    claro: hostingerOscuro,
    oscuro: hostingerClaro,
    alto: 'h-11',
    texto: 'Socio verificado del programa de agencias de Hostinger.',
    href: 'https://www.hostinger.com/ar/pro',
  },
];

function Sello({ p }) {
  return (
    <div className="flex items-center gap-5 py-2">
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-label={`${p.nombre} (se abre en otra pestaña)`}
      >
        {/* Dos <img> y CSS decide cuál se ve. Son SVG estáticos: no hace falta
            next/image, no hay nada que optimizar. */}
        <img src={p.claro.src} width={p.claro.width} height={p.claro.height} alt={p.alt} className={`${p.alto} w-auto dark:hidden`} loading="lazy" decoding="async" />
        <img src={p.oscuro.src} width={p.oscuro.width} height={p.oscuro.height} alt="" aria-hidden="true" className={`${p.alto} w-auto hidden dark:block`} loading="lazy" decoding="async" />
      </a>
      <p className="text-sm text-ink-muted leading-snug max-w-[26ch]">{p.texto}</p>
    </div>
  );
}

/**
 * Franja para el footer: título chico y los dos sellos separados por una línea.
 */
export default function Partners({ className = '' }) {
  return (
    <div className={className} aria-labelledby="partners-heading">
      <h3 id="partners-heading" className="text-sm font-semibold text-ink mb-4">
        Partners
      </h3>
      <ul className="flex flex-col sm:flex-row sm:items-stretch gap-6 sm:gap-0 sm:divide-x divide-hairline">
        {PARTNERS.map((p) => (
          <li key={p.id} className="sm:pr-10 sm:[&:not(:first-child)]:pl-10">
            <Sello p={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Un solo sello con una frase, para meter en una página donde viene al caso
 * (Diseño Web habla de Tienda Nube y de hosting).
 */
export function SelloPartner({ id, texto }) {
  const p = PARTNERS.find((x) => x.id === id);
  if (!p) return null;
  return <Sello p={{ ...p, texto: texto ?? p.texto }} />;
}
