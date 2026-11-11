import { Button } from "@/components/ui/Button";
import { PlanName } from "@/components/ui/PlanName";
import { priceLabel, waMessage, type Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { waLink } from "@/lib/site";

function StatusBadge({ soon, onCard }: { soon: boolean; onCard: boolean }) {
  return (
    <span className={cn("eyebrow flex items-center gap-2", soon ? (onCard ? "text-card-muted" : "text-muted") : onCard ? "text-card-fg" : "text-fg")}>
      <span className={cn("size-2.5", soon ? "border border-current" : onCard ? "bg-card-accent" : "bg-accent")} aria-hidden />
      {soon ? "En desarrollo" : "Disponible"}
    </span>
  );
}

/** Precio grande en mono; lo que no tiene cifra se muestra con la misma jerarquía pero más pequeño. */
function PriceTag({ service, onCard }: { service: Service; onCard: boolean }) {
  const fixed = service.price.kind === "fixed";
  return (
    <div>
      <p className={cn("eyebrow", onCard ? "text-card-muted" : "text-muted")}>Precio</p>
      <p
        className={cn(
          "mt-1 font-mono font-extrabold leading-none tracking-[-0.04em]",
          fixed ? "text-[clamp(2.75rem,6vw,4rem)]" : "text-2xl md:text-3xl",
        )}
      >
        {priceLabel(service.price)}
        {fixed && <span className={cn("ml-2 text-base font-bold tracking-normal", onCard ? "text-card-muted" : "text-muted")}>USD</span>}
      </p>
    </div>
  );
}

function ctaText(service: Service): string {
  if (service.status === "soon") return "Avísame";
  if (service.price.kind === "quote") return "Cotizar por WhatsApp";
  if (service.price.kind === "ask") return "Preguntar precio";
  return "Pedir por WhatsApp";
}

/** Tarjeta de un servicio. `wide` reparte el contenido en dos columnas cuando el grupo tiene un solo servicio. */
export function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  const onCard = service.featured === true && service.status === "available";
  const soon = service.status === "soon";

  return (
    <article
      id={service.id}
      aria-labelledby={`${service.id}-title`}
      className={cn(
        "cut-lg flex h-full flex-col justify-between gap-8 p-6 md:p-9",
        onCard ? "bg-card text-card-fg" : "border border-line bg-surface text-fg",
        wide && "md:grid md:grid-cols-[1fr_1fr] md:gap-12",
      )}
    >
      <div>
        <StatusBadge soon={soon} onCard={onCard} />
        <h3 id={`${service.id}-title`} className="mt-5 leading-[0.95]">
          {service.plan ? (
            <>
              <PlanName stem={service.plan} className="block text-[clamp(2.4rem,5vw,3.6rem)]" />
              <span className="mt-3 block text-xl font-bold tracking-[-0.02em] md:text-2xl">{service.name}</span>
            </>
          ) : (
            <span className="block text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">{service.name}</span>
          )}
        </h3>
        <p className={cn("mt-4 max-w-md text-lg leading-relaxed", onCard ? "text-card-muted" : "text-muted")}>{service.summary}</p>
      </div>

      <div className="flex flex-col justify-between gap-8">
        {service.includes && service.includes.length > 0 ? (
          <ul className="grid gap-3">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-snug md:text-lg">
                <span className={cn("mt-2 size-2 shrink-0", onCard ? "bg-card-fg" : "bg-fg")} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        ) : null}

        <div className={cn("flex flex-wrap items-end justify-between gap-5 border-t pt-6", onCard ? "border-card-fg/15" : "border-line")}>
          <PriceTag service={service} onCard={onCard} />
          <Button href={waLink(waMessage(service))} variant={onCard ? "card" : soon ? "ghost" : "solid"} className={soon ? "border border-line" : undefined}>
            {ctaText(service)} <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
