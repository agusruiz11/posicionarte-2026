'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import logoOnline from '@/assets/logo/logo-online.png';

const Footer = ({ hideForm = false }) => {
  const year = new Date().getFullYear();
  const { toast } = useToast();
  const [status, setStatus] = React.useState('idle');
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus('done');
      setForm({ name: '', email: '', message: '' });
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
    <footer id="footer" className="section-padding bg-white dark:bg-[#0c0c0c]">
      <div className="container mx-auto">
        {!hideForm && <div className="grid md:grid-cols-2 gap-16 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#414141] dark:text-white mb-8 leading-tight tracking-tight">
              Hablemos.
            </h2>
            <p className="text-lg md:text-xl text-[#414141]/70 dark:text-white/50 mb-12 max-w-xl text-left font-light leading-relaxed">
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
                <Label htmlFor="footer-name" className="text-gray-500">Nombre</Label>
                <Input id="footer-name" type="text" placeholder="Tu nombre completo" required value={form.name} onChange={set('name')} className="rounded-2xl" />
              </div>
              <div>
                <Label htmlFor="footer-email" className="text-gray-500">Email</Label>
                <Input id="footer-email" type="email" placeholder="ejemplo@email.com" required value={form.email} onChange={set('email')} className="rounded-2xl" />
              </div>
              <div>
                <Label htmlFor="footer-message" className="text-gray-500">Mensaje</Label>
                <Textarea id="footer-message" placeholder="Contanos sobre tu proyecto..." required value={form.message} onChange={set('message')} className="rounded-2xl" />
              </div>
            </div>
            <Button type="submit" disabled={status === 'loading'} className="w-full bg-[#3256D7] hover:bg-[#2845b8] text-white rounded-full py-6 text-base font-semibold disabled:opacity-60">
              {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
            </Button>
          </motion.form>
        </div>}

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.button
              onClick={scrollToTop}
              className="hover:opacity-80 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={logoOnline}
                alt="Posicionarte .online"
                width={200}
                height={48}
                className="h-16 md:h-24 lg:h-32 w-[200px] md:w-[300px] lg:w-[300px] object-contain object-left"
              />
            </motion.button>
            <p className="pt-8 text-center text-[#414141]/60 dark:text-gray-500">
              © {year} Posicionarte Online. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 order-2 md:order-3">
            {/* LinkedIn */}
            <motion.a
              href="https://www.linkedin.com/company/posicionarte-online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#414141] dark:text-gray-400 hover:text-[#3256D7] dark:hover:text-[#3256D7] transition-colors"
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
              href="https://www.instagram.com/posicionarteonline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#414141] dark:text-gray-400 hover:text-[#3256D7] dark:hover:text-[#3256D7] transition-colors"
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
              href="https://www.facebook.com/posicionarteonline"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#414141] dark:text-gray-400 hover:text-[#3256D7] dark:hover:text-[#3256D7] transition-colors"
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
    </footer>
  );
};

export default Footer;