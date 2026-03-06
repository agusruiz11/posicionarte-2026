import Navbar from '@/components/Navbar';
import Services from '@/components/Services';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export const metadata = {
  title: 'Servicios',
  description:
    'Soluciones de marketing digital: Google Ads, Meta Ads, SEO, Diseño Web, Social Media y Estrategia Digital para impulsar tu negocio.',
  openGraph: {
    title: 'Servicios | Posicionarte Online',
    description:
      'Soluciones de marketing digital: Google Ads, Meta Ads, SEO, Diseño Web, Social Media y Estrategia Digital.',
  },
};

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <section aria-labelledby="servicios-heading" className="section-padding bg-white pt-28">
          <div className="max-w-5xl mx-auto text-center">
            <h1 id="servicios-heading" className="text-4xl md:text-6xl font-bold text-[#414141] mb-6 tracking-tight">
              Soluciones para cada <span className="text-[#3256D7]">objetivo</span>.
            </h1>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
              Un conjunto de servicios integrales de marketing digital diseñados para impulsar el crecimiento de tu negocio.
            </p>
          </div>
        </section>
        <Services />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
