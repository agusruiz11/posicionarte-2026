import { procesarLead } from '@/lib/lead-handler';

/** Alias de `/api/lead`. Ver la nota en /api/contact/route.js. */
export const dynamic = 'force-dynamic';

export async function POST(request) {
  return procesarLead(request, 'benchmark');
}
