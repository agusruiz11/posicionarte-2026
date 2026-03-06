'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Análisis',
    description:
      'Estudiamos tu negocio, competencia y audiencia para entender el contexto completo.',
  },
  {
    number: '02',
    title: 'Estrategia',
    description:
      'Diseñamos un plan de acción personalizado con objetivos claros y KPIs.',
  },
  {
    number: '03',
    title: 'Ejecución',
    description:
      'Implementamos las campañas y acciones con atención al detalle y creatividad.',
  },
  {
    number: '04',
    title: 'Optimización',
    description:
      'Monitoreamos resultados y ajustamos la estrategia para maximizar el rendimiento.',
  },
  {
    number: '05',
    title: 'Reportes',
    description:
      'Compartimos informes claros y aprendizajes para la mejora continua.',
  },
];

const Methodology = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="metodologia"
      ref={sectionRef}
      className="section-padding bg-gray-50"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#414141] mb-4">
            Un proceso <span className="text-[#3256D7]">claro</span> y{' '}
            <span className="text-[#3256D7]">efectivo</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500">
            Nuestra metodología probada garantiza resultados medibles y sostenibles para tu negocio.
          </p>
        </motion.div>

        <div className="relative">
          {/* Línea del timeline - solo desktop */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3256D7]/30 via-[#3256D7]/50 to-[#3256D7]/30" />

          {/* Pasos */}
          <div className="space-y-12 md:space-y-20 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
                }
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative md:pl-24"
              >
                {/* Punto del timeline - desktop */}
                <div className="hidden md:block absolute left-6 w-4 h-4 bg-[#3256D7] rounded-full border-4 border-gray-50 shadow-lg z-10 top-2" />

                {/* Número del paso - móvil */}
                <div className="md:hidden mb-4">
                  <span className="text-6xl font-bold text-[#3256D7]/20">
                    {step.number}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Número del paso - desktop */}
                    <span className="hidden md:block text-7xl lg:text-8xl font-bold text-[#3256D7]/20 leading-none">
                      {step.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-[#414141]">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
