import { procesarLead } from '@/lib/lead-handler';

/**
 * Alias de `/api/lead`.
 *
 * Queda por una razón concreta: durante un deploy hay pestañas abiertas con el
 * JavaScript de la versión anterior, que todavía apunta acá. Sin este alias,
 * cada una de esas pestañas pierde su lead. Se puede borrar en el próximo
 * relanzamiento, cuando ya no queden clientes viejos dando vueltas.
 */
export const dynamic = 'force-dynamic';

export async function POST(request) {
  return procesarLead(request, 'contacto');
}
