/**
 * Utilidades para armar los mails de aviso de lead.
 *
 * Los valores vienen de un formulario público: nunca se interpolan crudos en el
 * HTML del mail. Un envío con `<img src=x onerror=…>` rompía o manipulaba el
 * mail que le llega al equipo.
 */

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

/** Escapa HTML y recorta, para que un campo largo no reviente el mail. */
export function esc(valor, max = 2000) {
  if (valor === null || valor === undefined) return '—';
  return String(valor).slice(0, max).replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

export function fila(etiqueta, valor, opts = {}) {
  const v = opts.pre
    ? `<span style="white-space:pre-wrap">${esc(valor)}</span>`
    : esc(valor);
  return `
          <tr>
            <td style="padding:10px 12px;font-weight:600;color:#555;background:#f9f9f9;width:35%">${esc(etiqueta, 80)}</td>
            <td style="padding:10px 12px">${v}</td>
          </tr>`;
}

const CAMPOS_ATRIBUCION = [
  ['utm_source', 'Fuente'],
  ['utm_medium', 'Medio'],
  ['utm_campaign', 'Campaña'],
  ['utm_content', 'Contenido'],
  ['utm_term', 'Término'],
  ['gclid', 'Google Ads (gclid)'],
  ['fbclid', 'Meta (fbclid)'],
  ['referrer', 'Vino de'],
  ['landing_page', 'Aterrizó en'],
  ['first_touch_source', 'Primer contacto'],
  ['dispositivo', 'Dispositivo'],
];

/**
 * Bloque de atribución. Es lo que permite saber qué campaña trajo el lead sin
 * abrir GA4, y el `gclid` es lo que después habilita subir la conversión
 * offline a Google Ads cuando el lead cierra.
 */
export function bloqueAtribucion(body) {
  const filas = CAMPOS_ATRIBUCION
    .filter(([k]) => body[k])
    .map(([k, etiqueta]) => fila(etiqueta, body[k]))
    .join('');

  if (!filas) {
    return `
        <p style="font-family:sans-serif;font-size:13px;color:#999;margin-top:24px">
          Sin datos de atribución: entró directo o con el almacenamiento del navegador bloqueado.
        </p>`;
  }

  return `
        <h3 style="font-family:sans-serif;font-size:14px;color:#555;margin:28px 0 8px">De dónde viene</h3>
        <table style="font-family:sans-serif;font-size:13px;border-collapse:collapse;width:100%;max-width:480px">
          ${filas}
        </table>`;
}

/**
 * Rechaza envíos de bots: campo trampa completado, o formulario enviado
 * demasiado rápido.
 *
 * El umbral de tiempo es deliberadamente bajo. Un falso positivo acá es un lead
 * real que se pierde en silencio y del que nunca nos enteramos; un falso
 * negativo es un mail de spam. Con esa asimetría conviene ser conservador: un
 * segundo desde que carga la página solo lo alcanza un script, ni siquiera
 * alguien con autocompletado. El honeypot hace el trabajo pesado.
 */
export function pareceBot(body) {
  if (body.website_url) return true;                       // honeypot
  const ms = Number(body.form_elapsed_ms);
  return Number.isFinite(ms) && ms > 0 && ms < 1000;
}
