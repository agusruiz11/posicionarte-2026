# Cómo optimizar un sitio de la cartera

Guía de trabajo. Sale del caso Maxcer (septiembre 2026): de 63 a 95 en Lighthouse mobile con once archivos tocados y ninguna decisión de diseño cambiada. Los mismos seis problemas se repiten en casi todos los sitios propios, así que esto sirve para los trece que faltan.

**Regla de oro:** medir antes, arreglar, medir después con el mismo método. Sin el antes no hay caso de estudio.

## 1. Medir el antes

```bash
npx lighthouse https://ejemplo.com/ --only-categories=performance \
  --form-factor=mobile --screenEmulation.mobile --output=json --output-path=antes.json
```

Correrlo dos o tres veces, quedarse con la mediana. O usar https://pagespeed.web.dev, que además muestra datos de usuarios reales cuando hay tráfico.

Guardar el JSON o una captura. Ese es el "antes" del caso.

## 2. Leer el diagnóstico

Cuatro números importan. Cada uno apunta a una causa distinta:

| Número | Qué mide | Bien | Causa típica en nuestros sitios |
|---|---|---|---|
| **LCP** | cuándo se pinta el elemento más grande de la pantalla | menos de 2,5 s | animación de entrada con `opacity: 0`, imagen del hero con `loading="lazy"`, imagen gigante |
| **CLS** | cuánto salta la página mientras carga | menos de 0,1 | secciones con `lazy()`, imágenes sin `width`/`height`, fuentes que cambian de tamaño |
| **TBT** | cuánto tiempo el hilo principal está ocupado y no responde | menos de 200 ms | tags de Google cargando al inicio, animaciones infinitas con `blur`, scripts de terceros |
| **Peso total** | KB descargados | menos de 1 MB | imágenes de Unsplash sin parámetros de tamaño, PNG donde va WebP |

En el JSON de Lighthouse, `audits['lcp-breakdown-insight']` dice qué elemento es el LCP y cuánto tardó cada fase. Si "element render delay" es alto y "resource load" es bajo, el problema es una animación, no una descarga.

## 3. Los seis arreglos, en orden de impacto

### 3.1 Imágenes: locales, al tamaño que se muestran, en WebP

Es el arreglo más grande y el más mecánico. En Maxcer eran 10 MB de 11.

- **Nunca linkear Unsplash sin parámetros.** `photo-xxx` a secas baja el original de 5 MB. Bajarla una vez, redimensionar, y servirla desde `public/images/`.
- **El tamaño de la imagen es el tamaño en pantalla, por dos.** Una tarjeta de 400 px de ancho necesita una imagen de 800 px. No de 1600, no de 4000.
- **WebP con calidad 80.** Pesa un tercio del JPG al mismo nivel visual. Todos los navegadores lo soportan hace años.
- **Siempre `width` y `height`.** Aunque el CSS después la estire: el navegador necesita la proporción para reservar el lugar antes de que llegue. Sin eso, CLS.

Script que hace todo esto:

```python
from PIL import Image, ImageOps
im = ImageOps.exif_transpose(Image.open("original.jpg")).convert("RGB")
im = ImageOps.fit(im, (800, 500), Image.LANCZOS)   # recorta al encuadre de la tarjeta
im.save("public/images/tarjeta.webp", "WEBP", quality=80, method=6)
```

### 3.2 La imagen y el texto del hero se pintan primero, no últimos

Tres errores que aparecen juntos y son lo contrario de lo que hay que hacer:

```jsx
// MAL: el hero es lo primero que se ve, y esto le dice al navegador que lo postergue
<img src="/hero.jpg" loading="lazy" />

// BIEN
<img src="/hero.webp" width="960" height="720" fetchpriority="high" decoding="async" />
```

Y en el `<head>`, para que la pida antes de que cargue el JavaScript:

```html
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" />
```

`loading="lazy"` va en todo lo que está **debajo** del pliegue. Arriba, nunca.

### 3.3 Las animaciones de entrada no arrancan en `opacity: 0`

Este es el más contraintuitivo y el que más nos costó en nuestros propios sitios. Google mide cuándo se **pinta** el título, no cuándo termina la animación. Si el título arranca invisible y aparece a los 800 ms, el LCP es 800 ms más tarde de lo necesario, más todo lo que tarde React en hidratar.

```jsx
// MAL: invisible hasta que hidrata React y pasa el delay
const item = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

// BIEN: visible desde el primer pintado, y se desliza igual
const item = { hidden: { y: 20 }, visible: { y: 0 } };
```

Aplica a título, párrafo y cualquier cosa grande arriba del pliegue. Los botones y las tarjetas de abajo pueden seguir apareciendo con fade sin problema.

### 3.4 `lazy()` solo para rutas que casi nadie visita

```jsx
// MAL: el Hero de la home cargado con lazy
const Hero = lazy(() => import('./Hero'));

// BIEN
import Hero from './Hero';
```

Lazy en las secciones de la home hace dos cosas malas: el título tarda un chunk más en aparecer, y si el fallback del `Suspense` es `position: fixed`, el footer se dibuja arriba y salta cuando llega el contenido. Ese salto es un CLS de 1,0 y **no se ve en local** porque los chunks llegan al instante. Solo se ve midiendo el sitio publicado.

El fallback del `Suspense`, cuando hace falta, tiene que ocupar lugar en el flujo: `min-h-screen`, nunca `fixed`.

### 3.5 Fuentes sin `@import`

```css
/* MAL: CSS que pide otro CSS que pide la fuente. Tres saltos, todos bloqueantes. */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900');
```

```html
<!-- BIEN: en el <head>, con preconnect, y solo los pesos que el sitio usa -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
```

Para saber qué pesos se usan: `grep -rhoE "font-(light|medium|semibold|bold|extrabold|black)" src/ | sort | uniq -c`.

### 3.6 Google Tag Manager con carga diferida

GTM más el gtag de Ads que suele cargar adentro son unos 300 KB y 400 ms de hilo principal, justo cuando la página está intentando pintarse. No hace falta que carguen en el primer milisegundo: las conversiones son clicks, y un click siempre llega después.

Cargar GTM con la primera interacción (scroll, toque, tecla) o a los tres segundos, lo que pase primero. El código está en `index.html` de Maxcer y se copia tal cual cambiando el ID. El `gclid` sigue en la URL cuando GTM arranca, así que la atribución de Ads no se pierde.

## 4. Lo que hay que sacar

- **Todo lo de Hostinger Horizons.** El `vite.config.js` que genera inyecta cuatro scripts en producción que solo sirven para hablar con su editor, incluido un `MutationObserver` sobre el documento entero. El config limpio de Maxcer se copia a cualquier proyecto Vite.
- **Animaciones infinitas con `blur`.** Los blobs decorativos con `blur-2xl` y `animate` infinito cuestan GPU en celulares, donde además no se ven. `hidden lg:block`.
- **Imágenes en `public/` que nadie referencia.** Vite copia `public/` entero a `dist/`. Maxcer tenía 12 MB de fotos sin usar subidas al hosting.

## 5. Medir el después

Mismo comando, mismo número de corridas. Si el score no subió, releer el `lcp-breakdown-insight`: casi siempre quedó una animación con opacidad o una imagen sin `fetchpriority`.

## 6. Qué es publicable

El antes y el después con fecha. "Maxcer: de 63 a 95, 10 MB a 291 KB" es verificable por cualquiera que corra PageSpeed hoy, y vende Diseño Web sin una palabra de marketing. Un score suelto no dice nada; el salto sí.

## Orden sugerido para los que faltan

Por impacto comercial: primero los clientes activos que pagan pauta, porque cada segundo de carga se lleva conversiones que ya se pagaron.

1. **COA** (54, LCP 18 s): WordPress. Los seis puntos aplican, más plugins.
2. **Florida Aventura** (59) y **Sanyser** (57): React propios, mismo caso que Maxcer.
3. **Outflow** (37, TBT 1,6 s): terceros bloqueando. Diferir GTM y revisar qué widgets carga.
4. **Sustain** (55), **El Recreo** (75), **Cerrame la Ocho** (66), **Take Off** (58): React propios.
5. **Cabañas** (LCP 40 s): algo roto arriba del pliegue. Mirar primero qué es antes de tocar nada.
6. **VES** (69), **Vuotto** (46), **Tesio & Vuotto** (73): WordPress.
7. **Lizze** (60): Tienda Nube. Margen limitado, la plataforma decide mucho.
