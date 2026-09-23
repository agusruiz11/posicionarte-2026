import React from 'react';
import Section from '@/components/Section';

/**
 * Preguntas frecuentes con `<details>` nativo.
 *
 * Sin JavaScript: abre y cierra solo, es accesible por teclado y el lector de
 * pantalla anuncia el estado. Cada respuesta está en el HTML desde el primer
 * byte, que es lo que hace válido el FAQPage que declara la página: el
 * structured data describe lo que se ve, no agrega nada.
 */
export default function FaqServicio({ preguntas, nombre }) {
  if (!preguntas?.length) return null;
  return (
    <Section id="preguntas" variant="default" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <p className="text-sm font-semibold uppercase tracking-widest text-brand mb-3">Preguntas frecuentes</p>
        <h2 id="faq-heading" className="text-3xl md:text-5xl font-bold text-ink tracking-tight mb-10">
          Lo que nos preguntan sobre {nombre}.
        </h2>
        <div className="divide-y divide-hairline border-y border-hairline">
          {preguntas.map((p) => (
            <details key={p.pregunta} className="group py-5">
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none text-lg md:text-xl font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span>{p.pregunta}</span>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-brand text-2xl leading-none transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 text-base md:text-lg text-ink-muted leading-relaxed max-w-2xl">{p.respuesta}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}
