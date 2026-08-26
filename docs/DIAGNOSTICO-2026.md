# Diagnóstico posicionarte.online — agosto 2026

Estado real del sitio al 25/08/2026. Reemplaza a `docs/FASE1-AUDITORIA.md`, que documenta la migración Vite → Next ya terminada y no describe el estado actual.

Este documento es solo diagnóstico. No se modificó código.

---

## 0. Cómo se hizo y qué está verificado

Se leyeron los 25 archivos de `src/`, los configs, `public/` y `docs/BRAND-CONTENT-KIT.md`. Además se **compiló y levantó el sitio** en un entorno limpio (`next build` + `next start`, Next 14.2.35) y se midió con un navegador real (Chromium headless).

**Verificado corriendo el sitio:**

- Build completo y tamaño de cada ruta (salida de `next build`).
- Peso total transferido por ruta, con detalle por tipo de recurso.
- Estilos computados en claro y oscuro (`getComputedStyle`) en `/`, `/casos`, `/servicios`.
- Recorrido completo por teclado (Tab) en `/contacto`, midiendo `outline` y `box-shadow` de cada elemento enfocado.
- Render del toast de confirmación tras enviar el formulario.
- Comportamiento de las tarjetas de `/casos` en iPhone 13 emulado.
- Códigos HTTP de `/og-image.jpg`, `/sitemap.xml`, `/videos/*.mp4`.
- Contrastes calculados con la fórmula WCAG 2.1 sobre los hex reales del código.

**No verificado (se dice explícitamente en cada hallazgo):**

- Comportamiento del video en un navegador real: el Chromium de este entorno no decodifica H.264, así que la descarga del MP4 no se pudo medir en vivo. Lo que sí es dato duro: el archivo pesa 11,7 MB y el `<video>` tiene `autoPlay` sin `preload` ni `poster`.
- Comportamiento del hosting real (Apache/Hostinger vs Vercel). El riesgo del `.htaccess` (S-8) depende de la config del servidor.
- Core Web Vitals de campo (CrUX / PageSpeed sobre el dominio productivo).
- Si el sitio publicado hoy en posicionarte.online coincide con este repo — la carpeta `out/` del repo es de marzo y no incluye `/inmobiliarias`.

---

## 1. Resumen ejecutivo

Seis cosas rompen antes que cualquier otra.

1. **El sitio ya no es un export estático y el README dice que sí.** `next.config.js` no tiene `output: 'export'` y hay dos rutas API. `next build` produce `.next/`, no `out/`. La carpeta `out/` versionada es de marzo y ni siquiera contiene `/inmobiliarias`.
2. **Faltan las variables CSS de shadcn.** Ningún archivo define `--primary`, `--background`, `--ring`, `--radius`. Consecuencia medida: **ningún `<Button>` del sitio muestra foco visible** y **el toast de "Mensaje enviado" se dibuja transparente**.
3. **La home pesa 10,4 MB**, de los cuales 9,86 MB son imágenes. Un solo logo (`elrecreo.png`) pesa 5,16 MB y se muestra en una caja de 112 px.
4. **En `/casos`, desde un celular, no hay un solo enlace a ningún sitio de cliente.** Los links solo aparecen en `:hover`. Medido en iPhone 13: 0 enlaces.
5. **Cero analítica.** No hay GA4, GTM, Meta Pixel ni conversiones. Una agencia de performance no puede medir su propio embudo.
6. **`/og-image.jpg` devuelve 404** y es la imagen que usan todas las rutas para Open Graph y Twitter. Todo lo que se comparte de posicionarte.online sale sin imagen.

---

## 2. Estado real por ruta

| Ruta | Archivo | Componentes | Metadata propia | Peso medido | HTML | h1 / h2 | Qué le falta |
|---|---|---|---|---|---|---|---|
| `/` | `src/app/page.jsx` | Navbar, Hero, About, ServiceConfigurator, Services, IASection, Methodology, CaseStudies, Plans, CTASection, Footer, WhatsAppButton | Sí (title, desc, OG, Twitter) | **10,41 MB** | 106 KB | 1 / 9 | canonical, OG image real, dark mode en el wrapper, peso de imágenes |
| `/servicios` | `src/app/servicios/page.jsx` | Navbar, Services, CTASection, Footer, WhatsAppButton | Sí (sin Twitter, sin `openGraph.url`) | 0,82 MB | 37 KB | 1 / 3 | canonical, contenido propio (hoy duplica el h1 en el h2), dark mode en la banda superior |
| `/casos` | `src/app/casos/page.jsx` | Navbar, CaseStudies, CTASection, Footer, WhatsAppButton | Sí (sin Twitter, sin `openGraph.url`) | **10,44 MB** | 66 KB | 1 / 3 | canonical, enlaces accesibles en mobile, métricas que la propia metadata promete |
| `/contacto` | `src/app/contacto/page.jsx` | Navbar, ContactSection, Footer (`hideForm`), WhatsAppButton | Sí (sin Twitter, sin `openGraph.url`) | 0,81 MB | 25 KB | 1 / 0 | canonical, teléfono/WhatsApp en el form, datos de contacto directos, anti-spam |
| `/inmobiliarias` | `src/app/inmobiliarias/page.jsx` | Navbar, InmobiliariasLanding, Footer (`hideForm`), WhatsAppButton | Sí (sin Twitter, sin `openGraph.url`) | 0,85 MB + video 11,7 MB | 30 KB | 1 / 0 | canonical, contenido (0 `h2` en toda la landing), modal accesible, coherencia 2025/2026, política de privacidad |
| `/api/contact` | `src/app/api/contact/route.js` | — | — | Dinámica (`ƒ`) | — | — | validación, rate limit, escape de HTML |
| `/api/benchmark` | `src/app/api/benchmark/route.js` | — | — | Dinámica (`ƒ`) | — | — | ídem |

**Rutas ausentes que el negocio necesita:** `/privacidad` (tres formularios recolectan datos personales y el modal afirma "Tus datos no se comparten con terceros" sin política que lo respalde), `/nosotros`, y una página por servicio — hoy los seis servicios viven en un acordeón sin URL propia, así que no compiten por ninguna búsqueda.

**Componentes muertos:** `Testimonials.jsx` (importado en `page.jsx:35`, comentado en `page.jsx:53` — pero **igual viaja en el bundle**) y `CallToAction.jsx` (nunca importado, texto en inglés, sin `'use client'`).

---

## 3. Hallazgos por eje

Ordenados por impacto dentro de cada eje.

### 3.1 Performance

**P-1 · La home transfiere 10,41 MB; 9,86 MB son imágenes.**
Medido con Chromium a 1366×900: 25 requests de imagen, 9.862 KB. `/casos` es idéntico (10,44 MB). Los cinco peores:

| Archivo | Peso | Dimensiones reales | Caja donde se muestra |
|---|---|---|---|
| `src/assets/images/clients/logos/elrecreo.png` | **5,16 MB** | 3172 × 3128 | 112 px de ancho (`CaseStudies.jsx:422`, `w-28`) |
| `src/assets/images/clients/logos/luagroRED.png` | 1,19 MB | 1024 × 1024 | 112 px |
| `src/assets/images/clients/logos/estudioVuotto.png` | 1,05 MB | 1024 × 1024 | 112 px |
| `logoCarrousel/luagro-transparente.png` | 489 KB | 967 × 395 | 224 px (`CaseStudies.jsx:493`, `w-56`) |
| `logoCarrousel/estudioVuotto.png` | 383 KB | 919 × 396 | 224 px |

Con `images.unoptimized: true` (`next.config.js:5`) Next sirve los originales tal cual. Ningún logo necesita más de ~450 px de ancho.

**P-2 · El carrusel duplica el array de clientes: 34 `<img>` extra.**
`CaseStudies.jsx:463` — `const items = [...clients, ...clients]`. Sumado a las 17 tarjetas, la home renderiza **53 etiquetas `<img>`** (medido en el HTML generado). Además la animación `marquee` (`CaseStudies.jsx:481`, `globals.css:21`) corre en bucle infinito y no respeta `prefers-reduced-motion`.

**P-3 · Video de 11,7 MB con autoplay en la landing de captación.**
`InmobiliariasLanding.jsx:132-144`: `autoPlay muted loop playsInline`, sin `preload="none"` y sin `poster`. Datos del archivo: 1080×1080, 98 s, ~956 kbps, 11.727.950 bytes. `curl` al asset confirma que el servidor lo entrega completo (200, 11.727.950 bytes). *No pude medir la descarga en vivo porque el Chromium de este entorno no decodifica H.264 — el peso del archivo y la ausencia de `preload`/`poster` sí son dato duro.* La copia original en `src/assets/videos/video-landing-inmobiliaria.mp4` pesa **121,8 MB** (está en `.gitignore:9`, pero ocupa el disco de trabajo).

**P-4 · Assets que entran al build sin usarse.**
`INBazul.png` (49 KB) e `INBblanco.png` (47 KB) se importan en `CaseStudies.jsx:28` y `:34`, pero el cliente que los usaba está comentado (`CaseStudies.jsx:304-314`). Verificado: ambos archivos aparecen en `.next/static/media/`. Sin importar pero ocupando el repo: `src/assets/images/Group 2 (1).png` (780 KB, 4800 × 4800), `logos/COA1.jpg` (598 KB), `logos/futbolQueen.jpg` (31 KB). `.next/static/media` total: 11 MB.

**P-5 · `Testimonials.jsx` viaja en el bundle de la home aunque esté comentado.**
El import de `page.jsx:35` sigue activo. Verificado por grep sobre el chunk compilado `.next/static/chunks/app/page-*.js`: contiene `"María González"`, `"TechStart"` y `images.unsplash.com`. El chunk de la home pesa 29 KB. Comentar el JSX no saca el código; hay que sacar el import.

**P-6 · framer-motion en 17 de 18 componentes.**
`First Load JS shared by all: 87,3 KB`, de los cuales el chunk `fd9d1056` (framer-motion) son 53,6 KB. La home suma 179 KB de First Load JS. Casos donde el costo no se justifica: `Plans.jsx:66-71` y `Services.jsx:85-90` usan `whileInView` con `delay: index * 0.1` solo para un fade de entrada; `Navbar.jsx:57-62` anima la barra entera con un spring y `delay: 0.5`, retrasando medio segundo la aparición del logo y del CTA principal.

**P-7 · Sin cabeceras de caché para assets inmutables.**
`public/.htaccess` solo define un rewrite y `X-Powered-By`. `/_next/static/*` tiene hash en el nombre y podría ir con `Cache-Control: public, max-age=31536000, immutable`. Hoy cada visita repetida rebaja los ~600 KB de JS y las imágenes.

**P-8 · Dos hojas de estilo, una huérfana.**
`src/index.css` no lo importa nadie (verificado por grep) y trae dos `@import` a Google Fonts (Poppins, Rowdies) que ya no se usan — el layout carga Plus Jakarta Sans y Playfair Display vía `next/font` (`layout.jsx:6-17`). `tailwind.config.js:20-21` sigue declarando `poppins` y `rowdies`.

### 3.2 SEO técnico

**S-1 · `/og-image.jpg` no existe: 404 verificado.**
Referenciada en `layout.jsx:60` y `:72`, y otra vez en `page.jsx:12` y `:23`. `public/` contiene únicamente `.htaccess`, `benchmark-inmobiliario-2026.pdf`, `favicon.png`, `robots.txt`, `sitemap.xml` y `videos/`. Toda pieza compartida en WhatsApp, LinkedIn o Facebook sale sin imagen. El README (`README.md:50`) menciona el problema pero apunta al archivo equivocado (`favicon.png`).

**S-2 · Ninguna ruta declara `canonical`.**
Verificado en el HTML generado de las cinco rutas: `rel="canonical"` no aparece en ninguna. Sin canonical, `posicionarte.online/servicios`, `/servicios/` y cualquier variante con parámetros de campaña (`?gclid=`, `?utm_source=`) se indexan como URLs distintas. Para un sitio que recibe tráfico pago, esto se nota.

**S-3 · Duplicación literal de contenido en `/servicios`.**
`servicios/page.jsx:25-30` renderiza el `h1` "Soluciones para cada objetivo." y el párrafo "Un conjunto de servicios integrales de marketing digital diseñados para impulsar el crecimiento de tu negocio.". Diez líneas más abajo, `<Services />` (`Services.jsx:70-75`) renderiza **exactamente el mismo título como `h2` y exactamente el mismo párrafo**. Se ve en pantalla, dos veces seguidas.

**S-4 · Los seis servicios no tienen URL propia.**
`Services.jsx:7-44` los mete en un acordeón cerrado por defecto (`activeIndex = null`, línea 47). El texto existe en el HTML, pero no hay `/servicios/google-ads`, `/servicios/seo`, etc. Con seis servicios y una descripción de dos líneas cada uno, no hay superficie para posicionar por ninguna consulta comercial.

**S-5 · `/inmobiliarias` no tiene ni un `h2`.**
Verificado sobre el HTML generado: 1 `h1`, 0 `h2`. La landing entera son 30 KB de HTML con un título, un párrafo de una línea ("Estrategias digitales que están funcionando ahora.", `InmobiliariasLanding.jsx:458`), un video y un botón. Es la vertical que el brand kit marca como prioritaria y es la página con menos contenido indexable del sitio.

**S-6 · JSON-LD `LocalBusiness` incompleto y con perfil social que se contradice.**
`layout.jsx:21-36` no incluye `telephone`, `address`, `email`, `openingHours` ni `priceRange` — los campos que Google usa para el panel local. Además `layout.jsx:31` declara `https://www.instagram.com/posicionarteonline`, mientras que `Navbar.jsx:100`, `Navbar.jsx:162` y `Footer.jsx:136` enlazan a `https://www.instagram.com/posicionarte.online/`. Son dos handles distintos dentro del mismo repo; hay que confirmar cuál es el real y unificarlo. Lo mismo, menor, con LinkedIn: `ar.linkedin.com` en `Footer.jsx:115` vs `www.linkedin.com` en `layout.jsx:30`.

**S-7 · Sitemap manual, sin `lastmod` y desincronizado del build.**
`public/sitemap.xml` lista las cinco rutas correctas, pero es estático: cualquier ruta nueva hay que acordarse de agregarla. No usa `<lastmod>`, así que Google no tiene señal de frescura. Next 14 puede generarlo desde `src/app/sitemap.js`.

**S-8 · El `.htaccess` puede servir la home en todas las rutas internas.**
`public/.htaccess:4-6`: si la request no coincide con un archivo ni un directorio, reescribe a `index.html`. Con export estático Next genera `servicios.html`, `casos.html`, etc. (así está en el `out/` versionado). En un Apache **sin `MultiViews`**, `/servicios` no matchea ningún archivo → sirve la home. *Depende de la config del hosting; no lo pude verificar sin acceso al servidor.* Con el sitio como está hoy (build de Node, no export) el `.htaccess` no aplica, pero queda como bomba para el próximo deploy estático.

**S-9 · Enlazado interno pobre.**
El `Footer.jsx` no tiene un solo enlace de navegación: solo logo, copyright y tres íconos sociales. Ninguna página enlaza a `/inmobiliarias` salvo el sitemap. `Navbar.jsx:40-43` en páginas internas manda "Nosotros" y "Metodología" a `/` a secas, en vez de `/#about` y `/#metodologia` — el usuario aterriza arriba de la home y tiene que buscar la sección.

**S-10 · Sin cabeceras de seguridad.**
`public/.htaccess:9-11` define `X-Powered-By` y nada más. Faltan `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`, `Permissions-Policy`. No afecta ranking directo, pero sí las auditorías que los propios clientes corren.

### 3.3 Accesibilidad

**A-1 · Ningún `<Button>` muestra foco visible. Verificado por teclado.**
Causa: `tailwind.config.js:24-56` mapea los colores a `hsl(var(--border))`, `hsl(var(--primary))`, `hsl(var(--ring))`, etc., y **ningún archivo CSS define esas variables** (grep sobre todo `src/`: 0 resultados; `grep -c -- "--radius:"` sobre el CSS compilado: 0). `button.jsx:7` usa `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`: quita el outline del navegador y pide un ring que nunca se pinta.

Medición real, recorriendo `/contacto` con Tab:

| Elemento | `outline` computado | `box-shadow` computado |
|---|---|---|
| "Ingresar" (`Navbar.jsx:94`) | `rgba(0,0,0,0) solid 2px` | `none` |
| "Contacto" (`Navbar.jsx:97`) | `rgba(0,0,0,0) solid 2px` | `none` |
| **"Enviar mensaje"** (`ContactSection.jsx:79`) | `rgba(0,0,0,0) solid 2px` | `none` |
| Input nombre (`input.jsx:9`, ring literal `#3256D7`) | `rgba(0,0,0,0) solid 2px` | `rgb(255,255,255) 0 0 0 2px, rgb(50,86,215) …` ✓ |

Los inputs sí muestran anillo porque usan el hex literal. Los botones no. Incumple WCAG 2.4.7. Alcanza a: "Contacto", "Ingresar", "Enviar mensaje", "Consultar" ×3 en `Plans.jsx:93`, "Agendar reunión gratuita" en `CTASection.jsx:25`, "Hablemos por WhatsApp" en `Hero.jsx:76`, "Ver qué hacemos" en `Hero.jsx:93`, "Descargar ahora" en `InmobiliariasLanding.jsx:381`.

**A-2 · El toast de confirmación se dibuja transparente. Verificado.**
Misma causa. `toast.jsx:26` usa `bg-background`. Estilos computados del toast tras enviar el formulario de `/contacto`:

```
background-color: rgba(0, 0, 0, 0)
border-radius:    0px
texto:            "¡Mensaje enviado! / Te respondemos a la brevedad."
```

El único feedback de que el lead se envió se superpone al contenido de la página sin fondo y con esquinas rectas. La variante `destructive` (`toast.jsx:28`) tiene el mismo problema, así que el mensaje de error también.

**A-3 · Contrastes que fallan. Calculados sobre los hex del código.**

| Combinación | Ratio | Dónde |
|---|---|---|
| `#414141` sobre `#0c0c0c` | **1,92:1** | `Hero.jsx:67` — "Sin paquetes. A medida." sin variante dark. Es la frase diferencial de la marca y en modo oscuro es prácticamente invisible (confirmado en captura). |
| blanco sobre `#25D366` | **1,98:1** | Texto de los botones de WhatsApp: `Hero.jsx:78`, `IASection.jsx:104`. A 18 px semibold no llega ni al umbral de 3:1 de texto grande. |
| `gray-400` sobre blanco | **2,54:1** | Placeholders de todos los formularios: `input.jsx:9`, `textarea.jsx:8`. |
| `gray-600` sobre `#0c0c0c` | **2,59:1** | `InmobiliariasLanding.jsx:403` ("Tus datos no se comparten con terceros") y `:505` ("Sin spam. Solo el informe.") en modo oscuro. |
| `#3256D7` sobre `#0c0c0c` | **3,21:1** | Azul de marca sobre fondo oscuro. El propio brand kit dice usar `#6F8BFF` en dark; el código usa `#3256D7` en `Navbar.jsx:104/149/166`, `Footer.jsx:118/139/160`, `Services.jsx:114`. |
| `#414141/60` sobre blanco | **3,32:1** | Copyright, `Footer.jsx:109`. |
| `gray-500` sobre `#1a1a1a` | **3,60:1** | Filtros inactivos de `/casos` en dark, `CaseStudies.jsx:449`. |
| `gray-500` sobre `#111111` / `#0c0c0c` | **3,91 / 4,05:1** | 20 usos de `text-gray-500` sin variante dark (listado en V-1). |

**A-4 · En mobile, `/casos` no ofrece un solo enlace. Verificado en iPhone 13 emulado.**
`CaseStudies.jsx:349-359`: la tarjeta abre los enlaces solo con `onMouseEnter`/`onMouseLeave`. No hay `onFocus`, `onBlur`, `onClick` ni `tabIndex` (grep confirmado). Medición: en iPhone 13, `/casos` renderiza **0** enlaces "Ver sitio"/"Ver tienda"/"Ver Instagram"; tocar una tarjeta tampoco los revela. Además la tarjeta lleva `cursor-pointer` (línea 358) sin ser clickeable: promete una interacción que no existe. Con teclado pasa lo mismo: los 17 clientes del portfolio son inalcanzables.

**A-5 · El modal de descarga del benchmark no es un diálogo accesible.**
`InmobiliariasLanding.jsx:273-410`: sin `role="dialog"`, sin `aria-modal="true"`, sin `aria-labelledby`, sin trampa de foco, sin cierre con Escape, sin devolución del foco al botón que lo abrió y sin bloqueo del scroll del fondo. El proyecto ya tiene `@radix-ui/react-dialog` instalado (`package.json:15`) y sin usar.

**A-6 · El menú mobile tampoco atrapa el foco.**
`Navbar.jsx:130-177`: overlay `fixed inset-0` sin `role="dialog"`, sin cierre con Escape, sin bloqueo del scroll del body y sin trampa de foco. Con el menú abierto se puede tabular hacia el contenido de atrás.

**A-7 · El acordeón de servicios es un `div` con `role="button"`.**
`Services.jsx:93-107`. Funciona (tiene `tabIndex`, `onKeyDown`, `aria-expanded`, `aria-controls`), pero contiene un `h3` adentro (línea 112), lo que rompe la navegación por encabezados de los lectores de pantalla. Un `<button>` real envolviendo solo el texto resuelve las dos cosas.

**A-8 · Botones sin nombre accesible correcto.**
`Footer.jsx:95-108`: el botón "volver arriba" solo contiene una imagen con `alt="Posicionarte .online"`, así que un lector de pantalla lo anuncia como "Posicionarte .online, botón" en vez de "Volver arriba". `FilterBar` (`CaseStudies.jsx:441-455`) no expone `aria-pressed`, y el estado activo se comunica solo por color.

**A-9 · Animaciones infinitas que ignoran `prefers-reduced-motion`.**
El proyecto tiene el hook `useReducedMotion` (`lib/use-reduced-motion.js`) y lo usa en siete componentes, pero no en: el anillo pulsante del botón de WhatsApp (`WhatsAppButton.jsx:33-37`, `repeat: Infinity`), el marquee de logos (`CaseStudies.jsx:481`), el spinner del modal (`InmobiliariasLanding.jsx:388-392`), `Methodology.jsx` entero, `Plans.jsx`, `Services.jsx` y `Testimonials.jsx`.

**A-10 · Video sin transcripción ni subtítulos.**
`InmobiliariasLanding.jsx:132-144`: 98 segundos de video que arrancan silenciados, sin `<track>` ni texto alternativo del contenido. Quien no puede oírlo (o lo deja mudo, que es el caso por defecto) no accede a nada de lo que dice.

### 3.4 Conversión

**C-1 · No hay analítica ni medición de conversiones.**
Grep sobre todo `src/` y `public/`: ni `gtag`, ni `googletagmanager`, ni `fbq`, ni GA4, ni Clarity, ni Hotjar. Para Posicionarte esto significa tres cosas concretas: no se sabe qué sección genera los chats de WhatsApp, no se pueden importar conversiones a Google Ads ni a Meta Ads, y no hay audiencias de remarketing propias. Es el hallazgo con mejor relación impacto/esfuerzo del documento.

**C-2 · Los cuatro enlaces a WhatsApp son idénticos y sin trazabilidad.**
`Hero.jsx:81`, `IASection.jsx:101`, `Plans.jsx:100`, `WhatsAppButton.jsx:22`: los cuatro apuntan a `https://wa.me/5491172360193` pelado. Sin `?text=` precargado y sin ningún parámetro de origen. Cuando llega un mensaje, no hay forma de saber si vino del hero, de la sección de IA, de las modalidades de trabajo o del botón flotante. Un `?text=Hola, vengo desde la sección Planes del sitio` resuelve la atribución sin tocar nada más.

**C-3 · El formulario de contacto no pide teléfono, que es el canal principal de la agencia.**
`ContactSection.jsx:65-78` y `Footer.jsx:73-86` piden nombre, email y mensaje. El propio sitio empuja a WhatsApp en cinco lugares distintos, pero cuando alguien elige el formulario, se pierde el número. Comparar con el modal del benchmark (`InmobiliariasLanding.jsx:342-346`), que sí lo pide y además califica al lead con la pregunta de inversión (`:348-375`). Ese es el patrón bueno y está en una sola página.

**C-4 · Dos formularios idénticos duplicados en el código.**
`ContactSection.jsx` (h1 "Hablemos.", líneas 49-53) y `Footer.jsx` (h2 "Hablemos.", líneas 58-62) tienen el mismo título, el mismo párrafo palabra por palabra y el mismo `handleSubmit` copiado (`ContactSection.jsx:18-37` ≡ `Footer.jsx:23-42`). Cualquier mejora al formulario hay que hacerla dos veces, y ya se nota: en ambos, `finally { setStatus('idle') }` (`ContactSection.jsx:35`, `Footer.jsx:40`) pisa el estado `'done'` que se acababa de setear, así que ese estado nunca se renderiza.

**C-5 · Sin anti-spam en ninguno de los tres formularios.**
`api/contact/route.js` y `api/benchmark/route.js` no tienen honeypot, ni rate limit, ni verificación de origen. Son endpoints públicos que disparan mails vía Resend: cualquiera con `curl` puede vaciar la cuota y llenar la casilla.

**C-6 · Los datos del formulario se interpolan crudos en el HTML del mail.**
`api/contact/route.js:25`, `:29`, `:33` y `api/benchmark/route.js:33`, `:37`, `:41`, `:45`, `:49` insertan `${name}`, `${email}`, `${message}`, `${company}` y `${phone}` directamente en el template. Un envío con `<img src=x onerror=...>` o con etiquetas cerradas rompe o manipula el mail que le llega al equipo. Hay que escapar antes de interpolar.

**C-7 · "Modalidades de Trabajo" no ayuda a decidir.**
`Plans.jsx:9-44`: tres tarjetas sin precio, sin rango, sin "desde", sin duración mínima y sin criterio de para quién es cada una. Las tres terminan en el mismo botón "Consultar" al mismo link de WhatsApp. Y el nombre del plan destacado es **"FULL POSI"** (`Plans.jsx:24`): jerga interna que un prospecto no puede interpretar, marcada además como "MÁS POPULAR" (`:78`). El brand kit describe esa modalidad como "Soluciones específicas para necesidades puntuales" — el nombre no comunica eso.

**C-8 · `/inmobiliarias` es una landing de captación sin argumentos.**
`InmobiliariasLanding.jsx:415-519`: título, una línea de subtítulo, un video y un botón. No dice qué hay adentro del informe, cuántas páginas tiene, qué mercados cubre, de dónde salen los datos ni por qué una inmobiliaria debería dar su mail. Tampoco hay salida a WhatsApp ni prueba social. Es la única página con captura de leads calificada y es la que menos razones da para completarla.

**C-9 · El CTA de `/inmobiliarias` usa el color de error de la marca.**
`InmobiliariasLanding.jsx:484`: `bg-[#E03E2D]`. El brand kit reserva `#E03E2D` para "Alerta / error". El botón principal de conversión de la vertical prioritaria está pintado del color con el que el sistema comunica que algo salió mal.

**C-10 · "Agendar reunión gratuita" no agenda nada.**
`CTASection.jsx:25-30`: el botón lleva a `#footer`, que es un formulario genérico de contacto. No hay calendario, ni selección de horario, ni confirmación. La promesa del botón y lo que entrega no coinciden.

**C-11 · No hay datos de contacto directos en ningún lado.**
El footer no muestra mail, teléfono ni zona de trabajo. Para un negocio local que quiere aparecer en búsquedas de "agencia de marketing digital + ciudad", eso es señal perdida en SEO local y fricción para el visitante que prefiere escribir un mail.

**C-12 · Sin página de privacidad, con tres formularios activos.**
`InmobiliariasLanding.jsx:403` afirma "Tus datos no se comparten con terceros" sin política que lo respalde, y `src/app/` no tiene ruta legal alguna. Ley 25.326 de Protección de Datos Personales.

### 3.5 Consistencia visual y de copy

**V-1 · El modo oscuro está incompleto y se rompe visiblemente.**
Verificado con estilos computados y capturas en `/casos` con `theme=dark`:

```
section[aria-labelledby=casos-heading]  background-color: rgb(255, 255, 255)
h1#casos-heading                        color: rgb(65, 65, 65)
body                                    background-color: rgb(12, 12, 12)
```

Es decir: banda blanca con título gris oscuro, pegada debajo de un navbar oscuro y encima de una sección negra. Pasa lo mismo en `/servicios`. Origen:

- Wrappers con `bg-white` sin variante dark: `page.jsx:43`, `casos/page.jsx:19`, `contacto/page.jsx:18`, `servicios/page.jsx:20`.
- Secciones hero con `bg-white` sin variante dark: `casos/page.jsx:22`, `servicios/page.jsx:23`.
- 20 usos de `text-gray-500` sin `dark:`: `Hero.jsx:64`, `About.jsx:82`, `Services.jsx:73` y `:145`, `Methodology.jsx:60` y `:102`, `Plans.jsx:59` y `:83`, `CaseStudies.jsx:401`, `:536`, `:556`, `ContactSection.jsx:67`, `:71`, `:75`, `Footer.jsx:75`, `:79`, `:83`, `InmobiliariasLanding.jsx:310`, `casos/page.jsx:27`, `servicios/page.jsx:28`.
- `text-[#414141]` sin variante dark: `Hero.jsx:67` y `:96`, `Services.jsx:123` (el ícono `+` del acordeón desaparece), `casos/page.jsx:24`, `servicios/page.jsx:25`.
- `Methodology.jsx:82`: el punto del timeline lleva `border-gray-50` fijo — en dark queda un halo claro alrededor del punto azul.

**V-2 · Paleta de fondos oscuros sin sistema.**
Conviven `#0c0c0c` (Hero, Methodology, ServiceConfigurator, Footer), `#111111` (About, Services, Plans, tarjetas), `#141414` (`Plans.jsx:73`), `#1a1a1a` (`ServiceConfigurator.jsx:92`, modal), `#1e1e1e` (bordes), `#080808` (`CaseStudies.jsx:522`) y `#000212` (`IASection.jsx:38`, `Plans.jsx:73`). El brand kit define dos fondos oscuros y dos superficies; el código usa siete valores. `#000212` no figura en el kit.

**V-3 · `IASection` rompe el sistema de dos maneras.**
`IASection.jsx:38`: la sección es `bg-[#000212]` fija, o sea que en modo claro aparece una banda negra en medio de una página blanca — decisión de diseño, pero no está declarada en ningún lado. Y `IASection.jsx:10, 16, 22` usa emojis (💬, 🤖, ⚙️) como íconos, mientras que las otras seis secciones usan `lucide-react`. El brand kit pide "sin emojis decorativos".

**V-4 · Testimonios inventados en el repo.**
`Testimonials.jsx:46-75`: "María González, CEO de TechStart" con "aumentamos nuestras ventas online un 250%", "Carlos Rodríguez de InnovaShop", "Laura Martínez de Startup Tech", "Ana Fernández, CMO de E-commerce" — cuatro personas que no existen, con avatares de Unsplash (`:52`, `:59`, `:66`, `:73`). Contradice frontalmente la regla 10 del brand kit ("No inventar métricas, nombres de clientes, testimonios ni resultados"). Está comentado en la home, pero **sigue en el bundle** (ver P-5) y a un descomentado de distancia de publicarse.

**V-5 · "Garantiza resultados" contradice el tono declarado.**
`Methodology.jsx:61`: "Nuestra metodología probada garantiza resultados medibles y sostenibles para tu negocio." El brand kit dice: "Nunca prometemos resultados numéricos que no podamos probar" y "cero humo". Misma familia: `CaseStudies.jsx:537` "Proyectos reales. Resultados concretos." encabeza una sección que no muestra ni un solo resultado.

**V-6 · La metadata de `/casos` promete métricas que la página no tiene.**
`casos/page.jsx:10`: "Resultados reales de clientes que confiaron en Posicionarte: e-commerce, deportes, B2B. **Métricas y casos de éxito**". La página muestra logos, rubro, stack y enlaces. Ni una métrica. Es una promesa incumplida en el snippet de Google, que además baja el CTR cuando el usuario rebota.

**V-7 · 2025 vs 2026 en el benchmark: seis lugares desalineados.**

| Dice 2025 | Dice 2026 |
|---|---|
| `inmobiliarias/page.jsx:7` — title "informe 2025" | `InmobiliariasLanding.jsx:220` — `PDF_PATH = '/benchmark-inmobiliario-2026.pdf'` |
| `inmobiliarias/page.jsx:9` — description | `InmobiliariasLanding.jsx:221` — nombre de descarga `…-2026.pdf` |
| `inmobiliarias/page.jsx:11` — OG title | `public/benchmark-inmobiliario-2026.pdf` (archivo real) |
| `InmobiliariasLanding.jsx:500` — "Argentina 2025" en el botón | |
| `api/benchmark/route.js:28` — asunto del mail al equipo | |

El visitante ve "2025" en Google y en el botón, y descarga un archivo "2026".

**V-8 · Tipografía declarada vs tipografía usada.**
`layout.jsx:6-17` carga Plus Jakarta Sans y Playfair Display. `tailwind.config.js:19-22` declara `poppins` y `rowdies`. `src/index.css:2-3` importa Poppins y Rowdies desde Google Fonts. `globals.css:7` usa `var(--font-sans)`, que sí existe. Playfair Display se carga en cada página y **no lo usa ningún componente** (grep de `font-display`: 0 resultados) — son ~25 KB de fuente descargados para nada. El brand kit menciona la deuda pero el código no se limpió.

**V-9 · El README describe una arquitectura que ya no existe.**
`README.md:32-41` explica que conviven Next y un editor visual Vite, y lista `index.html`, `src/main.jsx`, `src/App.jsx`, `vite.config.js`. Ninguno de esos archivos existe hoy (verificado). La regla de `'use client'` sigue siendo correcta, pero por el motivo de RSC, no por el editor Vite. Además `README.md:14-19` lista cuatro rutas y omite `/inmobiliarias`.

**V-10 · El posicionamiento del manual de marca no aparece en el sitio.**
El diferencial que la agencia declara internamente — estudiar las estrategias de las marcas grandes y adaptarlas para que una pyme pueda competir con las mismas reglas — no está escrito en ninguna parte del sitio. `Hero.jsx:56-67` y `About.jsx:8-29` comunican "sin paquetes, a medida" y "todo en un solo equipo", que es cierto pero es lo que dice cualquier agencia. Tampoco hay ninguna señal de calificación del cliente objetivo (pyme consolidada): el copy le habla a "tu negocio" en general, lo que garantiza leads fuera de perfil.

**V-11 · Ojo con "Sin tercerizar".**
`About.jsx:22`: "Todo en un solo equipo. Sin tercerizar ni perder tiempo coordinando proveedores." Es una promesa dura y absoluta. Conviene revisarla contra la dirección que tiene el negocio a dos o tres años (tercerizar ejecución manteniendo estrategia y reporting in-house): si eso avanza, la frase pasa a ser falsa y está en la sección "Por qué elegirnos". Reformularla ahora en términos de responsabilidad ("un solo interlocutor, una sola estrategia") cuesta menos que corregirla después.

**V-12 · El portfolio subdeclara lo que la agencia hace.**
De los 17 clientes de `CaseStudies.jsx`, los filtros dan: Desarrollo Web 14, Instagram 5, Google Ads 3, Meta Ads 3. Una agencia cuyo core es paid media muestra tres casos de Google Ads. Y varios clientes están etiquetados por debajo de lo que se les entrega, según los registros propios de la agencia:

| Cliente | `services` en el sitio | Qué figura en los registros de la agencia |
|---|---|---|
| MAXCER (`CaseStudies.jsx:155`) | `['web']` | Google Ads con reporting |
| Florida Aventura (`:142`) | `['web','instagram']` | Google Ads + Meta Ads |
| Sanyser (`:132`) | `['web']` | GA4 + social media |
| Fútbol Queens (`:212`) | `['google-ads','meta-ads','instagram']` | correcto |

Además hay clientes de la cartera que no figuran en el portfolio (Centro Piel, Estela Vital, Faeton Cars, Makena, Outflow, Renoir, Rey del Prode) y el caso de seguros está comentado (`CaseStudies.jsx:304-314`), justo el rubro que la agencia menciona primero cuando describe su cartera. **Confirmar cada uno antes de publicarlo** — la regla del kit es no publicar nombre de cliente sin autorización.

**V-13 · "10+ tecnologías" no está respaldado por nada visible.**
`CaseStudies.jsx:321`. En toda la página aparecen tres: React, WordPress y TiendaNube (`TECH_COLORS`, líneas 49-53). Las otras dos cifras sí cierran: 14 clientes con `tech` declarado ↔ "14+ sitios desarrollados"; 17 clientes visibles ↔ "20+ clientes" es plausible. Esa tercera cifra queda colgada.

**V-14 · Detalles de código que ensucian.**
`CaseStudies.jsx:302` — comentario "// uncomment import arriba también" en producción. `Footer.jsx:6` — importa `Linkedin, Instagram` de lucide-react y nunca los usa (los íconos son SVG inline). `Footer.jsx:101-107` — `width={200} height={48}` declarados mientras la clase renderiza `w-[300px] h-32`: relación de aspecto inconsistente y CLS. `CallToAction.jsx` — componente muerto, en inglés, sin `'use client'` pese a importar framer-motion (si alguien lo importa, rompe el build).

**V-15 · 51 de 53 `<img>` de la home no declaran dimensiones.**
`CaseStudies.jsx:425-429` y `:495-499` usan `<img>` crudo con `src={logo.src}`, sin `width`/`height` ni `loading="lazy"`. Cada logo provoca reflow al cargar. Es CLS puro y es, además, el motivo por el que ninguna de esas imágenes pasa por el pipeline de Next.

---

## 4. Backlog priorizado

| # | Qué | Eje | Impacto | Esfuerzo | Archivos afectados |
|---|---|---|---|---|---|
| 1 | Definir las variables CSS de shadcn (`--background`, `--foreground`, `--primary`, `--ring`, `--radius`, `--border`, `--input`, `--muted`, `--accent`, `--destructive`…) en `:root` y `.dark`, con los valores del brand kit | A11y / Visual | Alto | S | `src/app/globals.css` |
| 2 | Decidir y ejecutar la estrategia de deploy: o `output: 'export'` + mover los forms a un endpoint externo, o asumir hosting Node y actualizar README y `.htaccess` | Perf / SEO | Alto | M | `next.config.js`, `src/app/api/*`, `README.md`, `public/.htaccess`, `out/` |
| 3 | Comprimir y redimensionar los 26 logos a ≤450 px y WebP; borrar los assets sin uso | Performance | Alto | M | `src/assets/images/**`, `CaseStudies.jsx:10-47` |
| 4 | Instalar GA4 + GTM y marcar eventos de conversión (envío de form, clic a WhatsApp, descarga del benchmark) | Conversión | Alto | S | `src/app/layout.jsx`, `ContactSection.jsx`, `Footer.jsx`, `WhatsAppButton.jsx`, `InmobiliariasLanding.jsx` |
| 5 | Crear `og-image.jpg` de 1200×630 y subirla a `public/` | SEO | Alto | S | `public/`, `layout.jsx:60,72`, `page.jsx:12,23` |
| 6 | Hacer las tarjetas de `/casos` accesibles por tap y teclado (enlaces siempre en el DOM, `onFocus`/`onBlur`, foco visible) | A11y / Conversión | Alto | M | `CaseStudies.jsx:338-434` |
| 7 | Completar el modo oscuro: wrappers, bandas hero, 20 `text-gray-500`, `text-[#414141]` sueltos, borde del timeline | Visual | Alto | M | `page.jsx`, `casos/page.jsx`, `servicios/page.jsx`, `contacto/page.jsx`, `Hero.jsx`, `About.jsx`, `Services.jsx`, `Methodology.jsx`, `Plans.jsx`, `CaseStudies.jsx`, `Footer.jsx`, `ContactSection.jsx` |
| 8 | Bajar el video de `/inmobiliarias`: recodificar a ~2 MB, agregar `poster`, `preload="none"` y quitar el autoplay | Performance | Alto | S | `InmobiliariasLanding.jsx:132-144`, `public/videos/` |
| 9 | Sacar el import de `Testimonials` de la home y borrar el componente con testimonios inventados | Perf / Copy | Alto | S | `page.jsx:35,53`, `Testimonials.jsx` |
| 10 | Unificar 2025 → 2026 en toda la landing del benchmark | Copy | Alto | S | `inmobiliarias/page.jsx:7,9,11`, `InmobiliariasLanding.jsx:500`, `api/benchmark/route.js:28` |
| 11 | Agregar `alternates.canonical` en las cinco rutas | SEO | Alto | S | `layout.jsx`, y los cinco `page.jsx` |
| 12 | Escapar HTML y agregar honeypot + rate limit en las dos rutas API | Conversión / Seguridad | Alto | M | `api/contact/route.js`, `api/benchmark/route.js` |
| 13 | Unificar el handle de Instagram y completar el JSON-LD con `telephone`, `address`, `email`, `openingHours` | SEO | Medio | S | `layout.jsx:21-36`, `Navbar.jsx:100,162`, `Footer.jsx:136` |
| 14 | Eliminar la duplicación de copy en `/servicios` y darle contenido propio a la página | SEO / Copy | Medio | M | `servicios/page.jsx:23-32`, `Services.jsx:70-75` |
| 15 | Unificar los dos formularios en un componente y agregar campo teléfono + pregunta calificadora | Conversión | Medio | M | `ContactSection.jsx`, `Footer.jsx` |
| 16 | Agregar `?text=` con origen a los cuatro enlaces de WhatsApp | Conversión | Medio | S | `Hero.jsx:81`, `IASection.jsx:101`, `Plans.jsx:100`, `WhatsAppButton.jsx:22` |
| 17 | Dar contenido a `/inmobiliarias`: qué trae el informe, alcance, muestra, FAQ, salida a WhatsApp | Conversión / SEO | Medio | L | `InmobiliariasLanding.jsx` |
| 18 | Reemplazar el color del CTA del benchmark (`#E03E2D` está reservado para error) | Visual | Medio | S | `InmobiliariasLanding.jsx:484` |
| 19 | Corregir el contraste de los botones de WhatsApp (1,98:1) y de los placeholders (2,54:1) | A11y | Medio | S | `Hero.jsx:78`, `IASection.jsx:104`, `input.jsx:9`, `textarea.jsx:8` |
| 20 | Convertir el modal del benchmark a Radix Dialog (foco, Escape, scroll lock) | A11y | Medio | M | `InmobiliariasLanding.jsx:273-410` |
| 21 | Trampa de foco, Escape y scroll lock en el menú mobile | A11y | Medio | M | `Navbar.jsx:130-177` |
| 22 | Crear `/privacidad` y enlazarla desde los tres formularios y el footer | Conversión / Legal | Medio | M | `src/app/privacidad/page.jsx`, `Footer.jsx`, `ContactSection.jsx`, `InmobiliariasLanding.jsx:403` |
| 23 | Reescribir "Modalidades de Trabajo": renombrar "FULL POSI", agregar rango de inversión y criterio de elección | Conversión / Copy | Medio | M | `Plans.jsx:9-44` |
| 24 | Reescribir el copy que promete de más: "garantiza resultados", "Métricas y casos de éxito", "Sin tercerizar" | Copy | Medio | S | `Methodology.jsx:61`, `casos/page.jsx:10`, `About.jsx:22` |
| 25 | Revisar y completar los `services` de cada cliente del portfolio, con autorización | Copy / Conversión | Medio | M | `CaseStudies.jsx:105-315` |
| 26 | Agregar navegación y datos de contacto al footer | SEO / Conversión | Medio | S | `Footer.jsx:93-178` |
| 27 | Apuntar "Nosotros" y "Metodología" a `/#about` y `/#metodologia` en páginas internas | Conversión | Medio | S | `Navbar.jsx:39-44` |
| 28 | Sacar `INBazul`/`INBblanco` del build y borrar `Group 2 (1).png`, `COA1.jpg`, `futbolQueen.jpg` | Performance | Medio | S | `CaseStudies.jsx:28,34`, `src/assets/images/` |
| 29 | Sacar Playfair Display si no se usa, borrar `src/index.css` y limpiar `poppins`/`rowdies` del tailwind config | Perf / Visual | Medio | S | `layout.jsx:12-17`, `src/index.css`, `tailwind.config.js:19-22` |
| 30 | Migrar el sitemap a `src/app/sitemap.js` con `lastmod` | SEO | Medio | S | `public/sitemap.xml`, `src/app/sitemap.js` |
| 31 | Normalizar la paleta de fondos oscuros a los valores del brand kit (hoy hay siete) | Visual | Medio | M | Todos los componentes con `dark:bg-` |
| 32 | Respetar `prefers-reduced-motion` en las animaciones infinitas | A11y | Medio | S | `WhatsAppButton.jsx:33-37`, `CaseStudies.jsx:481`, `InmobiliariasLanding.jsx:388-392` |
| 33 | Reemplazar los `<img>` crudos por `next/image` con dimensiones y `loading="lazy"` | Performance | Medio | M | `CaseStudies.jsx:425-429,495-499` |
| 34 | Desacoplar el build del `RESEND_API_KEY` (instanciar Resend dentro del handler) | Perf / DX | Medio | S | `api/contact/route.js:3`, `api/benchmark/route.js:3` |
| 35 | Corregir el `finally` que pisa el estado `'done'` en ambos formularios | Conversión | Bajo | S | `ContactSection.jsx:34-36`, `Footer.jsx:39-41` |
| 36 | Convertir el acordeón de servicios a `<button>` real, sin `h3` adentro | A11y | Bajo | S | `Services.jsx:93-118` |
| 37 | Nombrar bien el botón "volver arriba" y agregar `aria-pressed` a los filtros | A11y | Bajo | S | `Footer.jsx:95-108`, `CaseStudies.jsx:441-455` |
| 38 | Corregir `width`/`height` del logo del footer | Visual / Perf | Bajo | S | `Footer.jsx:101-107` |
| 39 | Borrar `CallToAction.jsx` y el import muerto de lucide en el footer | Visual | Bajo | S | `CallToAction.jsx`, `Footer.jsx:6` |
| 40 | Actualizar el README (arquitectura Vite inexistente, `/inmobiliarias` faltante, OG mal descripto) | DX | Bajo | S | `README.md` |
| 41 | Cabeceras de seguridad y de caché para `/_next/static` | SEO / Perf | Bajo | S | `public/.htaccess` |
| 42 | Reemplazar los emojis de `IASection` por íconos lucide y declarar si la sección es oscura a propósito | Visual | Bajo | S | `IASection.jsx:8-27,38` |
| 43 | Sacar o respaldar "10+ tecnologías" | Copy | Bajo | S | `CaseStudies.jsx:321` |
| 44 | Escribir el posicionamiento real (adaptar estrategias de marcas grandes a pymes) en el hero o en About | Copy | Alto | M | `Hero.jsx:56-68`, `About.jsx:8-29` |
| 45 | Transcripción o resumen en texto del video del benchmark | A11y / SEO | Bajo | S | `InmobiliariasLanding.jsx:132-144` |

---

## 5. Por dónde arrancar

Los tres primeros, en este orden.

### 1) Las variables CSS de shadcn (backlog #1)

Un archivo, un bloque `:root` y un bloque `.dark`. Es una tarde de trabajo y arregla, de una sola vez:

- el foco invisible en **todos** los botones del sitio (WCAG 2.4.7, verificado con `box-shadow: none`),
- el toast de "Mensaje enviado" que hoy se dibuja transparente (verificado con `background-color: rgba(0,0,0,0)`),
- el mensaje de error del formulario, que tiene el mismo problema,
- los bordes redondeados rotos (`rounded-md`, `rounded-lg` resuelven a `var(--radius)` indefinido).

Va primero porque es el ítem con mejor relación impacto/esfuerzo del documento y porque es un defecto silencioso: el sitio *parece* funcionar. Nadie lo va a reportar, pero está rompiendo la confirmación de cada lead que entra por formulario.

### 2) Peso de imágenes y video (backlog #3 y #8)

10,4 MB en la home y 10,4 MB en `/casos`. Cinco archivos explican el 85% de eso, y uno solo (`elrecreo.png`, 5,16 MB, 3172 × 3128 px) explica la mitad — para mostrarse en una caja de 112 px. Redimensionar a 450 px y pasar a WebP debería dejar los 26 logos por debajo de 400 KB en total.

Va segundo porque es la barrera de entrada a todo lo demás: mientras la home pese 10 MB, cualquier otra optimización es ruido. Y porque una agencia que vende diseño web y performance no puede tener el sitio más pesado que el de sus clientes — es el argumento de venta más caro de perder.

El video de `/inmobiliarias` (11,7 MB, 98 s, con `autoPlay` y sin `poster`) entra acá: es la vertical prioritaria y la que más tráfico pago va a recibir.

### 3) Analítica y trazabilidad de WhatsApp (backlog #4 y #16)

Es lo que convierte a los otros 43 ítems en decisiones informadas en vez de opiniones. Hoy no hay forma de responder cuántos contactos genera el sitio, de dónde vienen, ni qué sección los produce — y los cuatro enlaces a WhatsApp son idénticos, así que ni siquiera el canal principal está segmentado.

Va tercero y no primero porque medir un sitio que está roto (formularios que confirman en transparente, tarjetas sin enlaces en mobile) da una línea de base engañosa. Pero va antes que cualquier reescritura de copy o rediseño: sin medición, no hay forma de saber si el cambio mejoró algo.

**Lo que dejaría para inmediatamente después:** el ítem #2 (definir de una vez si el deploy es estático o Node). No está en el podio porque el sitio hoy funciona, pero es una contradicción de fondo — hay dos rutas API que necesitan servidor, un README que promete export estático, y un `out/` de marzo versionado en el repo — y cada semana que pasa se acumula más código encima de una definición que no se tomó.

---

## 6. Anexo — lo que no se pudo verificar

| Qué | Por qué | Cómo verificarlo |
|---|---|---|
| Descarga real del video de `/inmobiliarias` | El Chromium de este entorno no decodifica H.264, así que el `<video>` nunca disparó la request | Abrir `/inmobiliarias` con DevTools → Network → filtro Media, en Chrome de escritorio y en un celular |
| Si `/servicios` funciona en el hosting real | Depende de si Apache tiene `MultiViews` activo (ver S-8) | `curl -I https://posicionarte.online/servicios` y comparar el HTML con el de `/` |
| Core Web Vitals de campo | Requiere datos del dominio productivo | PageSpeed Insights sobre las cinco URLs, y Search Console → Core Web Vitals |
| Si el sitio publicado coincide con este repo | La carpeta `out/` versionada es de marzo y no incluye `/inmobiliarias` | Abrir posicionarte.online/inmobiliarias; si responde, el deploy es posterior al `out/` |
| Cuál handle de Instagram es el real | Instagram no es consultable desde este entorno | Abrir los dos y ver cuál existe |
| Si los formularios están llegando hoy | Requiere las credenciales reales de Resend | Envío de prueba desde los tres formularios |
| Rendimiento con red móvil argentina | Medido en localhost, sin latencia | WebPageTest con perfil 4G / Buenos Aires |
| Autorización de los clientes del portfolio | Dato de negocio, no de código | Revisar contratos antes de agregar o cambiar etiquetas (ver V-12) |

---

*Diagnóstico generado el 25/08/2026 sobre el estado del repo a esa fecha. Los números de línea corresponden a los archivos tal como están hoy: si se toca el código, revalidar antes de citar.*
