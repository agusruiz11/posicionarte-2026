import '@/app/globals.css';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/ThemeProvider';
import Analytics from '@/components/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { schemaSitio } from '@/lib/schema';
import { MARCA, SITE_URL } from '@/data/marca';

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

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Posicionarte Online - Agencia de Marketing Digital',
    template: '%s | Posicionarte Online',
  },
  description: MARCA.descripcion,
  icons: {
    icon: '/favicon.png',
    type: 'image/png',
  },
  // Las imágenes de Open Graph las genera Next desde los archivos
  // `opengraph-image.jsx` de cada ruta. No se declaran acá: si se declaran,
  // pisan al archivo y volvemos al problema de tener la URL escrita a mano.
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SITE_URL,
    siteName: MARCA.nombre,
    title: 'Posicionarte Online - Agencia de Marketing Digital',
    description: MARCA.descripcion,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Posicionarte Online - Agencia de Marketing Digital',
    description: MARCA.descripcion,
  },
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${jakarta.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaSitio) }}
        />
      </head>
      <body className="min-h-screen bg-surface-0 text-ink transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-full focus:text-sm focus:font-semibold"
          >
            Saltar al contenido principal
          </a>
          {children}
          <Toaster />
          <Analytics />
          <VercelAnalytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
