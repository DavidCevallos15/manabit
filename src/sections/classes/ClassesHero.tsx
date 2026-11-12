import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { CLASS, CLASS_FROM, CLASS_TIERS, CTA_CLASS } from "@/content/classes";
import { cn } from "@/lib/cn";
import { REVIEWS_ANCHOR, site } from "@/lib/site";

/**
 * Cabecera de /clases. Sin animación de entrada: es el link que se comparte por WhatsApp
 * y debe pintarse de inmediato en el celular.
 */
export function ClassesHero() {
  return (
    <section
      id="inicio"
      className="relative mx-auto grid max-w-7xl items-end gap-12 px-[var(--spacing-section-x)] pb-12 pt-36 lg:grid-cols-[1.25fr_0.75fr] lg:pt-44"
    >
      <div>
        <p className="eyebrow text-muted">
          Clases en vivo · {CLASS.name} · {site.name}
        </p>
        <h1 className="mt-6 text-[clamp(2.4rem,5.2vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
          Haz tus deberes más rápido con inteligencia artificial
          <span className="ml-[0.04em] inline-block size-[0.16em] bg-accent align-baseline" aria-hidden />
          <span className="sr-only">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          Una clase en vivo, paso a paso y desde cero, con la cuenta de Google que ya te dio tu instituto. No necesitas saber de
          tecnología.
        </p>
        <p className="mt-5 flex items-center gap-3 text-lg font-semibold">
          <span className="size-2.5 shrink-0 bg-accent" aria-hidden />
          La dicta el {CLASS.teacher}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic strength={0.2} className="inline-block">
            <Button href={CTA_CLASS} size="lg">
              Apartar mi cupo <span aria-hidden>→</span>
            </Button>
          </Magnetic>
          <Button href={`#${REVIEWS_ANCHOR}`} variant="ghost" size="lg">
            Dejar mi reseña
          </Button>
        </div>
      </div>

      <aside aria-labelledby="precio-clase" className="relative">
        <PixelGrid className="absolute -right-1 -top-12 text-fg" />
        <div className="cut-lg relative bg-card p-7 text-card-fg md:p-9">
          <p id="precio-clase" className="eyebrow text-card-muted">
            Precio por persona
          </p>
          <p className="mt-3 font-mono text-[clamp(2.75rem,6vw,4rem)] font-extrabold leading-none tracking-[-0.04em]">
            <span className="mr-2 align-middle text-base font-bold tracking-normal text-card-muted">Desde</span>${CLASS_FROM}
            <span className="ml-2 text-base font-bold tracking-normal text-card-muted">USD</span>
          </p>
          <ul className="mt-7 grid gap-3 border-t border-card-fg/15 pt-6">
            {CLASS_TIERS.map((tier) => (
              <li key={tier.id} className="flex items-baseline gap-2">
                <span className="font-semibold">{tier.group}</span>
                <span
                  className="h-px flex-1 translate-y-[-3px] bg-[repeating-linear-gradient(90deg,currentColor_0_2px,transparent_2px_6px)] opacity-40"
                  aria-hidden
                />
                <span className={cn("font-mono text-base font-bold", tier.featured && "text-card-accent")}>${tier.amount}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-card-muted">
            {CLASS.duration} en vivo. Mientras más compañeros se inscriben, menos paga cada uno.
          </p>
        </div>
      </aside>
    </section>
  );
}
