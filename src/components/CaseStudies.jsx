'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AnimatedSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const CaseStudies = () => {
  const cases = [
    {
      client: 'Dyxoma',
      industry: 'E-commerce',
      image: 'A modern e-commerce website dashboard on a laptop screen',
      bgColor: 'bg-blue-50'
    },
    {
      client: 'Fútbol Queens',
      industry: 'Deportes',
      image: 'Social media engagement chart for a sports brand',
      bgColor: 'bg-green-50'
    },
    {
      client: 'Multi Import',
      industry: 'B2B',
      image: 'SEO analytics showing first page ranking for a B2B company',
      bgColor: 'bg-yellow-50'
    }
  ];

  return (
    <section id="casos" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-[#414141] mb-6 tracking-tight">
              Resultados que <span className="text-[#3256D7]">hablan</span>.
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
              Clientes que confiaron en nuestra metodología y estrategia para crecer.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.client}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="group"
            >
              <div className={`relative aspect-square rounded-3xl overflow-hidden mb-6 ${caseStudy.bgColor}`}>
                <img alt={caseStudy.image} className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1545029013-53df3fe020e8" />
              </div>
              <h3 className="text-2xl font-bold text-[#414141]">{caseStudy.client}</h3>
              <p className="text-lg text-gray-500">{caseStudy.industry}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;