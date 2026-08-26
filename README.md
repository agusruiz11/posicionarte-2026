# Posicionarte Online — sitio de la agencia

Sitio en **Next.js 14 (App Router)** desplegado en **Vercel** desde GitHub.

## Comandos

| Comando | Descripción |
|---|---|
| `npm install` | Instalar dependencias |
| `npm run dev` | Servidor de desarrollo (puerto 3000) |
| `npm run build` | Build de producción |
| `npm run start` | Sirve el build (requiere `build` previo) |

## Deploy

Push a la rama principal → Vercel construye y publica. No hay export estático ni subida por FTP: el sitio tiene rutas API (`/api/contact`, `/api/benchmark`) que necesitan servidor, y Vercel las corre como funciones.

**No agregues `output: 'export'`.** Rompería los dos formularios.

### Variables de entorno

Se configuran en el panel de Vercel (y en `.env.local` para desarrollo):

| Variable | Para qué |
|---|---|
| `RESEND_API_KEY` | Envío de los mails de lead vía Resend |
| `LEAD_EMAIL` | Destinatarios, separados por coma |
| `NEXT_PUBLIC_GTM_ID` | ID del contenedor de Google Tag Manager (`GTM-XXXXXXX`). Si está vacío no se carga ningún script de terceros y el sitio funciona igual |

El build **no** depende de que existan: el cliente de Resend se instancia dentro del handler, no a nivel de módulo. Un clone limpio compila sin configurar nada.

## Rutas

- `/` — Home
- `/servicios` — Servicios
- `/casos` — Clientes y casos
- `/contacto` — Formulario de contacto
- `/inmobiliarias` — Landing del Benchmark Inmobiliario
- `/api/contact`, `/api/benchmark` — Endpoints de los formularios

## Sistema de diseño

Los colores **no** se escriben a mano. Todo sale de los tokens definidos en `src/app/globals.css` y expuestos en `tailwind.config.js`.

### Tokens

| Clase | Qué es | Claro | Oscuro |
|---|---|---|---|
| `bg-surface-0` | Fondo de página | `#FFFFFF` | `#0C0C0C` |
| `bg-surface-1` | Sección alterna | `#F8F8F8` | `#111111` |
| `bg-surface-2` | Tarjeta | `#FFFFFF` | `#1A1A1A` |
| `text-ink` | Texto principal | `#414141` | `#FFFFFF` |
| `text-ink-muted` | Texto secundario | `#5B6270` | `#A1A7B3` |
| `text-ink-subtle` | Metadatos | `#6B7280` | `#8A909C` |
| `text-brand` | Azul de marca como **texto** | `#3256D7` | `#6F8BFF` |
| `bg-primary` | Azul de marca como **relleno** | `#3256D7` | `#3256D7` |
| `border-hairline` | Separadores | `#E5E7EB` | `#1E1E1E` |

La distinción entre `text-brand` y `bg-primary` importa: el azul de marca sobre fondo oscuro da 3,21:1 y no pasa AA como texto, por eso `--brand` se aclara a `#6F8BFF` en oscuro. Como relleno con texto blanco encima sí funciona (6,09:1), así que `--primary` vale igual en los dos temas.

Todos los tokens están verificados contra WCAG 2.1 AA sobre las superficies donde pueden aparecer. Los ratios están anotados en `globals.css`.

### Secciones

Ninguna sección pinta su propio fondo. Se usa `<Section>`:

```jsx
import Section from '@/components/Section';

<Section variant="alt" id="servicios">…</Section>
```

| `variant` | Uso |
|---|---|
| `default` | Fondo de página |
| `alt` | Sección alterna |
| `ink` | Banda oscura en los dos temas |
| `brand` | Banda azul de marca |

`ink` y `brand` aplican la clase `dark` a su subárbol, así el texto de adentro se resuelve con la paleta oscura aunque la página esté en claro.

Props: `as` (elemento o componente, por defecto `section`), `padding` (por defecto `true`, aplica `.section-padding`), más cualquier prop del elemento.

## Animación

Framer-motion estaba en 17 de 18 componentes haciendo casi siempre lo mismo: un fade con desplazamiento al entrar en viewport. Ese efecto ahora lo hace `<Reveal>` con IntersectionObserver y una transición CSS.

```jsx
<Reveal delay={90} className="…">…</Reveal>
```

Props: `as` (elemento, por defecto `div`), `delay` en ms, `y` desplazamiento inicial, `once`, `amount`.

**Framer-motion queda reservado** para lo que solo él hace bien: transiciones compartidas con `layoutId`, animaciones ligadas al scroll, reordenamientos y `AnimatePresence`. Si lo que querés es que algo aparezca al hacer scroll, usá `<Reveal>`.

Reglas:

- Nada anima el LCP. El título del hero aparece con el HTML.
- Ningún CTA principal tiene retardo mayor a 150 ms.
- Toda animación respeta `prefers-reduced-motion`. Ojo: si la animación se define en un `style` inline, la utilidad `motion-reduce:` de Tailwind **no** la desactiva — el estilo inline le gana. En esos casos hay que decidirlo en JS con `useReducedMotion()`.

## Imágenes

Todo pasa por `next/image` con `sizes` declarado. Nunca `<img>` crudo: sin dimensiones provoca CLS y no se beneficia de la optimización de Vercel.

Los originales de `src/assets/` están redimensionados a 600 px de lado máximo (700 px los logos de marca). Las tarjetas de cliente muestran el logo a 112 px y el carrusel a 224 px, así que 600 px cubre retina de sobra. **No subas un PNG de 3000 px**: `next/image` lo servirá al tamaño correcto, pero el archivo igual queda pesando en el repo y en el build.

## Arquitectura — nota importante

**Todos los componentes de `src/components/` llevan `'use client'`.** Es obligatorio para el App Router de Next: usan estado, efectos y framer-motion. No lo saques aunque parezca innecesario.

> Nota histórica: el README anterior explicaba que esto era por un editor visual Vite que convivía con Next. Ese entorno ya no existe (`index.html`, `src/main.jsx`, `src/App.jsx` y `vite.config.js` fueron eliminados). La regla sigue valiendo, por RSC.

## SEO y metadata

Centralizado en `src/app/layout.jsx`: `lang="es"`, Open Graph (`es_AR`), Twitter Card, `robots`, y JSON-LD `LocalBusiness`. Cada página exporta su propio `metadata`.

Pendientes conocidos, con detalle en `docs/DIAGNOSTICO-2026.md`: falta `/og-image.jpg` (hoy da 404), falta `canonical` en todas las rutas y el JSON-LD está incompleto.

## Medición

Todo lo que el sitio mide se empuja al `dataLayer`. Los tags de GA4, Google Ads y Meta se arman **dentro de GTM**, no acá: así el equipo de paid media configura sin tocar el repo.

`src/lib/analytics.js` expone `track`, `trackConversion`, `whatsappUrl` y `trackWhatsApp`. Eventos:

| Evento | Cuándo | Parámetros propios |
|---|---|---|
| `generate_lead` | Envío OK de un formulario | `form_id`, más la atribución |
| `form_start` | Primer tecleo en un formulario | `form_id` |
| `contact_whatsapp` | Clic en cualquier enlace de WhatsApp | `source_section`, más la atribución |
| `file_download` | Descarga del benchmark | `file_name` |
| `view_service` | Se abre un servicio del acordeón | `service_name` |
| `select_objective` | Cambio de tab en el configurador | `objective` |
| `click_case_study` | Clic al sitio de un cliente | `client_name`, `rubro`, `servicio` |
| `cta_click` | Clic en un CTA principal | `cta_text`, `cta_location` |
| `scroll_depth` | 25 / 50 / 75 / 90 % | `percent` |

Todos llevan además `page_path` y `page_location`.

### Atribución

`src/lib/attribution.js` captura `gclid`, `gbraid`, `wbraid`, `fbclid`, `msclkid`, `ttclid` y los UTMs al entrar, y los guarda en dos capas: primer toque en `localStorage`, último toque en `sessionStorage`. Cuando alguien completa un formulario, esos datos viajan con el lead al endpoint y salen en el mail al equipo.

Sin el `gclid` guardado no se pueden subir conversiones offline a Google Ads. Esa es la diferencia entre que el algoritmo optimice por "formularios enviados" y que optimice por "clientes ganados".

### Enlaces de WhatsApp

Nunca se escribe `https://wa.me/…` a mano. Se usa `whatsappUrl(origen, mensaje)`, que arma el link con mensaje precargado, y `trackWhatsApp(origen)` en el `onClick`. Si no, los enlaces quedan idénticos y no hay forma de saber qué sección genera las conversaciones.

### Consent Mode

Los defaults están en `granted` dentro de `src/components/Analytics.jsx`, que es el comportamiento que el sitio ya tiene (todavía no hay banner de cookies). Cuando exista `/privacidad` y el banner, hay que pasarlos a `denied` en ese archivo y que el banner dispare el `consent update`.

## Datos

| Archivo | Contiene |
|---|---|
| `src/data/marca.js` | Nombre, claim, teléfono, email, redes, ubicación, horarios, servicios y rutas. **Todo dato de la agencia sale de acá**: metadata, JSON-LD, footer, sitemap y enlaces de WhatsApp |
| `src/data/benchmark.js` | Año, título y rutas del Benchmark Inmobiliario. **El año sale solo de acá** — antes vivía suelto en cinco lugares y estaban desalineados |

## SEO, structured data y AEO

| Qué | Dónde | Nota |
|---|---|---|
| Imágenes de Open Graph | `src/app/**/opengraph-image.jsx` | Se generan en el build con `next/og`. **No declares `openGraph.images` en el `metadata`**: pisa al archivo |
| Canonical | `alternates.canonical` en cada `page.jsx` | Las siete rutas la declaran |
| JSON-LD | `src/lib/schema.js` | Grafo con `Organization`, `ProfessionalService` y `WebSite`. Incluye teléfono, horarios, `priceRange` y catálogo de los seis servicios |
| Sitemap | `src/app/sitemap.js` | Se genera desde `RUTAS` en `data/marca.js`, con `lastmod` |
| robots.txt | `src/app/robots.js` | Los rastreadores de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) están permitidos de forma explícita |
| llms.txt | `public/llms.txt` | Resumen del sitio para modelos de lenguaje |

`schema.js` exporta también `faqSchema()` y `breadcrumbSchema()`, listos para cuando existan preguntas frecuentes y las rutas `/servicios/[slug]`.

**Regla:** el structured data describe lo que la página muestra. Nada de `FAQPage` sin preguntas visibles ni `AggregateRating` sin reseñas reales — eso es penalización de Google, no un atajo.

## Formularios

Los tres formularios (contacto, footer, benchmark) comparten `<CamposLegales>`, que aporta el consentimiento obligatorio con enlace a `/privacidad` y un honeypot llamado `website_url`, fuera de la vista y fuera del recorrido por teclado.

Cada envío manda además `form_elapsed_ms`. El endpoint descarta el envío si el honeypot viene completo o si pasó menos de un segundo desde que cargó la página. El umbral es bajo a propósito: un falso positivo es un lead real perdido en silencio.

Todos los valores se escapan con `esc()` de `src/lib/lead-email.js` antes de interpolarse en el HTML del mail.

## Documentación

- **Diagnóstico completo:** [docs/DIAGNOSTICO-2026.md](docs/DIAGNOSTICO-2026.md)
- **Plan de relanzamiento:** [docs/PLAN-RELANZAMIENTO-2026.md](docs/PLAN-RELANZAMIENTO-2026.md)
- **Marca y contenido:** [docs/BRAND-CONTENT-KIT.md](docs/BRAND-CONTENT-KIT.md)
- **Historia del proyecto (migración Vite → Next, ya terminada):** [docs/FASE1-AUDITORIA.md](docs/FASE1-AUDITORIA.md)

## Historial de cambios

### 2026-08-25 — Fase 0: cimientos

- `globals.css`: definidas las variables CSS que `tailwind.config.js` ya referenciaba y que no existían. Arregla el anillo de foco de todos los `<Button>` (antes `box-shadow: none`), el fondo del toast de confirmación y del de error (antes transparentes) y el radio de `rounded-md` / `rounded-lg`.
- Tokens semánticos (`surface`, `ink`, `brand`, `hairline`) y componente `<Section>`. Los siete grises oscuros sueltos quedaron en tres superficies.
- Modo oscuro completo: se elimina la banda blanca del encabezado de `/servicios` y `/casos`, "Sin paquetes. A medida." pasa de 1,92:1 a legible, los campos de formulario dejan de ser blancos sobre fondo oscuro y el azul de acento usa `#6F8BFF` en oscuro.
- `ThemeProvider`: respeta la preferencia del sistema (`defaultTheme="system"`).
- `next.config.js`: optimización de imágenes activada (AVIF/WebP) y cabeceras de seguridad.
- Rutas API: cliente de Resend diferido, el build ya no depende del secreto.
- `src/data/benchmark.js`: año unificado en 2026.
- Eliminados `Testimonials.jsx` (testimonios inventados, seguía viajando en el bundle) y `CallToAction.jsx` (muerto).

### 2026-08-25 — Fase 3: velocidad y accesibilidad

- Originales de `src/assets/` redimensionados y optimizados: 11,97 MB → 2,11 MB.
- Los `<img>` crudos de `CaseStudies` pasaron a `next/image`. El carrusel duplica el track en el render, no el array: 17 imágenes en el DOM en vez de 34.
- **La home pasó de 10,36 MB a 1,12 MB con scroll completo. `/casos`, de 10,44 MB a 1,08 MB.**
- Video de inmobiliarias recodificado a 720×720 (11,18 MB → 3,53 MB), con póster, `preload="none"` y sin autoplay: la landing ya no descarga el video antes de que nadie decida verlo.
- Componente `<Reveal>`: los reveals genéricos salen de framer-motion y pasan a CSS.
- Modal del benchmark y menú mobile sobre Radix Dialog: foco atrapado, cierre con Escape, scroll del fondo bloqueado y foco devuelto al botón que los abrió.
- Acordeón de servicios: `<button>` real con el `h3` por fuera, en vez de un div con `role="button"`.
- `prefers-reduced-motion` respetado en el marquee de logos, el anillo del botón de WhatsApp y el spinner del modal.
- `tools/auditar-contraste.py`: audita las siete rutas en ambos temas, incluyendo estados hover.
- Sin dirección postal: la agencia trabaja 100% remota, así que el JSON-LD declara `Organization` y no `LocalBusiness`.

### 2026-08-25 — Fase 2: confianza y legales

- `/privacidad` y `/terminos`, enlazadas desde el footer y desde los tres formularios.
- Consentimiento obligatorio en los tres formularios, más honeypot y trampa de tiempo.
- Imágenes de Open Graph generadas por ruta: antes las siete apuntaban a `/og-image.jpg`, que devolvía 404.
- `canonical` en todas las rutas.
- JSON-LD completo: `Organization` + `ProfessionalService` + `WebSite`, con teléfono, horarios, `priceRange` y catálogo de servicios.
- Sitemap dinámico con `lastmod`, `robots.txt` generado con los bots de IA explícitos, y `llms.txt`.
- `src/data/marca.js`: los datos de la agencia dejan de estar repartidos por el código.
- Footer con navegación, datos de contacto y legales. Antes no tenía un solo enlace.
- Navbar: "Nosotros" y "Metodología" apuntan a `/#about` y `/#metodologia` desde páginas internas, en vez de a `/` pelado.

### 2026-08-25 — Fase 1: medición

- `src/lib/analytics.js`, `src/lib/attribution.js` y `src/components/Analytics.jsx`: capa de medición completa sobre `dataLayer`, con GTM detrás de `NEXT_PUBLIC_GTM_ID`.
- Los nueve eventos cableados y verificados en navegador.
- Los cuatro enlaces de WhatsApp pasaron a llevar mensaje precargado y origen.
- Los formularios mandan la atribución al endpoint, y el mail al equipo la muestra en un bloque aparte.
- `src/lib/lead-email.js`: los valores de formulario se escapan antes de interpolarse en el HTML del mail, más honeypot y trampa de tiempo contra bots.
- Vercel Analytics y Speed Insights, para tener Core Web Vitals de campo.

### 2026-03-06

- `Methodology.jsx`: restaurado `'use client'` faltante.
- `Navbar.jsx`: `aria-label` + `aria-expanded` en el botón de menú mobile.
- `WhatsAppButton.jsx`: `aria-label="Contactar por WhatsApp"`.
- `layout.jsx`: JSON-LD `LocalBusiness`.
