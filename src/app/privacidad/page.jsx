import PaginaLegal from '@/components/PaginaLegal';
import { MARCA, CONTACTO, UBICACION } from '@/data/marca';

export const metadata = {
  title: 'Política de privacidad',
  description:
    'Qué datos personales recolecta posicionarte.online, para qué los usa, con quién los comparte y cómo ejercer tus derechos según la Ley 25.326.',
  alternates: { canonical: '/privacidad' },
  openGraph: {
    url: '/privacidad',
    title: 'Política de privacidad | Posicionarte Online',
    description: 'Qué datos recolectamos, para qué los usamos y cómo ejercer tus derechos.',
  },
  robots: { index: true, follow: true },
};

export default function PrivacidadPage() {
  return (
    <PaginaLegal titulo="Política de privacidad" actualizado="25 de agosto de 2026">
      <p>
        Esta política explica qué datos personales recolecta {MARCA.nombre} a través de{' '}
        <strong>posicionarte.online</strong>, para qué los usa, con quién los comparte y qué podés
        hacer al respecto. Está escrita para que se entienda, no para cubrirnos.
      </p>

      <h2>Quién es responsable</h2>
      <p>
        {MARCA.nombre}, agencia de marketing digital con base en {UBICACION.visible} y actividad
        íntegramente remota, es responsable del tratamiento de los datos que se recolectan en este
        sitio. Para cualquier consulta sobre privacidad podés escribir a{' '}
        <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a> o por WhatsApp al{' '}
        {CONTACTO.telefonoVisible}.
      </p>

      <h2>Qué datos recolectamos</h2>

      <h3>Los que nos das vos</h3>
      <p>Cuando completás alguno de los formularios del sitio:</p>
      <table>
        <thead>
          <tr>
            <th>Formulario</th>
            <th>Datos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Contacto</td>
            <td>Nombre, email y el mensaje que escribas.</td>
          </tr>
          <tr>
            <td>Descarga del Benchmark Inmobiliario</td>
            <td>
              Nombre, nombre de la inmobiliaria, email, teléfono (opcional) y el rango de inversión
              digital que indiques.
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        No pedimos datos sensibles y te pedimos que no los incluyas en el campo de mensaje: no
        necesitamos información sobre tu salud, tus creencias, tu orientación sexual ni tus datos
        financieros para responderte.
      </p>

      <h3>Los que registra el sitio</h3>
      <p>
        Cuando llegás a posicionarte.online guardamos en tu navegador de dónde veniste, para saber
        qué campaña o qué canal funciona. Concretamente: los identificadores de campaña de Google y
        de Meta (<em>gclid</em>, <em>fbclid</em> y equivalentes), los parámetros UTM de la URL, el
        sitio que te trajo, la página por la que entraste y si estás en celular o computadora.
      </p>
      <p>
        Esa información viaja junto con el formulario si después completás uno. Si no completás
        ninguno, se queda en tu navegador y no llega a nosotros.
      </p>

      <h3>Métricas de uso</h3>
      <p>
        Usamos Google Analytics y Google Tag Manager para entender cómo se usa el sitio: qué páginas
        se visitan, cuánto se baja en cada una, qué botones se tocan. Usamos también Vercel Analytics
        y Speed Insights, que miden la velocidad del sitio sin usar cookies ni identificar personas.
      </p>
      <p>
        Si tenés instalado un bloqueador de rastreadores o activaste "Do Not Track", esas mediciones
        no se ejecutan y el sitio funciona igual.
      </p>

      <h2>Para qué usamos los datos</h2>
      <ul>
        <li>Responder tu consulta y darle seguimiento comercial.</li>
        <li>Enviarte el material que pediste, como el Benchmark Inmobiliario.</li>
        <li>Entender qué canales nos traen consultas, para invertir mejor.</li>
        <li>Mejorar el sitio: qué se lee, qué no, dónde se abandona un formulario.</li>
      </ul>
      <p>
        <strong>No vendemos tus datos.</strong> No los cedemos a terceros para que te ofrezcan sus
        productos. No armamos perfiles para revenderlos.
      </p>

      <h2>Con quién los compartimos</h2>
      <p>
        Solo con los proveedores que necesitamos para que el sitio funcione, y solo en la medida en
        que lo necesitan:
      </p>
      <table>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>Para qué</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vercel</td>
            <td>Alojamiento del sitio y métricas de rendimiento.</td>
          </tr>
          <tr>
            <td>Resend</td>
            <td>Envío del mail con tu consulta a nuestro equipo.</td>
          </tr>
          <tr>
            <td>Google</td>
            <td>Analytics, Tag Manager y medición de campañas de Google Ads.</td>
          </tr>
          <tr>
            <td>Meta</td>
            <td>Medición de campañas de Facebook e Instagram.</td>
          </tr>
        </tbody>
      </table>
      <p>
        Varios de estos proveedores están fuera de Argentina, así que tus datos pueden procesarse en
        otros países. Trabajamos con proveedores que ofrecen garantías contractuales de protección
        de datos.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>
        Las consultas quedan en nuestro sistema mientras dure la relación comercial y hasta dos años
        después del último contacto, por si retomás. Pasado ese plazo se eliminan. Si nos pedís que
        los borremos antes, los borramos antes.
      </p>

      <h2>Tus derechos</h2>
      <p>
        La Ley 25.326 de Protección de los Datos Personales te da derecho a acceder a tus datos,
        rectificarlos si están mal, actualizarlos y pedir que los suprimamos. Escribinos a{' '}
        <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a> y te respondemos dentro de los
        diez días corridos, sin costo.
      </p>
      <p>
        La ley prevé que podés ejercer el derecho de acceso de forma gratuita a intervalos no
        menores a seis meses.
      </p>
      <p>
        La <strong>Agencia de Acceso a la Información Pública</strong>, órgano de control de la Ley
        25.326, tiene la atribución de atender denuncias y reclamos de quienes vean afectados sus
        derechos por incumplimiento de las normas vigentes en materia de protección de datos
        personales.
      </p>

      <h2>Cookies</h2>
      <p>
        El sitio usa cookies propias para recordar si elegiste el modo claro u oscuro, y cookies de
        Google Analytics para medir el uso. Podés bloquearlas desde la configuración de tu navegador;
        si lo hacés, el sitio sigue funcionando, solo dejamos de contarte en las métricas.
      </p>

      <h2>Menores de edad</h2>
      <p>
        Este sitio está dirigido a personas que buscan servicios para su negocio. No recolectamos
        datos de menores de 18 años a sabiendas. Si detectamos que recibimos datos de un menor, los
        eliminamos.
      </p>

      <h2>Cambios</h2>
      <p>
        Si cambiamos esta política, actualizamos la fecha del encabezado. Si el cambio afecta cómo
        usamos datos que ya nos diste, te avisamos por mail antes de aplicarlo.
      </p>
    </PaginaLegal>
  );
}
