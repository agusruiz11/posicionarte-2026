# Prompts para Cowork — Posicionarte Online

Copiá el bloque que corresponda. El **Prompt 0** es el primero que tenés que mandar; el resto son para después.

---

## Prompt 0 — Arranque (mandá este primero)

```
Arrancamos a trabajar sobre este proyecto. Antes de tocar nada, quiero un diagnóstico del estado actual.

Contexto: leé primero README.md, docs/BRAND-CONTENT-KIT.md y docs/FASE1-AUDITORIA.md. Ojo: la auditoría FASE 1 es vieja, describe la migración Vite → Next que YA se hizo. No la tomes como estado actual, tomala solo como historia del proyecto.

Quiero que revises el sitio como está hoy y me devuelvas UN documento en docs/DIAGNOSTICO-2026.md con:

1. Estado real de cada ruta (/, /servicios, /casos, /contacto, /inmobiliarias): qué componentes usa, qué metadata tiene, qué le falta.
2. Hallazgos ordenados por impacto, en 5 ejes:
   - Performance (peso de imágenes y videos en src/assets, LCP, framer-motion en exceso, bundle)
   - SEO técnico (metadata por ruta, headings, JSON-LD, sitemap, canonical, alt text)
   - Accesibilidad (contraste en ambos temas, foco visible, labels de formulario, navegación por teclado)
   - Conversión (claridad y cantidad de CTAs, fricción del formulario de contacto, ruta hacia WhatsApp)
   - Consistencia visual y de copy (dark mode, espaciados, tono)
3. Un backlog priorizado en tabla: | # | Qué | Eje | Impacto (alto/medio/bajo) | Esfuerzo (S/M/L) | Archivos afectados |
4. Tu recomendación de por dónde arrancar y por qué: los 3 primeros ítems.

Reglas: no modifiques código todavía, esto es solo diagnóstico. Nada de hallazgos genéricos de checklist: cada punto tiene que citar archivo y línea concreta. Si algo no lo podés verificar sin correr el sitio, decilo en vez de suponer.
```

---

## Prompt 1 — Sprint sobre el sitio (después del diagnóstico)

```
Del backlog de docs/DIAGNOSTICO-2026.md, ejecutá los ítems <N, N, N>.

Antes de tocar archivos: proponeme el plan (qué cambia en cada archivo, qué riesgo tiene, qué puede romper el export estático) y esperá mi OK.

Después de implementar:
- Corré npm run build y contame el resultado real.
- Verificá los cambios visuales en tema claro Y oscuro.
- Resumime qué cambió, en 5 líneas, sin adornos.
- No commitees hasta que te lo pida.
```

---

## Prompt 2 — Primer contenido de Instagram

```
Pasamos al frente de contenido. Leé docs/BRAND-CONTENT-KIT.md y content/instagram/README.md, y mirá el copy real de src/components/Methodology.jsx, Services.jsx y CaseStudies.jsx.

Armá el primer carrusel: la metodología de 5 pasos (Análisis → Estrategia → Ejecución → Optimización → Reportes), enfocado en por qué trabajar sin un plan previo quema presupuesto.

Entregá en content/instagram/carruseles/2026-08-metodologia-5-pasos.md, siguiendo la plantilla del README:
- 8 slides (gancho, problema, los 5 pasos, CTA)
- Caption + hashtags + texto alternativo
- Nota de diseño por slide, usando la paleta y tipografías del kit

Nada de métricas ni clientes inventados: si te falta un dato, poné [DATO A CONFIRMAR]. Cuando termines, decime qué asumiste.
```

---

## Prompt 3 — Historias destacadas

```
Diseñá las historias destacadas del perfil @posicionarteonline, basándote en el sitio.

Un archivo por destacada en content/instagram/historias-destacadas/, con las 6 categorías base del kit: Servicios, Casos, Metodología, Nosotros, Inmobiliarias, FAQ.

Por cada una: concepto de portada (ícono + color), cantidad y orden de historias, texto en pantalla de cada una (máx. 12 palabras) y cuál lleva link.

Para FAQ, sacá las preguntas de lo que el sitio ya responde y marcá con [DATO A CONFIRMAR] las que necesiten información que no está publicada (precios, plazos).
```

---

## Prompt 4 — Calendario

```
Con lo que ya hay en content/instagram/, armá content/instagram/calendario.md: grilla de 4 semanas, <X> publicaciones por semana.

Por publicación: fecha, formato (carrusel/reel/historia), tema, servicio asociado, objetivo (alcance/consideración/conversión) y estado (idea/redactado/diseñado/publicado).

Balanceá los servicios, no me pongas tres carruseles de Google Ads seguidos. Marcá cuáles ya están escritos y cuáles son solo idea.
```

---

## Patrón para el día a día

```
<qué querés>. Antes de tocar archivos, proponeme el plan y esperá mi OK. Después corré npm run build y contame el resultado real.
```
