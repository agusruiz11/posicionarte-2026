'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { EVENTS, track } from '@/lib/analytics';
import { CLIENTES_PUBLICOS, RUBROS, ESTADOS, TECNOLOGIAS, rubroDe, desdeAnio } from '@/data/clientes';
import { LOGOS } from '@/data/logos-clientes';
import { SERVICIOS } from '@/data/marca';

/**
 * Muro de marcas.
 *
 * Reemplaza a `CaseStudies.jsx`, que se llamaba "casos de estudio" y era un
 * muro de logos sin un solo caso. Esto es lo que era de verdad, hecho bien:
 * prueba social rápida. Responde a "¿trabajaron con gente de verdad?".
 *
 * Decisiones:
 *
 * - **Placa blanca para todos los logos, en los dos temas.** Hay escudos,
 *   cuadrados rojos, wordmarks dorados y line art negro. Ningún tratamiento
 *   monocromo los unifica sin arruinar a alguno, y en modo oscuro varios
 *   desaparecen sobre negro. Una placa del mismo tamaño para todos es lo único
 *   que garantiza que cada marca se vea como la diseñaron.
 *
 * - **El enlace se ve siempre.** Antes aparecía al hover, y en un celular no
 *   hay hover: cero enlaces visibles en mobile. El "wow" del hover es una
 *   elevación sutil, no esconder información.
 *
 * - **Filtro por rubro, no por servicio.** Un prospecto pregunta "¿trabajaron
 *   con alguien como yo?", no "¿cuántos Google Ads hicieron?". Y el filtro por
 *   servicio devolvía "Google Ads: 3", el peor número posible para mostrar.
 *
 * - **Los chips de servicio usan tokens.** Los anteriores pintaban el color de
 *   marca de cada plataforma sobre un tinte del mismo color, a 10px: entre
 *   1,55:1 y 4,34:1. Ahora es un punto de color con texto en tinta, a 12px.
 *
 * Los datos salen de `data/clientes.js`. Este componente no sabe quién es
 * cliente: solo dibuja lo que le dan.
 */

const SERVICIO_NOMBRE = Object.fromEntries(SERVICIOS.map((s) => [s.slug, s.nombre]));

// Un color por servicio, solo para el punto. El texto siempre va en tinta.
const SERVICIO_PUNTO = {
  'google-ads':     'bg-[#4285F4]',
  'meta-ads':       'bg-[#1877F2]',
  'seo-aeo':        'bg-[#0F9D58]',
  'diseno-web':     'bg-primary',
  'social-content': 'bg-[#E1306C]',
  'estrategia':     'bg-[#F4B400]',
};

function ChipServicio({ slug }) {
  return (
    <li className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted">
      <span className={`inline-block w-1.5 h-1.5 rounded-full ${SERVICIO_PUNTO[slug] || 'bg-ink-subtle'}`} aria-hidden="true" />
      {SERVICIO_NOMBRE[slug] || slug}
    </li>
  );
}

function EtiquetaEstado({ estado }) {
  const claseBase = 'inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full';
  if (estado === 'activo') {
    return (
      <span className={`${claseBase} bg-primary/10 text-brand`}>
        <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
        {ESTADOS.activo.etiqueta}
      </span>
    );
  }
  if (estado === 'desarrollo') {
    return <span className={`${claseBase} bg-surface-1 text-ink-muted border border-hairline`}>{ESTADOS.desarrollo.etiqueta}</span>;
  }
  return <span className={`${claseBase} bg-surface-1 text-ink-muted border border-hairline`}>{ESTADOS.entregado.etiqueta}</span>;
}

// ─── Tarjeta ──────────────────────────────────────────────────────────────────
function TarjetaMarca({ cliente, index }) {
  const logo = LOGOS[cliente.slug];
  const enlace = cliente.sitio || cliente.instagram;
  const etiquetaEnlace = cliente.sitio
    ? (cliente.tecnologia === 'tiendanube' ? 'Ver tienda' : 'Ver sitio')
    : 'Ver perfil';
  const anio = desdeAnio(cliente.desde);

  const registrarClick = () =>
    track(EVENTS.CLICK_CASE_STUDY, {
      client_name: cliente.nombre,
      rubro: cliente.rubro,
      servicio: cliente.servicios[0],
    });

  return (
    <Reveal
      as="article"
      delay={Math.min(index, 8) * 60}
      className="group flex flex-col rounded-3xl border border-hairline bg-surface-2 p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* La placa: misma altura para todos, el logo se centra adentro. El borde
          fino es para modo claro, donde la tarjeta también es blanca y sin él
          la placa no se distingue. */}
      <div className="flex items-center justify-center h-36 rounded-2xl bg-white border border-hairline px-6 mb-5 transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
        {logo && (
          <Image
            src={logo}
            alt={`Logo de ${cliente.nombre}`}
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 90vw"
            className="max-h-24 max-w-[200px] w-auto h-auto object-contain"
          />
        )}
      </div>

      {/* El estado va arriba del nombre, en su propia fila. Al lado del título
          se partía en dos líneas con los nombres largos. */}
      <div className="mb-2">
        <EtiquetaEstado estado={cliente.estado} />
      </div>
      <h3 className="text-lg font-bold text-ink leading-tight mb-1">{cliente.nombre}</h3>
      <p className="text-sm text-ink-muted leading-snug mb-4">{cliente.descripcion}</p>

      <ul className="flex flex-wrap gap-x-3 gap-y-1.5 mb-5" aria-label="Servicios">
        {cliente.servicios.map((s) => <ChipServicio key={s} slug={s} />)}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 pt-4 border-t border-hairline">
        <span className="text-xs text-ink-subtle">
          {rubroDe(cliente.rubro)}
          {anio && ` · desde ${anio}`}
          {cliente.tecnologia && ` · ${TECNOLOGIAS[cliente.tecnologia]}`}
        </span>
        {enlace ? (
          <a
            href={enlace}
            target="_blank"
            rel="noopener noreferrer"
            onClick={registrarClick}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-hover whitespace-nowrap rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {etiquetaEnlace}
            <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">, se abre en una pestaña nueva</span>
          </a>
        ) : (
          <span className="text-sm text-ink-subtle whitespace-nowrap">Pronto online</span>
        )}
      </div>
    </Reveal>
  );
}

// ─── Filtro por rubro ─────────────────────────────────────────────────────────
function FiltroRubros({ activo, onChange, conteo }) {
  const base = 'text-sm font-semibold px-4 py-2 rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';
  const opciones = [{ id: 'todos', nombre: 'Todos' }, ...RUBROS.filter((r) => conteo[r.id])];
  return (
    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar por rubro">
      {opciones.map((r) => (
        <button
          key={r.id}
          type="button"
          onClick={() => onChange(r.id)}
          aria-pressed={activo === r.id}
          className={
            activo === r.id
              ? `${base} bg-primary text-white`
              : `${base} bg-surface-2 text-ink-muted border border-hairline hover:text-ink`
          }
        >
          {r.nombre}
        </button>
      ))}
    </div>
  );
}

// ─── Banda de logos para la home ─────────────────────────────────────────────
export function BandaDeMarcas() {
  const reduced = useReducedMotion();
  const [pausado, setPausado] = useState(false);
  const items = CLIENTES_PUBLICOS;

  return (
    <div
      className="relative overflow-hidden py-4"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-surface-1 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-surface-1 to-transparent" />

      {/* La animación se decide en JS: un estilo inline le gana a `motion-reduce:`
          y el marquee seguía girando para quien pide movimiento reducido. */}
      <div
        className="flex gap-4"
        style={{
          width: 'max-content',
          ...(reduced ? {} : { animation: 'marquee 40s linear infinite', animationPlayState: pausado ? 'paused' : 'running' }),
        }}
      >
        {[0, 1].map((copia) => (
          <ul key={copia} className="flex gap-4" aria-hidden={copia === 1 || undefined}>
            {/* Los logos cuadrados (El Recreo, Cabañas, Fútbol Queens, COA,
                Makena, VES) quedaban chicos con un tope de 48 px de alto en
                una tarjeta de 96. La tarjeta ahora es más alta y el logo puede
                usar 80 px; los apaisados los frena el ancho, así ninguno se
                come la tarjeta. El hover agranda la tarjeta entera. */}
            {items.map((c) => (
              <li
                key={`${c.slug}-${copia}`}
                className="group flex items-center justify-center h-28 w-48 shrink-0 rounded-2xl bg-white border border-hairline px-5 transition-[transform,box-shadow] duration-300 hover:scale-[1.06] hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/50 motion-reduce:transition-none motion-reduce:hover:scale-100"
              >
                {LOGOS[c.slug] && (
                  <Image src={LOGOS[c.slug]} alt={copia === 0 ? c.nombre : ''} sizes="192px" className="max-h-20 max-w-[150px] w-auto h-auto object-contain" />
                )}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

// ─── Marcas de un servicio ────────────────────────────────────────────────────
/**
 * Grilla de las marcas que contrataron un servicio, para `/servicios/[slug]`.
 * Es la prueba concreta de cada página: mismas tarjetas que el muro, sin
 * filtros, sin marquee. Si un servicio no tiene marcas autorizadas, no
 * devuelve nada y la página no muestra la sección.
 */
export function MarcasPorServicio({ slug, titulo }) {
  const marcas = CLIENTES_PUBLICOS.filter((c) => c.servicios.includes(slug));
  if (!marcas.length) return null;
  const activas = marcas.filter((c) => c.estado === 'activo').length;

  return (
    <Section id="marcas" variant="alt" aria-labelledby="marcas-servicio-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Quiénes lo contrataron</p>
          <h2 id="marcas-servicio-heading" className="text-3xl md:text-5xl font-bold text-ink tracking-tight">
            {marcas.length === 1 ? 'Una marca' : `${marcas.length} marcas`} con {titulo}
            {activas > 0 && (
              <span className="block text-ink-muted text-xl md:text-2xl font-normal mt-3">
                {activas === marcas.length
                  ? 'Todas siguen trabajando con nosotros.'
                  : `${activas} ${activas === 1 ? 'sigue' : 'siguen'} trabajando con nosotros hoy.`}
              </span>
            )}
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {marcas.map((c, i) => (
            <TarjetaMarca key={c.slug} cliente={c} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <a href="/casos" className="inline-flex items-center gap-2 text-base font-semibold text-brand hover:text-brand-hover">
            Ver todas las marcas
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </Section>
  );
}

// ─── Sección completa ─────────────────────────────────────────────────────────
export default function MuroDeMarcas({ compacto = false }) {
  const [rubro, setRubro] = useState('todos');

  const conteo = useMemo(() => {
    const c = {};
    for (const cl of CLIENTES_PUBLICOS) c[cl.rubro] = (c[cl.rubro] || 0) + 1;
    return c;
  }, []);

  const visibles = useMemo(
    () => (rubro === 'todos' ? CLIENTES_PUBLICOS : CLIENTES_PUBLICOS.filter((c) => c.rubro === rubro)),
    [rubro],
  );

  const activos = CLIENTES_PUBLICOS.filter((c) => c.estado === 'activo').length;

  if (compacto) {
    return (
      <Section id="marcas" variant="alt" padding={false} className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Marcas que confían</p>
            <h2 className="text-3xl md:text-5xl font-bold text-ink tracking-tight">
              {CLIENTES_PUBLICOS.length} marcas, {activos} trabajando con nosotros hoy.
            </h2>
          </Reveal>
        </div>
        <BandaDeMarcas />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-10 text-center">
          <a href="/casos" className="inline-flex items-center gap-2 text-base font-semibold text-brand hover:text-brand-hover">
            Ver todas las marcas
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </Section>
    );
  }

  return (
    <Section id="marcas" variant="alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <FiltroRubros activo={rubro} onChange={setRubro} conteo={conteo} />

        <p className="sr-only" role="status" aria-live="polite">
          {visibles.length} {visibles.length === 1 ? 'marca' : 'marcas'}
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visibles.map((c, i) => (
            <TarjetaMarca key={c.slug} cliente={c} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
