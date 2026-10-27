"use client";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { CTA_DIAGNOSTICO } from "@/lib/site";
import { dur, ease } from "@/lib/motion";

/** Aparece al salir del hero y se esconde al llegar al cierre (que ya tiene su propio CTA). */
export function FloatingCta() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    const nearEnd = v + window.innerHeight > document.documentElement.scrollHeight - window.innerHeight * 1.2;
    setShow(v > window.innerHeight * 0.85 && !nearEnd);
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.aside
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: dur.disclosure, ease: ease.disclosure }}
          className="fixed inset-x-4 bottom-4 z-[90] md:inset-x-auto md:bottom-6 md:right-6"
        >
          <a
            href={CTA_DIAGNOSTICO}
            target="_blank"
            rel="noopener noreferrer"
            className="cut-sm flex items-center justify-center gap-3 whitespace-nowrap bg-fg px-5 py-3.5 font-bold text-bg shadow-2xl motion-interactive transition-colors hover:bg-accent"
          >
            <span className="size-2.5 bg-accent" aria-hidden />
            Diagnóstico gratis por WhatsApp
          </a>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
