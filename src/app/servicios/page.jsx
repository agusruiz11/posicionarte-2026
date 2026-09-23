import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Section from '@/components/Section';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PAGINAS_SERVICIO } from '@/data/servicios';

export const metadata = {
  title: 'Servicios',
  description:
    'Soluciones de marketing digital: Google Ads, Meta Ads, SEO, Diseño Web, Social Media y Estrategia Digital para impulsar tu negocio.',
  alternates: { canonical: '/servicios' },
  openGraph: {
    url: '/servicios',
    title: 'Servicios | Posicionarte Online',
    description:
      'Soluciones de marketing digital: Google Ads, Meta Ads, SEO, Diseño Web, Social Media y Estrategia Digital.',
  },
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <main id="main-content">
        <Section aria-labelledby="servicios-heading" className="pt-28">
          <div className="max-w-5xl mx-auto text-center">
            <h1 id="servicios-heading" className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight">
              Soluciones para cada <span className="text-brand">objetivo</span>.
            </h1>
            <p className="text-lg md:text-xl text-ink-muted max-w-3xl mx-auto">
              Siete servicios que se combinan según lo que tu negocio necesita. Cada uno con su página: para quién es, qué incluye, cómo trabajamos y lo que nos preguntan.
            </p>
          </div>
          <ul className="max-w-5xl mx-auto mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PAGINAS_SERVICIO.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/servicios/${s.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-hairline bg-surface-1 p-6 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div>
                    <h2 className="text-xl font-bold text-ink mb-1">{s.nombre}</h2>
                    <p className="text-base text-ink-muted leading-relaxed">{s.resumen}</p>
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand">
                    Ver servicio
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
        <Services />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
