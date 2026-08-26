/**
 * Alta en la audiencia de Resend.
 *
 * Se usa para la secuencia post-descarga del benchmark: quien baja el informe
 * entra a la audiencia y después recibe la secuencia armada desde Broadcasts.
 *
 * Dos decisiones:
 *
 * 1. **Solo con consentimiento explícito.** El checkbox del formulario cubre
 *    "responder mi consulta". Sumar a alguien a una lista de difusión sin que
 *    lo pida es lo que hace que un dominio termine en spam, y bajo la Ley
 *    25.326 el titular tiene que poder oponerse. El formulario pide un segundo
 *    tilde, separado, para esto.
 *
 * 2. **Nunca bloquea el envío.** Si Resend falla o la variable no está, el
 *    lead ya llegó al mail y a la base. Esto es lo último y lo menos crítico.
 */

import { Resend } from 'resend';

const AUDIENCIA = process.env.RESEND_AUDIENCE_ID;

// El key que manda los mails es de envío solamente ("Sending access"), y con
// ese permiso `contacts.create` devuelve 401. Resend no tiene un permiso
// intermedio: para tocar audiencias hace falta uno de acceso completo.
//
// En vez de aflojar el key que se usa en cada formulario, esto acepta un
// segundo key aparte. Si no está definido cae al de siempre, y si ese no
// alcanza el alta falla sin cortar nada: el lead ya llegó al mail y a la base.
const CLAVE = process.env.RESEND_AUDIENCE_API_KEY || process.env.RESEND_API_KEY;

export const newsletterConfigurada = Boolean(AUDIENCIA && CLAVE);

let cliente;
function getCliente() {
  if (!cliente) cliente = new Resend(CLAVE);
  return cliente;
}

/**
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
export async function sumarAAudiencia({ email, name }) {
  if (!newsletterConfigurada) return { ok: false, error: 'sin configurar' };

  const partes = String(name || '').trim().split(/\s+/);

  try {
    const { error } = await getCliente().contacts.create({
      audienceId: AUDIENCIA,
      email: String(email).trim().toLowerCase().slice(0, 320),
      firstName: partes[0]?.slice(0, 60) || undefined,
      lastName: partes.slice(1).join(' ').slice(0, 60) || undefined,
      unsubscribed: false,
    });
    if (error) return { ok: false, error: String(error.message || error).slice(0, 200) };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err).slice(0, 200) };
  }
}
