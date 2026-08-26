'use client';

import React from 'react';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const differentiators = [
  {
    number: '01',
    title: 'Sin paquetes rígidos',
    description: 'Combinamos solo lo que tu negocio necesita. Nada más, nada menos.',
  },
  {
    number: '02',
    title: 'Cualquier punto de partida',
    description: 'Empezás desde cero o querés escalar lo que ya funciona. Nos adaptamos.',
  },
  {
    number: '03',
    title: 'Estrategia, tecnología y ejecución',
    description: 'Todo en un solo equipo. Sin tercerizar ni perder tiempo coordinando proveedores.',
  },
  {
    number: '04',
    title: 'IA y automatización real',
    description: 'No como tendencia. Como herramienta concreta que libera tiempo y multiplica resultados.',
  },
];

const About = () => {
  return (
    <Section id="about" variant="default">
      <div className="container mx-auto max-w-5xl">
        <Reveal as="p" className="text-sm font-semibold uppercase tracking-widest text-brand mb-6 text-center">
          Por qué elegirnos
        </Reveal>

        <Reveal as="h2" delay={80} className="text-4xl md:text-5xl font-bold text-ink tracking-tight text-center mb-16 leading-tight">
          No somos un proveedor de servicios.
          <span className="block text-brand">Somos el equipo que construye tu sistema.</span>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {differentiators.map((item, i) => (
            <Reveal key={item.number} delay={i * 90} className="flex gap-6">
              {/* Decorativo, mismo criterio que Methodology: el número no aporta
                  nada que no diga el título que sigue. */}
              <span
                aria-hidden="true"
                className="text-3xl font-bold text-brand/20 leading-none shrink-0 w-10 pt-1"
              >
                {item.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-ink mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-ink-muted leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;
