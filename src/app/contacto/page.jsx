import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ContactSection from '@/components/ContactSection';

export const metadata = {
  title: 'Contacto',
  description:
    'Contactá a Posicionarte Online. Formulario de contacto y WhatsApp para agendar una reunión y potenciar tu negocio.',
  openGraph: {
    title: 'Contacto | Posicionarte Online',
    description: 'Estamos listos para escuchar sobre tu proyecto. Completá el formulario o escribinos por WhatsApp.',
  },
};

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
