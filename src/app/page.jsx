export const metadata = {
  title: 'Agencia de Marketing Digital Argentina | Posicionarte',
  description:
    'Construimos el sistema digital de tu negocio: web, ads, SEO, IA y automatización. Sin paquetes rígidos, a medida.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Agencia de Marketing Digital Argentina | Posicionarte',
    description:
      'Construimos el sistema digital de tu negocio: web, ads, SEO, IA y automatización. Sin paquetes rígidos, a medida.',
    url: '/',
  },
  twitter: {
    title: 'Agencia de Marketing Digital Argentina | Posicionarte',
    description:
      'Construimos el sistema digital de tu negocio: web, ads, SEO, IA y automatización. Sin paquetes rígidos, a medida.',
  },
};

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ServiceConfigurator from '@/components/ServiceConfigurator';
import Services from '@/components/Services';
import IASection from '@/components/IASection';
import Methodology from '@/components/Methodology';
import MuroDeMarcas from '@/components/MuroDeMarcas';
import Plans from '@/components/Plans';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ServiceConfigurator />
        <Services />
        <IASection />
        <Methodology />
        <MuroDeMarcas compacto />
        <Plans />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
