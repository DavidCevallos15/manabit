"use client";
import { motion, useReducedMotion } from "motion/react";
import { ManabitLogo } from "@/components/brand/ManabitLogo";
import { Magnetic } from "@/components/motion/Magnetic";
import { CLASSES_PATH, CTA_WHATSAPP, SERVICES_PATH, site } from "@/lib/site";
import { dur, ease } from "@/lib/motion";
import { ThemeToggle } from "./ThemeToggle";
import { usePageReady } from "@/components/brand/PageBoot";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** Las anclas de la home se resuelven con "/" delante cuando estás en otra página. */
const NAV = [
  { href: SERVICES_PATH, label: "Precios", page: true },
  { href: CLASSES_PATH, label: "Clases", page: true },
  { href: "#trabajos", label: "Trabajos", page: false },
  { href: "#proceso", label: "Proceso", page: false },
  { href: "#preguntas", label: "Preguntas", page: false },
] as const;
const MOBILE_EXTRA = [
  { href: "#estudio", label: "El estudio", page: false },
  { href: "#contacto", label: "Contacto", page: false },
] as const;

export function SiteHeader() {
  const reduce = useReducedMotion();
  const ready = usePageReady();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";
  const resolve = (n: { href: string; page: boolean }) => (n.page || onHome ? n.href : `/${n.href}`);
  const current = (n: { href: string; page: boolean }) => (n.page && pathname.startsWith(n.href) ? ("page" as const) : undefined);
  return (
    <motion.header
      initial={reduce ? false : { y: -24, opacity: 0 }}
      animate={{ y: ready ? 0 : -24, opacity: ready ? 1 : 0 }}
      transition={{ duration: dur.reveal, ease: ease.reveal, delay: 0.1 }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-3"
    >
      <nav
        aria-label="Principal"
        className="cut-sm flex w-full max-w-5xl items-center gap-2 border border-line bg-surface/85 py-1.5 pl-4 pr-1.5 backdrop-blur-md [--manabit-bit:var(--card-accent)]"
      >
        <div className="mr-auto flex min-w-0 flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:gap-3 md:mr-6">
          <a href={onHome ? "#inicio" : "/"} aria-label={`${site.name}, inicio`} className="shrink-0 text-fg">
            <ManabitLogo variant="horizontal" className="h-6 w-auto sm:h-7" />
          </a>
          <p className="flex items-center gap-1.5 whitespace-nowrap text-[10px] font-semibold text-muted sm:border-l sm:border-line sm:pl-3 sm:text-[11px]">
            <span className="font-mono font-bold uppercase tracking-[0.1em] text-fg">{site.descriptor}</span>
            <span aria-hidden>·</span>
            <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              by David Cevallos
            </a>
          </p>
        </div>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={resolve(n)} aria-current={current(n)} className="eyebrow px-3 py-2 text-muted motion-micro transition-colors hover:text-fg aria-[current=page]:text-fg">
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
            href={CTA_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="cut-sm inline-flex items-center gap-2 bg-fg px-4 py-2.5 text-sm font-bold text-bg motion-interactive transition-colors hover:bg-accent"
          >
            <span className="size-2 bg-accent" aria-hidden />
            WhatsApp
          </a>
        </Magnetic>
      </nav>
      {menuOpen && <nav id="mobile-menu" aria-label="Navegación móvil" className="absolute inset-x-3 top-full mt-2 bg-surface p-5 md:hidden">
        <ul className="grid gap-1">{[...NAV, ...MOBILE_EXTRA].map((n) => <li key={n.href}><a href={resolve(n)} aria-current={current(n)} className="block px-3 py-3 font-semibold hover:bg-bg" onClick={() => setMenuOpen(false)}>{n.label}</a></li>)}</ul>
      </nav>}
    </motion.header>
  );
}
