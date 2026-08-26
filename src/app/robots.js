import { SITE_URL } from '@/data/marca';

/**
 * robots.txt.
 *
 * Los bots de los buscadores con IA se declaran explícitos. El `Allow: /`
 * genérico ya los dejaba pasar, pero dejarlo escrito es una decisión, no un
 * descuido: para una agencia que quiere que la citen cuando alguien pregunta
 * "qué agencia de marketing digital me conviene", dejarlos entrar es la jugada.
 *
 * Si algún día se decide lo contrario, se cambia acá y queda registrado.
 */
export default function robots() {
  const rastreadoresIA = [
    'GPTBot',          // OpenAI — entrenamiento
    'OAI-SearchBot',   // OpenAI — búsqueda en ChatGPT
    'ChatGPT-User',    // OpenAI — navegación a pedido del usuario
    'ClaudeBot',       // Anthropic
    'Claude-User',
    'PerplexityBot',
    'Google-Extended', // Gemini y Vertex
    'Applebot-Extended',
    'meta-externalagent',
    'Bytespider',
    'CCBot',           // Common Crawl, del que se alimentan varios modelos
  ];

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      ...rastreadoresIA.map((ua) => ({ userAgent: ua, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
