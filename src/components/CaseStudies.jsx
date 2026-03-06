'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EASE, staggerContainer, slideUp } from '@/lib/motion';

const cases = [
  {
    client: 'Dyxoma',
    industry: 'E-commerce',
    bgColor: 'bg-blue-50',
    // Reemplazar con imagen real del cliente
    src: null,
    alt: 'Caso de estudio Dyxoma — E-commerce',
  },
  {
    client: 'Fútbol Queens',
    industry: 'Deportes',
    bgColor: 'bg-green-50',
    src: null,
    alt: 'Caso de estudio Fútbol Queens — Deportes',
  },
  {
    client: 'Multi Import',
    industry: 'B2B',
    bgColor: 'bg-yellow-50',
    src: null,
    alt: 'Caso de estudio Multi Import — B2B',
  },
];

const CaseStudies = () => {
  return (
    <section id="casos" className="section-padding bg-white dark:bg-[#0c0c0c]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-[#414141] dark:text-white mb-6 tracking-tight">
            Resultados que <span className="text-[#3256D7]">hablan</span>.
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
            Clientes que confiaron en nuestra metodología y estrategia para crecer.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {cases.map((caseStudy) => (
            <motion.div
              key={caseStudy.client}
              variants={slideUp(0)}
              className="group"
            >
              <div className={`relative aspect-square rounded-3xl overflow-hidden mb-6 ${caseStudy.bgColor} flex items-center justify-center`}>
                {caseStudy.src ? (
                  <img
                    src={caseStudy.src}
                    alt={caseStudy.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                ) : (
                  <span className="text-5xl font-bold text-[#414141]/10 select-none">
                    {caseStudy.client[0]}
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-bold text-[#414141] dark:text-white">{caseStudy.client}</h3>
              <p className="text-lg text-gray-500">{caseStudy.industry}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
