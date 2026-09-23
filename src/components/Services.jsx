'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Plus, Search, Target, Globe, Palette, MessageSquare, Lightbulb, ArrowRight, Code2 } from 'lucide-react';
import { EVENTS, track } from '@/lib/analytics';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const services = [
  {
    icon: Target,
    title: 'Google Ads',
    slug: 'google-ads',
    description:
      'Campañas optimizadas para atraer clientes que buscan activamente tus productos o servicios.',
  },
  {
    icon: MessageSquare,
    title: 'Meta Ads',
    slug: 'meta-ads',
    description:
      'Publicidad estratégica en Facebook e Instagram para conectar con tu audiencia ideal.',
  },
  {
    icon: Search,
    title: 'SEO / AEO',
    slug: 'seo-aeo',
    description:
      'Posicionamiento orgánico y optimización para asistentes de voz. Visibilidad a largo plazo.',
  },
  {
    icon: Globe,
    title: 'Diseño Web',
    slug: 'diseno-web',
    description:
      'Sitios web profesionales, funcionales y orientados a la conversión (WordPress, TiendaNube, React).',
  },
  {
    icon: Palette,
    title: 'Social Media & Content',
    slug: 'social-content',
    description:
      'Gestión de redes, creación de contenido y diseño de piezas gráficas que conectan.',
  },
  {
    icon: Code2,
    title: 'Desarrollo a medida',
    slug: 'desarrollo',
    description:
      'Aplicaciones web, integraciones entre sistemas, automatizaciones y agentes con IA. Código propio, a tu nombre, para lo que ninguna herramienta de estante resuelve.',
  },
  {
    icon: Lightbulb,
    title: 'Estrategia Digital',
    slug: 'estrategia',
    description:
      'Consultoría, análisis de mercado, y plan de acción integral para tu negocio.',
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleServiceClick = (index) => {
    const abriendo = activeIndex !== index;
    setActiveIndex(abriendo ? index : null);
    if (abriendo) track(EVENTS.VIEW_SERVICE, { service_name: services[index].title });
  };

  return (
    <Section id="servicios" variant="alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto mb-16 md:mb-20 text-center">
          <Reveal>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-ink tracking-tight">
              Soluciones para cada <span className="text-brand">objetivo</span>.
            </h2>
            <p className="text-lg md:text-xl text-ink-muted max-w-3xl mx-auto font-light leading-relaxed">
              Un conjunto de servicios integrales de marketing digital diseñados para impulsar el crecimiento de tu negocio.
            </p>
          </Reveal>
        </div>

        <div className="max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;

            return (
              <Reveal
                key={service.title}
                delay={index * 70}
                className="border-b border-hairline last:border-b-0"
              >
                {/* El encabezado va afuera del botón: un h3 adentro de un
                    <button> rompe la navegación por encabezados del lector de
                    pantalla. Antes esto era un div con role="button". */}
                <h3 className="m-0">
                  <button
                    type="button"
                    className="w-full flex justify-between items-center py-8 group gap-4 text-left rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    onClick={() => handleServiceClick(index)}
                    aria-expanded={isActive}
                    aria-controls={`service-desc-${index}`}
                    id={`service-trigger-${index}`}
                  >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-brand group-hover:border-brand/30 transition-colors">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <span
                      className={`text-2xl md:text-4xl font-semibold transition-colors duration-300 ${ isActive ? 'text-brand' : 'text-ink group-hover:text-brand'
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <motion.div
                    className={`flex-shrink-0 transition-colors ${ isActive ? 'text-brand' : 'text-ink group-hover:text-brand'
                    }`}
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus size={32} />
                  </motion.div>
                  </button>
                </h3>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      id={`service-desc-${index}`}
                      role="region"
                      aria-labelledby={`service-trigger-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pl-14 pr-4 md:pl-[4.5rem]">
                        <p className="text-lg text-ink-muted max-w-2xl leading-relaxed">
                          {service.description}
                        </p>
                        <Link
                          href={`/servicios/${service.slug}`}
                          className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-brand hover:text-brand-hover"
                          onClick={() => track(EVENTS.CTA_CLICK, { cta_text: 'Ver el servicio', cta_location: `servicios-${service.slug}` })}
                        >
                          Ver el servicio completo
                          <ArrowRight size={16} aria-hidden="true" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default Services;
