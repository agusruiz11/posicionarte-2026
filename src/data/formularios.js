/**
 * Definición de los formularios del sitio. Fuente única.
 *
 * Antes había tres formularios distintos, con tres validaciones distintas, dos
 * endpoints y campos que se llamaban parecido pero no igual. Cada vez que
 * queríamos capturar un dato nuevo había que tocar tres lugares y acordarse de
 * los tres.
 *
 * Ahora el catálogo de campos vive acá, lo lee `<LeadForm>` para dibujar y lo
 * lee `/api/lead` para validar. El servidor no confía en el cliente: valida
 * contra esta misma tabla, así que un POST armado a mano no puede saltearse
 * un requerido.
 *
 * `base` son los campos que se ven al entrar. `extra` aparecen cuando la
 * persona empieza a escribir. Eso es la captura progresiva: el formulario se
 * ve corto —que es lo que decide si alguien lo empieza— y termina pidiendo
 * todo lo que necesitamos para calificar el lead.
 */

import { SERVICIOS } from '@/data/marca';

export const CAMPOS = {
  name: {
    tipo: 'text',
    etiqueta: 'Nombre',
    placeholder: 'Tu nombre completo',
    autoComplete: 'name',
    maximo: 120,
  },
  email: {
    tipo: 'email',
    etiqueta: 'Email',
    placeholder: 'tu@email.com',
    autoComplete: 'email',
    maximo: 320,
  },
  phone: {
    tipo: 'tel',
    etiqueta: 'Teléfono o WhatsApp',
    placeholder: '+54 9 11 ...',
    autoComplete: 'tel',
    ayuda: 'Opcional. Acelera la respuesta.',
    maximo: 40,
  },
  company: {
    tipo: 'text',
    etiqueta: 'Empresa',
    placeholder: 'Nombre de tu empresa',
    autoComplete: 'organization',
    maximo: 160,
  },
  message: {
    tipo: 'textarea',
    etiqueta: 'Contanos qué necesitás',
    placeholder: 'Qué querés lograr, en qué punto estás hoy.',
    maximo: 4000,
  },
  serviceInterest: {
    tipo: 'select',
    etiqueta: 'Qué te interesa',
    placeholder: 'Elegí una opción',
    opciones: [
      ...SERVICIOS.map((s) => ({ valor: s.slug, etiqueta: s.nombre })),
      { valor: 'no-se', etiqueta: 'Todavía no sé, quiero que me asesoren' },
    ],
    maximo: 80,
  },
  objective: {
    tipo: 'select',
    etiqueta: 'Tu objetivo principal',
    placeholder: 'Elegí una opción',
    opciones: [
      { valor: 'ventas', etiqueta: 'Vender más' },
      { valor: 'leads', etiqueta: 'Conseguir más consultas' },
      { valor: 'marca', etiqueta: 'Construir marca' },
      { valor: 'ordenar', etiqueta: 'Ordenar lo que ya tengo' },
    ],
    maximo: 80,
  },
  // Dos preguntas distintas, a propósito. `budget` es lo que la persona tiene
  // en mente gastar; `investmentRange` es lo que gasta hoy. La primera califica
  // la oportunidad, la segunda dice si ya trabaja con alguien.
  //
  // Este campo hace el trabajo que haría publicar precios en la página, sin el
  // costo de anclarse: el que busca algo barato se autodescarta acá, y nosotros
  // no dejamos un número escrito que después cuesta subir.
  budget: {
    tipo: 'select',
    etiqueta: 'Presupuesto mensual que tenés en mente',
    placeholder: 'Elegí un rango',
    ayuda: 'Nos ahorra a los dos una reunión que no iba a ningún lado.',
    opciones: [
      { valor: 'menos_500', etiqueta: 'Menos de 500 USD por mes' },
      { valor: '500_1000', etiqueta: 'Entre 500 y 1.000 USD' },
      { valor: '1000_2000', etiqueta: 'Entre 1.000 y 2.000 USD' },
      { valor: 'mas_2000', etiqueta: 'Más de 2.000 USD' },
      { valor: 'orientar', etiqueta: 'Necesito que me orienten' },
    ],
    maximo: 40,
  },

  investmentRange: {
    tipo: 'radio',
    etiqueta: '¿Estás invirtiendo hoy en posicionamiento digital?',
    opciones: [
      { valor: 'si_menos_500', etiqueta: 'Sí, menos de 500 USD por mes' },
      { valor: 'si_500_1000', etiqueta: 'Sí, entre 500 y 1.000 USD' },
      { valor: 'si_mas_1000', etiqueta: 'Sí, más de 1.000 USD' },
      { valor: 'no', etiqueta: 'No, todavía nada' },
      { valor: 'no_contesta', etiqueta: 'Prefiero no contestar' },
    ],
    maximo: 40,
  },
};

export const FORMULARIOS = {
  contacto: {
    id: 'contacto',
    base: ['name', 'email', 'message'],
    extra: ['phone', 'serviceInterest', 'budget'],
    requeridos: ['name', 'email', 'message'],
    boton: 'Enviar consulta',
    botonEnviando: 'Enviando...',
    newsletter: false,
    origen: 'formulario de contacto',
  },

  footer: {
    id: 'footer',
    base: ['name', 'email', 'message'],
    extra: ['phone'],
    requeridos: ['name', 'email', 'message'],
    boton: 'Enviar mensaje',
    botonEnviando: 'Enviando...',
    newsletter: false,
    origen: 'formulario del pie',
  },

  benchmark: {
    id: 'benchmark',
    base: ['name', 'company', 'email'],
    extra: ['phone', 'investmentRange'],
    requeridos: ['name', 'company', 'email', 'investmentRange'],
    boton: 'Descargar el informe',
    botonEnviando: 'Preparando la descarga...',
    // El único que ofrece la suscripción: quien baja un informe es quien tiene
    // sentido que reciba la secuencia de seguimiento.
    newsletter: true,
    origen: 'descarga del benchmark',
  },
};

/** Etiquetas legibles para el mail y para el CRM. */
export function etiquetaDe(campo, valor) {
  const def = CAMPOS[campo];
  if (!def || !def.opciones) return valor;
  return def.opciones.find((o) => o.valor === valor)?.etiqueta || valor;
}
