# FASE 1 — Auditoría del proyecto (Vite → Next.js)

**Fecha:** 2026-02-10  
**Objetivo:** Migrar React + Vite a Next.js App Router con static export, look Apple-like y 2 secciones WOW, sin romper estilos ni SEO.

---

## 1. Resumen de archivos clave

### package.json
- **Runtime:** React 18.2, react-dom 18.2.
- **Build:** Vite 4.4.5, @vitejs/plugin-react 4.
- **Scripts:** `dev` → `vite --host :: --port 3000`; `build` → `node tools/generate-llms.js || true && vite build`; `preview` → `vite preview --host :: --port 3000`.
- **Dependencias relevantes:**  
  - **UI:** @radix-ui/* (alert-dialog, avatar, checkbox, dialog, dropdown-menu, label, slider, slot, tabs, toast), class-variance-authority, clsx, tailwind-merge, tailwindcss-animate, lucide-react.  
  - **Motion:** framer-motion 10.16.4.  
  - **SEO/head:** react-helmet 6.1.0.  
- **Dev:** @babel/* (generator, parser, traverse, types), @types/node, @types/react, @types/react-dom, eslint, autoprefixer, postcss, tailwindcss 3.3.3, terser.
- **No hay:** react-router, TypeScript (no hay tsconfig en raíz).

### vite.config.js
- **Plugins:**  
  - En dev: `inlineEditPlugin`, `editModeDevPlugin`, `iframeRouteRestorationPlugin`, `selectionModePlugin` (Horizons/editor visual).  
  - Siempre: `react()`, `addTransformIndexHtml` (inyecta scripts de error/navigation para Horizons).
- **Alias:** `@` → `path.resolve(__dirname, './src')`.
- **Resolve:** extensions `['.jsx', '.js', '.tsx', '.ts', '.json']`.
- **Build:** `rollupOptions.external`: @babel/parser, traverse, generator, types.
- **Server:** cors, COEP credentialless, allowedHosts.

### Configuración TypeScript/JS
- No existe `tsconfig.json` ni `jsconfig.json` en la raíz → proyecto **solo JS/JSX**.

### index.html
- Clásico Vite: `<div id="root">`, `<script type="module" src="/src/main.jsx">`.
- Meta viewport, charset UTF-8, title "Posicionarte Online", favicon /vite.svg.

### src/main.jsx
- `ReactDOM.createRoot(document.getElementById('root')).render(<App />)`.
- Imports: `@/App`, `@/index.css`. Sin router.

### src/App.jsx
- **Sin rutas:** una sola página.  
- **Helmet:** title "Posicionarte Online - Agencia de Marketing Digital", meta description (crecimiento digital, Google Ads, Meta Ads, SEO, etc.).  
- **Estructura:** `min-h-screen bg-white` → Navbar (fixed), `<main>` (Hero, About, Services, Methodology, CaseStudies, Testimonials, Plans, CTASection), Footer, WhatsAppButton, Toaster.

### Rutas y navegación
- **No hay react-router.** Todo es una SPA con anclas: `#hero`, `#servicios`, `#metodologia`, `#casos`, `#about`, `#footer`.
- **Rutas reales:** ninguna URL distinta; una sola entrada `/`.

---

## 2. Estructura de /src

```
src/
├── main.jsx
├── App.jsx
├── index.css
├── lib/
│   └── utils.js
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── About.jsx
    ├── Services.jsx
    ├── Methodology.jsx
    ├── CaseStudies.jsx
    ├── Testimonials.jsx
    ├── Plans.jsx
    ├── CTASection.jsx
    ├── Footer.jsx
    ├── WhatsAppButton.jsx
    ├── HeroImage.jsx      (no usado en App)
    ├── WelcomeMessage.jsx (no usado en App)
    ├── CallToAction.jsx   (no usado en App)
    └── ui/
        ├── button.jsx, input.jsx, label.jsx, textarea.jsx
        ├── toast.jsx, toaster.jsx, use-toast.js
```

- **Imports:** todos usan alias `@/` (ej. `@/App`, `@/components/Navbar`, `@/lib/utils`, `@/components/ui/button`).  
- No hay carpeta `src/pages` ni `src/assets`. Imágenes: URLs externas (Unsplash, imagedelivery.net) en CaseStudies, Testimonials, HeroImage.

---

## 3. Uso de react-router, alias, assets, CSS, motion, env

- **React Router:** no se usa.  
- **Alias:** solo `@` → `./src` (en Next se mantiene con `compilerOptions.paths` en tsconfig o equivalente para JS).  
- **Assets:**  
  - `public/`: solo `.htaccess`.  
  - Imágenes: enlaces externos en componentes (CaseStudies, Testimonials, HeroImage).  
  - No hay `src/assets` ni referencias a `/public/` desde código.  
- **CSS:**  
  - `src/index.css`: `@tailwind base/components/utilities`, `@import` Google Fonts (Inter), body con `@apply bg-white text-[#414141]`, font Inter, smooth scroll. Clase `.section-padding` (py-24 px-6, etc.).  
  - **Framework:** Tailwind 3 + tailwindcss-animate.  
  - **Tema:** `tailwind.config.js` con tema tipo shadcn (colores HSL con variables CSS --border, --primary, etc., radius, accordion keyframes).  
- **Animación:** Framer Motion en casi todos los componentes: Hero, Navbar (AnimatePresence menú móvil), About, Services, Methodology, CaseStudies, Testimonials, Plans, CTASection, Footer, WhatsAppButton, CallToAction, WelcomeMessage. Patrón: `motion.div` con initial/animate/viewport/transition, stagger, springs.  
- **Variables de entorno:**  
  - En `src/`: ninguna referencia a `process.env` ni `import.meta.env`.  
  - En `vite.config.js`: solo en build, `TEMPLATE_BANNER_SCRIPT_URL` y `TEMPLATE_REDIRECT_URL` para inyectar un script en el HTML. No afectan la migración inicial.

---

## 4. tools/generate-llms.js

- Genera `public/llms.txt` con lista de “páginas” (title + description) para uso LLM.  
- Como no existe `src/pages`, lee solo `App.jsx`, extrae Helmet (title, description) y escribe una sola entrada.  
- Depende de regex de `<Route>` y `<Helmet>`; en Next no hay Helmet ni Route en App, así que este script **no es necesario** para el build de Next; se puede eliminar del `build` o sustituir por un script que lea metadata de `app/**/page.jsx` y genere `public/llms.txt` si se quiere mantener el artefacto.

---

## 5. Qué rutas reales hay y qué páginas conviene tener para SEO

- **Rutas reales hoy:** ninguna; una sola página en `/`.  
- **Recomendación SEO (mínimo):**  
  - **`/`** — Home (Hero + resumen de secciones o enlaces internos).  
  - **`/servicios`** — Servicios (contenido de la sección actual + H1 propio).  
  - **`/casos`** — Casos de estudio (contenido actual de casos + H1 propio).  
  - **`/contacto`** — Formulario/CTA (Footer/CTASection; H1 “Contacto”).  
  Opcional: `/nosotros` o `/metodologia` si se quiere más profundidad; con 2–3 rutas extra ya se gana bastante para SEO sin abrumar.

- **Navegación:** se puede mantener sensación SPA: en el Navbar usar `<Link>` de Next hacia `/`, `/servicios`, `/casos`, `/contacto`, y en cada página reutilizar las mismas secciones (o wrappers con scroll a anclas) y transiciones suaves entre “páginas” (ej. con Framer Motion) para que siga sintiéndose fluido.

---

## 6. ¿Se puede mantener deploy estático con `output: 'export'`?

**Sí.**

- No hay rutas dinámicas que dependan de datos en runtime.  
- No hay API routes ni SSR obligatorio para este marketing site.  
- Next.js con `output: 'export'` genera HTML/CSS/JS estáticos en `out/` (o el directorio configurado), listos para Hostinger, Vercel Static, o cualquier hosting estático.  
- Limitaciones conocidas de static export: no usar `getServerSideProps`, `getStaticProps` con revalidate, API routes, middleware que dependa de respuesta del servidor, etc. Aquí no se usa nada de eso.  
- Los plugins de Vite de Horizons (editor visual, iframe, selection mode) son solo para dev; en Next no se llevan y el build de producción será “solo sitio estático”, lo cual es compatible con el objetivo.

---

## 7. Checklist pre-migración

| Tema | Estado |
|------|--------|
| Rutas | Una sola página; mapear a `/`, `/servicios`, `/casos`, `/contacto` (file-based) |
| Alias `@` | Recrear en Next (tsconfig paths o jsconfig) |
| Helmet | Reemplazar por metadata de Next (layout + page) |
| Tailwind + postcss | Mantener; adaptar content paths a `app/`, `components/` |
| Framer Motion | Mantener; usar solo en Client Components donde haga falta |
| Imágenes | Externas; donde se añadan locales, usar next/image |
| generate-llms | Quitar del build o reemplazar por script basado en app/ |
| Variables de entorno | Ninguna en src; banner/redirect opcionales en build |

---

## 8. Siguiente paso: FASE 2

- Implementar migración a Next.js App Router con `output: 'export'`.  
- Mantener estructura y componentes, adaptar entrada (layout + páginas).  
- Añadir SEO (metadata, H1 por página, estructura semántica).  
- Refinar UI a estilo Apple-like y añadir 2 secciones WOW (Hero + una segunda: configurator, case strip o process timeline).  
- Respetar `prefers-reduced-motion` y performance (islas de client components, next/image, lazy-load).
