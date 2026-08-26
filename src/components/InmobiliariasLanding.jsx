'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useReducedMotion } from '@/lib/use-reduced-motion';
import { EASE } from '@/lib/motion';
import { X, Download, CheckCircle, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { BENCHMARK } from '@/data/benchmark';
import { EVENTS, track, trackConversion } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';
import CamposLegales from '@/components/form/CamposLegales';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import Section from '@/components/Section';

// ─── Skyline SVG ──────────────────────────────────────────────────────────────

const BUILDINGS = [
  { x: 2,   w: 38,  h: 70  },
  { x: 48,  w: 24,  h: 100 },
  { x: 80,  w: 50,  h: 145 },
  { x: 138, w: 30,  h: 88  },
  { x: 176, w: 44,  h: 175 },
  { x: 228, w: 20,  h: 110 },
  { x: 256, w: 60,  h: 200 },
  { x: 324, w: 20,  h: 120 },
  { x: 352, w: 48,  h: 165 },
  { x: 408, w: 30,  h: 90  },
  { x: 446, w: 52,  h: 140 },
  { x: 506, w: 28,  h: 95  },
  { x: 542, w: 44,  h: 115 },
  { x: 594, w: 36,  h: 75  },
  { x: 638, w: 50,  h: 130 },
  { x: 696, w: 30,  h: 80  },
  { x: 734, w: 46,  h: 100 },
  { x: 788, w: 28,  h: 60  },
];

const SkylineSVG = ({ isInView, reduced }) => (
  <svg viewBox="0 0 820 200" className="w-full" aria-hidden="true" preserveAspectRatio="xMidYMax meet">
    {BUILDINGS.map((b, i) => (
      <motion.rect
        key={i}
        x={b.x}
        width={b.w}
        rx={2}
        fill="currentColor"
        className="text-ink/10 /[0.06]"
        initial={{ y: 200, height: 0 }}
        animate={isInView ? { y: 200 - b.h, height: b.h } : { y: 200, height: 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.7, delay: i * 0.04, ease: EASE }}
      />
    ))}
    <line x1="0" y1="200" x2="820" y2="200" stroke="currentColor" strokeWidth="1" className="text-gray-200 dark:text-gray-800" />
  </svg>
);

// ─── Video player ─────────────────────────────────────────────────────────────

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  // Arranca en pausa. Antes tenía autoPlay sin `preload`, así que la landing
  // se descargaba 11,7 MB de video antes de que nadie decidiera verlo — en
  // celular eso es la conversión antes de leer el titular.
  const [playing, setPlaying] = useState(false);
  const [iniciado, setIniciado] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [hovered, setHovered] = useState(false);
  const hideTimer = useRef(null);

  const showControls = hovered || !playing;

  const handleMouseEnter = () => {
    clearTimeout(hideTimer.current);
    setHovered(true);
  };

  const handleMouseLeave = () => {
    hideTimer.current = setTimeout(() => setHovered(false), 300);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuted = !muted;
    videoRef.current.muted = newMuted;
    setMuted(newMuted);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      if (!iniciado) {
        setIniciado(true);
        track(EVENTS.CTA_CLICK, { cta_text: 'Reproducir video', cta_location: 'inmobiliarias' });
      }
      videoRef.current.play();
    }
    setPlaying((p) => !p);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const handleSeek = (e) => {
    if (!videoRef.current) return;
    const t = Number(e.target.value);
    videoRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleVolume = (e) => {
    if (!videoRef.current) return;
    const v = Number(e.target.value);
    videoRef.current.volume = v;
    videoRef.current.muted = v === 0;
    setVolume(v);
    setMuted(v === 0);
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const pct = duration ? (currentTime / duration) * 100 : 0;
  const volPct = muted ? 0 : volume * 100;

  const rangeStyle = (fill) => ({
    background: `linear-gradient(to right, rgba(255,255,255,0.9) ${fill}%, rgba(255,255,255,0.25) ${fill}%)`,
  });

  return (
    <div
      className="relative mx-auto w-full max-w-[340px] md:w-[320px] lg:w-[360px] aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        poster="/videos/video-landing-inmobiliaria-poster.jpg"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Video de presentación del Benchmark Inmobiliario"
      >
        <source src="/videos/video-landing-inmobiliaria.mp4" type="video/mp4" />
      </video>

      {/* Botón de play grande sobre el póster, hasta que alguien lo arranca */}
      {!iniciado && (
        <button
          onClick={togglePlay}
          aria-label="Reproducir el video de presentación"
          className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors group"
        >
          <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/95 text-[#0C0C0C] shadow-xl group-hover:scale-105 transition-transform">
            <Play size={26} className="ml-1" fill="currentColor" />
          </span>
        </button>
      )}

      {/* Gradiente inferior */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none transition-opacity duration-300"
        style={{ opacity: showControls ? 1 : 0 }}
      />

      {/* Controles */}
      <div
        className="absolute bottom-0 left-0 right-0 px-3 pb-3 flex flex-col gap-2 transition-opacity duration-300"
        style={{ opacity: showControls ? 1 : 0 }}
      >
        {/* Línea de tiempo */}
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          style={rangeStyle(pct)}
          className="w-full h-1 appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
          aria-label="Línea de tiempo"
        />

        {/* Fila de controles */}
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            aria-label={playing ? 'Pausar video' : 'Reproducir video'}
            className="flex items-center justify-center w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/85 transition-colors flex-shrink-0"
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
          </button>

          {/* El contador flotaba directo sobre el video: sobre un fotograma
              claro desaparecía. Va con el mismo fondo que el botón de play, que
              es lo que le garantiza contraste sin importar qué se esté viendo. */}
          <span className="text-white text-[11px] tabular-nums flex-shrink-0 rounded-full bg-black/70 backdrop-blur-sm px-2 py-0.5">
            {fmt(currentTime)} / {fmt(duration)}
          </span>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={toggleMute}
              aria-label={muted ? 'Activar sonido' : 'Silenciar'}
              className="flex items-center justify-center w-7 h-7 rounded-full bg-black/70 backdrop-blur-sm text-white hover:bg-black/85 transition-colors flex-shrink-0"
            >
              {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={handleVolume}
              style={rangeStyle(volPct)}
              className="w-16 h-1 appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-sm"
              aria-label="Volumen"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Opciones de inversión ────────────────────────────────────────────────────

const INVERSION_OPTIONS = [
  { value: 'si_menos_500',     label: 'Sí, menos de 500 USD' },
  { value: 'si_500_1000',      label: 'Sí, entre 500 y 1.000 USD' },
  { value: 'si_mas_1000',      label: 'Sí, más de 1.000 USD' },
  { value: 'no',               label: 'No, nada' },
  { value: 'no_contesta',      label: 'Prefiero no contestar' },
];

const PDF_PATH     = BENCHMARK.archivo;
const PDF_FILENAME = BENCHMARK.nombreDescarga;

// ─── Modal de descarga ────────────────────────────────────────────────────────

const DownloadModal = ({ abierto, onAbrir, disparadorRef }) => {
  const { toast } = useToast();
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inversion: '',
  });
  const [consent, setConsent] = useState(false);
  // Marca de tiempo de apertura: un envío casi instantáneo es un bot.
  const abiertoEn = useRef(Date.now());

  // Se dispara una sola vez, en el primer tecleo.
  const empezado = useRef(false);
  const set = (key) => (e) => {
    if (!empezado.current) {
      empezado.current = true;
      track(EVENTS.FORM_START, { form_id: 'benchmark' });
    }
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = PDF_PATH;
    a.download = PDF_FILENAME;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    track(EVENTS.FILE_DOWNLOAD, { file_name: BENCHMARK.nombreDescarga });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.inversion) {
      toast({ title: 'Seleccioná una opción', description: 'Indicá si invertís actualmente en posicionamiento.', variant: 'destructive' });
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/benchmark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          ...getAttribution(),
          form_id: 'benchmark',
          form_elapsed_ms: Date.now() - abiertoEn.current,
        }),
      });
      if (!res.ok) throw new Error();
      trackConversion(EVENTS.GENERATE_LEAD, {
        form_id: 'benchmark',
        servicio_interes: 'benchmark-inmobiliario',
        rango_inversion: form.inversion,
      });
      triggerDownload();
      setStatus('done');
      toast({ title: '¡Descarga iniciada!', description: 'El benchmark está en tu carpeta de descargas.' });
    } catch {
      setStatus('error');
      toast({ title: 'Algo salió mal', description: 'Intentá de nuevo o escribinos por WhatsApp.', variant: 'destructive' });
    }
  };

  // El componente Input ya resuelve fondo, borde y placeholder por token en
  // los dos temas; acá solo queda el ajuste de forma.
  const inputClass = 'mt-1 rounded-xl';
  const labelClass = 'text-ink-muted text-sm';

  return (
    <Dialog open={abierto} onOpenChange={onAbrir}>
      <DialogContent
        etiquetaCerrar="Cerrar el formulario de descarga"
        onCloseAutoFocus={(e) => {
          e.preventDefault();
          disparadorRef?.current?.focus();
        }}
      >
        <div className="mb-6 pr-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand mb-1">Descarga gratuita</p>
          <DialogTitle>
            Completá el formulario<br />para descargar
          </DialogTitle>
          <DialogDescription className="sr-only">
            Formulario para recibir el {BENCHMARK.tituloCompleto} en PDF.
          </DialogDescription>
        </div>

        {status === 'done' ? (
          <div className="flex flex-col items-center text-center py-6 gap-4" role="status" aria-live="polite">
            <CheckCircle size={48} className="text-brand" strokeWidth={1.5} />
            <p className="text-lg font-semibold text-ink">¡Tu descarga comenzó!</p>
            <p className="text-ink-muted text-sm">Revisá tu carpeta de descargas.</p>
            <button
              onClick={triggerDownload}
              className="text-brand text-sm font-medium underline underline-offset-2 hover:no-underline transition-all"
            >
              Volver a descargar
            </button>
            <DialogClose asChild>
              <Button variant="outline" className="rounded-full mt-2">Cerrar</Button>
            </DialogClose>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nombre */}
            <div>
              <Label htmlFor="f-name" className={labelClass}>Nombre <span className="text-destructive">*</span></Label>
              <Input id="f-name" type="text" placeholder="Tu nombre completo" required value={form.name} onChange={set('name')} className={inputClass} />
            </div>

            {/* Inmobiliaria */}
            <div>
              <Label htmlFor="f-company" className={labelClass}>Inmobiliaria <span className="text-destructive">*</span></Label>
              <Input id="f-company" type="text" placeholder="Nombre de tu inmobiliaria" required value={form.company} onChange={set('company')} className={inputClass} />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="f-email" className={labelClass}>Mail <span className="text-destructive">*</span></Label>
              <Input id="f-email" type="email" placeholder="ejemplo@inmobiliaria.com" required value={form.email} onChange={set('email')} className={inputClass} />
            </div>

            {/* Teléfono */}
            <div>
              <Label htmlFor="f-phone" className={labelClass}>Teléfono</Label>
              <Input id="f-phone" type="tel" placeholder="+54 11 0000-0000" value={form.phone} onChange={set('phone')} className={inputClass} />
            </div>

            {/* Inversión */}
            <div>
              <p className={`${labelClass} mb-2`}>
                ¿Estás invirtiendo actualmente en tu Posicionamiento Digital? <span className="text-destructive">*</span>
              </p>
              <div className="space-y-2">
                {INVERSION_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 ${ form.inversion === opt.value
                        ? 'border-brand bg-primary/5 dark:bg-primary/10'
                        : 'border-hairline hover:border-ink/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="inversion"
                      value={opt.value}
                      checked={form.inversion === opt.value}
                      onChange={set('inversion')}
                      className="accent-[#3256D7] w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-sm text-ink">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <CamposLegales formId="benchmark" aceptado={consent} onAceptar={setConsent} />

            {status === 'error' && (
              <p className="text-sm text-red-500 text-center">Ocurrió un error. Intentá nuevamente.</p>
            )}

            <Button
              type="submit"
              disabled={status === 'loading' || !consent}
              className="w-full bg-primary hover:bg-primary-hover text-white rounded-full py-6 text-base font-semibold mt-2 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin motion-reduce:animate-none" />
                  Enviando…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download size={18} />
                  Descargar ahora
                </span>
              )}
            </Button>

            <p className="text-xs text-ink-subtle text-center">
              Sin spam. Te mandamos el informe y nada más.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

// ─── Landing principal ─────────────────────────────────────────────────────────

const InmobiliariasLanding = () => {
  const reduced = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const disparadorRef = useRef(null);

  const skylineRef = useRef(null);
  const skylineInView = useInView(skylineRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <Section ref={skylineRef} variant="default" padding={false} className="relative pt-28 pb-0 px-6 md:px-10 overflow-hidden">
        {/* Skyline de fondo */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none">
          <SkylineSVG isInView={skylineInView} reduced={reduced} />
        </div>

        <div className="relative z-10 container mx-auto max-w-5xl pb-16">

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-widest text-brand mb-5 text-center"
          >
            Posicionarte para Inmobiliarias
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink tracking-tight leading-tight mb-4 text-center"
          >
            Descargá gratis el<br />
            <span className="text-brand">Benchmark Inmobiliario</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="text-lg text-ink-muted max-w-xl mx-auto mb-12 leading-relaxed font-light text-center"
          >
            Estrategias digitales que están funcionando ahora.
          </motion.p>

          {/* Video + CTA */}
          <div className="flex flex-col items-center justify-center gap-10">

            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.97, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="w-full md:w-auto flex-shrink-0"
            >
              <VideoPlayer />
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.5 }}
              className="flex flex-col items-center gap-6 text-center"
            >
              {/* Rojo #D0331F, el mismo valor que --destructive. El #E03E2D que
                  estaba antes daba 4,29:1 con blanco a 18px/700 y el mínimo es
                  4,5:1; este da 5,03:1 y al lado se ve casi igual. El rojo se
                  mantiene a propósito: es la señal de "esto es un PDF". */}
              <motion.button
                ref={disparadorRef}
                onClick={() => {
                  track(EVENTS.CTA_CLICK, { cta_text: 'Descargar benchmark', cta_location: 'inmobiliarias-hero' });
                  setIsModalOpen(true);
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group flex items-center gap-4 bg-[#D0331F] hover:bg-[#B02A19] text-white rounded-2xl px-8 py-5 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-shadow"
                aria-label={`Descargar ${BENCHMARK.tituloCompleto} en PDF`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-14 bg-white/15 rounded-lg flex flex-col items-center justify-end pb-2 gap-1">
                    <div className="w-6 h-0.5 bg-white/60 rounded-full" />
                    <div className="w-6 h-0.5 bg-white/60 rounded-full" />
                    <div className="w-4 h-0.5 bg-white/60 rounded-full" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white text-[#D0331F] text-[11px] font-black px-1.5 py-0.5 rounded leading-none">
                    PDF
                  </div>
                </div>
                <div className="text-left">
                  {/* Los subtextos estaban en white/70 (2,79:1). La jerarquía la
                      dan el tamaño y el peso, no la opacidad: en blanco pleno
                      sobre este rojo dan 5,03:1 y se siguen leyendo como
                      secundarios. */}
                  <p className="text-white text-xs font-medium uppercase tracking-wider mb-0.5">Descarga gratuita</p>
                  <p className="text-white text-lg font-bold leading-tight">{BENCHMARK.titulo}</p>
                  <p className="text-white text-sm font-light">{BENCHMARK.mercado}</p>
                </div>
                <Download size={20} className="ml-2 opacity-80 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>

              <p className="text-sm text-ink-subtle">Sin spam. Solo el informe.</p>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      <DownloadModal abierto={isModalOpen} onAbrir={setIsModalOpen} disparadorRef={disparadorRef} />
    </>
  );
};

export default InmobiliariasLanding;
