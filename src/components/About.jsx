'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

const About = () => {
  const values = [
    {
      icon: Target,
      title: 'Misión',
      description: 'Impulsar el crecimiento de negocios mediante estrategias digitales efectivas, medibles y sostenibles.'
    },
    {
      icon: Eye,
      title: 'Visión',
      description: 'Ser la agencia de referencia para pymes que buscan resultados reales y acompañamiento estratégico.'
    },
    {
      icon: Heart,
      title: 'Valores',
      description: 'Transparencia, compromiso, creatividad estratégica y comunicación clara sin tecnicismos.'
    },
    {
      icon: Award,
      title: 'Diferencial',
      description: 'Trabajo artesanal, análisis profundo, procesos ordenados y acompañamiento continuo en cada proyecto.'
    }
  ];

  return (
    <section id="about" className="section-padding bg-[#F5F5F5] drop-shadow-lg rounded-[8em]">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-bold text-[#414141] mb-6 tracking-tight">
              Somos tu socio <span className="text-[#3256D7]">estratégico</span> digital.
            </h2>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto">
              Nos enfocamos en ayudar a emprendedores, pymes y negocios locales a alcanzar sus objetivos comerciales a través de estrategias digitales efectivas y medibles.
            </p>
          </div>

        <div className="flex justify-center">
          <motion.div className="group">
            <Button
              asChild
              variant="outline"
              className="relative overflow-hidden !bg-white !text-[#3256D7] rounded-full px-8 py-6 text-lg font-semibold transition-shadow duration-300 [box-shadow:inset_0_0_0_1px_#3256D7] hover:[box-shadow:inset_0_0_0_1px_#3256D7,0_4px_12px_-2px_rgba(50,86,215,0.25)]"
            >
              <Link href="/contacto" className="relative inline-flex items-center justify-center min-w-[200px]">
                <span
                  className="absolute inset-0 rounded-full bg-[#3256D7] scale-y-0 origin-bottom transition-[transform] duration-500 ease-out group-hover:scale-y-100 pointer-events-none"
                  aria-hidden
                  />
                <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
                  ¿Qué hacemos?
                </span>
              </Link>
            </Button>
          </motion.div>
        </div>
        </AnimatedSection>

        {/* <div className="grid md:grid-cols-2 gap-10">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-[#3256D7] bg-opacity-10 rounded-lg flex items-center justify-center">
                <value.icon className="text-[#3256D7]" size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#414141] mb-2">{value.title}</h3>
                <p className="text-gray-500 text-lg leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default About;