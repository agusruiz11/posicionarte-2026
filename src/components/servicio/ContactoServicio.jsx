'use client';

import React from 'react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import LeadForm from '@/components/form/LeadForm';

/**
 * Formulario de contacto al pie de cada página de servicio, con "Qué te
 * interesa" ya elegido. Usa el mismo `contacto` que /contacto: mismo pipeline,
 * mismo mail, misma fila en el CRM. Lo único distinto es `page_path`, que ya
 * viaja solo, y el servicio preseleccionado.
 */
export default function ContactoServicio({ slug, nombre }) {
  return (
    <Section id="contacto" variant="alt" aria-labelledby="contacto-servicio-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Contanos tu caso</p>
            <h2 id="contacto-servicio-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-8 leading-tight tracking-tight">
              Hablemos de {nombre}.
            </h2>
            <p className="text-lg md:text-xl text-ink/80 mb-6 max-w-xl font-light leading-relaxed">
              Contanos qué vendés, a quién y qué hiciste hasta ahora. Con eso te respondemos con una propuesta concreta, sin vueltas.
            </p>
            <p className="text-base text-ink-muted max-w-xl leading-relaxed">
              Respondemos dentro de las 24 horas hábiles. Si preferís hablar, el botón de WhatsApp está abajo a la derecha.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <LeadForm
              formId="contacto"
              valoresIniciales={{ serviceInterest: slug }}
              tituloExito="Recibimos tu consulta"
              textoExito="Te respondemos dentro de las próximas 24 horas hábiles. Si mientras tanto querés adelantar algo, escribinos por WhatsApp."
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
