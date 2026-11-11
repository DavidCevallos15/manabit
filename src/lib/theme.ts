"use client";
import { useEffect, useState } from "react";

export type Theme = "night" | "paper";

/**
 * Paleta de marca en hex para componentes que pintan en canvas/WebGL y no pueden leer
 * variables CSS. Debe coincidir con los temas de globals.css.
 */
export const PALETTE = {
  night: { bg: "#1c1e35", fg: "#eeebda", surface: "#282b4a", accent: "#f08a74" },
  paper: { bg: "#eeebda", fg: "#282b4a", surface: "#e3dfc9", accent: "#d4573f" },
} as const satisfies Record<Theme, { bg: string; fg: string; surface: string; accent: string }>;

/** Tema activo, reactivo al cambio de `data-theme` en <html> (ThemeToggle). */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("night");
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "paper" ? "paper" : "night");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);
  return theme;
}
