"use client";
import { motion, useReducedMotion, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";

type Field = { key: "msgs" | "lost" | "conv" | "value"; label: string; min: number; max: number; step: number; unit: string };

const FIELDS: readonly Field[] = [
  { key: "msgs", label: "Mensajes nuevos por semana", min: 5, max: 200, step: 5, unit: "" },
  { key: "lost", label: "Los que se quedan sin respuesta a tiempo", min: 0, max: 80, step: 5, unit: "%" },
  { key: "conv", label: "De los que sí atiendes, cuántos agendan", min: 10, max: 90, step: 5, unit: "%" },
  { key: "value", label: "Valor de una cita o venta", min: 5, max: 200, step: 5, unit: "$" },
];

const WEEKS_PER_MONTH = 4.33;
const money = new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Calculadora con los números del visitante: no se publica ninguna cifra inventada. */
export function Problem() {
  const reduce = useReducedMotion();
  const [v, setV] = useState({ msgs: 40, lost: 20, conv: 50, value: 15 });
  const lostPerMonth = v.msgs * WEEKS_PER_MONTH * (v.lost / 100) * (v.conv / 100) * v.value;
  const clientsPerMonth = v.msgs * WEEKS_PER_MONTH * (v.lost / 100) * (v.conv / 100);

  const spring = useSpring(lostPerMonth, { stiffness: 120, damping: 22 });
  useEffect(() => {
    if (reduce) spring.jump(lostPerMonth);
    else spring.set(lostPerMonth);
  }, [lostPerMonth, reduce, spring]);
  const shown = useTransform(spring, (n) => money.format(Math.round(n)));
  const id = useId();

  return (
    <section id="problema" className="relative mx-auto max-w-7xl px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <SectionHead
        eyebrow="El problema"
        title="¿Cuántos clientes se te van por contestar tarde?"
        lead="Un mensaje que espera horas suele terminar en el negocio de al lado. Pon tus números y mira cuánto se te escapa al mes."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal className="cut border border-line bg-surface p-6 md:p-10">
          <form className="grid gap-8" onSubmit={(e) => e.preventDefault()}>
            {FIELDS.map((f) => {
              const value = v[f.key];
              const pct = ((value - f.min) / (f.max - f.min)) * 100;
              const display = f.unit === "$" ? `$${value}` : `${value}${f.unit}`;
              return (
                <div key={f.key}>
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={`${id}-${f.key}`} className="text-base font-semibold md:text-lg">
                      {f.label}
                    </label>
                    <output htmlFor={`${id}-${f.key}`} className="font-mono text-lg font-bold">
                      {display}
                    </output>
                  </div>
                  <input
                    id={`${id}-${f.key}`}
                    type="range"
                    className="range mt-3"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={value}
                    style={{ ["--p" as string]: `${pct}%` }}
                    onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
                  />
                </div>
              );
            })}
          </form>
        </Reveal>

        <Reveal delay={0.1} className="cut flex flex-col justify-between bg-card p-6 text-card-fg md:p-10">
          <div>
            <p className="eyebrow text-card-muted">Se te escapa cada mes</p>
            <motion.p className="mt-4 font-mono text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-none tracking-[-0.04em]" aria-live="polite">
              {shown}
            </motion.p>
            <p className="mt-4 text-lg">
              Unos <strong className="font-mono">{Math.round(clientsPerMonth)}</strong> clientes al mes que escribieron y no
              llegaron.
            </p>
          </div>
          <p className="mt-10 text-sm leading-relaxed text-card-muted">
            Estimación con tus números, no una promesa. En el diagnóstico gratis la hacemos con los datos reales de tu
            WhatsApp.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
