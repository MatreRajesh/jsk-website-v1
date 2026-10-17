import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function SmoothScroll({ children }: { children: ReactNode }) {
  if (prefersReducedMotion) return <>{children}</>;

  // lerp 0.1 tracks the wheel closely (no "floaty" lag); touch devices keep native scrolling.
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: { offset: -72 } }}>
      {children}
    </ReactLenis>
  );
}
