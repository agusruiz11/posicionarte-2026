export const metadata = {
  title: 'Agencia de Marketing Digital Argentina | Posicionarte',
  description:
    'Construimos el sistema digital de tu negocio: web, ads, SEO, IA y automatización. Sin paquetes rígidos, a medida.',
  openGraph: {
    title: 'Agencia de Marketing Digital Argentina | Posicionarte',
    description:
      'Construimos el sistema digital de tu negocio: web, ads, SEO, IA y automatización. Sin paquetes rígidos, a medida.',
    url: 'https://posicionarte.online',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Posicionarte Online - Agencia de Marketing Digital',
      },
    ],
  },
  twitter: {
    title: 'Agencia de Marketing Digital Argentina | Posicionarte',
    description:
      'Construimos el sistema digital de tu negocio: web, ads, SEO, IA y automatización. Sin paquetes rígidos, a medida.',
    images: ['/og-image.jpg'],
  },
};

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ServiceConfigurator from '@/components/ServiceConfigurator';
import Services from '@/components/Services';
import IASection from '@/components/IASection';
import Methodology from '@/components/Methodology';
import CaseStudies from '@/components/CaseStudies';
import Testimonials from '@/components/Testimonials';
import Plans from '@/components/Plans';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <ServiceConfigurator />
        <Services />
        <IASection />
        <Methodology />
        <CaseStudies />
        {/* <Testimonials /> */}
        <Plans />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
