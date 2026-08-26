'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { captureAttribution, } from '@/lib/attribution';
import { track, EVENTS } from '@/lib/analytics';

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

/**
 * Medición del sitio.
 *
 * Monta GTM (si está configurado), captura la atribución de la visita y mide
 * la profundidad de scroll. Todo lo demás —GA4, Google Ads, Meta— se arma
 * dentro del contenedor de GTM, no acá.
 *
 * Sin `NEXT_PUBLIC_GTM_ID` no se carga ningún script de terceros y el sitio
 * funciona igual: los eventos se siguen empujando al dataLayer y no los lee
 * nadie. Así se puede desarrollar y hacer preview sin ensuciar los datos.
 *
 * ── Sobre Consent Mode ────────────────────────────────────────────────────
 * Los defaults quedan en `granted`, que es el comportamiento que el sitio ya
 * tiene hoy (no hay banner de cookies). Cuando en Fase 2 exista /privacidad y
 * el banner, hay que cambiar los defaults a `denied` acá abajo y que el banner
 * dispare el `consent update`. Es un cambio de este archivo, nada más.
 */
export default function Analytics() {
  useEffect(() => {
    captureAttribution();
  }, []);

  // Profundidad de scroll: 25 / 50 / 75 / 90 %. Cada umbral se dispara una vez.
  useEffect(() => {
    const umbrales = [25, 50, 75, 90];
    const vistos = new Set();
    let pendiente = false;

    const medir = () => {
      pendiente = false;
      const alto = document.documentElement.scrollHeight - window.innerHeight;
      if (alto <= 0) return;
      const pct = Math.round((window.scrollY / alto) * 100);
      for (const u of umbrales) {
        if (pct >= u && !vistos.has(u)) {
          vistos.add(u);
          track(EVENTS.SCROLL_DEPTH, { percent: u });
        }
      }
    };

    const onScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(medir);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!GTM_ID) return null;

  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            analytics_storage: 'granted',
            functionality_storage: 'granted',
            security_storage: 'granted'
          });
        `}
      </Script>

      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}
      </Script>

      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
