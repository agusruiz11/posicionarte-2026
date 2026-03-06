import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';

const SITE_URL = 'https://posicionarte.online';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Posicionarte Online',
  description:
    'Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  sameAs: [
    'https://www.linkedin.com/company/posicionarte-online',
    'https://www.instagram.com/posicionarteonline',
    'https://www.facebook.com/posicionarteonline',
  ],
  serviceType: ['Google Ads', 'Meta Ads', 'SEO', 'Diseño Web', 'Social Media', 'Estrategia Digital'],
  areaServed: 'AR',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Posicionarte Online - Agencia de Marketing Digital',
    template: '%s | Posicionarte Online',
  },
  description:
    'Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más.',
  icons: {
    icon: '/favicon.png',
    type: 'image/png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: 'Posicionarte Online',
    title: 'Posicionarte Online - Agencia de Marketing Digital',
    description:
      'Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más.',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: 'Posicionarte Online',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posicionarte Online - Agencia de Marketing Digital',
    description:
      'Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más.',
    images: ['/favicon.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
