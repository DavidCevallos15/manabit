"use client";
import { motion, useReducedMotion } from "motion/react";
import { EMBLEM_BASE, EMBLEM_BIT } from "@/components/brand/manabit-paths";
import { ease } from "@/lib/motion";

/** El emblema se arma como en el intro del kit: barrido de la placa y el bit cae en su sitio. */
export function EmblemBuild({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={className} role="img" aria-label="Emblema de Manabit">
      <div className="relative aspect-square size-full">
        <motion.svg
          viewBox="0 0 48 48"
          className="absolute inset-0 size-full text-fg"
          initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.1, ease: ease.reveal, delay: 0.35 }}
          aria-hidden
        >
          <path fillRule="evenodd" d={EMBLEM_BASE} fill="currentColor" />
        </motion.svg>
        <motion.svg
          viewBox="0 0 48 48"
          className="absolute inset-0 size-full"
          initial={reduce ? false : { y: "-38%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ type: "spring", stiffness: 420, damping: 15, mass: 0.8, delay: 1.35 }}
          aria-hidden
        >
          <path d={EMBLEM_BIT} fill="var(--card-accent)" />
        </motion.svg>
      </div>
    </div>
  );
}
