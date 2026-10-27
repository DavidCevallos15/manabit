"use client";
import { motion, useReducedMotion } from "motion/react";
import { WORDMARK_BIT, WORDMARK_MANA, WORDMARK_WIDTH } from "@/components/brand/manabit-paths";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";
import { CTA_DIAGNOSTICO, site } from "@/lib/site";

const SOCIAL = [
  { key: "instagram", label: "Instagram" },
  { key: "tiktok", label: "TikTok" },
  { key: "linkedin", label: "LinkedIn" },
] as const;

/** Cierre: CTA y wordmark gigante; "mana" sube y el "bit" entra al final en coral. */
export function Closing() {
  const reduce = useReducedMotion();
  const year = 2026;
  return (
    <footer className="relative overflow-hidden pt-[var(--spacing-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
        <Reveal>
          <p className="eyebrow text-muted">Diagnóstico gratis</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-[-0.04em] md:text-7xl">
            ¿Vemos cuántos mensajes se te escapan?
          </h2>
        </Reveal>
        <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-5">
          <Magnetic>
            <Button href={CTA_DIAGNOSTICO} size="lg">
              Escríbeme DIAGNÓSTICO <span aria-hidden>→</span>
            </Button>
          </Magnetic>
          <p className="font-mono text-sm font-bold text-muted">15 minutos · sin costo · {site.zone}</p>
        </Reveal>
      </div>

      <div className="mt-20 px-[var(--spacing-section-x)]" aria-hidden>
        <motion.svg
          viewBox={`-2 -80 ${WORDMARK_WIDTH + 4} 84`}
          className="w-full text-fg"
          initial={reduce ? false : "hidden"}
          whileInView="shown"
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.path
            d={WORDMARK_MANA}
            fill="currentColor"
            variants={{ hidden: { y: 60, opacity: 0 }, shown: { y: 0, opacity: 1 } }}
            transition={{ duration: 1.1, ease: ease.reveal }}
          />
          {WORDMARK_BIT.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="var(--accent)"
              variants={{ hidden: { y: -40, opacity: 0 }, shown: { y: 0, opacity: 1 } }}
              transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.75 + i * 0.09 }}
            />
          ))}
        </motion.svg>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-line px-[var(--spacing-section-x)] py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {site.name} · {site.descriptor} · Portoviejo, Manabí ·{" "}
          <span className="font-mono font-bold text-fg">by David Cevallos</span>
        </p>
        <ul className="flex gap-6">
          {SOCIAL.filter((s) => site.social[s.key]).map((s) => (
            <li key={s.key}>
              <a href={site.social[s.key]} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {s.label}
              </a>
            </li>
          ))}
          {site.email ? (
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-fg">
                {site.email}
              </a>
            </li>
          ) : null}
        </ul>
      </div>
    </footer>
  );
}
