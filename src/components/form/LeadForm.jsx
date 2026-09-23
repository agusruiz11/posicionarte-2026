'use client';

import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { EVENTS, track, trackConversion, whatsappUrl, trackWhatsApp } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';
import { FORMULARIOS, CAMPOS } from '@/data/formularios';

/**
 * Formulario de captura, único para todo el sitio.
 *
 * Reemplaza tres formularios que hacían casi lo mismo con tres validaciones
 * distintas. Qué campos muestra sale de `@/data/formularios`, que es la misma
 * tabla contra la que valida el servidor.
 *
 * Captura progresiva: al entrar se ven pocos campos. Los de calificación
 * aparecen cuando la persona empieza a escribir. Un formulario que se ve corto
 * se empieza más; uno ya empezado se termina aunque crezca. Así pedimos más
 * datos sin pagar el costo de asustar en la primera mirada.
 *
 * El error se muestra dentro del formulario, no solo en un toast: el toast se
 * va solo y quien usa lector de pantalla o volvió a la pestaña cinco minutos
 * después no se entera de nada.
 */

const claseCampo =
  'rounded-2xl bg-surface-2 border-hairline text-ink placeholder:text-ink-subtle ' +
  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

function Campo({ nombre, formId, valor, onChange, requerido, invalido }) {
  const def = CAMPOS[nombre];
  const id = `${formId}-${nombre}`;
  const idAyuda = def.ayuda ? `${id}-ayuda` : undefined;

  const comunes = {
    id,
    value: valor || '',
    onChange,
    required: requerido,
    maxLength: def.maximo,
    'aria-describedby': idAyuda,
    'aria-invalid': invalido || undefined,
  };

  if (def.tipo === 'radio') {
    return (
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-ink-muted mb-2">
          {def.etiqueta} {requerido && <span className="text-destructive-text">*</span>}
        </legend>
        {def.opciones.map((o) => (
          <label
            key={o.valor}
            htmlFor={`${id}-${o.valor}`}
            className="flex items-center gap-3 cursor-pointer text-sm text-ink"
          >
            <input
              type="radio"
              id={`${id}-${o.valor}`}
              name={id}
              value={o.valor}
              checked={valor === o.valor}
              onChange={onChange}
              required={requerido}
              className="w-4 h-4 accent-primary cursor-pointer"
            />
            {o.etiqueta}
          </label>
        ))}
      </fieldset>
    );
  }

  return (
    <div>
      <Label htmlFor={id} className="text-ink-muted">
        {def.etiqueta} {requerido && <span className="text-destructive-text">*</span>}
      </Label>

      {def.tipo === 'textarea' ? (
        <Textarea {...comunes} placeholder={def.placeholder} rows={4} className={claseCampo} />
      ) : def.tipo === 'select' ? (
        <select
          {...comunes}
          className={`${claseCampo} flex h-10 w-full px-3 py-2 text-sm border focus-visible:outline-none`}
        >
          <option value="">{def.placeholder}</option>
          {def.opciones.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.etiqueta}
            </option>
          ))}
        </select>
      ) : (
        <Input
          {...comunes}
          type={def.tipo}
          placeholder={def.placeholder}
          autoComplete={def.autoComplete}
          className={claseCampo}
        />
      )}

      {def.ayuda && (
        <p id={idAyuda} className="mt-1 text-xs text-ink-subtle">
          {def.ayuda}
        </p>
      )}
    </div>
  );
}

export default function LeadForm({
  formId,
  onExito,
  textoExito = 'Gracias. Te respondemos dentro de las próximas 24 horas hábiles.',
  tituloExito = 'Mensaje enviado',
  className = '',
  // Valores con los que arranca el formulario. Las páginas de servicio lo usan
  // para dejar "Qué te interesa" ya elegido: el campo sigue en el bloque
  // extra, pero el dato viaja igual aunque el visitante no lo despliegue.
  valoresIniciales = {},
}) {
  const config = FORMULARIOS[formId];
  if (!config) throw new Error(`LeadForm: no existe el formulario "${formId}"`);

  const [datos, setDatos] = useState(valoresIniciales);
  const [consent, setConsent] = useState(false);
  const [novedades, setNovedades] = useState(false);
  const [estado, setEstado] = useState('idle'); // idle | enviando | listo
  const [error, setError] = useState(null);
  const [expandido, setExpandido] = useState(false);

  const empezado = useRef(false);
  const abiertoEn = useRef(Date.now());
  const cajaError = useRef(null);

  const marcarInicio = useCallback(() => {
    if (empezado.current) return;
    empezado.current = true;
    setExpandido(true);
    track(EVENTS.FORM_START, { form_id: formId });
  }, [formId]);

  const set = (campo) => (e) => {
    marcarInicio();
    const v = e.target.value;
    setDatos((d) => ({ ...d, [campo]: v }));
  };

  const enviar = async (e) => {
    e.preventDefault();
    setError(null);
    setEstado('enviando');

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...datos,
          ...getAttribution(),
          form_id: formId,
          page_path: window.location.pathname,
          acepta_novedades: novedades,
          form_elapsed_ms: Date.now() - abiertoEn.current,
        }),
      });

      const cuerpo = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(cuerpo.error || 'No pudimos enviar el formulario. Probá de nuevo.');
        setEstado('idle');
        // El foco va al error: si no, quien navega por teclado no se entera de
        // que el envío falló y vuelve a apretar el botón.
        requestAnimationFrame(() => cajaError.current?.focus());
        return;
      }

      trackConversion(EVENTS.GENERATE_LEAD, {
        form_id: formId,
        ...(datos.serviceInterest ? { servicio_interes: datos.serviceInterest } : {}),
        ...(datos.investmentRange ? { rango_inversion: datos.investmentRange } : {}),
        ...(datos.budget ? { presupuesto: datos.budget } : {}),
        ...(datos.objective ? { objetivo: datos.objective } : {}),
      });

      setEstado('listo');
      onExito?.(datos);
    } catch {
      setError('No pudimos conectar con el servidor. Revisá tu conexión y probá de nuevo.');
      setEstado('idle');
      requestAnimationFrame(() => cajaError.current?.focus());
    }
  };

  if (estado === 'listo') {
    return (
      <div
        className={`rounded-3xl border border-hairline bg-surface-2 p-8 text-center ${className}`}
        role="status"
      >
        <CheckCircle2 className="mx-auto mb-4 text-primary" size={40} aria-hidden="true" />
        <p className="text-xl font-bold text-ink mb-2">{tituloExito}</p>
        <p className="text-ink-muted leading-relaxed max-w-sm mx-auto">{textoExito}</p>

        <p className="mt-6 text-sm text-ink-subtle">
          ¿Es urgente?{' '}
          <a
            href={whatsappUrl(`gracias-${formId}`, 'Hola, acabo de escribirles por el sitio.')}
            onClick={() => trackWhatsApp(`gracias-${formId}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-semibold underline underline-offset-2 hover:no-underline"
          >
            Escribinos por WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  const visibles = expandido ? [...config.base, ...config.extra] : config.base;

  return (
    <form onSubmit={enviar} className={`space-y-6 ${className}`} noValidate={false}>
      {/* honeypot — fuera de la vista y fuera del recorrido por teclado, así que
          una persona nunca lo completa. Los bots que rellenan todo, sí. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
        <label htmlFor={`${formId}-website-url`}>No completar</label>
        <input
          id={`${formId}-website-url`}
          name="website_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value=""
          onChange={() => {}}
        />
      </div>

      <div className="space-y-5">
        {visibles.map((campo) => (
          <Campo
            key={campo}
            nombre={campo}
            formId={formId}
            valor={datos[campo]}
            onChange={set(campo)}
            requerido={config.requeridos.includes(campo)}
            invalido={Boolean(error)}
          />
        ))}
      </div>

      {error && (
        <div
          ref={cajaError}
          tabIndex={-1}
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <AlertCircle size={18} className="mt-0.5 flex-shrink-0 text-destructive-text" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <label htmlFor={`${formId}-consent`} className="flex items-start gap-3 cursor-pointer">
        <input
          id={`${formId}-consent`}
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 flex-shrink-0 accent-primary cursor-pointer"
        />
        <span className="text-sm text-ink-muted leading-snug">
          Acepto que usen mis datos para responder mi consulta, según la{' '}
          <Link href="/privacidad" className="text-brand underline underline-offset-2 hover:no-underline">
            política de privacidad
          </Link>
          .
        </span>
      </label>

      {/* Suscripción aparte, sin tildar por defecto. Meter a alguien en una
          lista de difusión con el mismo tilde con el que acepta que le
          respondan es lo que termina mandando el dominio a spam. */}
      {config.newsletter && (
        <label htmlFor={`${formId}-novedades`} className="flex items-start gap-3 cursor-pointer">
          <input
            id={`${formId}-novedades`}
            type="checkbox"
            checked={novedades}
            onChange={(e) => setNovedades(e.target.checked)}
            className="mt-1 w-4 h-4 flex-shrink-0 accent-primary cursor-pointer"
          />
          <span className="text-sm text-ink-muted leading-snug">
            Quiero recibir los próximos informes y análisis del sector. Sin spam, y te
            podés dar de baja en cualquier momento.
          </span>
        </label>
      )}

      <Button
        type="submit"
        disabled={estado === 'enviando' || !consent}
        className="w-full bg-primary hover:bg-primary-hover text-white rounded-full py-6 text-base font-semibold disabled:opacity-60"
      >
        {estado === 'enviando' ? config.botonEnviando : config.boton}
      </Button>
    </form>
  );
}
