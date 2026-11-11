"use client";
import { motion, useReducedMotion } from "motion/react";
import { usePageReady } from "@/components/brand/PageBoot";
import { ALL_SERVICES, priceLabel } from "@/content/services";
import { cn } from "@/lib/cn";
import { dur, ease } from "@/lib/motion";
import { SERVICES_PATH } from "@/lib/site";

const featured = ALL_SERVICES.find((s) => s.featured && s.price.kind === "fixed");
/** El ticket lista solo lo disponible; lo que está en desarrollo vive en /servicios y en "En construcción". */
const rest = ALL_SERVICES.filter((s) => s !== featured && s.status === "available");

/** Lista de precios en forma de ticket: las líneas "se imprimen" al cargar. Lee de content/services.ts. */
export function PriceTicket() {
  const reduce = useReducedMotion();
  const ready = usePageReady();
  const row = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 8 },
    animate: { opacity: ready ? 1 : 0, y: ready ? 0 : 8 },
    transition: { duration: dur.disclosure, ease: ease.disclosure, delay: 0.7 + i * 0.09 },
  });

  return (
    <div className="cut relative w-full max-w-[420px] bg-[#f6f4ea] p-6 text-[#282b4a] shadow-2xl md:p-7">
      <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#5d6079]">
        <span>Lista de precios</span>
        <span>USD</span>
      </div>

      {featured && (
        <motion.div {...row(0)} className="mt-6">
          <p className="text-lg font-bold leading-tight">{featured.short}</p>
          <p className="mt-2 flex items-end justify-between gap-4">
            <span className="font-mono text-6xl font-extrabold leading-none tracking-[-0.05em]">{priceLabel(featured.price)}</span>
            <span className="mb-1.5 size-4 bg-[#d4573f]" aria-hidden />
          </p>
        </motion.div>
      )}

      <div className="my-5 h-px bg-[repeating-linear-gradient(90deg,#282b4a_0_6px,transparent_6px_12px)] opacity-40" aria-hidden />

      <ul className="grid gap-3">
        {rest.map((s, i) => (
          <motion.li key={s.id} {...row(i + 1)} className={cn("flex items-baseline gap-2 text-[15px]", s.status === "soon" && "text-[#5d6079]")}>
            <span className="font-semibold">{s.short}</span>
            <span className="h-px flex-1 translate-y-[-3px] bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_6px)] opacity-50" aria-hidden />
            <span className="font-mono text-[13px] font-bold uppercase">{priceLabel(s.price)}</span>
          </motion.li>
        ))}
      </ul>

      <a
        href={SERVICES_PATH}
        className="cut-sm mt-7 flex min-h-12 items-center justify-between gap-3 bg-[#282b4a] px-5 py-3 font-bold text-[#eeebda] motion-interactive transition-colors hover:bg-[#d4573f]"
      >
        Ver qué incluye cada uno <span aria-hidden>→</span>
      </a>
    </div>
  );
}
