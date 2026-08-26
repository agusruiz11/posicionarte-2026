'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Aparición al entrar en viewport, sin framer-motion.
 *
 * Framer-motion estaba en 17 de 18 componentes haciendo casi siempre lo mismo:
 * un fade con desplazamiento vertical al entrar en pantalla. Ese es el efecto
 * más barato que existe y costaba 53,6 KB de JavaScript, mientras que todo lo
 * que framer-motion hace y nadie más puede hacer —transiciones compartidas con
 * layoutId, animaciones ligadas al scroll, reordenamientos— estaba sin usar.
 *
 * Esto lo resuelve con un IntersectionObserver y una transición CSS. Framer
 * queda reservado para los momentos donde de verdad aporta.
 *
 * Respeta `prefers-reduced-motion`: quien lo tenga activado ve el contenido
 * directamente, sin desplazamiento.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 20,
  once = true,
  amount = 0.15,
  className,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Sin IntersectionObserver (o con JS a medio cargar) el contenido se ve.
    // Nunca se esconde algo cuya aparición dependa de que un script funcione.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: amount, rootMargin: '0px 0px -5% 0px' },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once, amount]);

  return (
    <Tag
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'motion-reduce:transition-none motion-reduce:transform-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0',
        className,
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible ? undefined : `translateY(${y}px)`,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}
