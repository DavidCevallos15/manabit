"use client";
import { useEffect, useRef } from "react";
import { FINE_POINTER, useMediaQuery } from "@/lib/hooks";

/** Brillo suave que sigue al puntero sobre el fondo. Variables CSS + rAF, sin re-render. */
export function Spotlight() {
  const enabled = useMediaQuery(FINE_POINTER);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ref.current?.style.setProperty("--mx", `${e.clientX}px`);
        ref.current?.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "radial-gradient(520px circle at var(--mx, -999px) var(--my, -999px), var(--spot), transparent 65%)" }}
    />
  );
}
