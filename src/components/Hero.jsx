'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { EASE, fadeIn, scaleReveal } from '@/lib/motion';

const Hero = () => {
  const reduced = useReducedMotion();

  const headingVariants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { clipPath: 'inset(0 0 100% 0)', y: 16 },
        visible: {
          clipPath: 'inset(0 0 -10% 0)',
          y: 0,
          transition: { duration: 0.7, ease: EASE, delay: 0.3 },
        },
      };

  const subtitleVariants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : fadeIn(0.85);

  const ctaVariants = reduced
    ? { hidden: { opacity: 1, scale: 1 }, visible: { opacity: 1, scale: 1 } }
    : scaleReveal(1.1);

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center text-center section-padding bg-white dark:bg-[#0c0c0c] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ruido sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto z-10">
        <motion.h1
          id="hero-heading"
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#414141] dark:text-white mb-8 leading-tight tracking-tighter"
        >
          Construimos el sistema
          <span className="block text-[#3256D7]">digital de tu negocio.</span>
        </motion.h1>

        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Detectamos qué necesita tu marca y lo ejecutamos: branding, web, pauta, contenido, automatización e IA.{' '}
          <span className="text-[#414141] font-medium"><br />Sin paquetes. A medida.</span>
        </motion.p>

        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            asChild
            className="bg-[#25D366] hover:bg-[#1ebe5a] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-shadow"
          >
            <a
              href="https://wa.me/5491172360193"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <svg viewBox="0 0 32 32" width="20" height="20" fill="white" aria-hidden="true">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.474 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.765-1.845l-.485-.29-5.009 1.194 1.238-4.87-.318-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.2-2.355-1.162-2.72-1.295-.366-.133-.632-.2-.898.2-.266.398-1.03 1.295-1.263 1.561-.233.266-.465.3-.863.1-.398-.2-1.682-.62-3.203-1.977-1.184-1.056-1.983-2.36-2.216-2.758-.233-.398-.025-.613.175-.812.18-.178.398-.465.598-.698.2-.233.266-.398.398-.664.133-.266.067-.498-.033-.698-.1-.2-.898-2.162-1.23-2.96-.324-.777-.653-.672-.898-.684l-.765-.013c-.266 0-.698.1-1.064.498-.366.398-1.396 1.363-1.396 3.325s1.43 3.857 1.629 4.123c.2.266 2.814 4.297 6.82 6.028.953.412 1.696.658 2.276.842.956.305 1.826.262 2.514.159.767-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.233-1.893-.1-.166-.366-.266-.764-.465z" />
              </svg>
              Hablemos por WhatsApp
            </a>
          </Button>

          <Button
            asChild
            variant="ghost"
            className="rounded-full px-6 py-6 text-lg font-medium text-[#414141]/70 hover:text-[#414141] hover:bg-gray-100"
          >
            <Link href="#servicios" className="flex items-center gap-2">
              Ver qué hacemos
              <ArrowRight size={18} className="opacity-60" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
