"use client";
import { motion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { STEPS } from "@/content/process";

/** Del diagnóstico al reporte: la línea se rellena con el scroll. */
export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <section id="proceso" className="mx-auto grid max-w-7xl gap-14 px-[var(--spacing-section-x)] py-[var(--spacing-section-y)] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <SectionHead
          eyebrow="Cómo trabajamos"
          title="Cada paso deja algo que puedes ver."
          lead="Del diagnóstico gratis a la operación mensual, sin letras chicas."
        />
      </div>
      <ol ref={list} className="relative grid gap-12 pl-14">
        <span className="absolute bottom-2 left-[11px] top-2 w-0.5 bg-line" aria-hidden />
        <motion.span style={{ scaleY }} className="absolute bottom-2 left-[11px] top-2 w-0.5 origin-top bg-accent" aria-hidden />
        {STEPS.map((s, i) => (
          <li key={s.title} className="relative">
            <span className="absolute -left-14 top-1 grid size-6 place-items-center bg-bg" aria-hidden>
              <span className="size-3 bg-fg" />
            </span>
            <Reveal delay={0.04}>
              <p className="font-mono text-sm font-bold text-muted">0{i + 1}</p>
              <h3 className="mt-1 text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">{s.title}</h3>
              <p className="mt-3 max-w-lg text-lg leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
