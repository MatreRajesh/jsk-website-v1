import type { Variants } from 'framer-motion';

export const ease = [0.16, 1, 0.3, 1] as const;

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/** Use on `motion.*` children of <Stagger>. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};
