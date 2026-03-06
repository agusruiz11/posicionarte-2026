import Navbar from '@/components/Navbar';
import CaseStudies from '@/components/CaseStudies';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'Casos de estudio',
  description:
    'Resultados reales de clientes que confiaron en Posicionarte: e-commerce, deportes, B2B. Métricas y casos de éxito.',
  openGraph: {
    title: 'Casos de estudio | Posicionarte Online',
    description: 'Resultados reales de clientes que confiaron en nuestra metodología y estrategia para crecer.',
  },
};

export default function CasosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        <section aria-labelledby="casos-heading" className="section-padding bg-white pt-28">
          <div className="max-w-7xl mx-auto text-center">
            <h1 id="casos-heading" className="text-4xl md:text-6xl font-bold text-[#414141] mb-6 tracking-tight">
              Resultados que <span className="text-[#3256D7]">hablan</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
              Clientes que confiaron en nuestra metodología y estrategia para crecer.
            </p>
          </div>
        </section>
        <CaseStudies />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
