import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Methodology from '@/components/Methodology';
import CaseStudies from '@/components/CaseStudies';
import Testimonials from '@/components/Testimonials';
import CTASection from '@/components/CTASection';
import Plans from '@/components/Plans';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <Helmet>
        <title>Posicionarte Online - Agencia de Marketing Digital</title>
        <meta name="description" content="Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más." />
      </Helmet>
      <div className="min-h-screen bg-white">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <Methodology />
          <CaseStudies />
          <Testimonials />
          <Plans />
          <CTASection />
        </main>
        <Footer />
        <WhatsAppButton />
        <Toaster />
      </div>
    </>
  );
}

export default App;