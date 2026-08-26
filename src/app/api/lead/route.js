import { procesarLead } from '@/lib/lead-handler';

/**
 * Endpoint único de leads. Los tres formularios del sitio pegan acá y se
 * distinguen por `form_id`.
 *
 * `force-dynamic` porque el rate limit necesita la IP real de cada pedido: sin
 * esto Next puede resolverlo en build y servir siempre la misma respuesta.
 */
export const dynamic = 'force-dynamic';

export async function POST(request) {
  return procesarLead(request);
}
