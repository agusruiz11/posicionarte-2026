/**
 * Guardado de leads en la base del CRM.
 *
 * El sitio NO lleva la service role de Supabase. Escribe llamando a la función
 * `public.insert_lead()`, que está declarada `security definer` y es lo único
 * que la clave anónima puede hacer: crear un lead. No puede leer los leads
 * guardados ni acercarse a Payment, Distribution ni al resto del CRM.
 *
 * Si la clave se filtrara, el daño máximo es que alguien cargue leads basura,
 * y para eso la función además corta a 5 por mail por hora.
 *
 * Sin las variables configuradas esto no rompe nada: el lead sigue llegando
 * por mail, que es el canal que no puede fallar.
 */

const URL_BASE = process.env.CRM_SUPABASE_URL;
const CLAVE = process.env.CRM_SUPABASE_ANON_KEY;

export const crmConfigurado = Boolean(URL_BASE && CLAVE);

/**
 * @returns {Promise<{ ok: boolean, id?: string, error?: string }>}
 */
export async function guardarLead(datos) {
  if (!crmConfigurado) return { ok: false, error: 'sin configurar' };

  try {
    // El timeout importa: sin él, una base lenta deja al visitante mirando un
    // spinner y puede llegar a hacerle abandonar un formulario ya completado.
    const corte = AbortSignal.timeout(6000);

    const res = await fetch(`${URL_BASE}/rest/v1/rpc/insert_lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: CLAVE,
        Authorization: `Bearer ${CLAVE}`,
      },
      body: JSON.stringify({ payload: datos }),
      signal: corte,
    });

    if (!res.ok) {
      const detalle = await res.text().catch(() => '');
      return { ok: false, error: `${res.status} ${detalle.slice(0, 200)}` };
    }

    const id = await res.json();
    return { ok: true, id: typeof id === 'string' ? id : undefined };
  } catch (err) {
    return { ok: false, error: err?.name === 'TimeoutError' ? 'timeout' : String(err).slice(0, 200) };
  }
}
