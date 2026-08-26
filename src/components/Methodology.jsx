'use client';

import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const steps = [
  {
    number: '01',
    title: 'Análisis',
    description:
      'Estudiamos tu negocio, competencia y audiencia para entender el contexto completo.',
  },
  {
    number: '02',
    title: 'Estrategia',
    description:
      'Diseñamos un plan de acción personalizado con objetivos claros y KPIs.',
  },
  {
    number: '03',
    title: 'Ejecución',
    description:
      'Implementamos las campañas y acciones con atención al detalle y creatividad.',
  },
  {
    number: '04',
    title: 'Optimización',
    description:
      'Monitoreamos resultados y ajustamos la estrategia para maximizar el rendimiento.',
  },
  {
    number: '05',
    title: 'Reportes',
    description:
      'Compartimos informes claros y aprendizajes para la mejora continua.',
  },
];

const Methodology = () => {
  return (
    <Section
      id="metodologia"
      variant="alt"
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-4">
            Un proceso <span className="text-brand">claro</span> y{' '}
            <span className="text-brand">efectivo</span>
          </h2>
          <p className="text-lg md:text-xl text-ink-muted">
            Nuestra metodología probada garantiza resultados medibles y sostenibles para tu negocio.
          </p>
        </Reveal>

        <div className="relative">
          {/* Línea del timeline - solo desktop */}
          <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3256D7]/30 via-[#3256D7]/50 to-[#3256D7]/30 dark:from-[#3256D7]/20 dark:via-[#3256D7]/40 dark:to-[#3256D7]/20" />

          {/* Pasos */}
          <div className="space-y-12 md:space-y-20 relative">
            {steps.map((step, index) => (
              <Reveal
                key={step.title}
                delay={index * 110}
                className="relative md:pl-24"
              >
                {/* Punto del timeline - desktop */}
                <div className="hidden md:block absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-surface-1 shadow-lg z-10 top-2" />

                {/* Número del paso - móvil.
                    Los números gigantes son textura, no contenido: el título que
                    tienen al lado ya dice cuál es el paso. Con aria-hidden el
                    lector de pantalla deja de leer "cero uno" antes de cada uno
                    y quedan declarados como decorativos, que es lo que los exime
                    del mínimo de contraste (hoy dan 1,34:1 a propósito). */}
                <div className="md:hidden mb-4" aria-hidden="true">
                  <span className="text-6xl font-bold text-brand/20">
                    {step.number}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    {/* Número del paso - desktop */}
                    <span
                      aria-hidden="true"
                      className="hidden md:block text-7xl lg:text-8xl font-bold text-brand/20 leading-none"
                    >
                      {step.number}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-ink">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-lg text-ink-muted leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Methodology;
