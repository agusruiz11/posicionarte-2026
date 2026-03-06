'use client';


import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, Calendar, Briefcase, Users } from 'lucide-react';

const AnimatedSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

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
      title: 'Proyecto Único',
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
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-[#414141] mb-6 tracking-tight">
              Modalidades de <span className="text-[#3256D7]">Trabajo</span>.
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
              Elegí la opción que mejor se adapte a las necesidades y objetivos de tu negocio.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className={`border rounded-3xl p-8 flex flex-col ${
                plan.highlight ? 'bg-[#414141] text-white border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="bg-[#3256D7] text-white text-xs font-semibold px-3 py-1 rounded-full self-start mb-6">
                  MÁS POPULAR
                </div>
              )}
              <div className="flex-grow">
                <h3 className="text-3xl font-bold mb-3">{plan.title}</h3>
                <p className={`mb-8 ${plan.highlight ? 'text-gray-300' : 'text-gray-500'}`}>{plan.description}</p>
                <ul className="space-y-3 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="text-[#3256D7]" size={20} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button 
                className={`w-full rounded-full py-6 text-base font-semibold ${
                  plan.highlight 
                    ? 'bg-white text-[#414141] hover:bg-gray-200' 
                    : 'bg-[#3256D7] text-white hover:bg-[#2845b8]'
                }`}
              >
                Consultar
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Plans;