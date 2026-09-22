# Kit de Presentaciones

Los tokens de marca (colores, tipografías, vidrio, bordes de degradado) están en `../tokens.css`. Las tres plantillas ya los usan: si vas a tocar un color o una fuente, cambialo en el `:root` de la plantilla, no salpicado por el archivo.

Plantillas reales tomadas del proyecto Tienda de Puntos: el deck de auditoría que se mostró en la primera reunión y los documentos A4 (minuta y propuesta) que se armaron después. Sirven como base para el próximo prospecto.

## 01 — Deck de auditoría (Artifact)

`Plantilla deck de auditoria.html` — formato de presentación en pantalla completa, una diapositiva por vista, con el fondo animado de marca ya integrado (campo de puntos, orbes, logo rebotando).

**Cómo reusarla:**
1. Copiar el archivo a la carpeta del nuevo cliente.
2. Reemplazar el contenido de cada slide (mantener la estructura de clases CSS).
3. Publicar como Artifact para mostrarla en la reunión, en vez de mandar el HTML suelto.

Este formato se publica como Artifact (no se exporta a PDF); el HTML es la fuente de verdad si hay que editarlo después.

## 02 — Documentos A4 (Minuta y Propuesta)

`Plantilla minuta A4.html` y `Plantilla propuesta A4.html` — mismo sistema visual que el deck, pero en formato A4 imprimible (`@page{size:A4}`), pensado para exportar a PDF y enviar por mail.

**Flujo de compilación (ya probado en Tienda de Puntos):**
1. Armar/editar el HTML con el contenido del cliente. Los logos van como `data:image/png;base64,...` — usar los `.b64.txt` de `../Logos/`.
2. Exportar a PDF con Edge headless:
   ```
   msedge --headless=new --disable-gpu --no-pdf-header-footer --virtual-time-budget=10000 --run-all-compositor-stages-before-draw --print-to-pdf="salida.pdf" "archivo.html"
   ```
3. **Verificar la paginación sobre el PDF, nunca en pantalla** — el pisado del pie de página no se detecta mirando el HTML en el navegador, solo se ve al medir el PDF exportado. Correr `verificar_pdf.py <archivo.pdf>` y ajustar la redacción (nunca el contenido) hasta que todas las páginas den aire positivo antes del pie.

**Nombre de archivo de salida**: `<Tipo> <Cliente> x Posicionarte.pdf`.

## Fondo animado

Carpeta con la skill `posi-fondo-animado` (logo "P" rebotando, campo de puntos, orbes de luz). Es la misma skill que vive en `.claude/skills/posi-fondo-animado/` del proyecto — esta copia es solo para referencia rápida del kit. Si se edita la skill, editar el original en `.claude/skills/`, no esta copia.

Se aplica tanto al deck (ya integrado en la plantilla 01) como a los documentos A4 si se quiere un extra de vida en pantalla (no en la versión impresa, ahí no aporta).

## Actualización 10/09/2026

Las tres plantillas se migraron al sistema unificado del manual: **Inter salió y entró Plus Jakarta Sans** (la del sitio y el CRM) y **`#3a56d6` pasó a `#3256D7`**, el azul real del logo. Montserrat sigue en los títulos y el resto del diseño quedó intacto. Se sumaron los tokens `--brand`, `--violet` y `--editorial` (Playfair Display, opcional para portadas) al `:root` de cada plantilla.
