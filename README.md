# Posicionarte Online — Sitio marketing (Next.js)

Sitio de agencia en **Next.js 14 (App Router)** con export estático, diseño minimal premium (Apple-like) y 2 secciones WOW (Hero + Service Configurator).

## Comandos

| Comando        | Descripción                          |
|----------------|--------------------------------------|
| `npm install`  | Instalar dependencias                |
| `npm run dev`  | Servidor de desarrollo (puerto 3000) |
| `npm run build`| Genera sitio estático en `out/`      |
| `npm run start`| Sirve build (requiere `build` previo) |

## Rutas

- `/` — Home
- `/servicios` — Servicios
- `/casos` — Casos de estudio
- `/contacto` — Contacto (formulario)

## Documentación

- **Auditoría (FASE 1):** [docs/FASE1-AUDITORIA.md](docs/FASE1-AUDITORIA.md)
- **Ejecutar y desplegar (FASE 2):** [docs/FASE2-RUN-AND-DEPLOY.md](docs/FASE2-RUN-AND-DEPLOY.md)

## Deploy estático

Tras `npm run build`, subir el contenido de la carpeta **`out/`** a tu hosting (Vercel, Hostinger, etc.). Ver detalles en `docs/FASE2-RUN-AND-DEPLOY.md`.

---

## Arquitectura — nota importante

El proyecto tiene DOS entornos que conviven:

| Entorno | Archivos | Uso |
|---|---|---|
| **Next.js (produccion)** | `src/app/`, componentes | App real |
| **Editor visual (Vite)** | `index.html`, `src/main.jsx`, `src/App.jsx`, `vite.config.js` | Preview del editor interno |

Los componentes en `src/components/` son compartidos. **Todos llevan `'use client'`** — es obligatorio para Next.js RSC y no debe quitarse aunque parezca innecesario en Vite.

---

## Configuracion pendiente antes del lanzamiento

| Archivo | Que cambiar |
|---|---|
| `src/components/WhatsAppButton.jsx` | Numero actualizado: `5491172360193` ✅ |
| `src/app/layout.jsx` | Reemplazar `favicon.png` en OG images con imagen de 1200x630px para mejor preview en redes |

---

## SEO / Metadata (src/app/layout.jsx)

Todo centralizado en el root layout:
- `lang="es"` en `<html>`
- Open Graph completo (`es_AR`, imagen, descripcion)
- Twitter Card (`summary_large_image`)
- `robots: { index: true, follow: true }`
- JSON-LD schema `LocalBusiness` (servicios + redes sociales)

---

## Accesibilidad implementada

- Navbar: boton menu mobile con `aria-label` + `aria-expanded`
- WhatsApp button flotante: `aria-label="Contactar por WhatsApp"`
- Services accordion: `aria-expanded` + `aria-controls` + `role="region"`
- Hero: `aria-labelledby` en la seccion

---

## Historial de cambios

### 2026-03-06
- `Methodology.jsx`: restaurado `'use client'` faltante (causaba error RSC con `useRef`)
- `Navbar.jsx`: `aria-label` + `aria-expanded` en boton de menu mobile
- `WhatsAppButton.jsx`: `aria-label="Contactar por WhatsApp"`
- `layout.jsx`: JSON-LD schema `LocalBusiness` con servicios y perfiles de redes
# posicionarte-2026
