'use client';

import { useReducedMotion as useFramerReducedMotion } from 'framer-motion';

/**
 * Returns true when the user prefers reduced motion.
 * Use to skip or simplify animations (opacity-only, no translate/scale).
 */
export function useReducedMotion() {
  return useFramerReducedMotion() ?? false;
}

/**
 * Default transition when reduced motion is preferred: instant.
 */
export const reducedMotionTransition = { duration: 0 };

/**
 * Default initial/animate when reduced: no movement, just show.
 */
export const reducedMotionVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};
