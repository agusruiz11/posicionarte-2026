'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import Section from '@/components/Section';

/**
 * Envoltorio de las páginas legales. Tipografía de lectura larga, que el resto
 * del sitio no necesita: acá el contenido es texto corrido y tiene que leerse
 * cómodo en los dos temas.
 */
export default function PaginaLegal({ titulo, actualizado, children }) {
  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <main id="main-content">
        <Section className="pt-28">
          <article className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-ink mb-3 tracking-tight">{titulo}</h1>
            <p className="text-sm text-ink-subtle mb-12">Última actualización: {actualizado}</p>

            <div
              className="
                text-ink-muted leading-relaxed
                [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-ink [&>h2]:mt-12 [&>h2]:mb-4 [&>h2]:tracking-tight
                [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-ink [&>h3]:mt-8 [&>h3]:mb-3
                [&>p]:mb-4
                [&>ul]:mb-4 [&>ul]:space-y-2 [&>ul]:pl-5 [&>ul]:list-disc [&>ul]:marker:text-brand
                [&>ol]:mb-4 [&>ol]:space-y-2 [&>ol]:pl-5 [&>ol]:list-decimal [&>ol]:marker:text-brand
                [&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:no-underline
                [&_strong]:text-ink [&_strong]:font-semibold
                [&_table]:w-full [&_table]:my-6 [&_table]:text-sm
                [&_th]:text-left [&_th]:text-ink [&_th]:font-semibold [&_th]:py-2 [&_th]:pr-4 [&_th]:border-b [&_th]:border-hairline
                [&_td]:py-2 [&_td]:pr-4 [&_td]:align-top [&_td]:border-b [&_td]:border-hairline
              "
            >
              {children}
            </div>
          </article>
        </Section>
      </main>
      <Footer hideForm />
      <WhatsAppButton />
    </div>
  );
}
