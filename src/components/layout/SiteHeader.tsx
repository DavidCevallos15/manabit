"use client";
import { motion, useReducedMotion } from "motion/react";
import { ManabitLogo } from "@/components/brand/ManabitLogo";
import { Magnetic } from "@/components/motion/Magnetic";
import { CTA_DIAGNOSTICO } from "@/lib/site";
import { dur, ease } from "@/lib/motion";
import { ThemeToggle } from "./ThemeToggle";
import { usePageReady } from "@/components/brand/PageBoot";
import { useState } from "react";

const NAV = [
  { href: "#planes", label: "Planes" },
  { href: "#trabajos", label: "Trabajos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#preguntas", label: "Preguntas" },
] as const;

export function SiteHeader() {
  const reduce = useReducedMotion();
  const ready = usePageReady();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: ready ? 0 : -24, opacity: ready ? 1 : 0 }}
      transition={{ duration: dur.reveal, ease: ease.reveal, delay: 0.1 }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
    >
      <nav
        aria-label="Principal"
        className="cut-sm flex w-full max-w-4xl items-center gap-2 border border-line bg-surface/85 py-1.5 pl-4 pr-1.5 backdrop-blur-md [--manabit-bit:var(--card-accent)]"
      >
        <div className="mr-auto flex min-w-0 flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-3">
          <a href="#inicio" aria-label="Manabit, inicio" className="shrink-0 text-fg">
            <ManabitLogo variant="horizontal" className="h-6 w-auto sm:h-7" />
          </a>
          <a href="https://davidcevallos.vercel.app" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-[10px] font-semibold text-muted hover:text-fg sm:border-l sm:border-line sm:pl-3 sm:text-[11px]">
            by David Cevallos
          </a>
        </div>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="eyebrow px-3 py-2 text-muted motion-micro transition-colors hover:text-fg">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} className="grid size-10 shrink-0 place-items-center md:hidden">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d={menuOpen ? "M6 6l12 12M6 18L18 6" : "M4 8h16M4 16h16"} /></svg>
        </button>
        <ThemeToggle />
        <Magnetic strength={0.2}>
          <a
            href={CTA_DIAGNOSTICO}
            target="_blank"
            rel="noopener noreferrer"
            className="cut-sm inline-flex items-center bg-fg px-4 py-2.5 text-sm font-bold text-bg motion-interactive transition-colors hover:bg-accent"
          >
            Diagnóstico<span className="hidden sm:inline"> gratis</span>
          </a>
        </Magnetic>
      </nav>
      {menuOpen && <nav id="mobile-menu" aria-label="Navegación móvil" className="absolute inset-x-3 top-full mt-2 bg-surface p-5 md:hidden">
        <ul className="grid gap-1">{[...NAV, { href: "#estudio", label: "El estudio" }, { href: "#contacto", label: "Contacto" }].map((n) => <li key={n.href}><a href={n.href} className="block px-3 py-3 font-semibold hover:bg-bg" onClick={() => setMenuOpen(false)}>{n.label}</a></li>)}</ul>
      </nav>}
    </motion.header>
  );
}
