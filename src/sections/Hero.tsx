"use client";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { CTA_DIAGNOSTICO, site } from "@/lib/site";
import { dur, ease } from "@/lib/motion";
import { ChatDemo } from "./hero/ChatDemo";
import { BrandVideo } from "@/components/brand/BrandVideo";
import { usePageReady } from "@/components/brand/PageBoot";

export function Hero() {
  const reduce = useReducedMotion();
  const ready = usePageReady();
  const line = (i: number) => ({
    initial: reduce ? false : { y: "105%" },
    animate: { y: ready ? "0%" : "105%" },
    transition: { duration: dur.reveal, ease: ease.reveal, delay: 0.15 + i * 0.09 },
  });
  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: ready ? 1 : 0, y: ready ? 0 : 16 },
    transition: { duration: dur.reveal, ease: ease.reveal, delay: d },
  });

  return (
    <section
      id="inicio"
      className="relative mx-auto grid min-h-svh max-w-7xl items-center gap-14 px-[var(--spacing-section-x)] pb-16 pt-32 lg:grid-cols-[1.3fr_0.7fr] lg:pt-24"
    >
      <div>
        <motion.p {...fade(0.05)} className="eyebrow text-muted">
          {site.descriptor} · {site.zone}
        </motion.p>
        <h1 className="mt-6 text-[clamp(2.25rem,4.55vw,4.65rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...line(0)}>
              Webs que trabajan
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" {...line(1)}>
              por tu negocio
              <span className="ml-[0.04em] inline-block size-[0.16em] bg-accent align-baseline" aria-hidden />
              <span className="sr-only">.</span>
            </motion.span>
          </span>
        </h1>
        <motion.p {...fade(0.45)} className="mt-7 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          Instalo el sistema que convierte los mensajes de tu WhatsApp, tus redes y tu web en citas confirmadas. Y cada
          mes te muestro los números.
        </motion.p>
        <motion.div {...fade(0.55)} className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Button href={CTA_DIAGNOSTICO} size="lg">
              Pide tu diagnóstico gratis
              <span aria-hidden>→</span>
            </Button>
          </Magnetic>
          <Button href="#planes" variant="ghost" size="lg">
            Ver planes
          </Button>
        </motion.div>
        <motion.p {...fade(0.65)} className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-muted">
          Sin costo · 15 minutos · en persona o por mensaje
        </motion.p>
      </div>

      <div className="relative mx-auto flex w-full max-w-[460px] flex-col items-start lg:items-end">
        <PixelGrid className="absolute -right-2 -top-10 text-fg" />
        <BrandVideo kind="inicio" className="mb-5 w-full" />
        <motion.div {...fade(0.9)} className="w-full self-end sm:w-auto">
          <ChatDemo />
        </motion.div>
      </div>
    </section>
  );
}
