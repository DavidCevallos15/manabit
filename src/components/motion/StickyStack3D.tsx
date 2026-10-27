"use client";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/hooks";

/** Cada tarjeta queda fija; la siguiente la tapa y la anterior se hunde en 3D. */
export function StickyStack3D({ items }: { items: ReactNode[] }) {
  // En pantallas bajas o angostas las tarjetas no caben en una vista: se apilan en flujo normal.
  const roomy = useMediaQuery("(min-width: 768px) and (min-height: 680px)");
  if (!roomy) {
    return (
      <div className="grid gap-6 px-[var(--spacing-section-x)] pb-[var(--spacing-section-y)]">
        {items.map((node, i) => (
          <div key={i} className="mx-auto w-full max-w-6xl">
            {node}
          </div>
        ))}
      </div>
    );
  }
  return <Stack items={items} />;
}

function Stack({ items }: { items: ReactNode[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {items.map((node, i) => (
        <StackCard key={i} index={i} total={items.length} progress={scrollYProgress}>
          {node}
        </StackCard>
      ))}
    </div>
  );
}

type CardProps = { index: number; total: number; progress: MotionValue<number>; children: ReactNode };

function StackCard({ index, total, progress, children }: CardProps) {
  const reduce = useReducedMotion();
  const step = 1 / Math.max(total - 1, 1);
  // La última tarjeta no se hunde; el rango se acota a [0, 1] (WAAPI rechaza offsets fuera de rango).
  const still = reduce || index === total - 1;
  const range = still ? [0, 1] : [index * step, Math.min((index + 1) * step, 1)];
  const rotateX = useTransform(progress, range, [0, still ? 0 : 24]);
  const scale = useTransform(progress, range, [1, still ? 1 : 0.9]);
  const shade = useTransform(progress, range, [0, still ? 0 : 0.6]);
  return (
    <div className="sticky top-0 flex h-svh items-center overflow-hidden px-[var(--spacing-section-x)] py-6 [perspective:1400px]">
      <motion.div
        style={{ rotateX, scale, transformOrigin: "center top" }}
        className="relative mx-auto size-full max-h-[760px] max-w-6xl will-change-transform"
      >
        {children}
        {/* La tarjeta que queda atrás se oscurece en vez de volverse transparente (no se transparenta la de abajo). */}
        <motion.div aria-hidden style={{ opacity: shade }} className="pointer-events-none absolute inset-0 bg-bg" />
      </motion.div>
    </div>
  );
}
