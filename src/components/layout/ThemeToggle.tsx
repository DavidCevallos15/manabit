"use client";
import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";

type Theme = "night" | "paper";
const KEY = "manabit-theme";

function apply(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {
    /* almacenamiento no disponible: el tema solo dura la visita */
  }
}

/** Noche ↔ vainilla con transición radial desde el clic (View Transitions). */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("night");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "paper" ? "paper" : "night");
  }, []);

  const toggle = async (e: MouseEvent<HTMLButtonElement>) => {
    const next: Theme = theme === "night" ? "paper" : "night";
    const run = () => {
      apply(next);
      setTheme(next);
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) return run();
    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const t = document.startViewTransition(() => flushSync(run));
    await t.ready;
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 520, easing: "cubic-bezier(.16,1,.3,1)", pseudoElement: "::view-transition-new(root)" },
    );
  };

  const label = theme === "night" ? "Cambiar a fondo vainilla" : "Cambiar a fondo noche";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center text-fg motion-micro transition-colors hover:text-accent"
    >
      <svg viewBox="0 0 20 20" className="size-5" aria-hidden>
        <path d="M3 3h14v14H3Z" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d={theme === "night" ? "M10 3h7v14h-7Z" : "M3 3h7v14H3Z"} fill="currentColor" />
      </svg>
    </button>
  );
}
