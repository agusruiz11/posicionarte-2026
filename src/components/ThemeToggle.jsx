'use client';

import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-14 h-7" aria-hidden="true" />;

  const isDark = theme === 'dark';

  return (
    <motion.button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className="relative w-14 h-7 rounded-full flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3256D7] focus-visible:ring-offset-2 overflow-hidden"
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Track animado */}
      <motion.span
        className="absolute inset-0 rounded-full"
        animate={{
          backgroundColor: isDark ? '#1e1b4b' : '#fef3c7',
        }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      {/* Halo border */}
      <motion.span
        className="absolute inset-0 rounded-full border"
        animate={{
          borderColor: isDark ? 'rgba(129,140,248,0.35)' : 'rgba(251,191,36,0.5)',
        }}
        transition={{ duration: 0.4, ease: EASE }}
      />

      {/* Thumb deslizante */}
      <motion.span
        className="absolute top-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center z-10 shadow-sm"
        animate={{
          x: isDark ? 27 : 3,
          backgroundColor: isDark ? '#312e81' : '#fbbf24',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        <motion.span
          animate={{ rotate: isDark ? 0 : 0 }}
          className={isDark ? 'text-indigo-300' : 'text-amber-700'}
        >
          {isDark
            ? <Moon size={12} strokeWidth={2.5} />
            : <Sun size={12} strokeWidth={2.5} />
          }
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
