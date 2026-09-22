/**
 * Logos de la cartera, uno por slug de `clientes.js`.
 *
 * Va aparte porque son imports estáticos de imágenes: `next/image` necesita
 * las dimensiones en build y este módulo solo se importa desde componentes
 * cliente. `clientes.js` queda como datos puros, legibles en el servidor.
 *
 * Todos están normalizados a un máximo de 400x140 y recortados a su caja:
 * así la placa blanca de la tarjeta los centra sin que ninguno toque el borde.
 */

import coa from '@/assets/images/clientes/coa.webp';
import futbolQueens from '@/assets/images/clientes/futbol-queens.webp';
import maxcer from '@/assets/images/clientes/maxcer.webp';
import floridaAventura from '@/assets/images/clientes/florida-aventura.webp';
import miguelDodorico from '@/assets/images/clientes/miguel-dodorico.webp';
import sustain from '@/assets/images/clientes/sustain.webp';
import sanyser from '@/assets/images/clientes/sanyser.webp';
import sonidoOutflow from '@/assets/images/clientes/sonido-outflow.webp';
import pielYEstetica from '@/assets/images/clientes/piel-y-estetica.webp';
import renoir from '@/assets/images/clientes/renoir.webp';
import makena from '@/assets/images/clientes/makena.webp';
import tiendaDePuntos from '@/assets/images/clientes/tienda-de-puntos.webp';
import blindex from '@/assets/images/clientes/blindex.webp';
import ekoglass from '@/assets/images/clientes/ekoglass.webp';
import takeOff from '@/assets/images/clientes/take-off.webp';
import vuotto from '@/assets/images/clientes/vuotto.webp';
import tesioVuotto from '@/assets/images/clientes/tesio-vuotto.webp';
import lizze from '@/assets/images/clientes/lizze.webp';
import cerrameLaOcho from '@/assets/images/clientes/cerrame-la-ocho.webp';
import elRecreo from '@/assets/images/clientes/el-recreo.webp';
import cabanasArcangeles from '@/assets/images/clientes/cabanas-arcangeles.webp';
import vesArquitectura from '@/assets/images/clientes/ves-arquitectura.webp';

export const LOGOS = {
  'coa': coa,
  'futbol-queens': futbolQueens,
  'maxcer': maxcer,
  'florida-aventura': floridaAventura,
  'miguel-dodorico': miguelDodorico,
  'sustain': sustain,
  'sanyser': sanyser,
  'sonido-outflow': sonidoOutflow,
  'piel-y-estetica': pielYEstetica,
  'renoir': renoir,
  'makena': makena,
  'tienda-de-puntos': tiendaDePuntos,
  'blindex': blindex,
  'ekoglass': ekoglass,
  'take-off': takeOff,
  'vuotto': vuotto,
  'tesio-vuotto': tesioVuotto,
  'lizze': lizze,
  'cerrame-la-ocho': cerrameLaOcho,
  'el-recreo': elRecreo,
  'cabanas-arcangeles': cabanasArcangeles,
  'ves-arquitectura': vesArquitectura,
};
