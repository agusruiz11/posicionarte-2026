"""Verifica en el PDF real si el contenido invade la zona del pie de pagina.

Uso: py verificar_pdf.py <archivo.pdf> [--png carpeta]
"""
import re
import sys

import fitz

ruta = sys.argv[1]
doc = fitz.open(ruta)
print(f"{len(doc)} paginas | {doc[0].rect.width:.0f}x{doc[0].rect.height:.0f} pt")

for i, page in enumerate(doc):
    alto = page.rect.height
    # el pie vive en los ultimos 14mm (1mm = 2.83465pt)
    zona_pie = alto - 14 * 2.83465
    bloques = [b for b in page.get_text("blocks") if b[4].strip()]
    if not bloques:
        print(f"pag {i+1}: vacia")
        continue
    # el texto del pie siempre contiene posicionarte.online
    def norm(s): return re.sub(r"\s+","",s).lower()
    pie = [b for b in bloques if "posicionarte.online" in norm(b[4]) or "propuestav" in norm(b[4])]
    cuerpo = [b for b in bloques if b not in pie]
    tope_pie = min((b[1] for b in pie), default=zona_pie)
    fondo_cuerpo = max(b[3] for b in cuerpo) if cuerpo else 0
    invade = fondo_cuerpo > tope_pie
    estado = (
        f"PISA el pie por {fondo_cuerpo - tope_pie:.0f}pt"
        if invade
        else f"ok, {tope_pie - fondo_cuerpo:.0f}pt de aire"
    )
    print(f"pag {i+1}: {estado}")
    if invade:
        for b in cuerpo:
            if b[3] > tope_pie:
                print("   invade:", b[4].strip().replace("\n", " ")[:70])

if "--png" in sys.argv:
    dest = sys.argv[sys.argv.index("--png") + 1]
    for i, page in enumerate(doc):
        page.get_pixmap(dpi=110).save(f"{dest}/pdf_{i+1}.png")
    print("PNG exportados")
