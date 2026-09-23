/**
 * Contenido de las páginas de servicio (`/servicios/[slug]`).
 *
 * Los slugs y los nombres salen de `SERVICIOS` en marca.js: este archivo solo
 * agrega el contenido largo. Si un servicio está en marca.js y no acá, la
 * página no se genera; si está acá y no allá, el build avisa.
 *
 * Reglas de redacción, las mismas de todo el sitio: voseo, frases cortas, sin
 * promesas de resultados que no podamos mostrar, y cada "cuándo no" es real.
 * Decir para quién no es un servicio es lo que hace creíble el para quién sí.
 */

import { SERVICIOS } from '@/data/marca';

const CONTENIDO = {
  'google-ads': {
    titulo: 'Aparecer cuando ya te están buscando.',
    meta: {
      title: 'Google Ads para pymes',
      description:
        'Campañas de Google Ads gestionadas a diario, con medición de consultas y reporte mensual en lenguaje claro. Cuenta a tu nombre, mínimo tres meses.',
    },
    intro:
      'Alguien escribe en Google "electricista industrial zona norte" o "alquiler de autos en Florida". Con Google Ads tu negocio aparece primero para esa búsqueda y pagás solo cuando hacen clic. Nosotros armamos la campaña, medimos qué consulta trajo cada anuncio y la ajustamos todas las semanas.',
    paraQuien: [
      'Negocios cuyo producto o servicio la gente ya busca en Google: servicios, alquileres, turnos, productos con nombre.',
      'Pymes que pueden atender lo que llega: alguien que conteste el WhatsApp o el teléfono en el día.',
      'Marcas con un sitio o una landing donde el visitante pueda hacer algo concreto: consultar, reservar, comprar.',
    ],
    cuandoNo:
      'Si tu producto es nuevo y todavía nadie lo busca, Google Ads te va a costar caro por poco. Ahí conviene arrancar por Meta Ads y volver a Google cuando exista la búsqueda.',
    incluye: [
      'Investigación de palabras clave y de lo que hace tu competencia en el buscador.',
      'Campañas separadas por servicio o producto, con anuncios escritos para cada búsqueda.',
      'Medición de conversiones: sabemos qué anuncio trajo cada consulta, además de cuántos clics hubo.',
      'Optimización semanal de pujas, términos negativos, zonas y horarios.',
      'Landing o ajustes en tu sitio cuando el problema está después del clic.',
      'Reporte mensual en lenguaje claro: qué se invirtió, qué llegó y qué cambiamos.',
    ],
    proceso: [
      {
        titulo: 'Diagnóstico',
        texto:
          'Revisamos tu cuenta si ya existe, tu sitio y qué buscan tus clientes. Si no tenés cuenta, la creamos con tu mail y tu tarjeta: queda de tu propiedad.',
      },
      {
        titulo: 'Primer mes',
        texto:
          'Campañas al aire con medición de conversiones desde el primer día. Las primeras semanas son de aprendizaje: el objetivo es tener datos limpios, todavía no el mejor costo.',
      },
      {
        titulo: 'Meses dos y tres',
        texto:
          'Con datos reales recortamos lo que no convierte y empujamos lo que sí. Acá es donde suele bajar el costo por consulta.',
      },
      {
        titulo: 'En adelante',
        texto:
          'Ajustes semanales, pruebas de anuncios nuevos y reporte mensual. Vos ves los mismos números que nosotros, en tu cuenta.',
      },
    ],
    faq: [
      {
        pregunta: '¿Cuánto tengo que invertir en pauta?',
        respuesta:
          'Depende de tu rubro y de tu zona, pero hay un piso: con muy poco presupuesto Google no llega a juntar datos para aprender y la campaña no despega. En la primera reunión te decimos un rango concreto para tu caso, con el costo por clic que vemos en tu rubro. La pauta se paga directo a Google con tu tarjeta; nuestro honorario es aparte.',
      },
      {
        pregunta: '¿Por qué piden tres meses de mínimo?',
        respuesta:
          'Porque una campaña necesita ese tiempo para dar un resultado real. El primer mes es aprendizaje, el segundo es ajuste y el tercero es donde se ve si funciona. Cortar al mes es pagar el aprendizaje y no cobrar el resultado.',
      },
      {
        pregunta: '¿La cuenta de Google Ads es mía?',
        respuesta:
          'Sí. La creamos con tu mail y tu tarjeta, y nosotros entramos como administradores. Si algún día dejás de trabajar con nosotros, la cuenta, el historial y todo lo aprendido quedan con vos.',
      },
      {
        pregunta: '¿Cómo sé si está funcionando?',
        respuesta:
          'Medimos lo que importa: formularios enviados, clics en WhatsApp y llamadas. Cada mes recibís un reporte con lo invertido, las consultas que llegaron y cuánto costó cada una, explicado sin jerga. Y podés entrar a la cuenta cuando quieras.',
      },
      {
        pregunta: 'Ya tengo una cuenta con campañas. ¿La revisan?',
        respuesta:
          'Sí. Antes de proponer nada auditamos lo que hay: estructura, palabras por las que estás pagando y qué conversiones se están midiendo. Muchas veces la primera mejora sale de apagar lo que gasta sin traer nada.',
      },
    ],
    relacionados: ['meta-ads', 'diseno-web', 'seo-aeo'],
  },

  'meta-ads': {
    titulo: 'Llegar a quien todavía no te busca.',
    meta: {
      title: 'Meta Ads: Facebook e Instagram',
      description:
        'Campañas en Facebook e Instagram con piezas producidas para cada anuncio, medición con Píxel y API de conversiones y reporte mensual claro.',
    },
    intro:
      'Facebook e Instagram sirven para mostrarle tu marca a gente que no sabe que existís, con el anuncio correcto para cada momento: primero que te conozcan, después que te consulten o te compren. Armamos las campañas, producimos o adaptamos las piezas y las ajustamos con datos cada semana.',
    paraQuien: [
      'Marcas con algo para mostrar: indumentaria, estética, gastronomía, eventos, inmuebles.',
      'Tiendas online que necesitan tráfico y remarketing para vender más de lo que trae el orgánico.',
      'Negocios locales que quieren llenar la agenda o vender un evento con fecha.',
    ],
    cuandoNo:
      'Si tu servicio es urgente y muy específico, como una pérdida de gas o un abogado laboral para hoy, la gente lo busca en Google y no espera a verlo en Instagram. Ahí Google Ads va primero.',
    incluye: [
      'Configuración del Píxel y de la API de conversiones para medir lo que pasa en tu sitio o tienda.',
      'Campañas separadas por objetivo: reconocimiento, tráfico, consultas o ventas.',
      'Producción o adaptación de piezas: imagen, video corto y texto para cada anuncio.',
      'Públicos por intereses, remarketing y públicos parecidos a tus clientes actuales.',
      'Pruebas semanales de creatividades: lo que no funciona se apaga, lo que funciona se escala.',
      'Reporte mensual en lenguaje claro.',
    ],
    proceso: [
      {
        titulo: 'Diagnóstico',
        texto:
          'Revisamos tu cuenta publicitaria, el Píxel y el catálogo si tenés tienda. Si no existe nada, creamos el Business Manager a tu nombre, con verificación hecha.',
      },
      {
        titulo: 'Primer mes',
        texto:
          'Campañas al aire con tres o cuatro piezas por anuncio para que el algoritmo tenga con qué comparar. Es un mes de aprendizaje.',
      },
      {
        titulo: 'Meses dos y tres',
        texto:
          'Recortamos públicos y piezas que no rinden y escalamos lo que sí. Suele ser donde baja el costo por resultado.',
      },
      {
        titulo: 'En adelante',
        texto:
          'Creatividades nuevas todos los meses, porque en Meta las piezas se gastan. Reporte mensual y ajustes semanales.',
      },
    ],
    faq: [
      {
        pregunta: '¿Necesito tener contenido para pautar?',
        respuesta:
          'Ayuda, pero no es requisito. Si tenés fotos y videos, los adaptamos. Si no, producimos las piezas para la pauta. Lo que sí necesitamos es que tu producto o servicio esté claro, porque un anuncio no arregla una oferta confusa.',
      },
      {
        pregunta: '¿Cuánto hay que invertir?',
        respuesta:
          'Meta permite arrancar con presupuestos chicos, pero por debajo de cierto monto el algoritmo no llega a aprender y los resultados son ruido. Te damos un rango concreto en la primera reunión según tu objetivo y tu rubro. La pauta se paga directo a Meta con tu tarjeta; nuestro honorario es aparte.',
      },
      {
        pregunta: '¿Por qué piden tres meses de mínimo?',
        respuesta:
          'Porque el primer mes es aprendizaje, el segundo es ajuste y el tercero es donde se ve el resultado. Con menos tiempo pagás el aprendizaje y te vas antes de cobrarlo.',
      },
      {
        pregunta: '¿Sirve para vender directo o solo para que me conozcan?',
        respuesta:
          'Las dos cosas, en ese orden. Para vender directo hacen falta tres cosas: medir bien (Píxel y API de conversiones), una tienda o sitio que funcione en celular y una oferta clara. Si algo de eso falta, te lo decimos antes de pautar.',
      },
      {
        pregunta: '¿Qué pasa si Meta me bloquea la cuenta publicitaria?',
        respuesta:
          'Pasa más seguido de lo que parece. Por eso trabajamos con cuentas a tu nombre, dentro de tu Business Manager, con la verificación de identidad hecha y más de un administrador. Si Meta restringe algo, gestionamos la apelación.',
      },
    ],
    relacionados: ['google-ads', 'social-content', 'diseno-web'],
  },

  'seo-aeo': {
    titulo: 'Que te encuentren sin pagar cada clic.',
    meta: {
      title: 'SEO y AEO: posicionamiento orgánico y en buscadores con IA',
      description:
        'Posicionamiento orgánico en Google y en las respuestas de los asistentes con IA. Auditoría técnica, contenido que responde preguntas reales y medición trimestral.',
    },
    intro:
      'Aparecer en Google de forma orgánica y en las respuestas de los asistentes con IA cuando alguien pregunta por lo que hacés. Es un trabajo lento y acumulativo: lo que se gana, queda, y cada mes cuesta menos que el anterior.',
    paraQuien: [
      'Negocios con sitio propio y tiempo para construir: los resultados se ven entre el cuarto y el sexto mes.',
      'Rubros donde la gente investiga antes de comprar: salud, educación, inmobiliaria, servicios profesionales, empresas que venden a empresas.',
      'Marcas que ya pautan y quieren dejar de depender solo de la pauta.',
    ],
    cuandoNo:
      'Si necesitás consultas este mes, el SEO no llega. Arrancamos con pauta y el SEO corre en paralelo para que en seis meses el costo por consulta baje.',
    incluye: [
      'Auditoría técnica: velocidad, indexación, errores y estructura del sitio.',
      'Investigación de búsquedas: qué pregunta tu cliente y con qué palabras.',
      'Contenido: páginas y artículos que responden esas preguntas, escritos para personas y legibles por buscadores e IA.',
      'Datos estructurados para que Google y los asistentes entiendan qué hacés, dónde y para quién.',
      'Ficha de Google Business optimizada cuando hay atención local.',
      'Reporte mensual: posiciones, visitas orgánicas y consultas que llegaron por ese canal.',
    ],
    proceso: [
      {
        titulo: 'Auditoría',
        texto:
          'Primer mes. Qué frena al sitio hoy, por qué búsquedas aparece y por cuáles debería, y qué hace la competencia que a vos te falta.',
      },
      {
        titulo: 'Base técnica y contenido prioritario',
        texto:
          'Meses uno y dos. Corregimos velocidad, indexación y estructura, y escribimos las páginas que responden las búsquedas con más intención de compra.',
      },
      {
        titulo: 'Contenido continuo',
        texto:
          'Del mes tres en adelante. Artículos y páginas nuevas cada mes, mejoras sobre lo publicado y enlaces desde sitios que tengan sentido.',
      },
      {
        titulo: 'Medición trimestral',
        texto:
          'Cada tres meses comparamos posiciones, tráfico orgánico y consultas contra el punto de partida, y ajustamos el plan.',
      },
    ],
    faq: [
      {
        pregunta: '¿Qué es AEO y en qué cambia lo que hacen?',
        respuesta:
          'AEO es optimizar para que los asistentes con IA (ChatGPT, Gemini, la IA de Google) te citen cuando alguien les pregunta. Cambia el formato: contenido que responde preguntas concretas, datos estructurados y una página que dice con claridad qué hacés y para quién. Lo que sirve para Google sirve para la IA, con esos ajustes.',
      },
      {
        pregunta: '¿Cuánto tarda en verse?',
        respuesta:
          'Entre cuatro y seis meses para búsquedas con competencia; antes para búsquedas locales o muy específicas. Por eso el SEO se contrata a seis meses como mínimo y se mide cada trimestre.',
      },
      {
        pregunta: '¿Garantizan el primer puesto?',
        respuesta:
          'No. Nadie puede garantizarlo y quien lo promete miente. Lo que garantizamos es trabajo medible: qué se hizo, qué posiciones se movieron y cuánto tráfico orgánico entra hoy comparado con el mes en que arrancamos.',
      },
      {
        pregunta: '¿Mi sitio en WordPress o Tienda Nube sirve?',
        respuesta:
          'Sí, con límites distintos. WordPress permite casi todo. Tienda Nube tiene un techo técnico, pero el contenido, las fichas de producto y la ficha de Google Business mueven mucho igual.',
      },
    ],
    relacionados: ['diseno-web', 'google-ads', 'estrategia'],
  },

  'diseno-web': {
    titulo: 'Sitios que cargan rápido y consiguen consultas.',
    meta: {
      title: 'Diseño web para pymes: sitios, landings y tiendas',
      description:
        'Sitios, landings y tiendas online rápidos, medibles desde el primer día y a tu nombre. Next.js, WordPress o Tienda Nube según lo que vayas a hacer con el sitio.',
    },
    intro:
      'Hacemos sitios y landings para que quien llega entienda en segundos qué ofrecés y te escriba. Rápidos, medibles desde el primer día y armados para que después puedas actualizarlos sin depender de nadie.',
    paraQuien: [
      'Negocios que van a pautar y necesitan una página que convierta ese tráfico en consultas.',
      'Marcas con un sitio viejo, lento o que no se ve bien en el celular.',
      'Comercios que quieren vender online con Tienda Nube o con una tienda a medida.',
    ],
    cuandoNo:
      'Si tu sitio actual funciona, carga rápido y trae consultas, no lo cambies por estética. Lo medimos antes y te lo decimos.',
    incluye: [
      'Estructura y textos pensados desde lo que busca tu cliente, antes que el diseño.',
      'Diseño a medida, para celular primero.',
      'Desarrollo en la tecnología que corresponde: React y Next.js cuando importa la velocidad, WordPress cuando vas a editar mucho contenido, Tienda Nube para vender.',
      'Medición instalada: Analytics, Tag Manager y conversiones listas para pautar.',
      'Velocidad verificada con PageSpeed antes de entregar, y accesibilidad básica.',
      'Capacitación para que puedas cargar contenido vos.',
    ],
    proceso: [
      {
        titulo: 'Brief y estructura',
        texto:
          'Primera semana. Qué vendés, a quién y qué tiene que pasar cuando alguien entra. De ahí sale el mapa del sitio y los textos.',
      },
      {
        titulo: 'Diseño',
        texto:
          'Semanas dos y tres. Diseño en pantalla de cada página, primero en celular. Se aprueba antes de programar una línea.',
      },
      {
        titulo: 'Desarrollo y carga',
        texto:
          'Programamos, cargamos contenido y conectamos la medición. Vos ves el avance en una dirección de prueba.',
      },
      {
        titulo: 'Pruebas y publicación',
        texto:
          'Velocidad, celulares, formularios y accesibilidad revisados. Publicamos en tu dominio y te enseñamos a editarlo.',
      },
    ],
    faq: [
      {
        pregunta: '¿Cuánto tarda?',
        respuesta:
          'Una landing, entre una y dos semanas. Un sitio institucional, entre cuatro y seis. Una tienda, según el catálogo. Lo que más demora suele ser el contenido del lado del cliente; por eso arrancamos por los textos.',
      },
      {
        pregunta: '¿WordPress, Tienda Nube o a medida?',
        respuesta:
          'Depende de qué vas a hacer con el sitio. Si vas a publicar contenido seguido, WordPress. Si vas a vender productos, Tienda Nube. Si lo que importa es velocidad y conversión con poco contenido que cambie, a medida en Next.js. Te recomendamos uno y te explicamos por qué.',
      },
      {
        pregunta: '¿El sitio es mío?',
        respuesta:
          'Sí. Dominio, hosting y código quedan a tu nombre y con tus accesos. Podés seguir con nosotros para mantenerlo o llevártelo a otro lado.',
      },
      {
        pregunta: '¿Incluye el hosting y el dominio?',
        respuesta:
          'Te ayudamos a contratarlos a tu nombre y los configuramos. El costo anual lo pagás vos directo al proveedor, así nunca dependés de nosotros para renovar.',
      },
      {
        pregunta: 'Mi sitio actual es lento. ¿Se puede arreglar sin rehacerlo?',
        respuesta:
          'Muchas veces sí. Medimos con PageSpeed, buscamos las causas (imágenes pesadas, plugins, scripts de terceros) y las corregimos. Maxcer pasó de 31 a 87 en PageSpeed mobile sin tocar el diseño, en un día de trabajo.',
      },
    ],
    relacionados: ['desarrollo', 'seo-aeo', 'google-ads'],
    partners: [
      {
        id: 'tiendanube',
        texto: 'Agencia partner acreditada de Tiendanube: armamos y optimizamos tiendas dentro del ecosistema oficial.',
        // Enlace de partner: la tienda creada desde acá queda asociada a la
        // agencia, el cliente recibe descuento en el primer mes y Tiendanube
        // nos reconoce una comisión. Se dice tal cual; lo que no se dice es
        // lo que después parece escondido.
        enlace: 'https://www.tiendanube.com/partners/posicionarte-online',
        enlaceTexto: 'Creá tu tienda con nuestro enlace de partner',
        enlaceNota: 'Tiene descuento en el primer mes de un plan pago y a nosotros nos reconoce una comisión. Preferimos decirlo.',
      },
      {
        id: 'hostinger',
        texto: 'Hostinger Partner: alojamos y migramos sitios en un hosting que conocemos por dentro.',
        enlace: 'https://www.hostinger.com/ar?REFERRALCODE=POSICIONARTEON',
        enlaceTexto: 'Contratá tu hosting con nuestro enlace de partner',
        enlaceNota: 'Tiene 20 % de descuento en planes de 12 meses o más, y a nosotros nos reconoce una comisión. Preferimos decirlo.',
      },
    ],
  },

  'social-content': {
    titulo: 'Presencia constante, con criterio.',
    meta: {
      title: 'Social media y contenido para marcas',
      description:
        'Gestión de redes con plan mensual, producción de piezas y publicación. Contenido coordinado con la pauta y reporte de lo que trajo consultas.',
    },
    intro:
      'Gestionamos tus redes con un plan mensual, producimos el contenido y publicamos. El objetivo es que quien llegue a tu perfil desde un anuncio o una búsqueda encuentre una marca activa, clara y con algo para decir.',
    paraQuien: [
      'Marcas que ya tienen clientes y necesitan que las redes acompañen la venta y la pauta.',
      'Negocios sin tiempo ni equipo para producir contenido todas las semanas.',
      'Marcas con material propio (fotos, videos, novedades) que necesitan orden y constancia.',
    ],
    cuandoNo:
      'Si todavía no hay nada para mostrar ni presupuesto para producir, un perfil con tres publicaciones al mes hace más daño que uno quieto. Conviene arrancar por la base: marca, oferta y sitio.',
    incluye: [
      'Plan mensual de contenido alineado con lo que vendés ese mes.',
      'Producción: diseño de piezas, carruseles, videos cortos y textos.',
      'Publicación y programación en Instagram, Facebook, LinkedIn o TikTok según dónde esté tu público.',
      'Respuesta a comentarios y mensajes con criterio de marca, según el alcance que acordemos.',
      'Coordinación con la pauta: el contenido que funciona orgánico se convierte en anuncio.',
      'Reporte mensual: qué se publicó, qué funcionó y qué cambiamos.',
    ],
    proceso: [
      {
        titulo: 'Diagnóstico',
        texto:
          'Revisamos tus cuentas, qué publicaste hasta ahora y qué hace tu competencia. Definimos a quién le hablás y para qué.',
      },
      {
        titulo: 'Líneas y calendario',
        texto:
          'Tres o cuatro líneas de contenido que se repiten todos los meses, con formato y frecuencia definidos. Se aprueba antes de producir.',
      },
      {
        titulo: 'Producción y publicación',
        texto:
          'Cada mes producimos, te mostramos, ajustamos y publicamos. Vos aprobás el calendario una vez y el resto corre.',
      },
      {
        titulo: 'Revisión mensual',
        texto:
          'Qué funcionó, qué trajo consultas y qué cambiamos para el mes siguiente.',
      },
    ],
    faq: [
      {
        pregunta: '¿Cuántas publicaciones por mes?',
        respuesta:
          'Las que tu marca pueda sostener con calidad. Definimos la cantidad en el plan según tu rubro y tu material. Preferimos ocho piezas buenas a veinte de relleno.',
      },
      {
        pregunta: '¿Necesito hacer fotos y videos yo?',
        respuesta:
          'Ayuda mucho: nada reemplaza el material real de tu negocio. Te damos una guía simple para grabar con el celular y nosotros editamos. Cuando hace falta, coordinamos una jornada de producción.',
      },
      {
        pregunta: '¿Responden mensajes y comentarios?',
        respuesta:
          'Podemos, según lo que acordemos. Lo que nunca hacemos es cerrar ventas o dar precios sin tu aprobación: definimos juntos qué respondemos nosotros y qué te derivamos.',
      },
      {
        pregunta: '¿Cómo miden si funciona?',
        respuesta:
          'Alcance, interacción y, sobre todo, cuánta gente llega desde las redes al sitio o al WhatsApp. Un perfil que suma seguidores y no trae consultas se replantea.',
      },
    ],
    relacionados: ['meta-ads', 'diseno-web', 'estrategia'],
  },

  estrategia: {
    titulo: 'El plan antes que las herramientas.',
    meta: {
      title: 'Estrategia digital y consultoría para pymes',
      description:
        'Diagnóstico, objetivos medibles, plan de canales con presupuesto y hoja de ruta a seis meses. Consultoría uno a uno o ejecución con nosotros.',
    },
    intro:
      'Antes de pautar, rehacer el sitio o abrir una cuenta nueva, conviene saber qué necesita tu negocio y en qué orden. Trabajamos con vos para definir objetivos, canales, presupuesto y prioridades. Después ejecutamos, o te acompañamos mientras ejecutás con tu equipo.',
    paraQuien: [
      'Dueños de pymes que invierten en varias cosas a la vez y no saben cuál funciona.',
      'Negocios que van a lanzar un producto, una sucursal o una marca nueva.',
      'Equipos internos de marketing que necesitan un plan y una segunda mirada.',
    ],
    cuandoNo:
      'Si ya tenés claro qué hacer y solo necesitás manos, andá directo al servicio que corresponde. La estrategia sirve cuando la duda está en qué hacer y en qué orden.',
    incluye: [
      'Diagnóstico de tu presencia digital y de tu competencia.',
      'Objetivos medibles y definición del público al que le hablás.',
      'Plan de canales con presupuesto y orden de prioridad.',
      'Mapa de medición: qué se mide, dónde y cómo se reporta.',
      'Hoja de ruta a seis meses con hitos.',
      'Consultoría uno a uno para revisarla y ajustarla.',
    ],
    proceso: [
      {
        titulo: 'Reunión de diagnóstico',
        texto:
          'Una hora. Qué vendés, a quién, cuánto cuesta y qué hiciste hasta ahora en digital, aunque no haya funcionado.',
      },
      {
        titulo: 'Análisis',
        texto:
          'Una o dos semanas. Miramos tus cuentas, tu sitio, tu competencia y lo que busca tu cliente.',
      },
      {
        titulo: 'Presentación del plan',
        texto:
          'Un documento que puedas leer sin traductor: qué hacer, en qué orden, con qué presupuesto y cómo vas a saber si funciona.',
      },
      {
        titulo: 'Acompañamiento',
        texto:
          'Lo ejecutamos nosotros, lo ejecuta tu equipo con sesiones de revisión, o una mezcla. Vos elegís.',
      },
    ],
    faq: [
      {
        pregunta: '¿Es una consultoría o después lo ejecutan ustedes?',
        respuesta:
          'Las dos opciones. Podés llevarte el plan y ejecutarlo con tu equipo, o encargarnos la ejecución de las partes que quieras.',
      },
      {
        pregunta: '¿Cuánto dura?',
        respuesta:
          'El diagnóstico y el plan llevan entre dos y tres semanas. La consultoría uno a uno se contrata por sesión o por mes.',
      },
      {
        pregunta: '¿Sirve si mi negocio es chico?',
        respuesta:
          'Sobre todo si es chico. Con presupuesto acotado, elegir mal el canal cuesta el año. El plan te evita pagar por aprender en el orden equivocado.',
      },
      {
        pregunta: '¿Qué necesito traer a la primera reunión?',
        respuesta:
          'Qué vendés, a quién, cuánto cuesta y qué hiciste hasta ahora en digital, aunque no haya funcionado. Con eso alcanza para arrancar.',
      },
    ],
    relacionados: ['google-ads', 'meta-ads', 'seo-aeo'],
  },
  desarrollo: {
    titulo: 'Lo que ninguna herramienta de estante resuelve.',
    meta: {
      title: 'Desarrollo a medida: software, integraciones, automatizaciones e IA',
      description:
        'Aplicaciones web con usuarios y paneles, integraciones entre sistemas, automatizaciones y agentes con IA. Código a tu nombre, entregas por etapas y mantenimiento opcional.',
    },
    intro:
      'Cuando el negocio necesita algo que no existe en el mercado, lo construimos: una plataforma con usuarios y paneles, una integración entre dos sistemas que no se hablan, un flujo que corre solo o un agente con IA que atiende y clasifica. Código propio, entregado por etapas y a tu nombre.',
    paraQuien: [
      'Negocios con un proceso que hoy se hace a mano, en planillas o por WhatsApp, y ya no escala.',
      'Empresas que necesitan que sus sistemas se conecten: tienda con facturación, CRM con WhatsApp, formularios con la base de datos.',
      'Marcas que quieren atender consultas las 24 horas con un agente que califique y derive, sin perder el tono humano.',
    ],
    cuandoNo:
      'Si lo que necesitás ya lo resuelve bien una herramienta existente (una tienda en Tienda Nube, un CRM de mercado, un formulario), te lo decimos y te ayudamos a configurarla. Desarrollar a medida cuesta más y se justifica cuando el estándar te queda chico.',
    incluye: [
      'Relevamiento del proceso real, con la gente que lo hace, antes de escribir una línea.',
      'Alcance por etapas con precio cerrado por etapa: sabés qué recibís y cuándo.',
      'Aplicaciones web con React, TypeScript y Next.js; base de datos en Supabase; publicación en Vercel.',
      'Integraciones por API y automatizaciones con n8n o código, con registro de errores y avisos.',
      'Agentes y chatbots con IA conectados a tus datos, con reglas claras de qué responden y qué derivan.',
      'Código en un repositorio a tu nombre, documentación y capacitación para tu equipo.',
    ],
    proceso: [
      {
        titulo: 'Relevamiento',
        texto:
          'Una o dos reuniones con quienes hacen el trabajo hoy. Salimos con el proceso dibujado, los casos raros incluidos, y una lista de qué automatizar y qué no.',
      },
      {
        titulo: 'Propuesta por etapas',
        texto:
          'Dividimos el proyecto en entregas que sirven solas. La primera etapa siempre es la que más dolor saca, para que empieces a usarlo antes de que termine todo.',
      },
      {
        titulo: 'Construcción',
        texto:
          'Entregas cada una o dos semanas en una dirección de prueba. Vos probás con datos reales y ajustamos sobre la marcha, no al final.',
      },
      {
        titulo: 'Publicación y mantenimiento',
        texto:
          'Publicamos en tu cuenta, entregamos el código y la documentación. Después podés seguir con nosotros con mantenimiento mensual o llevarlo a otro equipo.',
      },
    ],
    faq: [
      {
        pregunta: '¿Cuánto cuesta desarrollar algo a medida?',
        respuesta:
          'Depende del alcance, y por eso arrancamos con un relevamiento corto antes de pasar precio. Lo que sí te adelantamos: cotizamos por etapa con precio cerrado, no por hora abierta, y la primera etapa suele ser chica para que valides con poco.',
      },
      {
        pregunta: '¿El código es mío?',
        respuesta:
          'Sí. Queda en un repositorio a tu nombre, publicado en cuentas tuyas (Vercel, Supabase, el proveedor que corresponda). Si mañana lo sigue otro equipo, tiene todo para hacerlo.',
      },
      {
        pregunta: '¿Con qué tecnología trabajan?',
        respuesta:
          'React, TypeScript y Next.js para las aplicaciones; Supabase para base de datos y usuarios; Vercel para publicar; n8n para automatizaciones; y los modelos de IA que mejor resuelvan cada caso. Es el mismo stack con el que está hecho nuestro sitio y nuestro CRM.',
      },
      {
        pregunta: '¿Pueden conectar el sistema que ya uso?',
        respuesta:
          'Si tiene API, casi seguro. Si no la tiene, buscamos la vía: exportaciones programadas, correo, planillas compartidas. Lo primero que hacemos en el relevamiento es confirmar qué se puede conectar y cómo.',
      },
      {
        pregunta: '¿Un chatbot con IA me va a contestar cualquier cosa?',
        respuesta:
          'No, si está bien armado. Definimos juntos qué responde, con qué información y cuándo deriva a una persona. Registramos cada conversación y las revisamos las primeras semanas para ajustar. Un agente que inventa precios es peor que ninguno.',
      },
      {
        pregunta: '¿Qué pasa cuando termina el proyecto?',
        respuesta:
          'Podés seguir con nosotros con un mantenimiento mensual (actualizaciones, mejoras, soporte) o quedarte con el código y la documentación. Las dos opciones están previstas desde el contrato.',
      },
    ],
    relacionados: ['diseno-web', 'estrategia', 'google-ads'],
  },
};

/** Catálogo completo: datos cortos de marca.js más el contenido largo de acá. */
export const PAGINAS_SERVICIO = SERVICIOS.map((s) => {
  const contenido = CONTENIDO[s.slug];
  if (!contenido) throw new Error(`servicios.js: falta el contenido de "${s.slug}"`);
  return { ...s, ...contenido };
});

export function servicioPorSlug(slug) {
  return PAGINAS_SERVICIO.find((s) => s.slug === slug) || null;
}
