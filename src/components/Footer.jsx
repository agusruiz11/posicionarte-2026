'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { EVENTS, track, trackConversion, whatsappUrl, trackWhatsApp } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';
import CamposLegales from '@/components/form/CamposLegales';
import { CONTACTO, UBICACION, REDES } from '@/data/marca';
import { BENCHMARK } from '@/data/benchmark';
import logoOnline from '@/assets/logo/logo-online.png';
import Section from '@/components/Section';
import Reveal from '@/components/Reveal';

const FORM_ID = 'footer';

const Footer = ({ hideForm = false }) => {
  // Se dispara una sola vez, en el primer tecleo: mide cuánta gente empieza el
  // formulario y no lo termina.
  const empezado = React.useRef(false);
  const marcarInicio = () => {
    if (empezado.current) return;
    empezado.current = true;
    track(EVENTS.FORM_START, { form_id: FORM_ID });
  };

  const year = new Date().getFullYear();
  const { toast } = useToast();
  const [status, setStatus] = React.useState('idle');
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [consent, setConsent] = React.useState(false);
  // Marca de tiempo de apertura: un envío casi instantáneo es un bot.
  const abiertoEn = React.useRef(Date.now());

  const set = (key) => (e) => {
    marcarInicio();
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          ...getAttribution(),
          form_id: FORM_ID,
          form_elapsed_ms: Date.now() - abiertoEn.current,
        }),
      });
      if (!res.ok) throw new Error();
      trackConversion(EVENTS.GENERATE_LEAD, { form_id: FORM_ID });
      setStatus('done');
      setForm({ name: '', email: '', message: '' });
      setConsent(false);
      toast({ title: '¡Mensaje enviado!', description: 'Te respondemos a la brevedad.' });
    } catch {
      setStatus('error');
      toast({ title: 'Algo salió mal', description: 'Intentá de nuevo o escribinos por WhatsApp.', variant: 'destructive' });
    } finally {
      setStatus('idle');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Section as="footer" id="footer" variant="default">
      <div className="container mx-auto">
        {!hideForm && <div className="grid md:grid-cols-2 gap-16 mb-12">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-8 leading-tight tracking-tight">
              Hablemos.
            </h2>
            <p className="text-lg md:text-xl text-ink/80 mb-12 max-w-xl text-left font-light leading-relaxed">
              Estamos listos para escuchar sobre tu proyecto y encontrar la mejor manera de ayudarte a crecer. Completá el formulario o escribinos por WhatsApp.
            </p>
          </Reveal>
          <Reveal as="form" delay={90} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="footer-name" className="text-ink-muted">Nombre</Label>
                <Input id="footer-name" type="text" placeholder="Tu nombre completo" required value={form.name} onChange={set('name')} className="rounded-2xl" />
              </div>
              <div>
                <Label htmlFor="footer-email" className="text-ink-muted">Email</Label>
                <Input id="footer-email" type="email" placeholder="ejemplo@email.com" required value={form.email} onChange={set('email')} className="rounded-2xl" />
              </div>
              <div>
                <Label htmlFor="footer-message" className="text-ink-muted">Mensaje</Label>
                <Textarea id="footer-message" placeholder="Contanos sobre tu proyecto..." required value={form.message} onChange={set('message')} className="rounded-2xl" />
              </div>
            </div>
            <CamposLegales formId="footer" aceptado={consent} onAceptar={setConsent} />

            <Button type="submit" disabled={status === 'loading' || !consent} className="w-full bg-primary hover:bg-primary-hover text-white rounded-full py-6 text-base font-semibold disabled:opacity-60">
              {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
            </Button>
          </Reveal>
        </div>}

        {/* Navegación y datos de contacto. El footer no tenía ni un enlace: se
            perdía enlazado interno para SEO y el visitante que prefiere un mail
            no encontraba ninguno. */}
        <div className="border-t border-hairline pt-12 mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-labelledby="footer-nav-sitio">
            <h3 id="footer-nav-sitio" className="text-sm font-semibold text-ink mb-4">Sitio</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-ink-muted hover:text-brand transition-colors">Inicio</Link></li>
              <li><Link href="/servicios" className="text-ink-muted hover:text-brand transition-colors">Servicios</Link></li>
              <li><Link href="/casos" className="text-ink-muted hover:text-brand transition-colors">Casos</Link></li>
              <li><Link href="/contacto" className="text-ink-muted hover:text-brand transition-colors">Contacto</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-nav-verticales">
            <h3 id="footer-nav-verticales" className="text-sm font-semibold text-ink mb-4">Verticales</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/inmobiliarias" className="text-ink-muted hover:text-brand transition-colors">
                  Inmobiliarias
                </Link>
              </li>
              <li>
                <Link href="/inmobiliarias" className="text-ink-muted hover:text-brand transition-colors">
                  {BENCHMARK.tituloCompleto}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-semibold text-ink mb-4">Contacto</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={whatsappUrl('footer')}
                  onClick={() => trackWhatsApp('footer')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-brand transition-colors"
                >
                  WhatsApp {CONTACTO.telefonoVisible}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTO.email}`} className="text-ink-muted hover:text-brand transition-colors">
                  {CONTACTO.email}
                </a>
              </li>
              <li className="text-ink-muted">{UBICACION.visible}</li>
              <li className="text-ink-subtle">Trabajamos 100% online</li>
              <li>
                <a href={CONTACTO.crm} className="text-ink-muted hover:text-brand transition-colors">
                  Acceso a clientes
                </a>
              </li>
            </ul>
          </div>

          <nav aria-labelledby="footer-nav-legal">
            <h3 id="footer-nav-legal" className="text-sm font-semibold text-ink mb-4">Legales</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/privacidad" className="text-ink-muted hover:text-brand transition-colors">Política de privacidad</Link></li>
              <li><Link href="/terminos" className="text-ink-muted hover:text-brand transition-colors">Términos de uso</Link></li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-hairline pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.button
              onClick={scrollToTop}
              aria-label="Volver arriba"
              className="hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={logoOnline}
                alt=""
                width={300}
                height={72}
                className="h-16 md:h-20 w-auto object-contain object-left"
              />
            </motion.button>
            <p className="text-center text-ink-muted text-sm">
              © {year} Posicionarte Online. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 order-2 md:order-3">
            {/* LinkedIn */}
            <motion.a
              href={REDES.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-brand transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href={REDES.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-brand transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </motion.a>

            {/* Facebook */}
            <motion.a
              href={REDES.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink-muted hover:text-brand transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </motion.a>
            </div>
            
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Footer;