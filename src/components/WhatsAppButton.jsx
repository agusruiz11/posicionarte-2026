'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react'; // Using MessageCircle for WhatsApp icon

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5491172360193"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.5, type: 'spring', stiffness: 120 }}
      whileHover={{ scale: 1.1, backgroundColor: '#25D366' }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle className="text-white" size={32} fill="white" />
    </motion.a>
  );
};

export default WhatsAppButton;