'use client';


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnimatedSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const CARD_CLASS =
  'bg-[rgb(249,249,249)] dark:bg-[#1a1a1a] p-6 md:p-8 rounded-[2rem] border border-[#eee] dark:border-gray-800 shadow-sm shrink-0 w-full';

const TestimonialCard = ({ testimonial }) => (
  <div className={CARD_CLASS}>
    <div className="flex gap-4 mb-4">
      <div className="w-14 h-14 shrink-0 rounded-full overflow-hidden bg-[#D9D9D9] dark:bg-gray-700">
        <img
          alt={testimonial.image}
          className="w-full h-full object-cover"
          src={testimonial.avatar}
        />
      </div>
      <div>
        <div className="font-semibold text-[#333] dark:text-white text-base md:text-lg">{testimonial.name}</div>
        <div className="text-sm text-[#666]">{testimonial.role}</div>
      </div>
    </div>
    <p className="text-[#414141]/80 dark:text-white/80 leading-relaxed text-lg">
      &quot;{testimonial.content}&quot;
    </p>
  </div>
);

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: 'María González',
      role: 'CEO, TechStart',
      content: 'Posicionarte Online transformó completamente nuestra presencia digital. En 6 meses aumentamos nuestras ventas online un 250%. Su enfoque estratégico y profesionalismo son excepcionales.',
      image: 'Mujer profesional sonriendo',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop'
    },
    {
      name: 'Carlos Rodríguez',
      role: 'Director de Marketing, InnovaShop',
      content: 'El ROI que logramos con sus campañas de Google Ads superó todas nuestras expectativas. Son verdaderos expertos en marketing digital y siempre están un paso adelante.',
      image: 'Hombre profesional sonriendo',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop'
    },
    {
      name: 'Laura Martínez',
      role: 'Fundadora, Startup Tech',
      content: 'Encontré el partner estratégico que necesitaba. No solo ejecutan, sino que aportan ideas y mejoran la estrategia.',
      image: 'Emprendedora trabajando',
      avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=120&h=120&fit=crop'
    },
    {
      name: 'Ana Fernández',
      role: 'CMO, E-commerce',
      content: 'La estrategia de contenido que diseñaron nos posicionó como referentes en el sector. Resultados medibles desde el primer mes.',
      image: 'Profesional de marketing',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop'
    }
  ];

  const CARDS_PER_SLIDE = 2;
  const totalSlides = Math.ceil(testimonials.length / CARDS_PER_SLIDE);
  const maxSlide = totalSlides - 1;

  const canGoPrev = currentSlide > 0;
  const canGoNext = currentSlide < maxSlide;

  const goToPrev = () => {
    if (canGoPrev) setCurrentSlide((prev) => prev - 1);
  };

  const goToNext = () => {
    if (canGoNext) setCurrentSlide((prev) => prev + 1);
  };

  const getSlideTestimonials = (slideIndex) => {
    const start = slideIndex * CARDS_PER_SLIDE;
    return testimonials.slice(start, start + CARDS_PER_SLIDE);
  };

  return (
    <section className="section-padding bg-white dark:bg-[#0c0c0c]">
      <div className="container mx-auto overflow-hidden">
        <AnimatedSection>
          <h2 className="text-center text-3xl md:text-7xl font-bold text-[#414141] dark:text-white mb-12 md:mb-16 tracking-tight">
            Lo que dicen nuestros <span className="text-[#3256D7]">clientes</span>.
          </h2>
        </AnimatedSection>

        <div
          className="relative overflow-hidden mb-10 md:mb-12"
          aria-live="polite"
          aria-atomic="true"
        >
          <motion.div
            className="flex"
            animate={{ x: `-${currentSlide * (100 / totalSlides)}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: `${totalSlides * 100}%` }}
          >
            {Array.from({ length: totalSlides }).map((_, slideIndex) => (
              <div
                key={slideIndex}
                className="grid md:grid-cols-2 gap-6 md:gap-8 shrink-0 min-w-0"
                style={{ width: `${100 / totalSlides}%` }}
              >
                {getSlideTestimonials(slideIndex).map((t) => (
                  <TestimonialCard key={t.name} testimonial={t} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-3 mb-6">
          <button
            type="button"
            onClick={goToPrev}
            disabled={!canGoPrev}
            aria-label="Testimonio anterior"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              canGoPrev
                ? 'border border-[#ddd] bg-white text-[#666] hover:border-[#3256D7] hover:shadow-lg hover:shadow-blue-500/50 hover:text-[#3256D7] focus:ring-[#3256D7] cursor-pointer'
                : 'border border-[#e8e8e8] bg-[#f5f5f5] text-[#bbb] cursor-not-allowed focus:ring-[#D9D9D9]'
            }`}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={!canGoNext}
            aria-label="Siguiente testimonio"
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              canGoNext
                ? 'border border-[#ddd] bg-white text-[#666] hover:shadow-lg hover:shadow-blue-500/50 hover:border-[#3256D7] hover:text-[#3256D7] focus:ring-[#3256D7] cursor-pointer'
                : 'border border-[#e8e8e8] bg-[#f5f5f5] text-[#bbb] cursor-not-allowed focus:ring-[#D9D9D9]'
            }`}
          >
            <ChevronRight size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;