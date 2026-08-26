'use client';


import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, Calendar, Briefcase, Users } from 'lucide-react';
import { whatsappUrl, trackWhatsApp } from '@/lib/analytics';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const Plans = () => {
  const plans = [
    {
      icon: Calendar,
      title: 'Gestión Mensual',
      description: 'Acompañamiento continuo y estratégico para tu negocio.',
      features: [
        'Estrategia digital',
        'Gestión de campañas',
        'Reportes y optimización',
      ],
      highlight: false
    },
    {
      icon: Briefcase,
      title: 'FULL POSI',
      description: 'Soluciones específicas para necesidades puntuales.',
      features: [
        'Diseño y desarrollo web',
        'Auditorías digitales',
        'Campañas estacionales',
      ],
      highlight: true
    },
    {
      icon: Users,
      title: 'Consultoría 1:1',
      description: 'Sesiones personalizadas de asesoramiento estratégico.',
      features: [
        'Análisis de situación',
        'Plan de acción',
        'Resolución de dudas',
      ],
      highlight: false
    }
  ];

  return (
    <Section variant="default">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight">
            Modalidades de <span className="text-brand">Trabajo</span>.
          </h2>
          <p className="text-lg md:text-xl text-ink-muted max-w-3xl mx-auto">
            Elegí la opción que mejor se adapte a las necesidades y objetivos de tu negocio.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Reveal
              key={plan.title}
              delay={index * 90}
              className={`border rounded-3xl p-8 flex flex-col ${ plan.highlight ? 'bg-[#414141] dark:bg-surface-2 text-white border-white/10' : 'bg-surface-1 border-hairline'
              }`}
            >
              {plan.highlight && (
                <div className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full self-start mb-6">
                  MÁS POPULAR
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-3xl font-bold mb-3">{plan.title}</h3>
                <p className={`mb-8 ${plan.highlight ? 'text-gray-300' : 'text-ink-muted'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="text-brand" size={20} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild
                className={`w-full rounded-full py-6 text-base font-semibold ${ plan.highlight
                    ? 'bg-white text-primary hover:bg-white/90'
                    : 'bg-primary text-white hover:bg-primary-hover'
                }`}
              >
                <a
                  href={whatsappUrl(`plan-${plan.title}`, `Hola, me interesa la modalidad ${plan.title}.`)}
                  onClick={() => trackWhatsApp(`plan-${plan.title}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar
                </a>
              </Button>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Plans;