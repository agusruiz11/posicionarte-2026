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
        className="text-[#414141]/10 dark:text-white/[0.06]"
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
  const [playing, setPlaying] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted((m) => !m);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying((p) => !p);
  };

  return (
    <div className="relative mx-auto w-full max-w-[340px] md:w-[320px] lg:w-[360px] aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/5">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Video de presentación del Benchmark Inmobiliario"
      >
        <source src="/videos/video-landing-inmobiliaria.mp4" type="video/mp4" />
      </video>

      {/* Gradiente inferior */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

      {/* Controles */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pausar video' : 'Reproducir video'}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
        >
          {playing ? <Pause size={14} /> : <Play size={14} />}
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
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

const PDF_PATH = 'https://drive.google.com/file/d/10yy-dPyoGqhmKY_ZQpEcMvVIMLv-8EOV/view?usp=sharing';

// ─── Modal de descarga ────────────────────────────────────────────────────────

const DownloadModal = ({ onClose, reduced }) => {
  const { toast } = useToast();
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    inversion: '',
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const triggerDownload = () => {
    window.open(PDF_PATH, '_blank');
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
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      triggerDownload();
      setStatus('done');
      toast({ title: '¡Descarga iniciada!', description: 'El benchmark está en tu carpeta de descargas.' });
    } catch {
      setStatus('error');
      toast({ title: 'Algo salió mal', description: 'Intentá de nuevo o escribinos por WhatsApp.', variant: 'destructive' });
    }
  };

  const inputClass = 'dark:bg-[#111111] dark:border-gray-700 dark:text-white dark:placeholder:text-gray-600 mt-1 rounded-xl';
  const labelClass = 'text-gray-500 dark:text-gray-400 text-sm';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-end sm:items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#3256D7] mb-1">Descarga gratuita</p>
            <h3 className="text-2xl font-bold text-[#414141] dark:text-white leading-tight">
              Completá el formulario<br />para descargar
            </h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-[#414141] dark:hover:text-white transition-colors mt-1" aria-label="Cerrar">
            <X size={20} />
          </button>
        </div>

        {status === 'done' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex flex-col items-center text-center py-6 gap-4"
          >
            <CheckCircle size={48} className="text-[#3256D7]" strokeWidth={1.5} />
            <p className="text-lg font-semibold text-[#414141] dark:text-white">¡Tu descarga comenzó!</p>
            <p className="text-gray-500 text-sm">Revisá tu carpeta de descargas.</p>
            <button
              onClick={triggerDownload}
              className="text-[#3256D7] text-sm font-medium underline underline-offset-2 hover:no-underline transition-all"
            >
              Volver a descargar
            </button>
            <Button onClick={onClose} variant="outline" className="rounded-full mt-2 dark:border-gray-700 dark:text-gray-200">
              Cerrar
            </Button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Nombre */}
            <div>
              <Label htmlFor="f-name" className={labelClass}>Nombre <span className="text-[#E03E2D]">*</span></Label>
              <Input id="f-name" type="text" placeholder="Tu nombre completo" required value={form.name} onChange={set('name')} className={inputClass} />
            </div>

            {/* Inmobiliaria */}
            <div>
              <Label htmlFor="f-company" className={labelClass}>Inmobiliaria <span className="text-[#E03E2D]">*</span></Label>
              <Input id="f-company" type="text" placeholder="Nombre de tu inmobiliaria" required value={form.company} onChange={set('company')} className={inputClass} />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="f-email" className={labelClass}>Mail <span className="text-[#E03E2D]">*</span></Label>
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
                ¿Estás invirtiendo actualmente en tu Posicionamiento Digital? <span className="text-[#E03E2D]">*</span>
              </p>
              <div className="space-y-2">
                {INVERSION_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-150 ${
                      form.inversion === opt.value
                        ? 'border-[#3256D7] bg-[#3256D7]/5 dark:bg-[#3256D7]/10'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
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
                    <span className="text-sm text-[#414141] dark:text-gray-200">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-500 text-center">Ocurrió un error. Intentá nuevamente.</p>
            )}

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#3256D7] hover:bg-[#2845b8] text-white rounded-full py-6 text-base font-semibold mt-2 disabled:opacity-60"
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Enviando…
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Download size={18} />
                  Descargar ahora
                </span>
              )}
            </Button>

            <p className="text-xs text-gray-400 dark:text-gray-600 text-center">
              Tus datos no se comparten con terceros.
            </p>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Landing principal ─────────────────────────────────────────────────────────

const InmobiliariasLanding = () => {
  const reduced = useReducedMotion();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skylineRef = useRef(null);
  const skylineInView = useInView(skylineRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-6 md:px-10 bg-white dark:bg-[#0c0c0c]">
        <div className="container mx-auto max-w-5xl">

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="text-sm font-semibold uppercase tracking-widest text-[#3256D7] mb-5 text-center"
          >
            Posicionarte para Inmobiliarias
          </motion.p>

          <motion.h1
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#414141] dark:text-white tracking-tight leading-tight mb-4 text-center"
          >
            Descargá gratis el<br />
            <span className="text-[#3256D7]">Benchmark Inmobiliario</span>
          </motion.h1>

          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.2 }}
            className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-12 leading-relaxed font-light text-center"
          >
            Estrategias digitales que están funcionando ahora.
          </motion.p>

          {/* Video + CTA */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.97, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.3 }}
              className="w-full md:w-auto flex-shrink-0"
            >
              <VideoPlayer />
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.5 }}
              className="flex flex-col items-center md:items-start gap-6 text-center md:text-left"
            >
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group flex items-center gap-4 bg-[#E03E2D] hover:bg-[#c73527] text-white rounded-2xl px-8 py-5 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-shadow"
                aria-label="Descargar Benchmark Inmobiliario PDF"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-14 bg-white/15 rounded-lg flex flex-col items-center justify-end pb-2 gap-1">
                    <div className="w-6 h-0.5 bg-white/60 rounded-full" />
                    <div className="w-6 h-0.5 bg-white/60 rounded-full" />
                    <div className="w-4 h-0.5 bg-white/60 rounded-full" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-white text-[#E03E2D] text-[9px] font-black px-1.5 py-0.5 rounded leading-none">
                    PDF
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-0.5">Descarga gratuita</p>
                  <p className="text-white text-lg font-bold leading-tight">Benchmark Inmobiliario</p>
                  <p className="text-white/70 text-sm">Argentina 2025</p>
                </div>
                <Download size={20} className="ml-2 opacity-80 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>

              <p className="text-sm text-gray-400 dark:text-gray-600">Sin spam. Solo el informe.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Skyline ───────────────────────────────────────────────── */}
      <div ref={skylineRef} className="bg-white dark:bg-[#0c0c0c] w-full -mt-2">
        <SkylineSVG isInView={skylineInView} reduced={reduced} />
      </div>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <DownloadModal onClose={() => setIsModalOpen(false)} reduced={reduced} />
        )}
      </AnimatePresence>
    </>
  );
};

export default InmobiliariasLanding;
