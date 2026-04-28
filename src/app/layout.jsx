import '@/app/globals.css';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-display',
  display: 'swap',
});

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
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Posicionarte Online - Agencia de Marketing Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posicionarte Online - Agencia de Marketing Digital',
    description:
      'Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#0c0c0c] dark:text-white transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#3256D7] focus:text-white focus:rounded-full focus:text-sm focus:font-semibold"
          >
            Saltar al contenido principal
          </a>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
