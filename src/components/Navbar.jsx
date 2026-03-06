'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo/logo.png';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = isHome
    ? [
        { name: 'Servicios', href: '#servicios' },
        { name: 'Metodología', href: '#metodologia' },
        { name: 'Casos', href: '#casos' },
        { name: 'Nosotros', href: '#about' },
      ]
    : [
        { name: 'Servicios', href: '/servicios' },
        { name: 'Metodología', href: '/' },
        { name: 'Casos', href: '/casos' },
        { name: 'Nosotros', href: '/' },
      ];

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div className={`transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
          <div className="container mx-auto">
            <div className="flex justify-between items-center">
              <motion.span whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="block">
                <Link href="/" className="block">
                  <Image
                    src={logo}
                    alt="Posicionarte"
                    width={220}
                    height={56}
                    className="h-12 sm:h-14 w-auto object-contain"
                    priority
                  />
                </Link>
              </motion.span>

              <div className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-white/20 shadow-sm rounded-full px-2 py-1">
                {navLinks.map((link) =>
                  link.href.startsWith('#') ? (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-[#414141] hover:bg-gray-100 rounded-full px-4 py-2 transition-colors duration-200 font-medium text-sm"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="text-[#414141] hover:bg-gray-100 rounded-full px-4 py-2 transition-colors duration-200 font-medium text-sm"
                    >
                      {link.name}
                    </Link>
                  )
                )}
              </div>

              <div className="hidden md:block">
                <Button asChild className="bg-[#3256D7] hover:bg-[#2845b8] text-white rounded-full px-5 py-2 text-sm font-semibold">
                  <Link href="/contacto">Contacto</Link>
                </Button>
              </div>

              <button
                className="md:hidden text-[#414141] z-50"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-lg z-40 md:hidden"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="pt-24 px-6 space-y-6 text-center"
            >
              {navLinks.map((link) =>
                link.href.startsWith('#') ? (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-2xl font-medium text-[#414141] hover:text-[#3256D7] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-2xl font-medium text-[#414141] hover:text-[#3256D7] transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <Button asChild className="w-full bg-[#3256D7] hover:bg-[#2845b8] text-white rounded-full py-3 mt-6 text-base">
                <Link href="/contacto" onClick={() => setIsMobileMenuOpen(false)}>Contacto</Link>
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;