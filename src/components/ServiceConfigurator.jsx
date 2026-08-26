'use client';


import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Sparkles, Target, Mail, Award } from 'lucide-react';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { cn } from '@/lib/utils';
import { EVENTS, track } from '@/lib/analytics';
import Section from '@/components/Section';

const objectives = [
  {
    id: 'ventas',
    label: 'Ventas',
    icon: TrendingUp,
    cards: [
      {
        title: 'Campañas de conversión',
        description: 'Google Ads y Meta orientados a ventas directas y carritos abandonados.',
        icon: Target,
      },
      {
        title: 'Remarketing',
        description: 'Recuperamos a quienes visitaron tu sitio y no compraron.',
        icon: TrendingUp,
      },
      {
        title: 'Landings de venta',
        description: 'Páginas enfocadas en convertir con copy y diseño persuasivo.',
        icon: Target,
      },
    ],
  },
  {
    id: 'leads',
    label: 'Leads',
    icon: Mail,
    cards: [
      {
        title: 'Generación de leads',
        description: 'Formularios y campañas para captar contactos calificados.',
        icon: Mail,
      },
      {
        title: 'Formularios optimizados',
        description: 'Menos fricción, más conversiones. Pruebas y mejoras continuas.',
        icon: Users,
      },
      {
        title: 'Nutrición y seguimiento',
        description: 'Emails y secuencias para llevar el lead hasta la venta.',
        icon: Mail,
      },
    ],
  },
  {
    id: 'marca',
    label: 'Marca',
    icon: Sparkles,
    cards: [
      {
        title: 'Contenido de marca',
        description: 'Storytelling y piezas que refuerzan tu identidad y autoridad.',
        icon: Sparkles,
      },
      {
        title: 'Redes y comunidad',
        description: 'Presencia coherente en redes para conectar con tu audiencia.',
        icon: Users,
      },
      {
        title: 'Reconocimiento',
        description: 'Estrategias de awareness para que te elijan cuando piensen en tu rubro.',
        icon: Award,
      },
    ],
  },
];

function Card({ title, description, icon: Icon, index }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      className={cn(
        'rounded-2xl border border-[#D9D9D9]/80 dark:border-white/10 bg-surface-2 p-6 md:p-8 text-left',
        'hover:border-brand/30 dark:hover:border-brand/40 transition-colors duration-200'
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
        <Icon className="text-brand" size={24} />
      </div>
      <h3 className="text-xl font-bold text-ink mb-2">{title}</h3>
      <p className="text-ink-muted leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function ServiceConfigurator() {
  const [value, setValue] = useState('ventas');
  const reduced = useReducedMotion();
  const current = objectives.find((o) => o.id === value) ?? objectives[0];

  return (
    <Section id="configurador" variant="alt" aria-labelledby="configurador-heading">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="configurador-heading" className="text-4xl md:text-6xl font-bold text-ink mb-6 tracking-tight">
            Elegí tu <span className="text-brand">objetivo</span>.
          </h2>
          <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto">
            Tres enfoques. Misma calidad. Contenido que se adapta a lo que necesitás.
          </p>
        </div>

        <Tabs.Root
          value={value}
          onValueChange={(v) => {
            setValue(v);
            track(EVENTS.SELECT_OBJECTIVE, { objective: v });
          }}
          className="w-full"
        >
          <Tabs.List
            className="flex flex-wrap justify-center gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-white/5 border border-[#D9D9D9]/60 dark:border-white/10 mb-12"
            aria-label="Objetivo de marketing"
          >
            {objectives.map((obj) => (
              <Tabs.Trigger
                key={obj.id}
                value={obj.id}
                className={cn(
                  'flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200',
                  'data-[state=inactive]:text-ink data-[state=inactive]:hover:bg-ink/10',
                  'data-[state=active]:bg-primary data-[state=active]:text-white',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'
                )}
              >
                <obj.icon size={18} />
                {obj.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value={value} forceMount className="mt-0 outline-none">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={value}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                className="grid md:grid-cols-3 gap-6"
              >
                {current.cards.map((card, index) => (
                  <Card
                    key={`${value}-${card.title}`}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Section>
  );
}
