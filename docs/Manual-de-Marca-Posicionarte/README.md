# Manual de Marca — Posicionarte

Todo lo que hace falta para que cualquier cosa que salga de Posicionarte —un reporte, una propuesta, un deck, una minuta— se vea como Posicionarte.

> **Si venís a generar un reporte con Claude:** abrí `INSTRUCCIONES-CLAUDE.md`, copiá todo y pegáselo a Claude junto con tu pedido. Eso solo ya alcanza. El resto de este documento es la referencia larga.

Actualizado el 10 de septiembre de 2026.

---

## 1. Identidad

- **Qué es:** Posicionarte, agencia de marketing digital.
- **Estilo:** dark premium, minimalista, con vida. Mucho aire, poca línea, jerarquía por contraste tipográfico y por capas de profundidad.
- **Sensación:** un estudio que sabe lo que hace. Nada de dashboard saturado ni de plantilla corporativa genérica.
- **Default:** fondo oscuro. Siempre. Incluso en los documentos que se exportan a PDF.

---

## 2. Tipografías

Tres fuentes, todas de Google Fonts. Se cargan juntas en una sola línea.

| Rol | Fuente | Uso |
|---|---|---|
| **Títulos** | **Montserrat** | Títulos de slide, de sección, de card. Pesos 700–900. Es la voz fuerte de la marca. |
| **Texto y datos** | **Plus Jakarta Sans** | Todo el resto: cuerpo, bajadas, tablas, etiquetas, KPIs, botones, pies. Es la misma del sitio y del CRM. |
| **Editorial (opcional)** | **Playfair Display** | Solo portadas y frases de apertura, cuando el documento pide un gesto más de revista. Serif — usar con moderación y nunca en cuerpo ni tablas. |

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200..900&family=Plus+Jakarta+Sans:wght@200..800&family=Playfair+Display:wght@400..900&display=swap" rel="stylesheet">
```

### Jerarquía

| Elemento | Fuente | Peso | Tracking |
|---|---|---|---|
| Portada / frase de apertura | Playfair Display (o Montserrat) | 700 | `-0.02em` |
| Título de slide o sección | Montserrat | 800 | `-0.02em` |
| Subtítulo | Montserrat | 600 | `-0.01em` |
| Cuerpo de texto | Plus Jakarta Sans | 500 | normal |
| Número / KPI grande | Plus Jakarta Sans | 800 | `-0.03em` |
| Etiqueta / label | Plus Jakarta Sans | 600, MAYÚSCULAS | `0.12em` |
| Pie / auxiliar | Plus Jakarta Sans | 400–500 | normal |

**Reglas:**
- Sobre fondo oscuro el cuerpo va en peso **500**, no 400: el 400 se afina de más y se lee peor.
- Los números siempre en Plus Jakarta Sans bold con `font-variant-numeric: tabular-nums`, para que las columnas alineen.
- **Escala fluida:** el cuerpo se define como `clamp(14px, 1.05vw, 18px)`. Se adapta solo al ancho de la pantalla sin media queries.

---

## 3. Paleta

### El azul: un solo color, tres roles

Esta es la regla que más se malinterpreta. Posicionarte tiene **un** azul, y lo que cambia es el rol según el fondo.

| Token | Hex | Rol |
|---|---|---|
| `--brand` | `#3256D7` | **El azul del logo.** Verificado píxel a píxel sobre los PNG, y es el mismo `--brand` del sitio y el `primary-container` del CRM. Va en el logo, en CTAs sobre fondo claro, en la web y en el producto. |
| `--accent` | `#5e78f0` | **El azul sobre fondo oscuro.** `#3256D7` sobre `#0e0e11` no contrasta lo suficiente. Este es el que se usa para textos destacados, métricas, bordes activos y acentos en decks y documentos. |
| `--accent-soft` | `rgba(94,120,240,.12)` | Fondo de acento: chips, hovers, bloques resaltados. |

Colores de apoyo del sistema:

| Token | Hex | Uso |
|---|---|---|
| `--violet` | `#7a6cf5` | Punto intermedio del degradado de marca. Nunca solo. |
| `--cyan` | `#00dedf` | Cierre del degradado, orbes del fondo animado, segunda serie en gráficos. |

### Superficies (dark, el default)

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#0e0e11` | Fondo de página. Tinte azulado — **nunca `#000000`**, mata la profundidad del azul. |
| `--panel` | `#16161c` | Cards sólidas. |
| `--surface` | `rgba(22,22,28,.72)` | Cards de vidrio. Va siempre acompañado de `backdrop-filter: blur(10px)`. |
| `--line` | `#27272f` | Divisor sutil. |
| `--line2` | `#33333d` | Divisor visible, borde de card. |

### Texto

| Token | Hex | Uso |
|---|---|---|
| `--text` | `#f2f2f6` | Principal y títulos. |
| `--muted` | `#b4b4c8` | Secundario, bajadas, descripciones. |
| `--dim` | `#848498` | Etiquetas, pies, metadatos. |

### Semánticos

| Token | Hex | Uso |
|---|---|---|
| `--good` | `#22a34a` | Positivo en documentos y PDF. Verde sobrio. |
| `--good-neon` | `#41e575` | Positivo en pantalla y dashboards (el verde del CRM). |
| `--warn` | `#e0a028` | Advertencia, pendiente, PROSPECTO. |
| `--crit` | `#e05252` | Crítico, caída, alerta. |
| `--neutral` | `#c8c6c6` | Estado neutro, PAUSADO. |

### Degradados

```css
/* Degradado de marca — barras de acento, bordes, fondos decorativos */
--grad: linear-gradient(100deg,#5e78f0 0%,#7a6cf5 45%,#00dedf 100%);

/* CTA sobre fondo oscuro */
--grad-cta: linear-gradient(135deg,#5e78f0 0%,#3256D7 100%);

/* CTA sobre fondo claro */
--grad-deep: linear-gradient(135deg,#3256D7 0%,#2845b8 100%);
```

Todo esto está listo para copiar en [`tokens.css`](tokens.css).

### Escala clara

Solo para mails y documentos que van sobre blanco: `--bg-light #ffffff` · `--panel-light #f3f4f6` · `--line-light #e5e7eb` · `--text-light #404040` · `--muted-light #5c6370`. El azul ahí vuelve a ser `--brand` `#3256D7`, no `--accent`.

---

## 4. Recursos visuales del sistema

Lo que separa un documento de Posicionarte de una plantilla cualquiera. Están todos implementados en `tokens.css` y funcionando en las plantillas del kit.

**Vidrio (`.glass`).** Cards y topbars con `rgba(22,22,28,.72)` + `backdrop-filter: blur(10px)`. Deja pasar el fondo animado y da profundidad sin sombras. *En impresión se degrada a `--panel` sólido: el blur no imprime bien.*

**Borde de degradado (`.grad-border`).** Un borde de 1px con el degradado de marca, usando `mask-composite: exclude`. Es el detalle que más "producto caro" aporta y no se puede hacer con `border` común.

**Barra de acento (`.rule`).** En vez de una línea gris, una barra de 2px con el degradado. Separa sin cortar.

**Fondo animado.** Tres capas detrás del contenido: campo de puntos conectados en canvas, orbes de luz con `mix-blend-mode: screen`, y el ícono "P" rebotando estilo protector de pantalla. Está en `Kit de Presentaciones/Fondo animado/` con el código completo. **Solo para pantalla** — en un PDF no aporta.

**Escala fluida.** `--fs: clamp(14px,1.05vw,18px)` y el resto de los tamaños en `em`. El documento se adapta a cualquier pantalla sin media queries.

---

## 5. Reglas de composición

**Profundidad por capas, no por sombras.** La jerarquía se arma con tonos y vidrio: `#0e0e11` → `#16161c` → `.glass`. Nada de drop shadows estándar. Para elementos flotantes, una sombra ambiental difusa: `0 20px 40px rgba(0,0,0,.4)`.

**Pocas líneas.** Separar por espaciado o anidando un panel sobre el fondo. Cuando hace falta separar de verdad, `.rule` con el degradado antes que un borde gris.

**Nunca negro puro.** `#000000` no se usa en ninguna superficie.

**Ritmo vertical generoso.** Ante la duda, más aire.

**Un slide con demasiado texto se parte en dos.** No se achica la letra.

**Deck en pantalla = una diapositiva por pantalla.** Contenido centrado y a lo ancho, texto justificado, botón de pantalla completa. Nunca un long-scroll tipo Word.

**Sin emojis** en material de cliente. Íconos: Material Symbols Outlined, nunca filled.

---

## 6. Logos (`/Logos`)

Cada logo tiene su `.png` y su `.b64.txt` (ya codificado en base64, listo para pegar en `src="data:image/png;base64,..."`). Para documentos que se exportan a PDF, **siempre** el base64: un `<img src>` externo no viaja con el archivo.

### Dos versiones de cada logo

El logo tiene el contorno y el ".online" en gris oscuro `#414141`. Sobre el fondo `#0e0e11` de la marca esos elementos desaparecen. Por eso cada logo existe en dos versiones:

| Sufijo | Cuándo |
|---|---|
| *(sin sufijo)* | Fondo claro: mails, documentos sobre blanco, papelería, firmas. |
| `-dark` | **Fondo oscuro: decks, propuestas, reportes, el sitio, el CRM.** El contorno y el ".online" pasan a `#f2f2f6`. Es el que se usa el 90 % de las veces. |

Como la marca es dark-first, **si dudás, usá el `-dark`**. Las plantillas del kit ya lo traen embebido.

### Los cuatro logos

| Archivo | Uso |
|---|---|
| `posicionarte-horizontal-online` | El más usado. Cabecera de decks, reportes, minutas y propuestas. |
| `posicionarte-horizontal` | Horizontal sin ".online". Cuando el dominio ya aparece en el pie. |
| `posicionarte-avatar-online` | Circular. Foto de perfil, redes, avatar. |
| `posicionarte-icono` | Ícono "P" cuadrado. Favicon, marca de agua, cierre de documento, logo del fondo animado. |

**Regla de marca:** el azul del logo es siempre `#3256D7`. Sin `hue-rotate`, sin filtros de color, sin recolorear la caja azul. Lo único que cambia entre versiones es el contorno y el ".online".

**Área de resguardo:** dejar libre alrededor del logo al menos la altura de la "P".

Los clientes con copia propia del logo en su carpeta (Cabra da Peste, Florida Aventura, Metodología Ecommerce, Renoir) siguen usando esa copia local.

---

## 7. Redacción

El diseño tiene libertad total. El texto no.

- **Impersonal o en infinitivo.** Nada de "relevamos", "nos llamó la atención", "ustedes", "creemos que", "preferimos", "lo señalamos porque".
- **Afirmar directo.** "El sitio carga en 4,2 s", no "nos parece que podría estar cargando lento".
- **Nunca exponer un cliente frente a otro.** No se mencionan referidos ni casos de otros clientes en un documento de cliente.
- **Solo se promete lo que ya existe y se controla.** Nada de fechas cortas para entregables sin armar.
- **Transparencia sobre el qué y el compromiso, no sobre el cómo.** El método no se regala.
- **Documentos legibles, no paredes de texto.** Título, frase de apertura, tarjetas. Nada dicho dos veces.

---

## 8. Formato de datos

- **Pagos:** ARS, formato `$ 1.250.000`. **Abonos y precios:** USD, formato `USD 500`.
- **Fechas:** `10 de septiembre de 2026` en texto corrido; `10/09/2026` en tablas.
- **Porcentajes:** coma decimal y espacio antes del signo — `12,4 %`.
- **Deltas:** siempre con signo y color — `+18,2 %` en verde, `−7,4 %` en `--crit`.

### Estados de cliente (CRM)

| Estado | Color |
|---|---|
| PROSPECTO | `--warn` `#e0a028` |
| ACTIVO | `--good-neon` `#41e575` |
| PAUSADO | `--neutral` `#c8c6c6` |
| FINALIZADO | `--crit` `#e05252` |
| PERDIDO | `#93000a` |

Badge de pago (solo en ACTIVO): **Al día** en `--good-neon`, **Debe pagar** en `--crit`.

---

## 9. Gráficos

- Fondo transparente sobre la card. Sin grilla, o grilla en `--line` al 50 % de opacidad.
- Serie principal en `--accent`. Series siguientes, en este orden: `#00dedf`, `#7a6cf5`, `#b4b4c8`.
- Ejes y etiquetas en `--dim`, Plus Jakarta Sans 500, tamaño chico.
- Verde y rojo significan **subió / bajó**. Nunca usarlos para categorías sin ese significado.

---

## 10. Qué hay en esta carpeta

```
Manual de Marca/
├── README.md                  ← este documento (la referencia completa)
├── INSTRUCCIONES-CLAUDE.md    ← pegarle esto a Claude para que genere con la marca
├── tokens.css                 ← todas las variables y clases listas para copiar
├── Logos/                     ← 4 logos × 2 versiones (clara y -dark), PNG + base64
└── Kit de Presentaciones/
    ├── 01 - Deck de auditoría (Artifact)
    ├── 02 - Documentos A4 (Minuta y Propuesta)
    └── Fondo animado           ← el fondo de marca en movimiento, con código
```

---

## 11. Cómo se usa

**Para generar un reporte, propuesta o documento con Claude:**
1. Abrir `INSTRUCCIONES-CLAUDE.md`, copiar todo.
2. Pegárselo a Claude y escribir abajo qué necesitás y con qué datos.
3. Claude devuelve el HTML con la marca aplicada.

**Para armar un deck o un A4 a mano:** copiar la plantilla de `Kit de Presentaciones/` a la carpeta del cliente, reemplazar contenido, recompilar. El detalle está en el README de esa carpeta.

---

## 12. Historial

**10/09/2026 — Unificación del azul y de la tipografía de texto.** Hasta esta fecha convivían dos sistemas: el de las presentaciones (Montserrat + Inter, azules `#5e78f0`/`#3a56d6`) y el del sitio y el CRM (Plus Jakarta Sans, `#3256D7`). Al medirlos resultaron ser casi el mismo sistema en roles distintos, así que se unificaron sin perder nada:

- `#3a56d6` se retiró por redundante con `#3256D7`, que es el color real del logo y del sitio.
- `#5e78f0` se mantiene, ahora nombrado por su rol: el azul sobre fondo oscuro.
- Inter salió y entró Plus Jakarta Sans, la del sitio y el CRM.
- Montserrat se conserva para títulos. Playfair Display se suma como opción editorial para portadas.
- Todo lo que aportó el kit de presentaciones —vidrio, bordes de degradado, degradado tricolor, escala fluida, fondo animado— se elevó a sistema y ahora vive en `tokens.css`, disponible también para la web y el CRM.

**10/09/2026 — Logos para fondo oscuro.** Se detectó que el contorno y el ".online" de los logos estaban en `#414141` y desaparecían sobre el fondo de la marca. Se generaron las variantes `-dark` de los cuatro logos y se embebieron en las tres plantillas del kit, que antes tenían el logo de Posi como placeholder a completar a mano.
