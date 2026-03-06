import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ServiceConfigurator from '@/components/ServiceConfigurator';
import Services from '@/components/Services';
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
      <main>
        <Hero />
        <About />
        <ServiceConfigurator />
        <Services />
        <Methodology />
        <CaseStudies />
        <Testimonials />
        <Plans />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
