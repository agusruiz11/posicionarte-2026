import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import Footer from '@/components/Footer';
import InmobiliariasLanding from '@/components/InmobiliariasLanding';

import { BENCHMARK } from '@/data/benchmark';

export const metadata = {
  title: `${BENCHMARK.titulo} — Descargá gratis el informe ${BENCHMARK.anio}`,
  description:
    `Análisis de tendencias, precios y comportamiento del mercado inmobiliario argentino. Descargá gratis el ${BENCHMARK.tituloCompleto} de Posicionarte Online.`,
  alternates: { canonical: '/inmobiliarias' },
  openGraph: {
    url: '/inmobiliarias',
    title: `${BENCHMARK.tituloCompleto} | Posicionarte Online`,
    description:
      'Análisis de tendencias, precios y comportamiento del mercado inmobiliario argentino. Descargá gratis el informe.',
  },
};

export default function InmobiliariasPage() {
  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <main id="main-content">
        <InmobiliariasLanding />
      </main>
      <Footer hideForm />
      <WhatsAppButton />
    </div>
  );
}
