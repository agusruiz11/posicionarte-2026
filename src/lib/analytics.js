/**
 * Capa de medición.
 *
 * Todo lo que el sitio quiere medir se empuja al `dataLayer` con un nombre y
 * unos parámetros fijos. Los tags de GA4, Google Ads y Meta se arman dentro de
 * GTM sobre esos eventos, así el equipo de paid media configura sin tocar el
 * repo y el sitio no sabe nada de píxeles.
 *
 * Si GTM no está configurado (`NEXT_PUBLIC_GTM_ID` vacío), `track` no rompe
 * nada: el dataLayer se llena igual y no lo lee nadie.
 *
 * La tabla completa de eventos y parámetros está en
 * docs/PLAN-RELANZAMIENTO-2026.md, sección 3.
 */

import { getAttribution } from '@/lib/attribution';

export const EVENTS = {
  GENERATE_LEAD: 'generate_lead',      // envío OK de cualquier formulario
  FORM_START: 'form_start',            // primer tecleo — sirve para medir abandono
  CONTACT_WHATSAPP: 'contact_whatsapp',
  FILE_DOWNLOAD: 'file_download',
  VIEW_SERVICE: 'view_service',
  SELECT_OBJECTIVE: 'select_objective',
  CLICK_CASE_STUDY: 'click_case_study',
  CTA_CLICK: 'cta_click',
  SCROLL_DEPTH: 'scroll_depth',
};

/** Empuja un evento al dataLayer. Seguro de llamar en cualquier lado. */
export function track(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event,
    ...params,
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
}

/**
 * Igual que `track`, pero adjunta la atribución guardada (gclid, fbclid, UTMs).
 * Se usa para los eventos de conversión, que son los que después se importan a
 * Google Ads y a Meta.
 */
export function trackConversion(event, params = {}) {
  track(event, { ...params, ...getAttribution() });
}

/** Un solo lugar arma los links de WhatsApp, con mensaje y origen. */
export function whatsappUrl(origen, mensaje) {
  const texto = mensaje || `Hola, vengo del sitio (${origen}).`;
  return `https://wa.me/5491172360193?text=${encodeURIComponent(texto)}`;
}

/**
 * Handler para los links de WhatsApp. Sin esto los cuatro enlaces del sitio son
 * idénticos y no hay forma de saber qué sección genera las conversaciones.
 */
export function trackWhatsApp(origen) {
  trackConversion(EVENTS.CONTACT_WHATSAPP, { source_section: origen });
}
