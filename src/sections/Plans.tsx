import { Magnetic } from "@/components/motion/Magnetic";
import { StickyStack3D } from "@/components/motion/StickyStack3D";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { PLANS, type Plan } from "@/content/plans";
import { cn } from "@/lib/cn";
import { waLink } from "@/lib/site";

function PlanName({ stem, className }: { stem: string; className?: string }) {
  return (
    <span className={cn("font-extrabold tracking-[-0.04em]", className)}>
      {stem}
      <span className="font-mono tracking-[-0.06em]">bit</span>
    </span>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const featured = plan.featured === true;
  const name = `${plan.stem[0]?.toUpperCase()}${plan.stem.slice(1)}bit`;
  return (
    <article
      aria-labelledby={`plan-${plan.stem}`}
      className={cn(
        "cut-lg grid size-full content-between gap-10 p-7 md:grid-cols-[1.1fr_0.9fr] md:grid-rows-[1fr] md:p-12",
        featured ? "border border-line bg-surface text-fg" : "bg-card text-card-fg",
      )}
    >
      <div className="flex flex-col justify-between gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className={cn("eyebrow", featured ? "text-muted" : "text-card-muted")}>
              0{index + 1} · {plan.level}
            </span>
            {featured && (
              <span className="eyebrow flex items-center gap-2 text-accent-ink">
                <span className="size-2.5 bg-accent" aria-hidden />
                El principal
              </span>
            )}
          </div>
          <h3 id={`plan-${plan.stem}`} className="mt-5 leading-[0.9]">
            <PlanName stem={plan.stem} className="text-[clamp(2.65rem,7.5vw,6.5rem)]" />
          </h3>
          <p className="mt-5 max-w-md text-xl font-semibold md:text-2xl">{plan.tagline}</p>
        </div>
        <p className={cn("max-w-md text-sm italic leading-relaxed", featured ? "text-muted" : "text-card-muted")}>{plan.why}</p>
      </div>

      <div className="flex flex-col justify-between gap-8">
        <div>
          <p className={cn("eyebrow", featured ? "text-muted" : "text-card-muted")}>Qué incluye</p>
          <ul className="mt-4 grid gap-3">
            {plan.includes.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-snug md:text-lg">
                <span className={cn("mt-2 size-2 shrink-0", featured ? "bg-fg" : "bg-card-fg")} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
          <p className={cn("mt-6 leading-relaxed", featured ? "text-muted" : "text-card-muted")}>{plan.forWho}</p>
        </div>
        <Magnetic strength={0.2} className="self-start">
          <Button href={waLink(`Hola, quiero saber el precio del plan ${name}. PLANES`)} variant={featured ? "solid" : "card"}>
            Pide el precio de {name} <span aria-hidden>→</span>
          </Button>
        </Magnetic>
      </div>
    </article>
  );
}

/** Tres planes en pila 3D ligada al scroll. */
export function Plans() {
  return (
    <section id="planes" className="relative pt-[var(--spacing-section-y)]">
      <div className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
        <SectionHead
          eyebrow="Planes"
          title="Tres planes, de la entrada a la medida."
          lead="Nombres de aquí, sistemas de verdad. El precio depende de tu negocio: te lo paso por WhatsApp después del diagnóstico."
        />
      </div>
      <div className="mt-8">
        <StickyStack3D items={PLANS.map((p, i) => <PlanCard key={p.stem} plan={p} index={i} />)} />
      </div>
    </section>
  );
}
