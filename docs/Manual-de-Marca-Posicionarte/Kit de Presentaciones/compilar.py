"""Compila una plantilla del kit (deck, minuta o propuesta) para un cliente nuevo.

Reemplaza los tokens {{LOGO_POSI_BASE64}}, {{LOGO_ICONO_BASE64}} (solo el deck)
y {{LOGO_CLIENTE_BASE64}} por el base64 real de cada logo, exporta a PDF con
Edge headless (si la plantilla es A4) y deja el HTML compilado en la carpeta
del cliente. Los placeholders de texto ([Nombre del cliente], [Cliente], etc.)
se reemplazan a mano en el HTML antes de compilar, o pasando --reemplazos.

Uso:
    py compilar.py --plantilla "02 - Documentos A4 (Minuta y Propuesta)/Plantilla propuesta A4.html" ^
        --logo-cliente "C:\\ruta\\al\\logo-cliente.png" ^
        --salida "C:\\...\\Cliente Nuevo\\Propuesta Cliente Nuevo x Posicionarte" ^
        --pdf

    py compilar.py --plantilla "01 - Deck de auditoria (Artifact)/Plantilla deck de auditoria.html" ^
        --logo-cliente "C:\\ruta\\al\\logo-cliente.png" ^
        --salida "C:\\...\\Cliente Nuevo\\Auditoria inicial - Cliente Nuevo"

Los logos de Posicionarte (marca propia + ícono del bouncer) se toman
automáticamente de esta misma carpeta del Manual de Marca — no hace falta
pasarlos. Desde el 10/09/2026 las plantillas ya vienen con el logo de Posi
embebido en su versión -dark, así que el script solo tiene que resolver el
logo del cliente.
"""
import argparse
import base64
import subprocess
import sys
from pathlib import Path

KIT = Path(__file__).parent
MANUAL = KIT.parent
LOGO_POSI_PNG = MANUAL / "Logos" / "posicionarte-horizontal-online-dark.png"  # dark: las plantillas van sobre #0e0e11
LOGO_ICONO_B64 = KIT / "Fondo animado" / "posi-mini-logo-dark.b64"
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"


def b64_de(ruta_png: Path) -> str:
    return base64.b64encode(ruta_png.read_bytes()).decode()


def compilar(plantilla: Path, logo_cliente: Path, salida: Path, hacer_pdf: bool):
    html = plantilla.read_text(encoding="utf-8")

    html = html.replace("{{LOGO_POSI_BASE64}}", b64_de(LOGO_POSI_PNG))
    if "{{LOGO_ICONO_BASE64}}" in html:
        html = html.replace("{{LOGO_ICONO_BASE64}}", LOGO_ICONO_B64.read_text().strip())
    html = html.replace("{{LOGO_CLIENTE_BASE64}}", b64_de(logo_cliente))

    faltantes = [t for t in ["{{LOGO_POSI_BASE64}}", "{{LOGO_CLIENTE_BASE64}}", "{{LOGO_ICONO_BASE64}}"] if t in html]
    if faltantes:
        print("AVISO: quedaron tokens de logo sin reemplazar:", faltantes)

    salida_html = salida.with_suffix(".html")
    salida_html.write_text(html, encoding="utf-8")
    print("HTML compilado:", salida_html)
    print(
        "Recordatorio: reemplazar a mano los placeholders de texto entre corchetes "
        "([Nombre del cliente], [Cliente], [Rubro del cliente], cifras, etc.) antes de enviar."
    )

    if hacer_pdf:
        salida_pdf = salida.with_suffix(".pdf")
        cmd = [
            EDGE, "--headless=new", "--disable-gpu", "--no-pdf-header-footer",
            "--virtual-time-budget=10000", "--run-all-compositor-stages-before-draw",
            f"--print-to-pdf={salida_pdf}", salida_html.as_uri(),
        ]
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
        if not salida_pdf.exists():
            print("EDGE FALLO", r.returncode, r.stderr[-800:])
            sys.exit(1)
        print("PDF exportado:", salida_pdf)
        print(
            "Ahora correr verificar_pdf.py sobre ese PDF antes de enviarlo — "
            "medir en pantalla no alcanza para detectar texto que pisa el pie de página."
        )


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--plantilla", required=True, type=Path, help="ruta a la plantilla .html dentro del kit")
    ap.add_argument("--logo-cliente", required=True, type=Path, help="logo del cliente nuevo, .png")
    ap.add_argument("--salida", required=True, type=Path, help="ruta de salida SIN extension")
    ap.add_argument("--pdf", action="store_true", help="ademas exportar a PDF con Edge headless (solo A4)")
    a = ap.parse_args()
    compilar(a.plantilla, a.logo_cliente, a.salida, a.pdf)
