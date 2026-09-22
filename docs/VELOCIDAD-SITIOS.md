# Velocidad de los sitios de la cartera

Medido el 21/09/2026 con Lighthouse 13.5, perfil mobile, dos corridas por sitio, se toma la mejor.

**Leé esto antes de usar los números:** la medición salió desde un entorno que pasa por un proxy, así que cada pedido tiene más latencia que la de un usuario real. Los valores absolutos están castigados; el orden entre sitios y los problemas que aparecen (CLS, JavaScript bloqueante, LCP de decenas de segundos) son reales. Antes de publicar un número, correrlo en https://pagespeed.web.dev desde una conexión normal.

## Resultados

| Sitio | Hecho por Posi | Score | LCP | CLS | TBT |
|---|---|---|---|---|---|
| [Fútbol Queens](https://futbolqueens.com/) | no | **92** (verde) | 2.1 s | 0.16 | 0 ms |
| [Tienda de Puntos](https://tiendadepuntos.com/) | no | **87** (naranja) | 2.5 s | 0.00 | 348 ms |
| [El Recreo Fútbol](https://elrecreofutbol.com/) | sí | **75** (naranja) | 3.5 s | 0.04 | 330 ms |
| [Tesio & Vuotto](https://tesioyvuottoestudio.com/) | sí | **73** (naranja) | 4.7 s | 0.01 | 9 ms |
| [VES Arquitectura](https://vesarquitectura.com.ar/) | sí | **69** (naranja) | 4.0 s | 0.03 | 98 ms |
| [Cerrame la Ocho](https://cerramelaocho.com/) | sí | **66** (naranja) | 7.2 s | 0.14 | 80 ms |
| [Cabañas Arcángeles](https://xn--cabaasarcangeles-9tb.com/) | sí | **63** (naranja) | 40.5 s | 0.00 | 130 ms |
| [Centro Piel y Estética](https://www.pielyestetica.com/) | no | **60** (naranja) | 3.7 s | 0.03 | 1820 ms |
| [Lizze](https://lizze.ar/) | sí | **60** (naranja) | 3.7 s | 0.04 | 1023 ms |
| [Florida Aventura](https://www.floridaaventura.com/) | sí | **59** (naranja) | 7.7 s | 0.07 | 249 ms |
| [Take Off English](https://takeoffenglish.ar/) | sí | **58** (naranja) | 7.4 s | 0.00 | 402 ms |
| [Sanyser](https://sanyser.com.ar/) | sí | **57** (naranja) | 9.1 s | 0.01 | 180 ms |
| [Sustain](https://sustaintoken.org/) | sí | **55** (naranja) | 7.0 s | 0.00 | 273 ms |
| [Sello Ambiental COA](https://selloambientalcoa.org.ar/) | sí | **54** (naranja) | 18.3 s | 0.07 | 85 ms |
| [Estudio Vuotto](https://www.estudiovuotto.com.ar/) | sí | **46** (rojo) | 6.5 s | 0.07 | 565 ms |
| [Miguel D'Odorico](https://www.migueldodorico.com/) | no | **45** (rojo) | 64.8 s | 0.01 | 441 ms |
| [Outflow](https://outflow.com.ar/) | sí | **37** (rojo) | 8.5 s | 0.01 | 1643 ms |
| [Renoir](https://renoir.ar/) | no | **35** (rojo) | 14.8 s | 0.00 | 1344 ms |
| [Maxcer](https://maxcer.com.ar/) | sí | ~~31~~ → **87** | ~~9.6 s~~ → 3.0 s | ~~1.01~~ → 0 | ~~375 ms~~ → 160 ms |

Referencia: la propia posicionarte.online dio 70 a 74 en el mismo entorno antes del arreglo del hero, y 88 a 92 en local después. El arreglo fue sacar la opacidad 0 de la animación de entrada del título y el párrafo, que retrasaba el pintado del texto más grande 2,6 segundos.

## Casos cerrados

### Maxcer, 22 de septiembre de 2026

Medido con PageSpeed Insights (Lighthouse 13.5, Moto G Power emulado, 4G lenta) desde una conexión normal, no desde el contenedor.

| | Antes (agosto) | Después (22 sept) |
|---|---|---|
| Score mobile | 31 | **87** |
| Score desktop | no medido | **97** |
| LCP mobile | 9,6 s | 3,0 s |
| CLS mobile | 1,01 | 0 |
| TBT mobile | 375 ms | 160 ms |
| Peso descargado | 9,9 MB | 586 KB |
| Accesibilidad / Buenas prácticas / SEO | | 91 / 96 / 92 |

Qué se tocó: once archivos, ninguna decisión de diseño. Imágenes locales en WebP al tamaño que se muestran, hero sin `lazy` y sin `opacity: 0`, secciones de la home con import estático, fuentes por `<link>`, GTM diferido, config de Vite sin Horizons. Detalle en `OPTIMIZACION-WEB.md`.

Lo que queda y por qué no se tocó: el FCP mobile de 2,7 s es el techo de una SPA que se pinta desde JavaScript; para bajarlo hace falta prerender del HTML del hero, que es otro trabajo. El JS sin usar (131 KiB) es GTM y el gtag duplicado de Ads dentro del contenedor de Maxcer, tarea de pauta, no del sitio.

## Qué dicen los números

- **Solo Fútbol Queens llega a verde**, y ese sitio no lo hicimos nosotros.
- **De los 14 sitios propios, ninguno pasa de 75.** La mediana de la cartera es 59.
- **Maxcer tiene CLS 1,01.** Cualquier valor arriba de 0,25 es rojo; 1,01 significa que la página salta de lugar mientras carga. Es el sitio del cliente más antiguo en pauta y es lo primero que ve quien hace click en un anuncio.
- **Cabañas Arcángeles (LCP 40 s) y Miguel D'Odorico (LCP 65 s)** tienen algo roto o pesadísimo arriba del pliegue: un video, una imagen sin comprimir o un script que bloquea. Hay que mirarlos uno por uno.
- **COA con LCP de 18 s** es WordPress sin optimizar. Es el logo que más chapa da y su sitio es de los más lentos.
- **Outflow, Renoir, Lizze y Piel y Estética tienen TBT de más de un segundo:** JavaScript de terceros (píxeles, chats, widgets) bloqueando el hilo principal.

## Qué hacer con esto

La idea original era publicar la velocidad de los sitios como métrica dura y gratis. **Con estos números no se puede publicar nada todavía.** Pero hay algo mejor:

1. **Es una lista de trabajo vendible.** "Optimización web" figura en la lámina de tarifas. Hay 14 sitios propios por debajo de 75 y varios clientes activos que pagan pauta hacia páginas que cargan en más de 7 segundos. Cada segundo de LCP en mobile cuesta conversiones que la pauta ya pagó.
2. **El antes/después es el caso de estudio más fuerte que existe.** Un score de 96 impresiona poco. Pasar de 31 a 90 en Maxcer, con fecha y captura, es verificable por cualquiera y vende el servicio sin decir una palabra de marketing.
3. **Orden sugerido:** Maxcer (CLS, cliente activo con pauta), COA (chapa), Florida Aventura y Sanyser (activos, propios, entre 55 y 60). Los cuatro son React o WordPress conocido; ninguno debería llevar más de un día cada uno.

## Cómo repetir la medición

```bash
npx lighthouse https://ejemplo.com/ --only-categories=performance --form-factor=mobile --screenEmulation.mobile --output=json
```

O directamente en https://pagespeed.web.dev, que además muestra datos de usuarios reales (CrUX) cuando el sitio tiene tráfico suficiente.
