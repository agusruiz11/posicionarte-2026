import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Check, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import { MarcasPorServicio } from '@/components/MuroDeMarcas';
import CtaServicio from '@/components/servicio/CtaServicio';
import FaqServicio from '@/components/servicio/FaqServicio';
import ContactoServicio from '@/components/servicio/ContactoServicio';
import { SelloPartner } from '@/components/Partners';
import { PAGINAS_SERVICIO, servicioPorSlug } from '@/data/servicios';
import { SITE_URL, UBICACION } from '@/data/marca';
import { faqSchema, breadcrumbSchema } from '@/lib/schema';

/**
 * Página de un servicio. Todo el contenido vive en `src/data/servicios.js`;
 * acá solo se ordena. Es un componente de servidor: el HTML llega completo,
 * con las preguntas y respuestas adentro, y los únicos trozos con JavaScript
 * son los botones con tracking, las marcas y el formulario.
 */

export function generateStaticParams() {
  return PAGINAS_SERVICIO.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = servicioPorSlug(params.slug);
  if (!s) return {};
  const path = `/servicios/${s.slug}`;
  return {
    title: s.meta.title,
    description: s.meta.description,
    alternates: { canonical: path },
    openGraph: {
      url: path,
      title: `${s.meta.title} | Posicionarte Online`,
      description: s.meta.description,
    },
  };
}

function JsonLd({ data }) {
  if (!data) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function ServicioPage({ params }) {
  const s = servicioPorSlug(params.slug);
  if (!s) notFound();

  const path = `/servicios/${s.slug}`;
  const relacionados = s.relacionados.map(servicioPorSlug).filter(Boolean);

  const servicioSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${path}#service`,
    name: s.nombre,
    serviceType: s.nombre,
    description: s.meta.description,
    url: `${SITE_URL}${path}`,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: { '@type': 'Country', name: UBICACION.paisNombre },
  };

  return (
    <div className="min-h-screen bg-surface-0">
      <JsonLd data={servicioSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { nombre: 'Inicio', path: '/' },
          { nombre: 'Servicios', path: '/servicios' },
          { nombre: s.nombre, path },
        ])}
      />
      <JsonLd data={faqSchema(s.faq)} />

      <Navbar />
      <main id="main-content">
        {/* Hero */}
        <Section aria-labelledby="servicio-heading" className="pt-28 pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <nav aria-label="Estás en" className="mb-6 text-sm text-ink-muted">
              <ol className="flex items-center justify-center gap-2">
                <li>
                  <Link href="/servicios" className="hover:text-brand transition-colors">
                    Servicios
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-ink font-medium">
                  {s.nombre}
                </li>
              </ol>
            </nav>
            <h1 id="servicio-heading" className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight leading-tight">
              {s.nombre}.{' '}
              <span className="text-brand block">{s.titulo}</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed mb-10">{s.intro}</p>
            <CtaServicio slug={s.slug} nombre={s.nombre} />
          </div>
        </Section>

        {/* Para quién / cuándo no */}
        <Section variant="alt" aria-labelledby="para-quien-heading">
          <div className="max-w-6xl mx-auto grid md:grid-cols-5 gap-10 md:gap-16 items-start">
            <Reveal className="md:col-span-3">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Para quién es</p>
              <h2 id="para-quien-heading" className="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-8">
                Te sirve si…
              </h2>
              <ul className="space-y-5">
                {s.paraQuien.map((item) => (
                  <li key={item} className="flex gap-4 text-lg text-ink leading-relaxed">
                    <Check className="mt-1.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={90} className="md:col-span-2">
              <div className="rounded-3xl border border-hairline bg-surface-2 p-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-ink-subtle mb-3">Y cuándo no</p>
                <p className="text-lg text-ink leading-relaxed">{s.cuandoNo}</p>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Qué incluye */}
        <Section aria-labelledby="incluye-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Qué incluye</p>
              <h2 id="incluye-heading" className="text-3xl md:text-5xl font-bold text-ink tracking-tight">
                Lo que hacemos cada mes, sin letra chica.
              </h2>
            </Reveal>
            <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {s.incluye.map((item, i) => (
                <Reveal as="li" key={item} delay={i * 60} className="rounded-3xl border border-hairline bg-surface-1 p-7">
                  <span className="block text-sm font-semibold text-brand mb-3 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="text-base md:text-lg text-ink leading-relaxed">{item}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>

        {/* Cómo trabajamos */}
        <Section variant="alt" aria-labelledby="proceso-heading">
          <div className="max-w-6xl mx-auto">
            <Reveal className="max-w-3xl mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Cómo trabajamos</p>
              <h2 id="proceso-heading" className="text-3xl md:text-5xl font-bold text-ink tracking-tight">
                Así arranca y así sigue.
              </h2>
            </Reveal>
            <ol className="grid gap-8 md:grid-cols-4">
              {s.proceso.map((paso, i) => (
                <Reveal as="li" key={paso.titulo} delay={i * 80} className="relative pt-6 border-t-2 border-brand/20">
                  {/* La línea llena se alarga con cada paso: 1/4, 2/4, 3/4, completa. */}
                  <span
                    className="absolute -top-[2px] left-0 h-[2px] bg-brand"
                    style={{ width: `${((i + 1) / s.proceso.length) * 100}%` }}
                    aria-hidden="true"
                  />
                  <span className="block text-sm font-semibold text-brand mb-2 tabular-nums">Paso {i + 1}</span>
                  <h3 className="text-xl font-bold text-ink mb-3">{paso.titulo}</h3>
                  <p className="text-base text-ink-muted leading-relaxed">{paso.texto}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </Section>

        <MarcasPorServicio slug={s.slug} titulo={s.nombre} />

        {/* Sellos de partner, solo en los servicios donde vienen al caso. Cada
            uno en su caja, separados: la guía de Tiendanube no permite
            combinarlos en una misma composición sin separación clara. */}
        {s.partners?.length > 0 && (
          <Section aria-labelledby="partners-servicio-heading" padding={false} className="py-14 md:py-16 px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
              <p id="partners-servicio-heading" className="text-sm font-semibold uppercase tracking-widest text-brand mb-6">
                Partners
              </p>
              <ul className="grid gap-6 md:grid-cols-2">
                {s.partners.map((p) => (
                  <li key={p.id} className="rounded-3xl border border-hairline bg-surface-1 p-6">
                    <SelloPartner id={p.id} texto={p.texto} />
                    {p.enlace && (
                      <p className="mt-4 pt-4 border-t border-hairline text-sm text-ink-muted leading-relaxed">
                        <a
                          href={p.enlace}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                          className="font-semibold text-brand hover:text-brand-hover"
                        >
                          {p.enlaceTexto}
                        </a>
                        {p.enlaceNota && <> {p.enlaceNota}</>}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}

        <FaqServicio preguntas={s.faq} nombre={s.nombre} />

        <ContactoServicio slug={s.slug} nombre={s.nombre} />

        {/* Otros servicios */}
        {relacionados.length > 0 && (
          <Section aria-labelledby="relacionados-heading" padding={false} className="py-16 md:py-20 px-6 md:px-10">
            <div className="max-w-6xl mx-auto">
              <h2 id="relacionados-heading" className="text-2xl md:text-3xl font-bold text-ink tracking-tight mb-8">
                Suele ir con
              </h2>
              <ul className="grid gap-6 md:grid-cols-3">
                {relacionados.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/servicios/${r.slug}`}
                      className="group flex h-full flex-col justify-between rounded-3xl border border-hairline bg-surface-1 p-7 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    >
                      <div>
                        <h3 className="text-xl font-bold text-ink mb-2">{r.nombre}</h3>
                        <p className="text-base text-ink-muted leading-relaxed">{r.resumen}</p>
                      </div>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                        Ver servicio
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
        )}
      </main>
      <Footer hideForm />
      <WhatsAppButton />
    </div>
  );
}
