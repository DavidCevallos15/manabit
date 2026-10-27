"use client";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { dur, ease } from "@/lib/motion";

/** Pasos del ejemplo: mensaje → escribiendo → respuesta → elección → cita confirmada. */
const SCHEDULE = [500, 1500, 2700, 4100, 5300] as const;
const LOOP_MS = 9000;
const FINAL = SCHEDULE.length;

const bubble = {
  initial: { opacity: 0, y: 10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0 },
  transition: { duration: dur.disclosure, ease: ease.disclosure },
};

/** Demo en bucle de cómo se ve un mensaje atendido por el sistema. Se pausa fuera de pantalla. */
export function ChatDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStep(FINAL);
      return;
    }
    if (!inView) return;
    let timers: number[] = [];
    const run = () => {
      setStep(0);
      timers = SCHEDULE.map((t, i) => window.setTimeout(() => setStep(i + 1), t));
    };
    run();
    const loop = window.setInterval(run, LOOP_MS);
    return () => {
      timers.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [inView, reduce]);

  return (
    <div
      ref={ref}
      className="cut relative w-full max-w-[380px] bg-[#f6f4ea] p-5 text-[#282b4a] shadow-2xl"
      aria-label="Ejemplo: un cliente pide turno por WhatsApp y recibe la cita confirmada"
      role="img"
    >
      <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#5d6079]">
        <span>WhatsApp · Barbería</span>
        <span>Ejemplo</span>
      </div>

      <div className="mt-4 flex min-h-[284px] flex-col gap-2.5" aria-hidden>
        <AnimatePresence mode="popLayout">
          {step >= 1 && (
            <motion.div key="m1" {...bubble} className="max-w-[85%] self-start bg-[#e1dcc4] px-3.5 py-2.5 text-[15px] leading-snug text-[#282b4a]">
              Hola, ¿tienen turno hoy en la tarde?
              <span className="mt-1 block font-mono text-[10px] opacity-60">18:42</span>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="typing" {...bubble} className="flex gap-1 self-end bg-[#282b4a] px-3.5 py-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-1.5 animate-blink bg-[#eeebda]" style={{ animationDelay: `${i * 0.18}s` }} />
              ))}
            </motion.div>
          )}
          {step >= 3 && (
            <motion.div key="m2" {...bubble} className="max-w-[85%] self-end bg-[#282b4a] px-3.5 py-2.5 text-[15px] leading-snug text-[#eeebda]">
              ¡Hola! Hoy tengo 16:00 o 17:30. ¿Cuál te sirve?
              <span className="mt-1 block font-mono text-[10px] opacity-60">18:42 · respuesta automática</span>
            </motion.div>
          )}
          {step >= 4 && (
            <motion.div key="m3" {...bubble} className="max-w-[85%] self-start bg-[#e1dcc4] px-3.5 py-2.5 text-[15px] leading-snug text-[#282b4a]">
              16:00 porfa
              <span className="mt-1 block font-mono text-[10px] opacity-60">18:43</span>
            </motion.div>
          )}
          {step >= 5 && (
            <motion.div
              key="ok"
              {...bubble}
              className="cut-sm mt-1 flex items-center gap-3 bg-[#dcd6bb] px-3.5 py-3 text-[#282b4a]"
            >
              <span className="size-3.5 shrink-0 bg-[#d4573f]" />
              <span className="flex flex-col">
                <span className="text-[15px] font-extrabold">Cita confirmada</span>
                <span className="font-mono text-[11px] font-bold opacity-70">HOY · 16:00 · CORTE + BARBA</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
