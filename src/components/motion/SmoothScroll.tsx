"use client";
import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/** Lenis sobre el scroll nativo (compatible con useScroll de Motion). Apagado con movimiento reducido. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: { offset: -80 } }}>
      {children}
    </ReactLenis>
  );
}
