import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SectionHead } from "@/components/ui/SectionHead";
import { SERVICE_GROUPS, priceLabel } from "@/content/services";
import { cn } from "@/lib/cn";
import { SERVICES_PATH } from "@/lib/site";

/** Resumen de las tres líneas con sus precios; el detalle vive en /servicios. */
export function ServicesPreview() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <SectionHead
        eyebrow="Servicios"
        title="Lo que hago hoy, con precio."
        lead="Tres líneas de trabajo. Qué incluye cada servicio está en la lista de precios."
      />
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {SERVICE_GROUPS.map((group, gi) => {
          const onCard = gi === 0;
          return (
            <Reveal
              key={group.id}
              delay={gi * 0.08}
              className={cn(
                "cut-lg flex flex-col justify-between gap-10 p-6 md:p-8",
                onCard ? "bg-card text-card-fg" : "border border-line bg-surface",
              )}
            >
              <div>
                <p className={cn("eyebrow", onCard ? "text-card-muted" : "text-muted")}>
                  {group.index} · {group.label}
                </p>
                <h3 className="mt-4 text-3xl font-extrabold leading-[1.02] tracking-[-0.03em]">{group.title}</h3>
                <ul className="mt-8 grid gap-3">
                  {group.services.map((s) => (
                    <li key={s.id} className={cn("flex items-baseline gap-2", s.status === "soon" && (onCard ? "text-card-muted" : "text-muted"))}>
                      <span className="font-semibold">{s.short}</span>
                      <span className="h-px flex-1 translate-y-[-3px] bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_6px)] opacity-40" aria-hidden />
                      <span className="font-mono text-sm font-bold uppercase">{priceLabel(s.price)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={`${SERVICES_PATH}#${group.id}`}
                className={cn("inline-flex min-h-11 items-center gap-3 self-start font-bold", onCard ? "hover:text-card-accent" : "hover:text-accent")}
              >
                Ver qué incluye <span aria-hidden>→</span>
              </a>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.2} className="mt-10">
        <Magnetic strength={0.2} className="inline-block">
          <Button href={SERVICES_PATH} size="lg">
            Ver servicios y precios <span aria-hidden>→</span>
          </Button>
        </Magnetic>
      </Reveal>
    </section>
  );
}
