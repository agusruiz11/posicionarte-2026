import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Section from '@/components/Section';

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
              Un conjunto de servicios integrales de marketing digital diseñados para impulsar el crecimiento de tu negocio.
            </p>
          </div>
        </Section>
        <Services />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
