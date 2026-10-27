"use client";
import { useId, useState } from "react";
import { SectionHead } from "@/components/ui/SectionHead";
import { FAQ } from "@/content/faq";
import { cn } from "@/lib/cn";

/** Acordeón accesible; la altura se anima con grid-template-rows (CSS, 320 ms). */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();
  return (
    <section id="preguntas" className="mx-auto grid max-w-7xl gap-12 px-[var(--spacing-section-x)] py-[var(--spacing-section-y)] lg:grid-cols-[0.9fr_1.1fr]">
      <SectionHead eyebrow="Preguntas" title="Lo que suelen preguntar." />
      <div className="border-t border-line">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          const btn = `${base}-b${i}`;
          const panel = `${base}-p${i}`;
          return (
            <div key={item.q} className="border-b border-line">
              <h3>
                <button
                  id={btn}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left text-xl font-bold tracking-[-0.02em] md:text-2xl"
                >
                  {item.q}
                  <span
                    aria-hidden
                    className={cn("grid size-6 shrink-0 place-items-center transition-transform duration-[320ms] ease-[var(--ease-disclosure)]", isOpen && "rotate-45")}
                  >
                    <svg viewBox="0 0 12 12" className="size-3.5">
                      <path d="M5 0h2v12H5zM0 5h12v2H0z" fill="currentColor" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={panel}
                role="region"
                aria-labelledby={btn}
                aria-hidden={!isOpen}
                className={cn(
                  "grid transition-[grid-template-rows] duration-[320ms] ease-[var(--ease-disclosure)]",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-6 text-lg leading-relaxed text-muted">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
