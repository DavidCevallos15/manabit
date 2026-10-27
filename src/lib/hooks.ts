"use client";
import { useEffect, useState } from "react";

/** Media query reactiva. Devuelve false en el servidor y en el primer render. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Puntero fino y sin preferencia de movimiento reducido: habilita cursor, imán y spotlight. */
export const FINE_POINTER = "(pointer: fine) and (prefers-reduced-motion: no-preference)";
