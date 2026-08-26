'use client';

import React from 'react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';
import LeadForm from '@/components/form/LeadForm';

export default function ContactSection() {
  return (
    <Section id="contacto" variant="default" padding={false} className="px-6 md:px-10 pt-28 pb-12" aria-labelledby="contacto-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <Reveal>
            <h1 id="contacto-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-8 leading-tight tracking-tight">
              Hablemos.
            </h1>
            <p className="text-lg md:text-xl text-ink/80 mb-12 max-w-xl text-left font-light leading-relaxed">
              Estamos listos para escuchar sobre tu proyecto y encontrar la mejor manera de ayudarte a crecer. Completá el formulario o escribinos por WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={90}>
            <LeadForm
              formId="contacto"
              tituloExito="Recibimos tu consulta"
              textoExito="Te respondemos dentro de las próximas 24 horas hábiles. Si mientras tanto querés adelantar algo, escribinos por WhatsApp."
            />
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
