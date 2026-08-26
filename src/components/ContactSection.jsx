'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { EVENTS, track, trackConversion } from '@/lib/analytics';
import { getAttribution } from '@/lib/attribution';
import Section from '@/components/Section';
import CamposLegales from '@/components/form/CamposLegales';
import Reveal from '@/components/Reveal';

const FORM_ID = 'contacto';

export default function ContactSection() {
  // Se dispara una sola vez, en el primer tecleo: mide cuánta gente empieza el
  // formulario y no lo termina.
  const empezado = React.useRef(false);
  const marcarInicio = () => {
    if (empezado.current) return;
    empezado.current = true;
    track(EVENTS.FORM_START, { form_id: FORM_ID });
  };

  const { toast } = useToast();
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [consent, setConsent] = useState(false);
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
      toast({ title: 'Mensaje enviado', description: 'Te respondemos a la brevedad.' });
    } catch {
      setStatus('error');
      toast({ title: 'Algo salió mal', description: 'Intentá de nuevo o escribinos por WhatsApp.', variant: 'destructive' });
    } finally {
      setStatus('idle');
    }
  };

  return (
    <Section id="contacto" variant="default" padding={false} className="px-6 md:px-10 pt-28 pb-12" aria-labelledby="contacto-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <Reveal>
            <h1 id="contacto-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-8 leading-tight tracking-tight">
              Hablemos.
            </h1>
            <p className="text-lg md:text-xl text-ink/80 mb-12 max-w-xl text-left font-light leading-relaxed">
              Estamos listos para escuchar sobre tu proyecto y encontrar la mejor manera de ayudarte a crecer. Completá el formulario o escribinos por WhatsApp.
            </p>
          </Reveal>

          <Reveal as="form" delay={90} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="contact-name" className="text-ink-muted">Nombre</Label>
                <Input id="contact-name" type="text" placeholder="Tu nombre completo" required value={form.name} onChange={set('name')} className="rounded-2xl" />
              </div>
              <div>
                <Label htmlFor="contact-email" className="text-ink-muted">Email</Label>
                <Input id="contact-email" type="email" placeholder="ejemplo@email.com" required value={form.email} onChange={set('email')} className="rounded-2xl" />
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-ink-muted">Mensaje</Label>
                <Textarea id="contact-message" placeholder="Contanos sobre tu proyecto..." required value={form.message} onChange={set('message')} className="rounded-2xl" />
              </div>
            </div>
            <CamposLegales formId="contacto" aceptado={consent} onAceptar={setConsent} />

            <Button
              type="submit"
              disabled={status === 'loading' || !consent}
              className="w-full bg-primary hover:bg-primary-hover text-white rounded-full py-6 text-base font-semibold disabled:opacity-60"
            >
              {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
