import Navbar from '@/components/Navbar';
import MuroDeMarcas from '@/components/MuroDeMarcas';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Section from '@/components/Section';
import { CLIENTES_PUBLICOS } from '@/data/clientes';

/**
 * La metadata anterior prometía "Métricas y casos de éxito" y la página no
 * tenía ni una métrica. Esto describe lo que hay: las marcas, qué se hizo con
 * cada una y el enlace para verlo. Cuando existan casos con resultados, se
 * suman abajo del muro y la metadata cambia con ellos.
 */
export const metadata = {
  title: 'Marcas con las que trabajamos',
  description:
    'Sitios web, campañas y contenido para marcas de distintos rubros: inmobiliarias, construcción, salud, deporte, e-commerce y más. Cada trabajo con su enlace para verlo en vivo.',
  alternates: { canonical: '/casos' },
  openGraph: {
    url: '/casos',
    title: 'Marcas con las que trabajamos | Posicionarte Online',
    description:
      'Sitios web, campañas y contenido para marcas de distintos rubros. Cada trabajo con su enlace para verlo en vivo.',
  },
};

export default function CasosPage() {
  const activos = CLIENTES_PUBLICOS.filter((c) => c.estado === 'activo').length;

  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <main id="main-content">
        <Section aria-labelledby="casos-heading" className="pt-28 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-4">Marcas que confían</p>
            <h1 id="casos-heading" className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight">
              Con quiénes <span className="text-brand">trabajamos</span>.
            </h1>
            <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed">
              {CLIENTES_PUBLICOS.length} marcas de rubros distintos. {activos} son clientes hoy; el resto son
              trabajos entregados que siguen online. Cada uno con su enlace, para que lo veas vos y no nos
              creas por lo que decimos.
            </p>
          </div>
        </Section>
        <MuroDeMarcas />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
