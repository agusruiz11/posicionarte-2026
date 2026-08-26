# Cómo funciona la captura de leads

Estado: fase 4, agosto 2026.

## El recorrido completo

```
Formulario  →  POST /api/lead  →  1. mail al equipo      (Resend)
                                  2. fila en la base     (Supabase, tabla Lead)
                                  3. alta en la audiencia (Resend, solo si lo pidió)
                               →  evento generate_lead al dataLayer
```

El orden importa. El mail es lo único que no puede fallar: si falla, el
endpoint devuelve error y la persona puede reintentar. Los pasos 2 y 3 son best
effort — si fallan quedan en el log del servidor y el visitante nunca ve un
error, porque su mensaje sí llegó. Mostrarle "hubo un problema" a alguien cuyo
formulario se envió bien lo empuja a mandarlo tres veces más, o a irse.

## Un solo formulario

`src/components/form/LeadForm.jsx` dibuja los tres formularios del sitio. Qué
campos muestra cada uno sale de `src/data/formularios.js`, que es **la misma
tabla contra la que valida el servidor**. Agregar un campo es tocar un archivo.

| Formulario | Dónde | Campos al entrar | Campos que aparecen después |
|---|---|---|---|
| `contacto` | `/contacto` | nombre, email, mensaje | teléfono, qué te interesa |
| `footer` | pie de todas las páginas | nombre, email, mensaje | teléfono |
| `benchmark` | modal de `/inmobiliarias` | nombre, empresa, email | teléfono, rango de inversión |

**Captura progresiva:** al entrar se ven pocos campos; los de calificación
aparecen en cuanto la persona escribe algo. Un formulario que se ve corto se
empieza más, y uno ya empezado se termina aunque crezca. Así pedimos más datos
sin pagar el costo de asustar en la primera mirada.

El servidor no confía en el cliente: valida requeridos, formato de email y que
los valores de las listas existan en el catálogo. Un POST armado a mano no
puede meter texto arbitrario en el CRM.

## Defensas contra spam

Cuatro capas, cada una tapa lo que la anterior deja pasar:

1. **Honeypot** (`website_url`): campo fuera de la vista y fuera del recorrido
   por teclado. Una persona nunca lo completa; los bots que rellenan todo, sí.
2. **Trampa de tiempo**: un envío en menos de un segundo desde que cargó la
   página es un script. El umbral es bajo a propósito — un falso positivo es un
   lead real que se pierde en silencio.
3. **Rate limit por IP**: 5 envíos cada 10 minutos. Vive en memoria de cada
   instancia serverless, así que frena el caso normal pero no es una barrera
   dura.
4. **Tope en la base**: `insert_lead()` corta a 5 por mail por hora, y descarta
   duplicados dentro de los 30 segundos. Esta sí es dura y no depende de qué
   instancia atienda el pedido.

A los bots se les responde `200 {"ok":true}` sin mandar nada. Un `400` les
confirma que el honeypot existe y les sirve para calibrar el próximo intento.

## La tabla `Lead`

Vive en el mismo proyecto de Supabase que el CRM, con sus convenciones
(PascalCase, columnas camelCase, `id` de texto). No toca ninguna tabla
existente.

Columnas: `formId`, `name`, `email`, `phone`, `company`, `message`,
`serviceInterest`, `investmentRange`, `objective`, `attribution` (jsonb),
`pagePath`, `userAgent`, `status` (arranca en `NUEVO`), `notes`, `clientId`.

`clientId` apunta a `Client` y queda vacío hasta que el lead se convierte en
cliente. Es el enganche para, más adelante, medir cuánto vale realmente cada
lead por campaña.

### Por qué el sitio no lleva la service role

RLS está habilitada y **sin políticas**, igual que las otras 16 tablas: eso
niega todo acceso por `anon` y por `authenticated`. El CRM la lee con su
service role desde su propio servidor, como ya hace con el resto.

El sitio escribe llamando a `public.insert_lead()`, una función
`security definer` que es lo único que la clave anónima puede hacer. Si esa
clave se filtrara, el daño máximo es que alguien cargue leads basura — no puede
leer los leads ya guardados ni acercarse a `Payment`, `Distribution` ni al
resto del CRM.

El linter de Supabase marca dos WARN sobre esa función (`anon` y
`authenticated` pueden ejecutarla). Son esperados: es exactamente el diseño. El
linter no puede saber que es deliberado.

### Si el CRM corre migraciones de Prisma

`Lead` se creó por fuera del `schema.prisma` del CRM. Si alguien corre
`prisma migrate` sin agregarla, Prisma va a querer borrarla. El modelo para
pegar en el schema:

```prisma
model Lead {
  id              String   @id @default(uuid())
  createdAt       DateTime @default(now())
  formId          String
  name            String
  email           String
  phone           String?
  company         String?
  message         String?
  serviceInterest String?
  investmentRange String?
  objective       String?
  attribution     Json     @default("{}")
  pagePath        String?
  userAgent       String?
  status          String   @default("NUEVO")
  notes           String?
  clientId        String?
  client          Client?  @relation(fields: [clientId], references: [id], onDelete: SetNull)

  @@index([createdAt])
  @@index([email])
  @@index([formId])
  @@index([status])
}
```

## Variables de entorno

Ver `.env.example`. Las cuatro que tocan a los leads:

| Variable | Si falta |
|---|---|
| `RESEND_API_KEY` | los formularios fallan al enviar |
| `LEAD_EMAIL` | cae en el mail de `data/marca.js` |
| `CRM_SUPABASE_URL` y `CRM_SUPABASE_ANON_KEY` | el lead llega por mail, pero no queda historial |
| `RESEND_AUDIENCE_ID` | el formulario funciona, nadie se suma a la lista |
| `RESEND_AUDIENCE_API_KEY` | se usa `RESEND_API_KEY`, que si es de envío da 401 |

### Los dos keys de Resend

El key que manda los mails es de **envío solamente**, que es la postura
correcta para una clave que se usa en cada formulario. El problema es que con
ese permiso `contacts.create` devuelve `401 restricted_api_key`, y Resend no
tiene un permiso intermedio: o manda mails, o tiene acceso completo.

Por eso hay dos variables. `RESEND_AUDIENCE_API_KEY` es un key aparte con
acceso completo, que se usa únicamente para el alta en la audiencia. Así el key
que interviene en cada envío sigue sin poder leer contactos ni métricas.

Si dejás `RESEND_AUDIENCE_API_KEY` vacío, se usa el de siempre: el alta va a
fallar y quedar en el log, pero el lead igual llega al mail y a la base.

## Endpoints

`/api/lead` es el único real. `/api/contact` y `/api/benchmark` quedaron como
alias que delegan en él: durante un deploy hay pestañas abiertas con el
JavaScript de la versión anterior, que todavía les pega. Sin los alias, cada
una de esas pestañas pierde su lead. Se pueden borrar en el próximo
relanzamiento.

## Cómo probarlo sin ensuciar nada

Poné `LEAD_EMAIL=delivered@resend.dev` en tu `.env.local`: es el buzón sumidero
de Resend y no llega a la casilla de la agencia. Las filas de prueba se borran
después con:

```sql
delete from public."Lead" where email like 'prueba.%';
```

## Pendiente

- Pantalla en el CRM para ver y trabajar los leads (hoy solo se consultan por SQL).
- Valor y ventana de conversión para Google Ads — ver `docs/GTM-CONFIGURACION.md`.
- Secuencia post-descarga en Resend Broadcasts.
