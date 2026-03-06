export const EASE = [0.22, 1, 0.36, 1];

export const clipReveal = (delay = 0) => ({
  hidden: { clipPath: 'inset(0 0 100% 0)', y: 16 },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    y: 0,
    transition: { duration: 0.65, ease: EASE, delay },
  },
});

export const fadeIn = (delay = 0) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: EASE, delay },
  },
});

export const slideUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE, delay },
  },
});

export const scaleReveal = (delay = 0) => ({
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: EASE, delay },
  },
});

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});
