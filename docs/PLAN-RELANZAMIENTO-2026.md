# Plan de relanzamiento — posicionarte.online

Agosto 2026. Continuación de `docs/DIAGNOSTICO-2026.md`.

Este documento responde punto por punto lo que planteaste, define cómo se corrige cada hallazgo del diagnóstico, propone la arquitectura nueva del sitio y arma el plan por fases hasta el relanzamiento.

---

## 0. Lo que ya cambió

**Hosting resuelto.** Confirmaste que el sitio está en Vercel conectado a GitHub. Eso cierra el hallazgo más grande del diagnóstico y **desbloquea cosas que en Hostinger no eran posibles**:

| Antes asumíamos | Con Vercel |
|---|---|
| Export estático → los forms no pueden funcionar | Las rutas API funcionan nativamente. No hace falta `output: 'export'` |
| `images.unoptimized: true` obligatorio | **Se puede apagar**: Next sirve AVIF/WebP redimensionado automáticamente. Esto solo se lleva puesto casi todo el problema de las imágenes |
| Cabeceras vía `.htaccess` | `headers()` en `next.config.js`, versionado en el repo |
| Caché manual | Vercel ya sirve `/_next/static` como inmutable |
| Sin datos de campo | Vercel Analytics + Speed Insights dan Core Web Vitals reales |

Quedan tres cosas de limpieza: borrar `out/` del repo (es de marzo, confunde), borrar `public/.htaccess` (residuo de Hostinger, en Vercel no hace nada) y actualizar el README.

**Ya hecho y verificado: las variables CSS de shadcn.** Escribí `src/app/globals.css` con los tokens de `docs/BRAND-CONTENT-KIT.md` mapeados a HSL, en `:root` y `.dark`, más una red de seguridad de `:focus-visible`. Compilé y volví a medir:

| | Antes | Ahora |
|---|---|---|
| Foco en "Enviar mensaje" | `box-shadow: none` | `rgb(255,255,255) 0 0 0 2px, rgb(51,86,215)` — anillo azul visible |
| Foco en "Ingresar" / "Contacto" | `none` | anillo visible |
| Toast de confirmación | `rgba(0,0,0,0)`, radio `0px` | `rgb(255,255,255)` en claro, `rgb(13,13,13)` en oscuro, radio `10px` |
| Toast de error | transparente | `rgb(209,52,31)` con texto blanco — 5,03:1 |

Sin regresiones visuales en claro ni en oscuro (verificado con capturas de `/` y `/contacto` en ambos temas). Un detalle nuevo que apareció al mirar dark: **los campos de formulario siguen blancos en modo oscuro** porque `input.jsx:9` y `textarea.jsx:8` tienen `bg-white` fijo. Entra en el bloque de modo oscuro.

Nota sobre el color de error: el kit define `#E03E2D`, pero con texto blanco encima da 4,29:1 y no pasa AA. Como **fondo** usé `#D0331F` (5,03:1). Como texto o borde sobre claro, `#E03E2D` sigue valiendo. Está documentado en el CSS.

---

## 1. Casos: cómo lo rehacemos

Tu instinto es correcto: antes de optimizar las imágenes hay que definir qué muestra esa sección. Optimizar 26 logos de clientes que van a cambiar es trabajo tirado.

### El problema de fondo

La sección se llama "Casos de estudio" y es un muro de logos. No hay un solo caso. Un prospecto entra, ve 17 marcas que no conoce, y se va sin entender qué hicieron ustedes. La metadata de `/casos` incluso promete "Métricas y casos de éxito" y la página no tiene ni una métrica.

### La propuesta: separar dos cosas que hoy están mezcladas

**Capa 1 — Muro de clientes.** Prueba social rápida. Grilla de logos, tratamiento visual uniforme (monocromo con color al hover), nombre + rubro + enlace visible al sitio. Sin filtros, sin hover que esconde información. Vive en `/casos` arriba y como banda en la home. Responde a "¿trabajaron con gente de verdad?".

**Capa 2 — Casos.** Tres a seis, no diecisiete. Cada uno con URL propia (`/casos/[slug]`) y estructura fija:

1. **Contexto** — quién es el cliente, en qué mercado, de dónde venía.
2. **El problema** — la tensión real, en una frase.
3. **Qué hicimos** — decisiones, no tareas. "Reestructuramos las campañas por intención de búsqueda en vez de por producto" dice más que "gestionamos Google Ads".
4. **Resultado** — con las reglas de abajo.
5. **Qué aprendimos** — el párrafo que ninguna agencia escribe y que es el que genera confianza.

Responde a "¿pueden resolver *mi* problema?". Y cada caso es una página indexable, citable y compartible por sí sola — hoy `/casos` es una sola URL para diecisiete clientes.

### Resultados sin inventar nada

Esta es la parte que te frena, y hay cuatro caminos legítimos. Ninguno requiere pedirle nada al cliente salvo el segundo:

| Camino | Ejemplo | Verificable por |
|---|---|---|
| **Métricas técnicas** | "El sitio pasó de 4,2 s a 0,9 s de carga. PageSpeed: 38 → 96." | Cualquiera, corriendo PageSpeed sobre el sitio en vivo |
| **Métricas del cliente con autorización** | "Las consultas por WhatsApp se multiplicaron por 3 en el primer trimestre — dato compartido por el cliente." | El cliente, por escrito |
| **Métricas de proceso propias** | "18 meses de gestión continua. 6 campañas activas. Reporte mensual." | Ustedes |
| **El trabajo mismo** | El sitio en vivo, el antes/después, la estructura de campañas, las piezas publicadas | Cualquiera |

La primera categoría es oro y está gratis: ustedes hicieron 14 sitios y pueden medir la velocidad de todos hoy mismo. Es una métrica dura, verificable por el prospecto, y que además vende el servicio de Diseño Web sin decir una palabra de marketing.

Y una regla dura para el schema: `Review` y `AggregateRating` **solo** con reseñas reales. Inventarlas es penalización de Google además del problema ético.

### Los datos salen del componente

Hoy los 17 clientes viven adentro de `CaseStudies.jsx` (líneas 105-315). Cada alta, baja o cambio es tocar JSX y arriesgar el build. Propuesta: `data/clientes.js` (o `content/clientes/*.json`), con este esquema:

```js
{
  slug: 'miguel-dodorico',
  nombre: "Miguel D'Odorico",
  rubro: 'inmobiliaria',          // NUEVO — hoy no existe como filtro
  servicios: ['google-ads', 'meta-ads', 'instagram'],
  desde: '2024-03',
  estado: 'activo',               // activo | finalizado | pausado
  sitio: 'https://...',
  instagram: 'https://...',
  logo: { light: '...', dark: '...' },
  caso: 'miguel-dodorico',        // slug del caso, o null
  autorizado: true                // gate para publicar el nombre
}
```

Tres cosas que esto resuelve de una: cambiar la cartera es editar datos; `autorizado: false` oculta al cliente sin borrarlo; y aparece el **filtro por rubro**, que es el que un prospecto usa de verdad ("¿trabajaron con alguien como yo?"). Hoy el filtro es por servicio y devuelve "Google Ads: 3", que es el peor número posible para mostrar.

### Sobre el filtro por servicio

Los números de hoy: Desarrollo Web 14, Instagram 5, Google Ads 3, Meta Ads 3. Una agencia cuyo core es paid media muestra tres casos de Google Ads. Parte es subdeclaración (MAXCER, Florida Aventura y Sanyser están etiquetados por debajo de lo que se les entrega) y parte es que faltan clientes de la cartera. Antes de rediseñar necesito de vos la lista real: quién sigue, quién se fue, quién entró, y qué servicio se le presta a cada uno.

### El enlace en mobile

Lo dejamos en el tintero como pediste, pero anticipo que la solución cae sola con el rediseño: si la tarjeta muestra el botón "Ver sitio ↗" siempre, en vez de revelarlo al hover, el problema desaparece. Lo "wow" se hace con una elevación sutil al hover, no escondiendo información.

---

## 2. Testimonials: qué haría

**Borrar el componente, no comentarlo.** Hoy sigue viajando en el bundle de la home (verificado: `"María González"` y `images.unsplash.com` están en el chunk compilado) y está a un descomentado de publicarse. Hiciste bien en no inventar reseñas; el paso que falta es sacarlo del repo.

Y en su lugar, montar prueba social real en tres capas, por orden de facilidad:

**1. Reseñas de Google Business Profile.** Ya son públicas, verificables y con enlace al perfil. Si no tienen el perfil creado, crearlo es tarea de SEO local igual — es lo que alimenta el panel de "agencia de marketing digital cerca mío". Es la fuente con mejor relación esfuerzo/credibilidad.

**2. LinkedIn.** Recomendaciones al perfil de la empresa o de cada integrante, y posts donde un cliente los mencionó. Se muestran con captura + enlace al post original. Verificable de un clic.

**3. Testimonios pedidos formalmente.** Un mail de cinco líneas a cinco clientes con tres preguntas concretas:

> - ¿Cuál era el problema antes de trabajar con nosotros?
> - ¿Qué cambió?
> - ¿Qué le dirías a alguien que está evaluando trabajar con Posicionarte?

Se publica con nombre real, cargo, empresa, foto y autorización escrita. **Regla: con menos de tres testimonios reales, no hay sección de testimonios.** Se pone una sola cita destacada dentro de un caso, que rinde más que una grilla con relleno.

**Mientras tanto**, la prueba social que ya tenés y no estás usando: 14 sitios en vivo que cualquiera puede abrir, y la antigüedad de la relación. "Trabajamos con Dyxoma desde 2024" es un dato tuyo, verificable internamente, y dice más que cualquier testimonio inventado.

---

## 3. Analítica: qué hay que montar

Esto es lo que le pasás a los chicos de paid media. Va en orden de implementación.

### Stack

| Herramienta | Para qué | Dónde |
|---|---|---|
| **Google Tag Manager** | Contenedor único. Paid media administra tags sin tocar el repo | Un script en `layout.jsx` |
| **GA4** | Comportamiento, embudos, audiencias | Vía GTM |
| **Google Ads conversion tag** | Importar conversiones para bidding | Vía GTM |
| **Meta Pixel + CAPI** | Igual, para Meta | Vía GTM / server |
| **Consent Mode v2** | Sin esto, el remarketing y el modelado de conversiones quedan cojos | Vía GTM + banner |
| **Vercel Analytics + Speed Insights** | Core Web Vitals de campo, reales | `npm i @vercel/analytics @vercel/speed-insights` |
| **Google Search Console** | Consultas, indexación, CWV | Verificación por DNS |
| **Bing Webmaster Tools** | Alimenta Copilot y varios buscadores con IA | Importa desde GSC en un clic |

GTM primero y todo lo demás adentro. Si mañana quieren sumar Clarity o cambiar de pixel, no se toca el repo.

### Eventos a definir

Esta tabla es el entregable concreto para paid media. Nombres alineados a GA4 recomendados para que las conversiones importen limpio a Google Ads.

| Evento | Se dispara cuando | Parámetros |
|---|---|---|
| `generate_lead` | Un formulario se envía OK | `form_id` (contacto \| footer \| benchmark \| ia), `servicio_interes`, `rango_inversion`, `page_location` |
| `contact_whatsapp` | Clic en cualquier `wa.me` | `source_section` (hero \| ia \| planes \| flotante \| caso), `page_location` |
| `file_download` | Descarga del benchmark | `file_name`, `lead_id` |
| `view_service` | Se abre un servicio del acordeón | `service_name` |
| `select_objective` | Cambio de tab en el configurador | `objective` (ventas \| leads \| marca) |
| `click_case_study` | Clic en "Ver sitio" de un cliente | `client_name`, `rubro`, `servicio` |
| `cta_click` | Clic en cualquier CTA principal | `cta_text`, `cta_location` |
| `scroll_depth` | 25 / 50 / 75 / 90 % | `percent` |
| `form_start` | Primer tecleo en un formulario | `form_id` — sirve para medir abandono |

**Conversiones a importar:** `generate_lead` y `contact_whatsapp` como primarias, `file_download` como secundaria.

### Lo que separa medir de medir bien

**Valores de conversión.** Sin valor asignado, el bidding automático optimiza cantidad y les va a traer volumen basura. Hay que estimar un valor por tipo de lead a partir de la tasa de cierre y el ticket promedio. Ejemplo de estructura (los números los ponen ustedes):

```
valor = ticket_promedio × tasa_de_cierre_de_ese_tipo_de_lead
```

Un lead del benchmark inmobiliario y un "hola" por WhatsApp no valen lo mismo. Ese dato lo tienen los chicos de paid media.

**Atribución en el formulario.** Cada lead debería llegar con `gclid`, `fbclid` y los UTMs capturados de la URL en campos ocultos. Es la pieza que habilita lo siguiente.

**Conversiones offline.** Cuando un lead cierra, se sube la conversión a Google Ads con su `gclid`. Ahí el algoritmo deja de optimizar por "formularios enviados" y empieza a optimizar por "clientes ganados". Es la diferencia real entre una agencia que dice que mide y una que mide. Requiere el gclid guardado (punto anterior) y un proceso de carga — manual al principio, automático después vía el CRM.

**Convención de UTMs documentada.** Un documento corto con la nomenclatura, para que las campañas de todos los canales sean comparables entre sí.

---

## 4. Formularios

Querés recopilar la mayor cantidad de información posible. El problema conocido: más campos = menos envíos. La solución no es elegir entre volumen y datos, es **captura progresiva**.

### Paso 1 — baja fricción (lo que se ve al principio)

Nombre · Email · Teléfono/WhatsApp · Consentimiento

Tres campos y un check. El lead ya entró y ya es contactable.

### Paso 2 — enriquecimiento (pantalla de gracias, no bloquea)

"Contanos un poco más y llegamos a la reunión con algo preparado."

Empresa · Rubro (select) · Qué necesitás (multi: Google Ads, Meta Ads, SEO, Web, Contenido, IA) · Inversión mensual actual (rangos) · Mensaje libre

Si lo completa, buenísimo. Si no, el lead ya está.

### Campos ocultos, siempre

`gclid`, `fbclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `page_path`, `referrer`, `primera_visita`, `dispositivo`.

### Higiene técnica

- **Un solo componente** `<LeadForm variant="…" />` para contacto, footer, benchmark e IA. Hoy `ContactSection.jsx` y `Footer.jsx` tienen el mismo formulario y el mismo `handleSubmit` copiados — cualquier mejora hay que hacerla dos veces.
- **Honeypot + trampa de tiempo** (envío en menos de 3 segundos = bot).
- **Rate limit por IP** en las rutas API.
- **Escapar HTML** antes de interpolar en el mail (hoy `${name}` y `${message}` entran crudos).
- **Arreglar el `finally`** que pisa el estado `done` en ambos formularios.
- **`aria-live`** en el estado del envío, para que un lector de pantalla anuncie el resultado.
- **Validación en cliente y en servidor**, con mensajes de error por campo.
- **Doble destino**: mail vía Resend + registro en el CRM. Tienen `crm.posicionarte.online` — si tiene API o webhook, el lead debería entrar ahí solo. Contame qué es y lo integramos.

---

## 5. Inmobiliarias: no la descartaría

No funcionó, pero no por la vertical. Por la página.

Mirá lo que hay hoy: un título, **una línea** de subtítulo ("Estrategias digitales que están funcionando ahora"), un video de 98 segundos y 11,7 MB que arranca solo, y un botón. Cero `h2` en toda la página. No dice qué hay adentro del informe, ni a quién le sirve, ni por qué una inmobiliaria debería dar su mail. En mobile, probablemente el video se esté comiendo la conversión antes de que la persona lea nada.

Nadie da su mail por eso. No es que la vertical no interese: es que la página no argumenta.

### Qué haría

1. **Estructura de venta real.** Gancho con la tensión concreta (algo del estilo de "publicás en el portal y en Instagram y no sabés cuál te trae consultas"), qué hay adentro del informe en cinco bullets específicos, a quién le sirve, prueba (D'Odorico, con autorización), FAQ corta, formulario.
2. **El video, adentro de la página, no como muro.** Recortado a 20-30 s, comprimido a menos de 2 MB, con `poster`, sin autoplay. O reemplazado directamente por tres mockups de páginas del informe, que muestran el producto sin costar 11 MB.
3. **Formulario en la página, no en modal.** Menos fricción, mejor accesibilidad, y el contenido del formulario suma a la página en vez de esconderse.
4. **Secuencia de email post-descarga.** Acá entra el email marketing que querés sumar: mail 1 con el informe, mail 3 con un hallazgo puntual, mail 7 con el caso de D'Odorico, mail 10 con invitación a un diagnóstico. Esa secuencia es la que convierte un PDF en clientes.
5. **Publicar los hallazgos como HTML**, no solo dentro del PDF. Hoy todo el contenido del benchmark está encerrado detrás de un formulario e invisible para Google y para cualquier motor con IA. Publicar 3-4 hallazgos como artículo, con el informe completo detrás del form, hace que la página empiece a traer tráfico sola.
6. **Umbral de decisión.** Rework, 60-90 días de medición con los eventos ya montados, y un número mínimo de leads que definís vos. Si no lo alcanza, ahí sí se archiva — pero con datos, no con la sensación de que no anduvo.

Y lo más importante: **esta página es la plantilla**. Si la vertical inmobiliaria funciona con esta estructura, se clona para seguros, e-commerce y salud. Descartarla ahora es descartar el molde de todas las landings específicas que querés hacer.

---

## 6. IA: la mayor oportunidad del sitio

Coincido con tu lectura y la subiría de tono: es lo que más los diferencia y hoy son tres tarjetas con emojis dentro de la home.

### `/ia` (o `/automatizacion`) como landing propia

Estructura propuesta:

1. **El problema, no la tecnología.** Nadie busca "agente de IA". Buscan "cómo dejar de perder consultas fuera de horario", "cómo responder WhatsApp sin estar todo el día". El gancho arranca ahí.
2. **Tres productos concretos, con nombre y precio o rango.**
   - Chatbot de WhatsApp que califica leads y responde 24 h.
   - Agente que arma reportes y procesa información.
   - Automatizaciones que conectan las herramientas que ya usan.
3. **Demo en vivo, en la propia página.** Un widget donde el visitante prueba el chatbot de Posicionarte. Esto es lo que vende: no hay copy que iguale a "probalo acá". Y de paso el chatbot captura el lead.
4. **Cómo trabajamos**: diagnóstico → piloto acotado → producción. Baja el riesgo percibido, que es la objeción principal en IA.
5. **Qué NO hacemos.** "No todo negocio necesita IA" ya está en el copy actual (`IASection.jsx:67`) y es de lo mejor que dice el sitio. En una landing propia, ese párrafo es el que genera confianza.
6. **Casos o piloto**, aunque sea uno.

### Por qué esto rinde doble

Es, además, el mejor contenido para AEO. Las preguntas del estilo "cómo automatizo la atención por WhatsApp de mi inmobiliaria" se hacen cada vez más en asistentes de IA y menos en el buscador. Una página que responde eso bien, con estructura de pregunta-respuesta y schema `FAQPage`, es candidata a ser citada. Y que la agencia que vende automatización con IA sea la que aparece citada por una IA es el mejor argumento de venta posible.

En la home, la sección se reduce a un teaser de tres líneas con link a `/ia`. Y se van los emojis (💬 🤖 ⚙️ en `IASection.jsx:10,16,22`): el resto del sitio usa íconos de lucide y el kit pide no usar emojis decorativos.

---

## 7. Framer Motion: dónde sacarlo y dónde ponerlo en serio

El diagnóstico es incómodo pero simple: **framer-motion está en 17 de 18 componentes haciendo casi siempre lo mismo** — un fade con translate Y al entrar en viewport. Ese es el efecto más barato que existe y hoy cuesta 53,6 KB de JavaScript. Mientras tanto, todo lo que framer-motion hace y nadie más puede hacer está sin usar.

La jugada no es sacar framer-motion. Es **invertir el reparto**.

### Sacarlo de donde no aporta

Reemplazar los `whileInView` genéricos por un componente `<Reveal>` con CSS puro (IntersectionObserver mínimo o scroll-driven animations con fallback). Alcanza a: `About`, `Services`, `Methodology`, `Plans`, `Footer`, `ContactSection` y los reveals de `CaseStudies`. Son ~40 usos que dan exactamente el mismo resultado visual sin JS.

Y un arreglo puntual: `Navbar.jsx:51` tiene `delay: 0.5` en la animación de entrada. Eso retrasa medio segundo el logo y el CTA principal, y castiga el LCP. Fuera.

### Ponerlo donde brilla

Siete momentos, todos respetando `prefers-reduced-motion` (el hook ya existe en `lib/use-reduced-motion.js` y está usado a medias):

1. **`layoutId` en casos.** Al abrir un caso, la tarjeta se expande hacia el detalle. La transición compartida es *el* efecto Apple-like y framer-motion es de las pocas librerías que lo hace bien.
2. **Transiciones de ruta.** Hoy pasar de `/` a `/servicios` es un corte seco. Un `template.jsx` con fade + escala sutil convierte el sitio en algo que se siente como una app.
3. **Hero con scroll-linked.** `useScroll` + `useTransform`: el título se achica y el navbar se condensa en un solo scroll continuo, sin saltos. Reemplaza el `isScrolled` binario actual de `Navbar.jsx:20-30`.
4. **Indicador deslizante en el navbar.** Un `layoutId` entre los links: la píldora activa se desliza de uno a otro. Un detalle chico, muy notorio.
5. **Configurador de servicios con `layout`.** Hoy cambiar de objetivo hace un fade (`ServiceConfigurator.jsx:144-165`). Con `layout` + `layoutId` en las tarjetas, las tarjetas comunes se **reordenan físicamente** entre objetivos en vez de desaparecer. Ese es el momento WOW de la home, y ya está el componente hecho.
6. **Contador de stats.** Los números de `/casos` suben al entrar en viewport.
7. **Spotlight sutil siguiendo el cursor** en la sección/landing de IA. Un solo efecto, bien hecho, en la sección que tiene que impresionar.

### Reglas que fijaría

- Nada anima el LCP. El título del hero aparece con el HTML.
- Ningún CTA principal tiene delay mayor a 150 ms.
- Todo respeta `prefers-reduced-motion`, sin excepción (hoy el anillo pulsante de WhatsApp, el marquee de logos y el spinner del modal lo ignoran).
- Un solo efecto protagonista por pantalla. Si todo se mueve, nada impresiona.

### Componentes nuevos que propongo

| Componente | Qué resuelve |
|---|---|
| `<Section variant="light\|dark\|brand\|surface">` | **El más importante.** Hoy cada sección pinta su fondo a mano con siete valores distintos de gris oscuro, y por eso el modo oscuro se rompe. Un solo componente define fondos, padding y ancho. Elimina toda una clase de bug de raíz |
| `<Reveal>` | Reemplaza ~40 usos de framer-motion por CSS |
| `<LeadForm variant>` | Formulario único con captura de atribución |
| `<ClientCard>` / `<CaseCard>` + `<CaseDetail>` | Casos con `layoutId`, enlaces siempre visibles |
| `<StatCounter>` | Números animados, accesibles |
| `<ChatDemo>` | La demo del chatbot en `/ia` |
| `<FAQ>` | Acordeón accesible + `FAQPage` schema automático. Sirve en todas las landings y es la pieza clave de AEO |
| `<Prose>` | Tipografía consistente para casos y artículos |

---

## 8. Modo oscuro, en serio

El problema no son los 20 `text-gray-500` sueltos. Es que **no hay un sistema**: cada componente decide su fondo y su texto por su cuenta, con siete valores de gris oscuro distintos, y a veces se olvida.

Orden de trabajo:

1. **Tokens semánticos** además de los de shadcn ya cargados: `--surface-0` (fondo de página), `--surface-1` (sección alterna), `--surface-2` (tarjeta), `--text-1` / `--text-2` / `--text-3`, `--brand` y `--brand-on-dark`.
2. **`<Section>` como único lugar que pinta fondos.** Ningún componente vuelve a escribir `dark:bg-[#...]`.
3. **Reemplazar los hex sueltos** por tokens: los 20 `text-gray-500`, los `text-[#414141]` sin variante, el `border-gray-50` del timeline (`Methodology.jsx:82`), los `bg-white` de los cuatro wrappers de página y de las bandas hero de `/servicios` y `/casos` — que hoy producen una franja blanca arriba de una página oscura.
4. **Campos de formulario.** `input.jsx:9` y `textarea.jsx:8` tienen `bg-white` fijo: en oscuro quedan blancos. Usar `bg-background` / `border-input`, que ahora ya existen.
5. **Azul de marca por tema**: `#3256D7` en claro, `#6F8BFF` en oscuro. Sobre fondo oscuro el azul de marca da 3,21:1 y no alcanza.
6. **`enableSystem`.** Hoy `layout.jsx:87` tiene `enableSystem={false}` y `defaultTheme="light"`: el sitio ignora la preferencia del sistema operativo. Pasar a `defaultTheme="system"`.
7. **Chequeo de contraste** como paso fijo del checklist de cada componente nuevo.

---

## 9. AEO: cómo se hace que una IA te cite

Esto no estaba en el diagnóstico y me parece bien que lo sumes, porque es donde la agencia puede sacar ventaja antes que su competencia. La lógica es distinta a la del SEO clásico: no se compite por una posición, se compite por **ser la fuente que el motor usa para armar la respuesta**.

| Palanca | Qué implica | Estado hoy |
|---|---|---|
| **Contenido pregunta-respuesta** | Cada página con 4-6 preguntas reales y respuestas autocontenidas de 40-60 palabras. Los motores generativos citan párrafos que responden solos, sin contexto | No existe |
| **Schema completo** | `Organization` + `LocalBusiness` (con teléfono, dirección, horarios), `Service` por servicio, `FAQPage`, `BreadcrumbList`, `Article`, `Person` para el equipo | Solo `LocalBusiness` incompleto |
| **Entidad clara y consistente** | Mismo nombre, `sameAs` correctos, perfil de Google Business, presencia en directorios. Los LLMs resuelven entidades antes de citar | Handle de Instagram contradictorio dentro del propio repo |
| **Datos citables** | Los motores citan cifras y definiciones concretas. El Benchmark Inmobiliario es exactamente eso y está encerrado en un PDF detrás de un formulario | Invisible para todo motor |
| **`llms.txt`** | Convención emergente: un archivo en la raíz que le dice a los modelos qué es el sitio y qué páginas priorizar. Todavía no es estándar oficial, pero cuesta media hora | No existe |
| **Bots de IA explícitos** | Declarar en `robots.txt` el permiso a `GPTBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`. Hoy el `Allow: /` genérico ya los deja pasar, pero conviene explicitarlo — para una agencia que quiere ser citada, dejarlos entrar es la jugada | Implícito |
| **Frescura y autoría** | Fecha visible de publicación y actualización, autor con perfil y credenciales | No existe |
| **Bing Webmaster Tools** | Alimenta Copilot y varios buscadores con IA. Se importa desde Search Console | No existe |

La página `/ia` y los casos son el mejor territorio para arrancar: son consultas de intención informativa donde el prospecto está formándose una opinión, que es exactamente donde los asistentes de IA reemplazaron al buscador.

---

## 10. Cómo se corrige cada hallazgo

### Performance (P-1 a P-8)

| # | Corrección |
|---|---|
| **P-1** 10,4 MB de imágenes | Apagar `images.unoptimized` en `next.config.js` (Vercel lo permite) y pasar los `<img>` crudos a `next/image` con `sizes` correcto. Next sirve AVIF/WebP al tamaño pedido. Además, redimensionar los originales a ≤600 px antes de subirlos: no tiene sentido versionar un PNG de 3172×3128. Objetivo: home por debajo de 1,5 MB |
| **P-2** Carrusel duplicado, 34 `<img>` extra | El marquee se arma con CSS duplicando visualmente el track, no duplicando el array. Y respeta `prefers-reduced-motion`. Alternativa mejor: si el muro de clientes queda en `/casos`, la home lleva solo el marquee y no la grilla — hoy tiene las dos cosas |
| **P-3** Video 11,7 MB con autoplay | Recortar a 20-30 s, recodificar a ≤2 MB (H.264 + WebM), agregar `poster`, `preload="none"`, sin autoplay. Evaluar reemplazarlo por mockups estáticos |
| **P-4** Assets muertos en el build | Borrar los imports de `INBazul`/`INBblanco` y los archivos `Group 2 (1).png`, `COA1.jpg`, `futbolQueen.jpg`. Con los datos fuera del componente, esto no vuelve a pasar |
| **P-5** Testimonials en el bundle | Borrar componente e import (ver punto 2) |
| **P-6** framer-motion en 17 componentes | `<Reveal>` en CSS para los reveals genéricos; framer-motion reservado para los siete momentos del punto 7. Sacar el `delay: 0.5` del navbar |
| **P-7** Sin caché de assets | Lo resuelve Vercel solo. Borrar `public/.htaccess` |
| **P-8** `index.css` huérfano + fuentes de más | Borrar `src/index.css`, sacar `poppins`/`rowdies` de `tailwind.config.js`, y quitar Playfair Display del layout salvo que se decida usarla de verdad (hoy se descarga y no la usa ningún componente) |

### SEO técnico (S-1 a S-10)

| # | Corrección |
|---|---|
| **S-1** `/og-image.jpg` da 404 | Diseñar una imagen 1200×630 con logo, claim y fondo de marca, y subirla a `public/`. Idealmente una por sección (home, servicios, casos, IA, inmobiliarias) usando `opengraph-image.jsx` de Next, que las genera en build |
| **S-2** Sin canonical | `alternates: { canonical: '/ruta' }` en el `metadata` de cada página, con `metadataBase` ya configurado |
| **S-3** Copy duplicado en `/servicios` | La página tiene su propio h1 y su propia bajada; `<Services />` pierde su encabezado cuando se usa como sección interna (prop `showHeading`) |
| **S-4** Servicios sin URL propia | Seis páginas `/servicios/[slug]` generadas desde datos, cada una con su metadata, su FAQ, su caso relacionado y su CTA. Es lo que habilita competir por consultas comerciales |
| **S-5** `/inmobiliarias` sin `h2` | Se resuelve con la reescritura del punto 5 |
| **S-6** JSON-LD incompleto | Completar `LocalBusiness` con teléfono, dirección, horarios, `priceRange` y `areaServed`; sumar `Organization`, `Service` y `FAQPage`. Unificar el handle de Instagram (hoy hay dos distintos dentro del repo) |
| **S-7** Sitemap manual | Migrar a `src/app/sitemap.js`, generado desde los datos de rutas, servicios y casos, con `lastmod` |
| **S-8** `.htaccess` peligroso | Borrarlo. En Vercel no aplica |
| **S-9** Enlazado interno pobre | Footer con navegación completa (servicios, casos, verticales, legales, contacto). "Nosotros" y "Metodología" apuntando a `/#about` y `/#metodologia` desde páginas internas. Cada caso enlaza a su servicio y viceversa |
| **S-10** Sin cabeceras de seguridad | `headers()` en `next.config.js` con `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` y `Strict-Transport-Security` |

### Accesibilidad (A-1 a A-10)

| # | Corrección | Estado |
|---|---|---|
| **A-1** Botones sin foco visible | Variables CSS definidas | ✅ **Hecho y verificado** |
| **A-2** Toast transparente | Ídem | ✅ **Hecho y verificado** |
| **A-3** Contrastes que fallan | Tokens por tema + reemplazo de hex sueltos. Casos puntuales: "Sin paquetes. A medida." con variante dark (hoy 1,92:1); texto de los botones de WhatsApp — o texto más grande y en negrita, o fondo verde más oscuro (hoy 1,98:1); placeholders a `text-muted-foreground` (hoy 2,54:1) | Pendiente |
| **A-4** Casos sin enlaces en mobile | Enlaces siempre visibles en la tarjeta. Cae solo con el rediseño de casos | Pendiente |
| **A-5** Modal del benchmark | Reemplazar por Radix Dialog, ya instalado y sin usar: trae foco atrapado, Escape, scroll lock y roles ARIA. O directamente desaparece si el formulario pasa a la página | Pendiente |
| **A-6** Menú mobile sin trampa de foco | Radix Dialog / Sheet, misma solución | Pendiente |
| **A-7** Acordeón con `role="button"` en un div | `<button>` real; el `h3` queda afuera del botón | Pendiente |
| **A-8** Nombres accesibles | `aria-label="Volver arriba"` en el botón del logo del footer; `aria-pressed` en los filtros | Pendiente |
| **A-9** Animaciones infinitas | `useReducedMotion` en el anillo de WhatsApp, el marquee y el spinner. Regla fija para todo componente nuevo | Pendiente |
| **A-10** Video sin transcripción | Resumen en texto debajo del video, que además suma contenido indexable | Pendiente |

### Lo demás

Conversión y consistencia se resuelven con los puntos 1 a 6 y con el backlog. El año del benchmark se unifica en 2026 y —para que no vuelva a pasar— sale de una constante única:

```js
export const BENCHMARK = {
  anio: 2026,
  archivo: '/benchmark-inmobiliario-2026.pdf',
  titulo: 'Benchmark Inmobiliario Argentina 2026',
};
```

Metadata, botón, nombre de descarga y asunto del mail leen de ahí. Hoy son cinco lugares desalineados.

---

## 11. Arquitectura propuesta del sitio

```
/                          Home — hero, diferenciales, configurador, servicios,
                           teaser IA, metodología, clientes, modalidades, CTA
/servicios                 Índice de los 6 servicios
/servicios/google-ads      ─┐
/servicios/meta-ads         │
/servicios/seo-aeo          ├─ una por servicio, con FAQ + caso + CTA
/servicios/diseno-web       │
/servicios/social-content   │
/servicios/estrategia      ─┘
/ia                        Landing de IA y automatización + demo del chatbot   ★ nueva
/casos                     Muro de clientes + índice de casos
/casos/[slug]              Caso individual                                     ★ nueva
/inmobiliarias             Vertical inmobiliaria, reescrita
/[vertical]                Molde para seguros, e-commerce, salud…              ★ futuro
/blog                      Contenido AEO y de marca                            ★ futuro
/nosotros                  Equipo, forma de trabajo, metodología               ★ nueva
/contacto                  Formulario maestro
/privacidad                Política de privacidad                              ★ nueva
/terminos                  Términos de uso                                     ★ nueva
```

Ese mapa es también el esqueleto del contenido de Instagram y LinkedIn: cada página nueva es materia prima para un carrusel, y cada carrusel tiene a dónde mandar el tráfico. Hoy el link en bio va a una home genérica.

---

## 12. Backlog actualizado por fases

Cerrados: el hosting (Vercel confirmado) y las variables CSS. Reordené el resto en seis fases, cada una con un criterio de salida.

### Fase 0 — Cimientos · ✅ COMPLETADA (25/08/2026)

| # | Tarea | Estado |
|---|---|---|
| 0.1 | Variables CSS de shadcn | ✅ |
| 0.2 | Tokens semánticos de superficie, texto y marca | ✅ |
| 0.3 | Componente `<Section>` y migración de las 14 secciones | ✅ |
| 0.4 | Modo oscuro completo: wrappers, bandas hero, grises, campos, azul por tema, `enableSystem` | ✅ |
| 0.5 | `src/data/benchmark.js` y unificación en 2026 | ✅ |
| 0.6 | Limpieza: `Testimonials.jsx`, `CallToAction.jsx`, `src/index.css`, imports de INB, `out/` al gitignore | ✅ (quedan borrados manuales, ver más abajo) |
| 0.7 | `next.config.js`: optimización de imágenes y `headers()` | ✅ |
| 0.8 | Resend con instanciación diferida | ✅ |
| 0.9 | README actualizado | ✅ |

**Verificado corriendo el sitio:** `npm run build` pasa sin `RESEND_API_KEY`; ningún elemento queda sin foco visible al tabular `/contacto` en oscuro; el toast tiene fondo en los dos temas (`#FFFFFF` / `#0D0D0D`, radio 10px) y el de error es `#D1341F` con blanco; la banda blanca de `/casos` y `/servicios` en oscuro pasó a `#0D0D0D` con título blanco; "Sin paquetes. A medida." pasó de `#414141` (1,92:1) a blanco; los campos de formulario pasaron de blancos a `#0D0D0D` en oscuro; las cinco cabeceras de seguridad responden.

**Lo que Fase 0 NO tocó:** el peso de las imágenes sigue igual (home 10,36 MB medidos después de los cambios). Activar la optimización en `next.config.js` no rinde hasta que los `<img>` crudos de `CaseStudies.jsx` pasen a `next/image` y se redimensionen los originales. Eso es Fase 3.

**Borrados manuales pendientes** (el puente al equipo no puede borrar archivos):

```bash
git rm -r out/
git rm public/.htaccess src/index.css \
       src/components/Testimonials.jsx src/components/CallToAction.jsx \
       "src/assets/images/Group 2 (1).png" \
       src/assets/images/clients/logos/COA1.jpg \
       src/assets/images/clients/logos/futbolQueen.jpg
```

`src/assets/images/clients/logoCards/{light/INBazul.png,dark/INBblanco.png}` se dejan: ya no entran al build y sirven para cuando se reincorpore INB Seguros.

### Fase 1 — Medición · 3-4 días

| # | Tarea |
|---|---|
| 1.1 | GTM instalado, con Consent Mode v2 y banner de cookies |
| 1.2 | GA4 + Google Ads + Meta Pixel configurados dentro de GTM |
| 1.3 | Los 9 eventos del punto 3, con sus parámetros |
| 1.4 | Vercel Analytics + Speed Insights |
| 1.5 | Search Console + Bing Webmaster verificados |
| 1.6 | Captura de `gclid` / `fbclid` / UTMs en campos ocultos |
| 1.7 | WhatsApp con `?text=` y origen en los 4 enlaces |
| 1.8 | Documento de convención de UTMs y valores de conversión (con paid media) |

**Sale cuando:** un envío de formulario y un clic a WhatsApp aparecen en GA4 en tiempo real con todos sus parámetros, y las conversiones están importadas en Google Ads y Meta.

### Fase 2 — Confianza y legales · 2-3 días

| # | Tarea |
|---|---|
| 2.1 | `/privacidad` y `/terminos`, enlazadas desde footer y formularios |
| 2.2 | Consentimiento explícito en los tres formularios |
| 2.3 | Imágenes Open Graph (una por sección) |
| 2.4 | `canonical` en todas las rutas |
| 2.5 | JSON-LD completo: `Organization`, `LocalBusiness`, `Service`, `FAQPage` |
| 2.6 | Sitemap dinámico + `llms.txt` + `robots.txt` con bots de IA explícitos |
| 2.7 | Perfil de Google Business creado o reclamado |
| 2.8 | Cabeceras de seguridad |

**Sale cuando:** las cinco rutas validan en Rich Results Test y comparten bien en WhatsApp y LinkedIn.

### Fase 3 — Velocidad y accesibilidad · 4-5 días

| # | Tarea |
|---|---|
| 3.1 | Todas las imágenes por `next/image`, originales redimensionados |
| 3.2 | Video de inmobiliarias recortado y comprimido |
| 3.3 | `<Reveal>` en CSS reemplazando los reveals de framer-motion |
| 3.4 | Radix Dialog en modal y menú mobile |
| 3.5 | Acordeón, nombres accesibles, `aria-pressed`, `aria-live` |
| 3.6 | `prefers-reduced-motion` en todas las animaciones infinitas |
| 3.7 | Auditoría de contraste completa en ambos temas |

**Sale cuando:** la home baja de 1,5 MB, PageSpeed móvil supera 85 y una pasada completa por teclado no encuentra trampas ni elementos sin foco.

### Fase 4 — Conversión · 4-5 días

| # | Tarea |
|---|---|
| 4.1 | `<LeadForm>` único con captura progresiva y atribución |
| 4.2 | Honeypot, trampa de tiempo, rate limit, escape de HTML, validación server |
| 4.3 | Integración con `crm.posicionarte.online` |
| 4.4 | Pantalla de gracias con enriquecimiento del lead |
| 4.5 | Modalidades de trabajo reescritas: nombres claros, rango de inversión, criterio de elección |
| 4.6 | CTAs revisados: que cada botón entregue lo que promete |
| 4.7 | Email marketing: herramienta elegida y secuencia post-descarga |

**Sale cuando:** un lead entra por cualquier formulario, llega al mail y al CRM con su atribución completa, y dispara su evento en GA4.

### Fase 5 — Contenido y estructura · 2-3 semanas

| # | Tarea |
|---|---|
| 5.1 | `data/clientes.js` con la cartera real y autorizaciones |
| 5.2 | `/casos` rediseñado: muro + filtro por rubro + tarjetas accesibles |
| 5.3 | Tres a seis casos en `/casos/[slug]` con métricas verificables |
| 5.4 | Prueba social real: Google Business, LinkedIn, testimonios pedidos |
| 5.5 | Seis páginas de servicio con FAQ |
| 5.6 | `/ia` con demo de chatbot |
| 5.7 | `/inmobiliarias` v2 + hallazgos del benchmark en HTML |
| 5.8 | `/nosotros` |
| 5.9 | Copy revisado contra el brand kit: sacar "garantiza resultados", ajustar "sin tercerizar", escribir el posicionamiento real |
| 5.10 | Los siete momentos de framer-motion |

**Sale cuando:** cada servicio y cada vertical tienen su página, y no hay una sola afirmación en el sitio que no se pueda respaldar.

### Fase 6 — Relanzamiento · 1 semana

| # | Tarea |
|---|---|
| 6.1 | QA completo: 5 navegadores, 2 temas, teclado, lector de pantalla |
| 6.2 | Medición base registrada (para poder comparar después) |
| 6.3 | Contenido de lanzamiento para Instagram y LinkedIn, con el sitio como fuente |
| 6.4 | Historias destacadas alineadas a la nueva arquitectura |
| 6.5 | Calendario de contenido con cada página nueva como materia prima |

---

## 13. Lo que necesito de vos

Nada de esto avanza sin cinco insumos. Los primeros tres son los que bloquean más trabajo:

1. **La cartera real de clientes.** Quién sigue, quién se fue, quién entró, qué servicio se le presta a cada uno y quién autorizó aparecer. Bloquea toda la Fase 5, y es lo que más tiempo te va a llevar a vos — arrancá por acá.
2. **Tres a seis clientes para casos.** Con cuál se puede contar la historia completa y quién estaría dispuesto a compartir un número.
3. **Qué es `crm.posicionarte.online`.** Herramienta, si tiene API o webhook, y qué campos espera. Define cómo integramos los formularios.
4. **Rangos de inversión y valores de conversión.** Para el selector de los formularios y para el bidding. Esto es lo que le pedís a paid media.
5. **Quién administra GTM.** Si lo maneja paid media, les paso la estructura de eventos y ellos configuran; si lo manejo yo, necesito acceso.

---

## 14. Por dónde empezamos

Mi propuesta: **Fase 0 completa como próximo bloque**. Son dos o tres días, no toca contenido ni copy, y deja el sistema visual coherente para que todo lo demás se construya sobre algo sólido en vez de sobre siete grises distintos.

En paralelo, mientras yo hago Fase 0, vos podés ir armando la lista de clientes (insumo 1) y consultando lo de GTM con paid media.

Decime y arranco.

---

*Actualizado el 25/08/2026. Los hallazgos con código de referencia (P-1, S-3, A-4…) corresponden a `docs/DIAGNOSTICO-2026.md`.*
