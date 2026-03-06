'use client';


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: '🚧 Funcionalidad en desarrollo',
      description: '¡Esta opción estará disponible muy pronto! 🚀',
    });
  };

  return (
    <section id="contacto" className="px-6 md:px-10 pt-28 pb-12 bg-white dark:bg-[#0c0c0c]" aria-labelledby="contacto-heading">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 id="contacto-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#414141] dark:text-white mb-8 leading-tight tracking-tight">
              Hablemos.
            </h1>
            <p className="text-lg md:text-xl text-[#414141]/70 mb-12 max-w-xl text-left font-light leading-relaxed">
              Estamos listos para escuchar sobre tu proyecto y encontrar la mejor manera de ayudarte a crecer. Completá el formulario o escribinos por WhatsApp.
            </p>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label htmlFor="contact-name" className="text-gray-500">Nombre</Label>
                <Input id="contact-name" name="name" type="text" placeholder="Tu nombre completo" required />
              </div>
              <div>
                <Label htmlFor="contact-email" className="text-gray-500">Email</Label>
                <Input id="contact-email" name="email" type="email" placeholder="ejemplo@email.com" required />
              </div>
              <div>
                <Label htmlFor="contact-message" className="text-gray-500">Mensaje</Label>
                <Textarea id="contact-message" name="message" placeholder="Contanos sobre tu proyecto..." required />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#3256D7] hover:bg-[#2845b8] text-white rounded-full py-6 text-base font-semibold">
              Enviar mensaje
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
