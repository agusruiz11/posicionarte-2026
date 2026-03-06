'use client';

import React from 'react';
import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="bg-[#111111] text-white text-sm font-medium px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none select-none"
        aria-hidden="true"
      >
        ¿Hablamos?
      </motion.span>

      {/* Button */}
      <motion.a
        href="https://wa.me/5491172360193"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative w-16 h-16 rounded-full flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 120 }}
        whileTap={{ scale: 0.9 }}
      >
        {/* Anillo pulsante */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Botón principal */}
        <motion.span
          className="relative z-10 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/40"
          whileHover={{
            scale: 1.15,
            rotate: [0, -12, 12, -6, 6, 0],
            transition: { rotate: { duration: 0.5, ease: 'easeInOut' }, scale: { duration: 0.2 } },
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="34"
            height="34"
            fill="white"
            aria-hidden="true"
          >
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.474 2.027 7.775L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.765-1.845l-.485-.29-5.009 1.194 1.238-4.87-.318-.5A13.267 13.267 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.878c-.398-.2-2.355-1.162-2.72-1.295-.366-.133-.632-.2-.898.2-.266.398-1.03 1.295-1.263 1.561-.233.266-.465.3-.863.1-.398-.2-1.682-.62-3.203-1.977-1.184-1.056-1.983-2.36-2.216-2.758-.233-.398-.025-.613.175-.812.18-.178.398-.465.598-.698.2-.233.266-.398.398-.664.133-.266.067-.498-.033-.698-.1-.2-.898-2.162-1.23-2.96-.324-.777-.653-.672-.898-.684l-.765-.013c-.266 0-.698.1-1.064.498-.366.398-1.396 1.363-1.396 3.325s1.43 3.857 1.629 4.123c.2.266 2.814 4.297 6.82 6.028.953.412 1.696.658 2.276.842.956.305 1.826.262 2.514.159.767-.114 2.355-.963 2.688-1.893.333-.93.333-1.727.233-1.893-.1-.166-.366-.266-.764-.465z" />
          </svg>
        </motion.span>
      </motion.a>
    </div>
  );
};

export default WhatsAppButton;
