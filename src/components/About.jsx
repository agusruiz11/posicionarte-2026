'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { EASE, staggerContainer, slideUp } from '@/lib/motion';

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
  const reduced = useReducedMotion();

  const containerVariants = reduced
    ? { hidden: {}, visible: {} }
    : staggerContainer(0.1, 0.2);

  const itemVariants = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : slideUp(0);

  return (
    <section id="about" className="section-padding bg-white dark:bg-[#0c0c0c]">
      <div className="container mx-auto max-w-5xl">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-sm font-semibold uppercase tracking-widest text-[#3256D7] mb-6 text-center"
        >
          Por qué elegirnos
        </motion.p>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-[#414141] dark:text-white tracking-tight text-center mb-16 leading-tight"
        >
          No somos un proveedor de servicios.
          <span className="block text-[#3256D7]">Somos el equipo que construye tu sistema.</span>
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-x-16 gap-y-12"
        >
          {differentiators.map((item) => (
            <motion.div key={item.number} variants={itemVariants} className="flex gap-6">
              <span className="text-3xl font-bold text-[#3256D7]/20 leading-none shrink-0 w-10 pt-1">
                {item.number}
              </span>
              <div>
                <h3 className="text-xl font-semibold text-[#414141] dark:text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
