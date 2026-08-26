/** @type {import('next').NextConfig} */

// Cabeceras de seguridad. Antes vivían (a medias) en public/.htaccess, que era
// para el hosting viejo de Hostinger y en Vercel no se ejecuta. Acá quedan
// versionadas en el repo y aplican en todas las rutas.
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
];

const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,

  images: {
    // Antes estaba en `unoptimized: true` porque el plan era exportar el sitio
    // como estático. Ahora corre en Vercel, así que Next puede servir AVIF/WebP
    // redimensionado: los logos de clientes dejan de viajar en su tamaño
    // original. Requiere que las imágenes pasen por next/image — las que todavía
    // usan <img> crudo no se benefician hasta que se migren.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 192, 256, 384],
  },

  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
