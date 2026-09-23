'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EVENTS, track, whatsappUrl, trackWhatsApp } from '@/lib/analytics';

/**
 * Los dos botones del hero de una página de servicio. Es un componente
 * cliente solo por el tracking; el resto de la página es servidor.
 *
 * El texto del WhatsApp lleva el nombre del servicio para que la conversación
 * arranque con contexto y el origen (`servicio-google-ads`) quede en GA4.
 */
export default function CtaServicio({ slug, nombre }) {
  const origen = `servicio-${slug}`;
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
      <Button
        asChild
        className="bg-[#25D366] hover:bg-[#1ebe5a] text-[#0A3D20] rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-shadow"
      >
        <a
          href={whatsappUrl(origen, `Hola, vengo del sitio. Quiero hablar de ${nombre} para mi negocio.`)}
          onClick={() => trackWhatsApp(origen)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Hablemos por WhatsApp
        </a>
      </Button>
      <Button
        asChild
        variant="ghost"
        className="rounded-full px-6 py-6 text-lg font-medium text-ink/80 hover:text-ink hover:bg-ink/10"
      >
        <a
          href="#contacto"
          onClick={() => track(EVENTS.CTA_CLICK, { cta_text: 'Contar mi caso', cta_location: origen })}
          className="flex items-center gap-2"
        >
          Contar mi caso
          <ArrowRight size={18} className="opacity-60" />
        </a>
      </Button>
    </div>
  );
}
