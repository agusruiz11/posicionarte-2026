#!/usr/bin/env python3
"""
Auditoría de contraste sobre el sitio renderizado.

Recorre cada elemento con texto propio de cada ruta, en modo claro y oscuro,
calcula el fondo efectivo (componiendo las capas translúcidas de abajo hacia
arriba) y reporta todo lo que no llegue al mínimo de WCAG 2.1 AA: 4,5:1 para
texto normal y 3:1 para texto grande (≥24px, o ≥18,66px en negrita).

Además pasa por los estados :hover de enlaces y botones, que es donde se
esconden los peores casos: un fondo claro fijo combinado con un color de texto
que depende del tema da texto blanco sobre blanco solo al pasar el mouse.

Requisitos:
    pip install playwright && playwright install chromium

Uso:
    npm run build && npm start          # en otra terminal
    python3 tools/auditar-contraste.py [http://localhost:3000]

Salida: una línea por problema con el ratio, el mínimo exigido, los colores
reales, el texto y el selector. Código de salida 1 si encuentra algo.
"""

import sys
from playwright.sync_api import sync_playwright

BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:3000'
ROUTES = ['/', '/servicios', '/casos', '/contacto', '/inmobiliarias']

JS_HELPERS = r"""
  function parse(c){const m=c.match(/[\d.]+/g); if(!m) return null;
    return {r:+m[0],g:+m[1],b:+m[2],a:m.length>3?+m[3]:1};}
  function over(fg,bg){return {r:fg.r*fg.a+bg.r*(1-fg.a), g:fg.g*fg.a+bg.g*(1-fg.a),
                               b:fg.b*fg.a+bg.b*(1-fg.a), a:1};}
  function lin(v){v/=255; return v<=0.04045?v/12.92:Math.pow((v+0.055)/1.055,2.4);}
  function L(c){return 0.2126*lin(c.r)+0.7152*lin(c.g)+0.0722*lin(c.b);}
  function ratio(a,b){const l1=L(a),l2=L(b);const hi=Math.max(l1,l2),lo=Math.min(l1,l2);
    return (hi+0.05)/(lo+0.05);}
  function bgOf(el){
    // Junta las capas de fondo hacia arriba y las compone de abajo hacia arriba.
    // Componer al revés hace que dos blancos translúcidos apilados den blanco
    // opaco, y aparecen falsos positivos.
    const layers=[]; let cur=el;
    while(cur){
      const c=parse(getComputedStyle(cur).backgroundColor);
      if(c && c.a>0){ layers.push(c); if(c.a>=1) break; }
      cur=cur.parentElement;
    }
    let base={r:255,g:255,b:255,a:1};
    if(layers.length && layers[layers.length-1].a>=1) base=layers.pop();
    for(let i=layers.length-1;i>=0;i--) base=over(layers[i], base);
    return base;
  }
  function minimo(cs){
    const size=parseFloat(cs.fontSize), weight=parseInt(cs.fontWeight)||400;
    return (size>=24 || (size>=18.66 && weight>=700)) ? 3.0 : 4.5;
  }
"""

JS_AUDIT = "() => {" + JS_HELPERS + r"""
  const out=[];
  document.querySelectorAll('body *').forEach(el=>{
    const own=[...el.childNodes].filter(n=>n.nodeType===3 && n.textContent.trim())
                                .map(n=>n.textContent.trim()).join(' ');
    if(!own) return;
    const r=el.getBoundingClientRect();
    if(r.width<1||r.height<1) return;
    const cs=getComputedStyle(el);
    if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity===0) return;
    if(el.closest('[aria-hidden="true"]')) return;
    if(typeof el.className==='string' && el.className.includes('sr-only')) return;
    const fgRaw=parse(cs.color); if(!fgRaw) return;
    const bg=bgOf(el), fg=over(fgRaw,bg);
    const need=minimo(cs), cr=ratio(fg,bg);
    if(cr < need) out.push({texto: own.slice(0,46), ratio:+cr.toFixed(2), need,
      size:Math.round(parseFloat(cs.fontSize)), weight:parseInt(cs.fontWeight)||400,
      color:cs.color, fondo:`rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
      sel: el.tagName.toLowerCase()+(typeof el.className==='string'&&el.className
           ? '.'+el.className.trim().split(/\s+/).slice(0,3).join('.') : '')});
  });
  return out;
}"""

JS_HOVER = "() => {" + JS_HELPERS + r"""
  const hov=[...document.querySelectorAll('a:hover, button:hover')];
  const el=hov[hov.length-1]; if(!el) return null;   // el más profundo, el que se hovereó
  const cs=getComputedStyle(el);
  const bg=bgOf(el), fg=over(parse(cs.color),bg);
  return {ratio:+ratio(fg,bg).toFixed(2), need:minimo(cs), color:cs.color,
          fondo:`rgb(${Math.round(bg.r)}, ${Math.round(bg.g)}, ${Math.round(bg.b)})`,
          texto:(el.innerText||'').trim().slice(0,40)};
}"""


def main():
    fails = 0
    with sync_playwright() as p:
        b = p.chromium.launch()
        for theme in ('light', 'dark'):
            ctx = b.new_context(viewport={'width': 1280, 'height': 900})
            ctx.add_init_script(f"try{{localStorage.setItem('theme','{theme}')}}catch(e){{}}")
            # Sin esto la auditoría lee colores a mitad de la transición de tema
            # y devuelve valores intermedios que no existen en pantalla: la misma
            # corrida daba 21 problemas una vez y 351 la siguiente.
            ctx.add_init_script(
                "addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');"
                "s.textContent='*,*::before,*::after{transition:none!important;animation:none!important}';"
                "document.head.appendChild(s)})"
            )
            pg = ctx.new_page()
            for route in ROUTES:
                # `networkidle` cuelga en /casos: basta con que algo mantenga
                # una conexión abierta para que nunca se cumpla. Esperar el
                # evento `load` y darle un margen fijo es determinista y alcanza
                # de sobra para medir estilos ya calculados.
                pg.goto(BASE + route, wait_until='load', timeout=60000)
                pg.wait_for_timeout(1200)
                # el tema tiene que estar realmente aplicado antes de medir nada
                # Si el servidor quedó corriendo contra un build viejo, la hoja de
                # estilos da 404 y el navegador aplica los colores por defecto:
                # la auditoría devuelve cientos de falsos positivos que parecen
                # regresiones. Mejor abortar que reportar basura.
                if not pg.evaluate("() => document.styleSheets.length > 0 && "
                                   "getComputedStyle(document.documentElement)"
                                   ".getPropertyValue('--surface-0').trim() !== ''"):
                    sys.exit(f"\nABORTA: el CSS no cargó en {route}. "
                             "Reconstruí y reiniciá el servidor (rm -rf .next && npm run build).")
                aplicado = pg.evaluate("() => document.documentElement.classList.contains('dark')")
                if aplicado != (theme == 'dark'):
                    print(f"  [AVISO] {route}: el tema {theme} no se aplicó, se saltea")
                    continue
                # abrir acordeones para auditar también lo que arranca colapsado
                for h in pg.query_selector_all('[role=button][aria-expanded=false]'):
                    try:
                        h.click(); pg.wait_for_timeout(120)
                    except Exception:
                        pass

                vistos, unicos = set(), []
                for r in pg.evaluate(JS_AUDIT):
                    k = (r['texto'], r['ratio'])
                    if k not in vistos:
                        vistos.add(k); unicos.append(r)
                if unicos:
                    print(f"\n### {theme.upper()} {route}")
                    for r in sorted(unicos, key=lambda x: x['ratio']):
                        print(f"  {r['ratio']:5.2f}:1 (mín {r['need']}) {r['size']}px/{r['weight']}"
                              f"  {r['color']} sobre {r['fondo']}")
                        print(f"        “{r['texto']}”  <-  {r['sel'][:78]}")
                    fails += len(unicos)

                for el in pg.query_selector_all('a, button')[:40]:
                    try:
                        if not (el.inner_text() or '').strip():
                            continue
                        el.hover(timeout=2000); pg.wait_for_timeout(160)
                        info = pg.evaluate(JS_HOVER)
                        if info and info['ratio'] < info['need']:
                            print(f"\n  [HOVER] {theme.upper()} {route}: {info['ratio']}:1 "
                                  f"(mín {info['need']}) {info['color']} sobre {info['fondo']}"
                                  f" — “{info['texto']}”")
                            fails += 1
                    except Exception:
                        pass
            ctx.close()
        b.close()

    print(f"\n{'='*62}\nCombinaciones que no llegan a AA: {fails}")
    return 1 if fails else 0


if __name__ == '__main__':
    sys.exit(main())
