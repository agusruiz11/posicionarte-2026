/**
 * Rate limit por IP, en memoria del proceso.
 *
 * Qué protege y qué no: cada instancia serverless de Vercel tiene su propia
 * memoria, así que alguien decidido puede pegarle a varias instancias y sacar
 * más envíos que el límite nominal. Esto frena el caso real —un script tonto,
 * un formulario enviado veinte veces— sin sumar Redis ni otro servicio.
 *
 * La barrera dura está en la base: `public.insert_lead()` corta a 5 envíos por
 * mail por hora, y eso no depende de qué instancia atienda el pedido.
 */

const VENTANA_MS = 10 * 60 * 1000;   // 10 minutos
const MAXIMO = 5;                    // envíos por IP en esa ventana
const TOPE_CLAVES = 5000;            // techo de memoria

const registro = new Map();

function limpiar(ahora) {
  for (const [clave, marcas] of registro) {
    const vivas = marcas.filter((t) => ahora - t < VENTANA_MS);
    if (vivas.length) registro.set(clave, vivas);
    else registro.delete(clave);
  }
}

/**
 * @returns {{ permitido: boolean, restantes: number, esperarSegundos: number }}
 */
export function consumir(clave) {
  const ahora = Date.now();

  // La limpieza corre cuando el mapa crece, no en cada pedido: no hace falta
  // recorrer 5000 entradas para atender un formulario.
  if (registro.size > TOPE_CLAVES) limpiar(ahora);

  const marcas = (registro.get(clave) || []).filter((t) => ahora - t < VENTANA_MS);

  if (marcas.length >= MAXIMO) {
    const masVieja = marcas[0];
    return {
      permitido: false,
      restantes: 0,
      esperarSegundos: Math.ceil((VENTANA_MS - (ahora - masVieja)) / 1000),
    };
  }

  marcas.push(ahora);
  registro.set(clave, marcas);
  return { permitido: true, restantes: MAXIMO - marcas.length, esperarSegundos: 0 };
}

/**
 * IP del visitante detrás del proxy de Vercel.
 *
 * `x-forwarded-for` puede venir con varias IPs; la primera es la del cliente.
 * Si no hay ninguna cabecera —desarrollo local— devuelve una clave fija, que
 * para el caso alcanza.
 */
export function ipDe(request) {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'local';
}
