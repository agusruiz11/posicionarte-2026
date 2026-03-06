---
name: posicionarte-applelike
description: Diseño y build para el sitio 2026 de Posicionarte.online estilo minimal premium (Apple-like), con 2 secciones WOW (Hero + 1), alto performance, accesible, y SEO real. Usar Tailwind + Radix + CVA + Framer Motion. Preferir migración a Next App Router con static export si aplica.
---

# Posicionarte.online — Apple-like Web System (2026)

## Objetivo
Construir un marketing site moderno, dinámico y simple, con “presencia premium”. Pocas secciones, muy pulidas. 2 secciones WOW máximo.

## Brand (hard rules)
### Colores
- Brand Blue: #3256D7 (primario / CTAs / highlights)
- Ink: #414141 (texto principal cuando no sea negro)
- Surface: #D9D9D9 (bordes/surfaces suaves, NO como fondo principal pesado)
- Accent Green: #10A44A (solo para el “dot”/estado/pequeños detalles, no para CTAs grandes)

**Background recomendado:** blanco o gris MUY claro (derivado), y usar #D9D9D9 como “hairline”/cards suaves.

### Tipografías
- Logo: Rowdies (solo logotipo / wordmark si aplica)
- UI/Contenido: Poppins (títulos + body)
Reglas:
- Mucho aire: line-height generoso
- Títulos con tracking levemente negativo en desktop (sutil)
- Un H1 por página

### Logo usage
- Header: wordmark horizontal (“Posicionarte” sobre azul + “online” gris + dot verde) si existe.
- Favicon / app icon: “P” en square blue (como screenshot).
- No distorsionar proporciones. Mantener padding respirable alrededor del logo.

## Layout (Apple-like)
- Grid limpio, espacios grandes, secciones cortas.
- Bordes suaves (radius 16–24 en cards).
- Sombras MUY sutiles (si no suma, no usar).
- Botones: 2 niveles (Primary blue / Secondary outline).

## Motion (premium, no circo)
### Stack
- Framer Motion para microinteracciones, reveals y transiciones.
- Evitar scroll-jank. Animar `transform` + `opacity`.
- Respetar `prefers-reduced-motion` (si está activo, desactivar/parar animaciones grandes).

### Easing/duración (defaults)
- Duración: 160–240ms micro, 320–480ms transiciones
- Easing recomendado: ease-out suave (cubic-bezier tipo 0.22,1,0.36,1)
- Hover: sutil (1–2px translate o 1.02 scale max)

## WOW Sections (máximo 2)
### WOW #1 — Hero
Debe incluir:
- H1 grande (claro, corto, contundente)
- Subcopy de 1–2 líneas
- CTA primario + secundario
- “Detalle premium” (elegir 1):
  - entrada tipográfica elegante (stagger leve)
  - background noise MUY sutil
  - parallax mínimo o cursor-follow mínimo (no marear)
No usar video pesado en hero salvo que sea ultra liviano.

### WOW #2 — elegir UNA opción
- Service Configurator: 3 objetivos (Ventas / Leads / Marca) que cambian 3 cards con animación suave.
  - Implementar con Radix Tabs + Framer Motion (animación de contenido).
O
- Case strip horizontal con snap (3 casos, métricas cortas).
O
- Timeline interactivo de proceso (4 pasos) con microinteracciones.

## Accesibilidad (no negociable)
- Focus visible en todo.
- Contraste correcto (blue sobre blanco OK; evitar gris claro para texto).
- Interacciones con teclado para tabs/dialogs (Radix ayuda).

## SEO (aunque sea “simple site”)
- Metadata por ruta (title/description + og/twitter).
- Estructura semántica (header/main/section/footer).
- Headings limpios: H1 único; H2 por sección.

## Implementación (si se migra a Next)
- Preferir Next App Router.
- Si hosting estático: usar static export (output: 'export').
- Componentes animados como “islas”: solo `use client` donde haga falta.
- Reemplazar react-helmet por metadata de Next.

## Convenciones de código
- Usar `cn()` (clsx + tailwind-merge) para clases.
- Variantes con `class-variance-authority`.
- Componentes base: /components/ui
- Secciones: /components/sections
- Mantener componentes pequeños y reutilizables.

## Definition of Done
- 2 WOW funcionando + reduced-motion.
- `build` sin warnings críticos.
- Performance: evitar dependencias grandes; lazy-load donde aplique.
- Diseño consistente con tokens y spacing.
