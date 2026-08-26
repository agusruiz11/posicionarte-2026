'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Envoltorio de sección.
 *
 * Antes cada componente pintaba su propio fondo a mano y el resultado eran
 * siete grises oscuros distintos (#0C0C0C, #111111, #141414, #1A1A1A, #1E1E1E,
 * #080808, #000212) más varias secciones que directamente se olvidaban de la
 * variante dark y quedaban en blanco sobre una página oscura.
 *
 * Acá el fondo se declara una sola vez, por intención:
 *
 *   default → fondo de página        (surface-0)
 *   alt     → sección alterna        (surface-1)
 *   ink     → banda oscura en ambos temas
 *   brand   → banda azul de marca
 *
 * `ink` y `brand` aplican la clase `dark` a su subárbol: así el texto, los
 * bordes y el azul de acento de adentro se resuelven con la paleta oscura
 * aunque la página esté en modo claro. Es lo que evita tener que escribir
 * `text-white` a mano en cada hijo.
 */

const VARIANTS = {
  default: 'bg-surface-0 text-ink',
  alt: 'bg-surface-1 text-ink',
  ink: 'dark bg-surface-0 text-ink',
  // --primary vale lo mismo en los dos temas (#3256D7), así que la banda azul
  // no cambia de tono al aplicarle `dark`. Con `bg-brand` sí cambiaría: ese
  // token se aclara a #6F8BFF en oscuro para poder usarse como texto.
  brand: 'dark bg-primary text-white',
};

const Section = React.forwardRef(function Section(
  { as: Tag = 'section', variant = 'default', padding = true, className, children, ...props },
  ref,
) {
  return (
    <Tag
      ref={ref}
      className={cn(VARIANTS[variant] ?? VARIANTS.default, padding && 'section-padding', className)}
      {...props}
    >
      {children}
    </Tag>
  );
});

export default Section;
