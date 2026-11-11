import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "@/components/services/ServiceCard";
import { SERVICE_GROUPS } from "@/content/services";
import { cn } from "@/lib/cn";

const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
};

/** Todos los grupos de servicios con sus tarjetas. */
export function ServiceCatalog() {
  return (
    <div className="mx-auto grid max-w-7xl gap-[var(--spacing-section-y)] px-[var(--spacing-section-x)] pb-[var(--spacing-section-y)] pt-12">
      {SERVICE_GROUPS.map((group) => {
        const single = group.services.length === 1;
        return (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-head`}>
            <Reveal className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-8">
              <div className="max-w-3xl">
                <p className="eyebrow text-muted">
                  {group.index} · {group.label}
                </p>
                <h2 id={`${group.id}-head`} className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] md:text-5xl">
                  {group.title}
                </h2>
              </div>
              <p className="max-w-sm text-lg leading-relaxed text-muted">{group.lead}</p>
            </Reveal>
            <div className={cn("mt-10 grid gap-4", GRID[Math.min(group.services.length, 3)])}>
              {group.services.map((service, i) => (
                <Reveal key={service.id} delay={Math.min(i * 0.08, 0.16)} className={cn(i === 0 && group.services.length === 3 && "md:col-span-2 xl:col-span-1")}>
                  <ServiceCard service={service} wide={single} />
                </Reveal>
              ))}
            </div>
          </section>
        );
      })}

      <Reveal className="grid gap-3 border-t border-line pt-8 text-sm leading-relaxed text-muted">
        <p>Precios en dólares estadounidenses (USD). Lo que dice «Cotización» o «Consúltalo» te lo paso por WhatsApp antes de empezar.</p>
        <p>Microsoft, Microsoft 365 y Office son marcas de Microsoft Corporation.</p>
      </Reveal>
    </div>
  );
}
