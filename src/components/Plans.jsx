'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Calendar, Layers, Wrench } from 'lucide-react';
import { whatsappUrl, trackWhatsApp } from '@/lib/analytics';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

/**
 * Modalidades de trabajo.
 *
 * Sin precios, y es deliberado. Un "desde USD X" no funciona como piso: quien
 * lee se queda con ese número y después cualquier propuesta por encima le
 * parece un sobreprecio. El que filtra por presupuesto es el campo del
 * formulario de contacto, que hace el mismo trabajo sin dejar escrita una cifra
 * que después cuesta subir.
 *
 * Lo que sí filtra acá es el compromiso mínimo. Tres meses no es una cláusula
 * de permanencia: es el tiempo que una campaña necesita para juntar datos
 * suficientes como para que optimizarla signifique algo. Decirlo con la razón
 * adelante espanta al que quiere probar un mes, y le sube el valor percibido al
 * que se queda.
 *
 * Las tres tarjetas también cambiaron de agrupación. Antes FULL POSI decía
 * "soluciones para necesidades puntuales" y listaba diseño web y auditorías,
 * cuando en realidad es el servicio mensual más completo: la tarjeta que lleva
 * el cartel destacado estaba describiendo otro producto.
 */

const modalidades = [
  {
    icon: Calendar,
    title: 'Gestión Mensual',
    subtitle: 'Un frente, trabajado a fondo.',
    description:
      'Para el negocio que ya tiene algo andando y necesita que alguien lo lleve con criterio.',
    features: [
      'Estrategia y plan de acción',
      'Gestión y optimización de campañas',
      'Reporte mensual con lectura, no solo números',
    ],
    compromiso: 'Desde 3 meses',
    highlight: false,
  },
  {
    icon: Layers,
    title: 'FULL POSI',
    subtitle: 'Todo el sistema: web, pauta, contenido y reportes.',
    description:
      'Para el que quiere un solo responsable de todo lo digital, sin coordinar tres proveedores.',
    features: [
      'Sitio web y sus modificaciones incluidas',
      'Pauta en Google y Meta',
      'Contenido y gestión de redes',
      'Reporte mensual y ajustes continuos',
    ],
    compromiso: 'Desde 3 meses',
    highlight: true,
  },
  {
    icon: Wrench,
    title: 'Proyecto puntual',
    subtitle: 'Un trabajo con principio y fin.',
    description:
      'Para cuando necesitás resolver una cosa concreta y no un acompañamiento.',
    features: ['Sitio web o landing', 'Auditoría digital', 'Consultoría 1:1'],
    compromiso: 'Sin permanencia',
    highlight: false,
  },
];

const Plans = () => (
  <Section variant="default">
    <div className="max-w-6xl mx-auto">
      <Reveal className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight">
          Modalidades de <span className="text-brand">Trabajo</span>.
        </h2>
        <p className="text-lg md:text-xl text-ink-muted max-w-3xl mx-auto leading-relaxed">
          Cada propuesta se arma sobre tu caso. No hay paquetes cerrados, así que el
          alcance y la inversión salen de la primera conversación.
        </p>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-8">
        {modalidades.map((m, index) => {
          const Icon = m.icon;
          return (
            <Reveal
              key={m.title}
              delay={index * 90}
              className={`border rounded-3xl p-8 flex flex-col ${
                m.highlight
                  ? 'bg-[#414141] dark:bg-surface-2 text-white border-white/10'
                  : 'bg-surface-1 border-hairline'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <Icon
                  size={26}
                  strokeWidth={1.75}
                  className={m.highlight ? 'text-white' : 'text-brand'}
                  aria-hidden="true"
                />
                {m.highlight && (
                  <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                    MÁS ELEGIDA
                  </span>
                )}
              </div>

              <div className="flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{m.title}</h3>
                <p
                  className={`font-medium mb-4 leading-snug ${
                    m.highlight ? 'text-white' : 'text-brand'
                  }`}
                >
                  {m.subtitle}
                </p>
                <p
                  className={`mb-8 leading-relaxed ${
                    m.highlight ? 'text-gray-300' : 'text-ink-muted'
                  }`}
                >
                  {m.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check
                        className={`flex-shrink-0 mt-0.5 ${
                          m.highlight ? 'text-white' : 'text-brand'
                        }`}
                        size={18}
                        aria-hidden="true"
                      />
                      <span className="text-sm leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p
                className={`text-xs font-semibold uppercase tracking-wider mb-6 pt-6 border-t ${
                  m.highlight ? 'border-white/15 text-gray-300' : 'border-hairline text-ink-subtle'
                }`}
              >
                {m.compromiso}
              </p>

              <Button
                asChild
                className={`w-full rounded-full py-6 text-base font-semibold ${
                  m.highlight
                    ? 'bg-white text-primary hover:bg-white/90'
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                <a
                  href={whatsappUrl(
                    `plan-${m.title}`,
                    `Hola, me interesa la modalidad ${m.title}. Quiero contarles mi caso.`,
                  )}
                  onClick={() => trackWhatsApp(`plan-${m.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contar mi caso
                </a>
              </Button>
            </Reveal>
          );
        })}
      </div>

      {/* La razón del mínimo va debajo de las tres, no adentro de cada una: es la
          misma para las dos mensuales, y explicarla una vez pesa más que
          repetirla como letra chica. */}
      <Reveal delay={280} className="mt-12 max-w-3xl mx-auto text-center">
        <p className="text-sm md:text-base text-ink-muted leading-relaxed">
          <span className="font-semibold text-ink">Por qué tres meses.</span> Una campaña
          necesita ese tiempo para juntar datos suficientes como para que optimizarla
          signifique algo. Antes de eso cualquier conclusión es ruido, y te estaríamos
          cobrando por adivinar. Los proyectos puntuales no tienen mínimo porque se
          entregan y se terminan.
        </p>
      </Reveal>
    </div>
  </Section>
);

export default Plans;
