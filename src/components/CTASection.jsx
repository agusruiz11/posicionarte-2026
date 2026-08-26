'use client';


import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { EVENTS, track } from '@/lib/analytics';
import Section from '@/components/Section';

const CTASection = () => {
  return (
    <Section variant="brand">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl mx-auto text-center md:p-8"
      >
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
          ¿Listo para crecer?
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Agendá una reunión sin compromiso y descubrí cómo podemos ayudarte a alcanzar tus objetivos comerciales.
        </p>
        <Button asChild className="bg-white text-primary hover:bg-white/90 rounded-full px-8 py-6 text-lg font-semibold group">
          <a
            href="#footer"
            onClick={() => track(EVENTS.CTA_CLICK, { cta_text: 'Agendar reunión gratuita', cta_location: 'cta-final' })}
          >
            Agendar reunión gratuita
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </Button>
      </motion.div>
    </Section>
  );
};

export default CTASection;