"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { SAMPLES } from "@/content/samples";
import { SectionHead } from "@/components/ui/SectionHead";
import { useMediaQuery } from "@/lib/hooks";
import { SampleMock } from "./work/SampleMock";

const PIN_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

/** Landings de muestra en scroll horizontal pinneado (desktop). En móvil o con movimiento reducido: fila con scroll manual. */
export function Work() {
  const pinned = useMediaQuery(PIN_QUERY);
  const cards = SAMPLES.map((s) => <SampleMock key={s.domain} sample={s} />);

  if (!pinned) {
    return (
      <section id="trabajos" className="py-[var(--spacing-section-y)]">
        <Head />
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--spacing-section-x)] pb-4 [&>*]:snap-start">
          {cards}
        </div>
      </section>
    );
  }
  return <PinnedWork>{cards}</PinnedWork>;
}

function Head() {
  return (
    <div className="mx-auto w-full max-w-7xl px-[var(--spacing-section-x)]">
      <SectionHead
        eyebrow="Trabajos"
        title="Así se ve el trabajo."
        lead="Landings de muestra para ocho tipos de negocio. Son piezas de portafolio, no clientes."
      />
    </div>
  );
}

/** Se monta solo cuando aplica el pin, para que useScroll enganche el ref desde el primer render. */
function PinnedWork({ children }: { children: ReactNode }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="trabajos" ref={section} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-10 overflow-hidden">
        <Head />
        <motion.div ref={track} style={{ x }} className="flex w-max gap-8 px-[var(--spacing-section-x)] will-change-transform">
          {children}
        </motion.div>
        <div className="mx-auto h-px w-full max-w-7xl bg-line" aria-hidden>
          <motion.div className="h-px bg-fg" style={{ width: progress }} />
        </div>
      </div>
    </section>
  );
}
