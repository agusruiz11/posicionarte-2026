'use client';

import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Evita hydration mismatch — renderiza placeholder del mismo tamaño
  if (!mounted) return <div className="w-9 h-9" aria-hidden="true" />;

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="relative w-9 h-9 rounded-full flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3256D7] focus-visible:ring-offset-2 overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Fondo animado */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? '#1e1b4b' : '#fef3c7',
        }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      {/* Halo de hover */}
      <motion.span
        className="absolute inset-[-3px] rounded-full border"
        animate={{
          borderColor: isDark ? 'rgba(129,140,248,0.3)' : 'rgba(251,191,36,0.4)',
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />

      {/* Icono con AnimatePresence */}
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative z-10 text-indigo-300"
          >
            <Moon size={15} strokeWidth={2.5} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0.3, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.3, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative z-10 text-amber-500"
          >
            <Sun size={15} strokeWidth={2.5} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;
