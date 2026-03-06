'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { useReducedMotion } from '@/lib/use-reduced-motion';

const Hero = () => {
  const reduced = useReducedMotion();

  const containerVariants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.4,
          },
        },
      };

  const itemVariants = reduced
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { y: 24, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 18,
          },
        },
      };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center text-center section-padding bg-white overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Detalle premium: ruido muy sutil */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative container mx-auto z-10"
      >
        <motion.h1
          id="hero-heading"
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#414141] mb-6 leading-tight tracking-tighter"
        >
            Posicionamos tu marca
            <span className="block text-[#3256D7] mt-2">en el mundo digital</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-[#414141]/70 mb-12 max-w-3xl mx-auto font-light leading-relaxed"
        >
          Ayudamos a negocios a crecer de forma realista, medible y sostenible.
          Transparencia, procesos claros y comunicación humana.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild className="bg-[#3256D7] shadow-lg hover:bg-[#2845b8] hover:shadow-blue-500/50 text-white rounded-full px-8 py-6 text-lg font-semibold group">
            <Link href="#servicios">
              Quiero potenciar mi negocio
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform inline-block" size={20} />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full px-6 py-6 text-lg font-medium border-[#3256D7] border-2 hover:border-[#10A44A] hover:shadow-lg hover:shadow-[#10A44A]/50 text-[#3256D7] hover:bg-[#3256D7]/5">
            <Link href="/contacto" className="flex items-center gap-2">
              <MessageCircle size={20} />
              Contactar
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
