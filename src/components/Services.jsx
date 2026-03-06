'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Target, Globe, Palette, MessageSquare, Lightbulb } from 'lucide-react';

const services = [
  {
    icon: Target,
    title: 'Google Ads',
    description:
      'Campañas optimizadas para atraer clientes que buscan activamente tus productos o servicios.',
  },
  {
    icon: MessageSquare,
    title: 'Meta Ads',
    description:
      'Publicidad estratégica en Facebook e Instagram para conectar con tu audiencia ideal.',
  },
  {
    icon: Search,
    title: 'SEO / AEO',
    description:
      'Posicionamiento orgánico y optimización para asistentes de voz. Visibilidad a largo plazo.',
  },
  {
    icon: Globe,
    title: 'Diseño Web',
    description:
      'Sitios web profesionales, funcionales y orientados a la conversión (WordPress, TiendaNube, React).',
  },
  {
    icon: Palette,
    title: 'Social Media & Content',
    description:
      'Gestión de redes, creación de contenido y diseño de piezas gráficas que conectan.',
  },
  {
    icon: Lightbulb,
    title: 'Estrategia Digital',
    description:
      'Consultoría, análisis de mercado, y plan de acción integral para tu negocio.',
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleServiceClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      id="servicios"
      className="section-padding bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto mb-16 md:mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-[#414141] tracking-tight">
              Soluciones para cada <span className="text-[#3256D7]">objetivo</span>.
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
              Un conjunto de servicios integrales de marketing digital diseñados para impulsar el crecimiento de tu negocio.
            </p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isActive = activeIndex === index;

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b border-gray-200 last:border-b-0"
              >
                <div
                  className="flex justify-between items-center cursor-pointer py-8 group gap-4"
                  onClick={() => handleServiceClick(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleServiceClick(index);
                    }
                  }}
                  aria-expanded={isActive}
                  aria-controls={`service-desc-${index}`}
                  id={`service-trigger-${index}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-[#3256D7] group-hover:border-[#3256D7]/30 transition-colors">
                      <Icon size={22} strokeWidth={1.75} />
                    </div>
                    <h3
                      className={`text-2xl md:text-4xl font-semibold transition-colors duration-300 ${
                        isActive ? 'text-[#3256D7]' : 'text-[#414141] group-hover:text-[#3256D7]'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  <motion.div
                    className={`flex-shrink-0 transition-colors ${
                      isActive ? 'text-[#3256D7]' : 'text-[#414141] group-hover:text-[#3256D7]'
                    }`}
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus size={32} />
                  </motion.div>
                </div>

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
                        <p className="text-lg text-gray-500 max-w-2xl leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
