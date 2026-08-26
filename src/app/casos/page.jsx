import Navbar from '@/components/Navbar';
import CaseStudies from '@/components/CaseStudies';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Section from '@/components/Section';

export const metadata = {
  title: 'Casos de estudio',
  description:
    'Resultados reales de clientes que confiaron en Posicionarte: e-commerce, deportes, B2B. Métricas y casos de éxito.',
  alternates: { canonical: '/casos' },
  openGraph: {
    url: '/casos',
    title: 'Casos de estudio | Posicionarte Online',
    description: 'Resultados reales de clientes que confiaron en nuestra metodología y estrategia para crecer.',
  },
};

export default function CasosPage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <main id="main-content">
        <Section aria-labelledby="casos-heading" className="pt-28">
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="casos-heading" className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight">
              Resultados que <span className="text-brand">hablan</span>.
            </h1>
            <p className="text-lg md:text-xl text-ink-muted max-w-3xl mx-auto">
              Clientes que confiaron en nuestra metodología y estrategia para crecer.
            </p>
          </div>
        </Section>
        <CaseStudies />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
