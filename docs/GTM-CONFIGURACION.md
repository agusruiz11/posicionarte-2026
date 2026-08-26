# Configuración de GTM — posicionarte.online

**Contenedor:** `GTM-WSL25TT5`
**Última actualización:** agosto 2026

Este documento es para el equipo de paid media. El sitio ya empuja todos los
eventos al `dataLayer`; lo que falta es armar los tags adentro del contenedor.

**Regla de convivencia:** GA4, Google Ads y Meta se configuran dentro de GTM.
No se agregan scripts de terceros al repositorio. Así ustedes cambian
mediciones sin esperar un deploy, y el sitio no depende de ningún píxel para
funcionar.

---

## 1. Cómo está montado del lado del sitio

El contenedor se carga desde `src/components/Analytics.jsx`, detrás de la
variable de entorno `NEXT_PUBLIC_GTM_ID`. Tres cosas que conviene saber:

- **Sin la variable no se carga nada.** Los eventos igual se empujan al
  `dataLayer`. Eso permite trabajar en local y en las preview de Vercel sin
  ensuciar los datos de producción.
- **La variable se inlinea en el build.** Cambiarla en Vercel no tiene efecto
  hasta el siguiente deploy.
- **El `consent default` se dispara antes que `gtm.js`**, con
  `strategy="beforeInteractive"`. Hoy todos los permisos arrancan en `granted`
  porque el sitio no tiene banner de cookies. Ver la sección 5.

---

## 2. Eventos disponibles

Cada fila es un `event` que ya llega al `dataLayer`. Los nombres no se
inventaron: son los de GA4 donde existe equivalente, para que las
recomendaciones automáticas de la plataforma funcionen.

### Conversiones — las tres que importan

| Evento | Cuándo se dispara | Parámetros propios |
|---|---|---|
| `generate_lead` | Envío correcto de cualquiera de los 3 formularios | `form_id`: `footer` \| `contacto` \| `benchmark`. En benchmark suma `servicio_interes` y `rango_inversion` |
| `contact_whatsapp` | Click en cualquier link de WhatsApp | `source_section`: `hero` \| `seccion-ia` \| `footer` \| `boton-flotante` \| `plan-<nombre del plan>` |
| `file_download` | Descarga efectiva del benchmark en PDF | `file_name` |

**Las tres llevan además todos los parámetros de atribución** de la sección 3.
Son las únicas que los llevan, a propósito: son las que después se importan a
Google Ads y a Meta.

### Micro-conversiones y comportamiento

| Evento | Cuándo se dispara | Parámetros propios |
|---|---|---|
| `form_start` | Primer tecleo en un formulario | `form_id` |
| `cta_click` | Click en los CTA principales | `cta_text`, `cta_location` |
| `view_service` | Se abre un servicio del acordeón | `service_name` |
| `select_objective` | Se elige un objetivo en el configurador | `objective` |
| `click_case_study` | Click en el link de un caso | `client_name`, `rubro`, `servicio` |
| `scroll_depth` | 25 / 50 / 75 / 90 % de la página | `percent` |

Todos los eventos, sin excepción, llevan también `page_location` y `page_path`.

`form_start` existe para una cosa concreta: cruzarlo contra `generate_lead` da
la tasa de abandono de formulario. Si la brecha es grande, el problema es el
formulario, no el tráfico.

---

## 3. Parámetros de atribución

Los adjuntan solo los tres eventos de conversión. El sitio los captura de la
URL de entrada y los guarda: **primer toque en `localStorage`, último toque en
`sessionStorage`**. Por eso una conversión que ocurre en la tercera visita
sigue llevando el `gclid` de la primera.

**Identificadores de click:** `gclid`, `gbraid`, `wbraid`, `fbclid`,
`msclkid`, `ttclid`.

**UTMs:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
`utm_term`.

**Contexto:** `referrer`, `landing_page`, `ts`, `first_touch_source`,
`first_touch_campaign`, `first_touch_ts`, `dispositivo` (`mobile` \|
`desktop`).

Los mismos datos viajan al mail del lead, así que el que atiende la consulta ve
de qué campaña vino sin abrir ninguna herramienta.

---

## 4. Qué hay que armar en GTM

### 4.1 Variables

Crear una **Variable de capa de datos** por cada parámetro que se vaya a usar
en tags o triggers. Como mínimo:

`form_id`, `source_section`, `file_name`, `cta_text`, `cta_location`,
`service_name`, `objective`, `client_name`, `percent`, `gclid`, `fbclid`,
`utm_source`, `utm_medium`, `utm_campaign`, `dispositivo`.

El nombre de la variable de capa de datos tiene que ser **idéntico** al del
parámetro. Sin eso llegan vacíos y no hay error visible en ningún lado, que es
la forma más cara de perder tres meses de datos.

### 4.2 Triggers

Un trigger de tipo **Evento personalizado** por cada evento de la sección 2.
El nombre del evento va literal, sin comodines: `generate_lead`,
`contact_whatsapp`, `file_download`, y así.

### 4.3 Tags de GA4

1. **Tag de configuración de GA4**, con el Measurement ID de la propiedad,
   disparado en *Initialization - All Pages*.
2. **Un tag de evento de GA4 por cada evento**, enviando sus parámetros
   propios. Para los tres de conversión, incluir también los de atribución.

Después, en la interfaz de GA4, marcar como **evento clave**:
`generate_lead`, `contact_whatsapp` y `file_download`. Nada más. Marcar
`scroll_depth` o `cta_click` como conversión infla los números y arruina la
optimización automática de las campañas.

### 4.4 Google Ads

Importar los tres eventos clave desde GA4 como conversiones. Dos decisiones
pendientes del lado de la agencia, no de ustedes:

- **Valor de conversión.** Sin un valor, Ads optimiza por volumen y no
  distingue un lead de un contacto tibio. Necesitamos definir cuánto vale un
  `generate_lead` frente a un `contact_whatsapp` y un `file_download`.
- **Ventana de conversión.** El ciclo de venta de la agencia es largo; la
  ventana por defecto de 30 días probablemente se quede corta.

Avisen qué necesitan para tomar esas dos decisiones y lo cerramos.

### 4.5 Meta

Píxel base en *All Pages* y eventos personalizados sobre los mismos triggers.
`generate_lead` mapea al evento estándar **Lead**; `file_download` a
**CompleteRegistration** o a un evento personalizado, a criterio de ustedes.

---

## 5. Consent Mode

Está implementado en Consent Mode v2, pero hoy **todos los permisos arrancan en
`granted`**, porque el sitio no tiene banner de cookies. Es el comportamiento
que el sitio ya tenía; no lo empeoramos, solo lo dejamos explícito y
controlable.

El tráfico es argentino y la Ley 25.326 no exige consentimiento previo para
analítica, así que no es urgente. Si en algún momento se hace campaña a la
Unión Europea, hay que cambiar los defaults a `denied` y que el banner dispare
el `consent update`. Es un cambio de un solo archivo del sitio
(`src/components/Analytics.jsx`), no toca el contenedor.

---

## 6. Cómo probarlo

1. Entrar al modo **Vista previa** de GTM apuntando a `posicionarte.online`.
2. Entrar al sitio con parámetros de prueba en la URL, por ejemplo:
   `posicionarte.online/?utm_source=prueba&utm_medium=cpc&gclid=TEST123`
3. Verificar en el panel que llega el `consent default` **antes** que `gtm.js`.
4. Disparar los eventos a mano:
   - `contact_whatsapp` → click en el botón verde del hero
   - `view_service` → abrir cualquier servicio del acordeón
   - `scroll_depth` → bajar hasta el pie
   - `generate_lead` → enviar el formulario del pie
5. En cada uno, confirmar que los parámetros llegan con valor. En los tres de
   conversión, confirmar que aparece el `gclid=TEST123`.

Si un parámetro llega vacío, casi siempre es una variable de capa de datos mal
nombrada, no un problema del sitio.

---

## 7. Lo que no hay que hacer

- **No agregar el tag de GA4 ni el píxel de Meta al repositorio.** Duplica
  mediciones y obliga a un deploy por cada cambio.
- **No renombrar eventos desde GTM.** Los nombres son un contrato con el
  código. Si hace falta cambiar uno, se cambia en el repo y se avisa.
- **No marcar micro-conversiones como conversiones en Ads.**
- **No usar el trigger genérico "Todos los eventos personalizados".** Cuando
  agreguemos eventos nuevos van a entrar solos, sin que nadie lo decida.

---

## 8. Pendiente de nuestro lado

- Verificación del sitio en Search Console y Bing Webmaster Tools.
- Definir valor y ventana de conversión (sección 4.4).
- Formulario unificado con captura progresiva (fase 4): va a sumar parámetros
  nuevos a `generate_lead`. Se avisa antes.
