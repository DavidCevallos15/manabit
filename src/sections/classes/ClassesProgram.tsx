import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CLASS, CLASS_INCLUDES, CLASS_TIERS, CLASS_TOPICS, CTA_CLASS_GROUP } from "@/content/classes";
import { cn } from "@/lib/cn";

/** Qué se aprende, qué incluye y cuánto cuesta según el tamaño del grupo. */
export function ClassesProgram() {
  return (
    <div className="mx-auto grid max-w-7xl gap-[var(--spacing-section-y)] px-[var(--spacing-section-x)] pb-[var(--spacing-section-y)] pt-12">
      <section id="temario" aria-labelledby="temario-head">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-muted">01 · Lo que aprendes</p>
            <h2 id="temario-head" className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] md:text-5xl">
              En {CLASS.duration} sales sabiendo hacerlo.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            Todo en una sola herramienta: {CLASS.tool} (antes {CLASS.toolFormerly}).
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="cut-lg border border-line bg-surface p-6 md:p-9">
            <ol className="grid gap-5">
              {CLASS_TOPICS.map((topic, i) => (
                <li key={topic} className="flex gap-5 text-lg leading-snug md:text-xl">
                  <span className="w-7 shrink-0 pt-0.5 font-mono text-sm font-bold text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {topic}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.08} className="cut-lg flex flex-col justify-between gap-8 bg-card p-6 text-card-fg md:p-9">
            <div>
              <p className="eyebrow text-card-muted">Incluye</p>
              <ul className="mt-5 grid gap-3">
                {CLASS_INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3 text-lg leading-snug">
                    <span className="mt-2 size-2 shrink-0 bg-card-fg" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <p className="border-t border-card-fg/15 pt-6 leading-relaxed text-card-muted">
              Necesitas la cuenta de Google de tu instituto y una computadora o celular con internet. Antes de la clase reviso con
              el grupo que la herramienta esté activa en esas cuentas.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="precios" aria-labelledby="precios-head">
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-muted">02 · Precio por persona</p>
            <h2 id="precios-head" className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] md:text-5xl">
              Júntate con tus compañeros y pagan menos.
            </h2>
          </div>
          <p className="max-w-sm text-lg leading-relaxed text-muted">
            El grupo se abre desde {CLASS.minGroup} personas. Cupo máximo: {CLASS.maxGroup}.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {CLASS_TIERS.map((tier, i) => {
            const onCard = tier.featured === true;
            return (
              <Reveal
                key={tier.id}
                delay={Math.min(i * 0.08, 0.16)}
                className={cn("cut-lg flex flex-col gap-6 p-6 md:p-9", onCard ? "bg-card text-card-fg" : "border border-line bg-surface")}
              >
                <p className={cn("eyebrow", onCard ? "text-card-muted" : "text-muted")}>Grupo de</p>
                <h3 className="text-3xl font-extrabold leading-none tracking-[-0.03em]">{tier.group}</h3>
                <p className="mt-auto font-mono text-[clamp(2.75rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.04em]">
                  ${tier.amount}
                  <span className={cn("ml-2 text-base font-bold tracking-normal", onCard ? "text-card-muted" : "text-muted")}>
                    USD c/u
                  </span>
                </p>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center gap-5">
          <Button href={CTA_CLASS_GROUP} size="lg">
            Armar mi grupo por WhatsApp <span aria-hidden>→</span>
          </Button>
          <p className="max-w-md text-base leading-relaxed text-muted">El día, la hora y la modalidad los coordino con cada grupo.</p>
        </Reveal>
      </section>

      <Reveal className="grid gap-3 border-t border-line pt-8 text-sm leading-relaxed text-muted">
        <p>Precios en dólares estadounidenses (USD), por persona y por clase.</p>
        <p>Google, Gemini y NotebookLM son marcas de Google LLC. Esta clase es independiente y no está afiliada a Google.</p>
      </Reveal>
    </div>
  );
}
