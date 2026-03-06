import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';
import InmobiliariasLanding from '@/components/InmobiliariasLanding';

export const metadata = {
  title: 'Benchmark Inmobiliario — Descargá gratis el informe 2025',
  description:
    'Análisis de tendencias, precios y comportamiento del mercado inmobiliario argentino. Descargá gratis el Benchmark Inmobiliario 2025 de Posicionarte Online.',
  openGraph: {
    title: 'Benchmark Inmobiliario 2025 | Posicionarte Online',
    description:
      'Análisis de tendencias, precios y comportamiento del mercado inmobiliario argentino. Descargá gratis el informe.',
  },
};

export default function InmobiliariasPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c0c]">
      <Navbar />
      <main id="main-content">
        <InmobiliariasLanding />
      </main>
      <Footer hideForm />
      <WhatsAppButton />
    </div>
  );
}
