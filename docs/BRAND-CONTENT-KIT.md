# Brand & Content Kit — Posicionarte Online

Fuente de verdad para copy, diseño y contenido social. Todo lo de acá está tomado del sitio (`src/`), no de suposiciones.

## 1. Identidad

| Elemento | Valor |
|---|---|
| Marca | Posicionarte Online |
| Sitio | https://posicionarte.online |
| Instagram | @posicionarteonline |
| LinkedIn | /company/posicionarte-online |
| Facebook | /posicionarteonline |
| WhatsApp | +54 9 11 7236-0193 (`wa.me/5491172360193`) |
| CRM clientes | https://crm.posicionarte.online |
| Mercado | Argentina (`es_AR`) |

**Descripción oficial (metadata del sitio):** "Impulsamos tu crecimiento digital con estrategia y creatividad. Especialistas en Google Ads, Meta Ads, SEO, Diseño Web y más."

**Diferencial:** *Sin paquetes. A medida.*

## 2. Paleta

| Uso | Hex | Nota |
|---|---|---|
| Primario (marca) | `#3256D7` | Azul. CTAs, acentos, subrayados. |
| Primario hover | `#2845B8` | |
| Texto principal (light) | `#414141` | |
| Fondo dark | `#0C0C0C` / `#111111` | |
| Superficie dark | `#1A1A1A` / `#1E1E1E` | |
| Azul claro (dark accent) | `#6F8BFF` | Para contraste sobre fondo oscuro. |
| Alerta / error | `#E03E2D` | |
| WhatsApp | `#25D366` | Solo para el botón de WhatsApp. |
| Gris neutro | `#D9D9D9` / `#E5E7EB` | Bordes, separadores. |

Regla: toda pieza tiene que funcionar en claro y en oscuro. El azul nunca compite con el azul: un solo acento fuerte por pieza.

### Paleta cálida "papel" — solo piezas gráficas

Aprobada el 31/08/2026. Es la única familia cálida de la marca: se usa en piezas de Instagram con fondo papel, **no en el sitio** (no tiene tokens en `globals.css`).

| Uso | Hex | Nota |
|---|---|---|
| Fondo papel | `#F5F3EE` | |
| Línea de margen | `#E1D9CA` | El filete vertical tipo anotador. |
| Texto secundario | `#8A8175` | |
| Gris de firma y metadatos | `#A39A8B` | Fecha y wordmark. |

Sobre este fondo el texto principal sigue siendo `#414141` y el acento sigue siendo `#3256D7`. Primera pieza que la usa: `content/instagram/2026-08-despedida-messi/`.

## 3. Tipografía

- **Plus Jakarta Sans** — cuerpo y UI (`--font-sans`).
- **Playfair Display 700** — títulos display (`--font-display`).
- En el sitio también hay declaradas Poppins y Rowdies en `tailwind.config.js` (legacy). Para contenido nuevo usá Jakarta + Playfair.

Para piezas de Instagram: título en Playfair Display o Jakarta Bold, cuerpo en Jakarta Regular/Medium. Nada de tipografías de stock genéricas.

## 4. Voz y tono

- Español rioplatense, **voseo**. "Tu negocio", "escribinos", "contanos".
- Claro y directo. Cero humo, cero "sinergia", cero "revolucioná tu marca".
- Consultivo, no vendedor de humo: hablamos de decisiones, datos y trabajo hecho.
- Frases cortas. Un punto por slide.
- Sin emojis decorativos en títulos. Máximo 1–2 en el caption, solo si aportan.
- Nunca prometemos resultados numéricos que no podamos probar.

## 5. Servicios (copy base)

1. **Google Ads** — captar demanda que ya existe.
2. **Meta Ads** — generar demanda y reconocimiento.
3. **SEO / AEO** — visibilidad orgánica, incluyendo buscadores con IA.
4. **Diseño Web** — sitios rápidos, medibles y orientados a conversión.
5. **Social Media & Content** — presencia consistente con criterio.
6. **Estrategia Digital** — el plan antes que las herramientas.

## 6. Metodología (5 pasos)

`Análisis → Estrategia → Ejecución → Optimización → Reportes`

Es el esqueleto narrativo ideal para carruseles: un carrusel por paso, o un carrusel que recorra los cinco.

## 7. Modelos de trabajo

- **Acompañamiento continuo y estratégico** para tu negocio.
- **Soluciones específicas** para necesidades puntuales.
- **Sesiones personalizadas** de asesoramiento estratégico.

## 8. Prueba social (usar tal cual, no inflar)

- 14+ sitios desarrollados
- 20+ clientes
- 10+ tecnologías
- Casos filtrables por: Desarrollo Web, Google Ads, Meta Ads, Instagram (`/casos`)
- Vertical con landing propia: **inmobiliarias** (`/inmobiliarias`)

## 9. Especificaciones de contenido Instagram

### Formatos

| Pieza | Medida | Notas |
|---|---|---|
| Carrusel feed | 1080×1350 (4:5) | 6–10 slides |
| Historia | 1080×1920 (9:16) | Zona segura: 100px arriba/abajo |
| Portada destacada | 1080×1920, ícono centrado | Fondo `#0C0C0C` o `#3256D7` |
| Reel cover | 1080×1920 con recorte 1080×1350 legible | |

### Anatomía de un carrusel

1. **Slide 1 — gancho.** Una tensión real del cliente. Sin "¿Sabías que...?".
2. **Slides 2–3 — el problema.** Por qué duele, con concreción.
3. **Slides 4–7 — el desarrollo.** Un concepto por slide, ejemplo cuando se pueda.
4. **Slide 8 — síntesis.** Qué se lleva la persona.
5. **Slide final — CTA.** Una sola acción: DM, link en bio o WhatsApp.

Límites: título ≤ 6 palabras, cuerpo ≤ 25 palabras por slide.

### Caption

Gancho en la primera línea (se corta a ~125 caracteres), desarrollo, CTA. Máx. 150 palabras. 8–12 hashtags: mezcla de nicho (#marketingdigital #googleads #metaads #seo) y locales (#argentina + ciudad/vertical). Siempre texto alternativo descriptivo.

### Historias destacadas — categorías base

| Destacada | Contenido |
|---|---|
| Servicios | Una historia por servicio, con link |
| Casos | Antes/después, sitio en vivo, link |
| Metodología | Los 5 pasos, uno por historia |
| Nosotros | Equipo, forma de trabajo, valores |
| Inmobiliarias | Vertical específica → `/inmobiliarias` |
| FAQ | Precio, plazos, alcance, cómo empezar |

## 10. Reglas innegociables

- **No inventar** métricas, nombres de clientes, testimonios ni resultados. Si falta un dato: `[DATO A CONFIRMAR]`.
- El sitio manda: si el contenido contradice al sitio, primero se arregla el sitio.
- Toda pieza cierra con una única acción clara.
- Antes de publicar algo con nombre de cliente, confirmar autorización.
