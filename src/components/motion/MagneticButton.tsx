import { useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../../lib/utils';

const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;

/** Gently pulls its child toward the cursor. Uses motion values, so no React re-renders on mousemove. */
export function MagneticButton({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 18, mass: 0.3 });

  if (!finePointer) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.25);
        y.set((e.clientY - r.top - r.height / 2) * 0.25);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
}
