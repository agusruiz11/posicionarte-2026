---
name: posi-fondo-animado
description: Fondo animado de marca Posicionarte para presentaciones, propuestas y páginas HTML/artifacts. Incluye el logo "P" de Posi rebotando por la pantalla estilo protector de pantalla (siempre en azul de marca, sin cambio de color), un campo de puntos conectados en canvas y orbes de luz azul/cian. Usar cuando Santi pida "el fondo animado", "el logo rebotando", "el fondo de puntos", "hacelo dinámico como la presentación de Tienda de Puntos", o al armar cualquier deck/propuesta/auditoría de Posicionarte que deba verse viva en pantalla.
---

# Fondo animado Posicionarte

Tres capas de fondo que van **detrás** del contenido (z-index 0) y se combinan libremente:

1. **Logo rebotando** — el ícono "P" de Posi (archivo `posi-mini-logo.png` en esta carpeta, base64 listo en `posi-mini-logo.b64`) viaja por la pantalla y rebota en los bordes. **Siempre azul de marca: no aplicar hue-rotate ni cambios de color.** Tecla `L` lo oculta/muestra.
2. **Campo de puntos** — canvas con ~100 puntos azules y cian que derivan y se conectan con líneas finas cuando están cerca. Guiño al nombre "puntos" pero funciona para cualquier cliente. Tiene una variable `burst` que se puede subir a 1 en eventos (cambio de slide, click) para que el campo "se agite".
3. **Orbes de luz** — dos radiales borrosos (azul #3256D7 y cian #00dedf) con drift lento en CSS.

Primera aplicación: `Tienda de Puntos/Primera Reunion/Auditoria inicial - Tienda de Puntos.html` (deck de 13 slides).

## Paleta Posi (ver `Manual de Marca/tokens.css`)

| Token | Valor |
|---|---|
| Fondo | `#0e0e11` |
| Azul de marca (logo, CTA) | `#3256D7` |
| Azul sobre fondo oscuro (accent) | `#5e78f0` |
| Violeta del degradado | `#7a6cf5` |
| Cian complementario | `#00dedf` |
| Degradado de marca | `linear-gradient(100deg,#5e78f0 0%,#7a6cf5 45%,#00dedf 100%)` |
| Tipografías | Montserrat (títulos) + Plus Jakarta Sans (texto) |

## Cómo aplicarlo

1. Insertar el HTML de las capas al principio del `<body>` (o del archivo del artifact):

```html
<canvas id="dotfield"></canvas>
<div class="bouncer" id="bouncer"><img src="data:image/png;base64,{{PEGAR posi-mini-logo.b64}}" alt=""></div>
<div class="orb a1"></div><div class="orb a2"></div>
```

2. CSS:

```css
#dotfield{position:fixed;inset:0;z-index:0;pointer-events:none}
.orb{position:fixed;border-radius:50%;filter:blur(90px);opacity:.28;pointer-events:none;z-index:0;mix-blend-mode:screen}
.orb.a1{width:46vw;height:46vw;left:-14vw;top:-18vw;background:radial-gradient(circle,#3256D7,transparent 65%);animation:drift1 22s ease-in-out infinite alternate}
.orb.a2{width:38vw;height:38vw;right:-12vw;bottom:-16vw;background:radial-gradient(circle,#00dedf,transparent 65%);animation:drift2 26s ease-in-out infinite alternate;opacity:.18}
@keyframes drift1{to{transform:translate(8vw,6vw) scale(1.15)}}
@keyframes drift2{to{transform:translate(-10vw,-8vw) scale(1.2)}}
.bouncer{position:fixed;left:0;top:0;width:clamp(48px,4.5vw,84px);height:clamp(48px,4.5vw,84px);z-index:0;pointer-events:none;opacity:.55;will-change:transform;transition:opacity .4s}
.bouncer img{width:100%;height:100%;display:block;border-radius:18%;filter:drop-shadow(0 0 22px rgba(94,120,240,.7))}
.bouncer.off{opacity:0}
@media (prefers-reduced-motion:reduce){.bouncer{display:none}.orb{animation:none}}
```

El contenido real va en un contenedor con `position:relative; z-index:1`.

3. JS (al final del body):

```js
(function(){
  var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* campo de puntos */
  var cv=document.getElementById('dotfield'),ctx=cv.getContext('2d'),pts=[],W,H,burst=0;
  function size(){W=cv.width=innerWidth*devicePixelRatio;H=cv.height=innerHeight*devicePixelRatio;cv.style.width=innerWidth+'px';cv.style.height=innerHeight+'px';}
  size();addEventListener('resize',size);
  var N=Math.min(120,Math.max(60,Math.floor(innerWidth/12)));
  for(var i=0;i<N;i++)pts.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0003,vy:(Math.random()-.5)*.0003,r:Math.random()*1.8+1,c:Math.random()<.35?'0,222,223':'94,120,240'});
  function frame(){
    ctx.clearRect(0,0,W,H);
    var dpr=devicePixelRatio,d=0.12*Math.max(innerWidth,innerHeight),d2=d*d;
    for(var i=0;i<N;i++){var p=pts[i];if(!reduced){p.x+=p.vx*(1+burst*6);p.y+=p.vy*(1+burst*6);if(p.x<0||p.x>1)p.vx*=-1;if(p.y<0||p.y>1)p.vy*=-1;}
      var px=p.x*innerWidth,py=p.y*innerHeight;
      for(var j=i+1;j<N;j++){var q=pts[j],qx=q.x*innerWidth,qy=q.y*innerHeight,dx=px-qx,dy=py-qy,dd=dx*dx+dy*dy;
        if(dd<d2){ctx.strokeStyle='rgba(94,120,240,'+((1-dd/d2)*.26)+')';ctx.lineWidth=dpr*.8;ctx.beginPath();ctx.moveTo(px*dpr,py*dpr);ctx.lineTo(qx*dpr,qy*dpr);ctx.stroke();}}
      ctx.fillStyle='rgba('+p.c+','+(.55+burst*.4)+')';ctx.beginPath();ctx.arc(px*dpr,py*dpr,p.r*dpr,0,6.283);ctx.fill();}
    burst*=.94;if(!reduced)requestAnimationFrame(frame);
  }
  frame();
  window.posiBurst=function(){burst=1;}; /* llamar en cambios de slide, clicks, etc. */

  /* logo rebotando (siempre azul de marca) */
  var bo=document.getElementById('bouncer'),bx=innerWidth*.3,by=innerHeight*.6,bvx=1.6,bvy=1.25,bon=true;
  function bounce(){
    if(bon&&!reduced){var s=bo.offsetWidth,hit=false;bx+=bvx;by+=bvy;
      if(bx<=0){bx=0;bvx=Math.abs(bvx);hit=true}if(bx>=innerWidth-s){bx=innerWidth-s;bvx=-Math.abs(bvx);hit=true}
      if(by<=0){by=0;bvy=Math.abs(bvy);hit=true}if(by>=innerHeight-s){by=innerHeight-s;bvy=-Math.abs(bvy);hit=true}
      if(hit){burst=Math.max(burst,.5);}
      bo.style.transform='translate('+bx+'px,'+by+'px)';}
    requestAnimationFrame(bounce);
  }
  bounce();
  document.addEventListener('keydown',function(e){if(e.key==='l'||e.key==='L'){bon=!bon;bo.classList.toggle('off',!bon);}});
})();
```

## Reglas

- El logo **no cambia de color**. Santi lo pidió explícitamente: siempre el azul Posi. Nada de `hue-rotate`, ni filtros de color en el rebote.
- Las tres capas conviven siempre: el logo rebotando no reemplaza al campo de puntos. Si el campo se ve muy tenue, subir alpha de líneas (.26) y puntos (.55) antes que agregar más puntos.
- Opacidad del logo entre .45 y .6 para que nunca compita con el texto. Si hay texto muy denso, bajar a .4.
- Velocidad suave (1.2–1.8 px/frame). Más rápido distrae en una reunión.
- El campo de puntos va siempre detrás; si el cliente tiene su propio color de marca, se puede sumar como tercer color en `c` sin quitar el azul Posi.
- Respetar `prefers-reduced-motion`: sin animación, sin logo.
- En pantallas de menos de 900 px, evaluar apagar el canvas por rendimiento.

## Cuándo no usarlo

Documentos para imprimir o exportar a PDF (acuerdos, propuestas en PDF): el fondo animado no tiene sentido ahí. Es para pantalla: decks, auditorías, landings, dashboards.
