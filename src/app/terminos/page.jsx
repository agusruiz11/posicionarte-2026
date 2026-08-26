import PaginaLegal from '@/components/PaginaLegal';
import Link from 'next/link';
import { MARCA, CONTACTO, UBICACION } from '@/data/marca';

export const metadata = {
  title: 'Términos de uso',
  description:
    'Condiciones de uso del sitio posicionarte.online: alcance de la información publicada, propiedad intelectual, enlaces a terceros y responsabilidad.',
  alternates: { canonical: '/terminos' },
  openGraph: {
    url: '/terminos',
    title: 'Términos de uso | Posicionarte Online',
    description: 'Condiciones de uso del sitio de Posicionarte Online.',
  },
  robots: { index: true, follow: true },
};

export default function TerminosPage() {
  return (
    <PaginaLegal titulo="Términos de uso" actualizado="25 de agosto de 2026">
      <p>
        Estas condiciones regulan el uso del sitio <strong>posicionarte.online</strong>, operado por{' '}
        {MARCA.nombre}. Al navegarlo, las aceptás. No regulan la prestación de nuestros servicios:
        eso se acuerda por escrito con cada cliente en un contrato aparte.
      </p>

      <h2>Qué es este sitio</h2>
      <p>
        Un sitio institucional donde presentamos qué hacemos, cómo trabajamos y con quién trabajamos,
        y desde donde se puede contactarnos. La información que publicamos es de carácter general y
        no constituye asesoramiento profesional para un caso concreto. Cada negocio es distinto: lo
        que decimos acá no reemplaza un diagnóstico de tu situación.
      </p>

      <h2>Sobre lo que publicamos</h2>
      <p>
        Procuramos que todo lo que está en el sitio sea exacto y esté actualizado, pero puede
        contener errores o quedar desactualizado. Los servicios, alcances y modalidades pueden
        cambiar sin aviso previo.
      </p>
      <p>
        Cuando publicamos resultados de clientes, lo hacemos con su autorización y aclarando de dónde
        sale cada dato. Los resultados de un cliente no son una promesa de resultados para otro:
        dependen del mercado, del presupuesto, del producto y del momento.
      </p>

      <h2>Clientes y marcas de terceros</h2>
      <p>
        Los nombres, logotipos y marcas de nuestros clientes aparecen en el sitio a título
        identificatorio de trabajos realizados y siguen siendo propiedad de sus titulares. Si sos
        titular de una marca que aparece acá y querés que la retiremos, escribinos a{' '}
        <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a> y lo hacemos.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, el diseño, el código y las piezas gráficas propias de este sitio pertenecen a{' '}
        {MARCA.nombre}. Podés citarlos mencionando la fuente y enlazando al original. No podés
        reproducirlos íntegramente ni usarlos con fines comerciales sin nuestra autorización escrita.
      </p>
      <p>
        Los materiales descargables, como el Benchmark Inmobiliario, son de uso interno de quien los
        descarga. Se pueden citar mencionando la fuente; no se pueden revender ni redistribuir como
        propios.
      </p>

      <h2>Enlaces a otros sitios</h2>
      <p>
        El sitio enlaza a sitios de clientes, a redes sociales y a WhatsApp. No controlamos esos
        sitios ni respondemos por su contenido, su disponibilidad ni sus políticas de privacidad.
      </p>

      <h2>Uso permitido</h2>
      <p>Al usar el sitio te comprometés a no:</p>
      <ul>
        <li>Usar los formularios para enviar publicidad no solicitada, spam o contenido ilícito.</li>
        <li>Intentar acceder a partes del sitio o a sistemas que no sean públicos.</li>
        <li>Automatizar envíos de formularios o generar carga artificial sobre el sitio.</li>
        <li>Suplantar la identidad de otra persona al contactarnos.</li>
      </ul>
      <p>
        Los formularios tienen mecanismos automáticos contra envíos de bots. Un envío legítimo nunca
        se ve afectado.
      </p>

      <h2>Disponibilidad</h2>
      <p>
        Hacemos lo posible por mantener el sitio en línea, pero no garantizamos disponibilidad
        ininterrumpida. Podemos suspenderlo por mantenimiento o por causas ajenas a nosotros.
      </p>

      <h2>Datos personales</h2>
      <p>
        El tratamiento de los datos que nos dejás está explicado en nuestra{' '}
        <Link href="/privacidad">política de privacidad</Link>.
      </p>

      <h2>Ley aplicable</h2>
      <p>
        Estas condiciones se rigen por las leyes de la República {UBICACION.paisNombre === 'Argentina' ? 'Argentina' : UBICACION.paisNombre}.
        Ante cualquier controversia, las partes se someten a los tribunales ordinarios competentes,
        renunciando a cualquier otro fuero.
      </p>

      <h2>Contacto</h2>
      <p>
        Cualquier duda sobre estos términos: <a href={`mailto:${CONTACTO.email}`}>{CONTACTO.email}</a>{' '}
        o WhatsApp al {CONTACTO.telefonoVisible}.
      </p>
    </PaginaLegal>
  );
}
