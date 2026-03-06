'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { EASE, staggerContainer, slideUp } from '@/lib/motion';

const capabilities = [
  {
    icon: '💬',
    title: 'Chatbots que convierten',
    description:
      'Asistentes automatizados en WhatsApp, web e Instagram que califican leads y responden consultas las 24 horas.',
  },
  {
    icon: '🤖',
    title: 'Agentes IA a medida',
    description:
      'Sistemas que procesan información, toman decisiones y ejecutan tareas repetitivas por vos. Tiempo libre para lo que importa.',
  },
  {
    icon: '⚙️',
    title: 'Automatización de procesos',
    description:
      'Conectamos tus herramientas para eliminar trabajo manual, reducir errores y hacer que tu operación escale sin fricción.',
  },
];

const IASection = () => {
  const reduced = useReducedMotion();

  const containerVariants = reduced ? { hidden: {}, visible: {} } : staggerContainer(0.12, 0.3);
  const itemVariants = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : slideUp(0);

  return (
    <section id="ia" className="section-padding bg-[#111111]">
      <div className="container mx-auto max-w-5xl">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="text-sm font-semibold uppercase tracking-widest text-[#3256D7] mb-6 text-center"
        >
          IA & Automatización
        </motion.p>

        <motion.h2
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-6 leading-tight"
        >
          IA y automatización para negocios reales.
        </motion.h2>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
          className="text-lg text-white/50 text-center max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          No todo negocio necesita IA. Pero el que la usa bien{' '}
          <span className="text-white/80">gana tiempo, escala más y trabaja diferente.</span>
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.title}
              variants={itemVariants}
              className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.07] transition-colors duration-300"
            >
              <span className="text-3xl mb-5 block" aria-hidden="true">
                {cap.icon}
              </span>
              <h3 className="text-lg font-semibold text-white mb-3 leading-snug">{cap.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">{cap.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: EASE, delay: 0.2 }}
          className="flex justify-center"
        >
          <a
            href="https://wa.me/5491172360193"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-semibold rounded-full px-8 py-4 text-base transition-colors shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
          >
            <svg viewBox="0 0 32 32" width="18" height="18" fill="white" aria-hidden="true">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.474 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.765-1.845l-.485-.29-5.009 1.194 1.238-4.87-.318-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.2-2.355-1.162-2.72-1.295-.366-.133-.632-.2-.898.2-.266.398-1.03 1.295-1.263 1.561-.233.266-.465.3-.863.1-.398-.2-1.682-.62-3.203-1.977-1.184-1.056-1.983-2.36-2.216-2.758-.233-.398-.025-.613.175-.812.18-.178.398-.465.598-.698.2-.233.266-.398.398-.664.133-.266.067-.498-.033-.698-.1-.2-.898-2.162-1.23-2.96-.324-.777-.653-.672-.898-.684l-.765-.013c-.266 0-.698.1-1.064.498-.366.398-1.396 1.363-1.396 3.325s1.43 3.857 1.629 4.123c.2.266 2.814 4.297 6.82 6.028.953.412 1.696.658 2.276.842.956.305 1.826.262 2.514.159.767-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.233-1.893-.1-.166-.366-.266-.764-.465z" />
            </svg>
            Hablemos sobre automatización
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default IASection;
