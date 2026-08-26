'use client';

/**
 * Atribución de leads.
 *
 * Captura de dónde vino la persona la primera vez que entra y lo guarda, para
 * que cuando complete un formulario —que puede ser tres páginas y dos días
 * después— el lead viaje con su origen.
 *
 * Por qué importa: sin el `gclid` guardado no se pueden subir conversiones
 * offline a Google Ads. Esa es la diferencia entre que el algoritmo optimice
 * por "formularios enviados" y que optimice por "clientes ganados".
 *
 * Dos capas:
 *   · primer toque  (localStorage)   — de dónde vino originalmente
 *   · último toque  (sessionStorage) — de dónde vino en esta visita
 *
 * Todo con try/catch: en navegación privada o con las cookies bloqueadas el
 * storage tira excepción, y un formulario nunca se puede romper por esto.
 */

const CLAVE_PRIMER = 'posi_attr_first';
const CLAVE_ULTIMO = 'posi_attr_last';

const PARAMS = [
  'gclid', 'gbraid', 'wbraid', 'fbclid', 'msclkid', 'ttclid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
];

function leer(storage, clave) {
  try {
    const raw = storage.getItem(clave);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function escribir(storage, clave, valor) {
  try {
    storage.setItem(clave, JSON.stringify(valor));
  } catch {
    /* modo incógnito o storage bloqueado: seguimos sin atribución */
  }
}

function desdeLaUrl() {
  if (typeof window === 'undefined') return {};
  const qs = new URLSearchParams(window.location.search);
  const out = {};
  for (const p of PARAMS) {
    const v = qs.get(p);
    if (v) out[p] = v.slice(0, 200);
  }
  return out;
}

/**
 * Se llama una vez al cargar el sitio. Si la URL trae parámetros de campaña,
 * los guarda; si no, deja constancia del referrer y la página de aterrizaje.
 */
export function captureAttribution() {
  if (typeof window === 'undefined') return;

  const params = desdeLaUrl();
  const hayCampania = Object.keys(params).length > 0;

  const toque = {
    ...params,
    referrer: document.referrer ? document.referrer.slice(0, 300) : '',
    landing_page: window.location.pathname,
    ts: new Date().toISOString(),
  };

  // Último toque: se pisa en cada visita nueva que traiga campaña.
  if (hayCampania || !leer(sessionStorage, CLAVE_ULTIMO)) {
    escribir(sessionStorage, CLAVE_ULTIMO, toque);
  }

  // Primer toque: se escribe una sola vez y no se toca más.
  if (!leer(localStorage, CLAVE_PRIMER)) {
    escribir(localStorage, CLAVE_PRIMER, toque);
  }
}

/**
 * Devuelve la atribución lista para adjuntar a un evento o a un lead.
 * Los campos del último toque mandan; los del primero van con prefijo.
 */
export function getAttribution() {
  if (typeof window === 'undefined') return {};

  const ultimo = leer(sessionStorage, CLAVE_ULTIMO) || {};
  const primero = leer(localStorage, CLAVE_PRIMER) || {};

  const out = { ...ultimo };
  if (primero.ts) {
    out.first_touch_source = primero.utm_source || primero.referrer || 'directo';
    out.first_touch_campaign = primero.utm_campaign || '';
    out.first_touch_ts = primero.ts;
  }
  out.dispositivo = window.innerWidth < 768 ? 'mobile' : 'desktop';
  return out;
}
