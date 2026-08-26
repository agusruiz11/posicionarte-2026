'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Consentimiento + trampa para bots.
 *
 * Se repite en los tres formularios del sitio, así que vive acá hasta que en
 * Fase 4 exista un `<LeadForm>` único.
 *
 * El campo `website_url` es un honeypot: está fuera de la vista y fuera del
 * recorrido por teclado, así que una persona nunca lo completa. Los bots que
 * rellenan todo lo que encuentran, sí. El endpoint descarta esos envíos.
 */
export default function CamposLegales({ formId, aceptado, onAceptar }) {
  return (
    <>
      {/* honeypot — no es un campo real */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${formId}-website-url`}>No completar</label>
        <input
          id={`${formId}-website-url`}
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value=""
          onChange={() => {}}
        />
      </div>

      <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 cursor-pointer">
        <input
          id={`${formId}-consent`}
          type="checkbox"
          required
          checked={aceptado}
          onChange={(e) => onAceptar(e.target.checked)}
          className="mt-1 w-4 h-4 flex-shrink-0 accent-[#3256D7] cursor-pointer"
        />
        <span className="text-sm text-ink-muted leading-snug">
          Acepto que usen mis datos para responder mi consulta, según la{' '}
          <Link href="/privacidad" className="text-brand underline underline-offset-2 hover:no-underline">
            política de privacidad
          </Link>
          .
        </span>
      </label>
    </>
  );
}
