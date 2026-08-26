import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_TYPE = 'image/png';

/**
 * Imagen de Open Graph, generada en el build.
 *
 * Antes las cinco rutas apuntaban a `/og-image.jpg`, que no existía: todo lo
 * que se compartía de posicionarte.online en WhatsApp, LinkedIn o Facebook
 * salía sin imagen. Generarlas acá en vez de subir archivos sueltos evita que
 * el título de la tarjeta y el de la página se desincronicen.
 *
 * Sin fuentes externas a propósito: bajar una tipografía durante el build es
 * una dependencia de red más que puede tirar el deploy abajo.
 */
export function ogImage({ titulo, bajada, etiqueta }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0C0C0C',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* franja de marca */}
        <div style={{ display: 'flex', position: 'absolute', top: 0, left: 0, width: '100%', height: 10, background: '#3256D7' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              background: '#3256D7',
              color: '#FFFFFF',
              fontSize: 30,
              fontWeight: 700,
              padding: '10px 22px',
              borderRadius: 12,
              letterSpacing: -0.5,
            }}
          >
            Posicionarte
          </div>
          {etiqueta ? (
            <div style={{ display: 'flex', color: '#6F8BFF', fontSize: 24, fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase' }}>
              {etiqueta}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              display: 'flex',
              color: '#FFFFFF',
              fontSize: titulo.length > 42 ? 62 : 76,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            {titulo}
          </div>
          {bajada ? (
            <div style={{ display: 'flex', color: '#A1A7B3', fontSize: 30, lineHeight: 1.35, maxWidth: 900 }}>
              {bajada}
            </div>
          ) : null}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', color: '#6F8BFF', fontSize: 26, fontWeight: 600 }}>
            posicionarte.online
          </div>
          <div style={{ display: 'flex', color: '#8A909C', fontSize: 26 }}>
            Sin paquetes. A medida.
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
