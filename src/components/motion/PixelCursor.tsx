"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FINE_POINTER, useMediaQuery } from "@/lib/hooks";

/** El bit sigue al puntero: un píxel coral con spring que crece sobre enlaces y botones. */
export function PixelCursor() {
  const enabled = useMediaQuery(FINE_POINTER);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.35 });
  const [hover, setHover] = useState(false);
  const hoverRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX + 14);
      y.set(e.clientY + 14);
      const h = !!(e.target as Element | null)?.closest("a,button,input,[data-cursor]");
      if (h !== hoverRef.current) {
        hoverRef.current = h;
        setHover(h);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, x, y]);

  if (!enabled) return null;
  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      animate={{ scale: hover ? 1.9 : 1, rotate: hover ? 45 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className="pointer-events-none fixed left-0 top-0 z-[100] size-2.5 bg-accent"
    />
  );
}
