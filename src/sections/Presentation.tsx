import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { SERVICES_PATH, site } from "@/lib/site";

/** Presentación en video del fundador. Tiene audio: se reproduce solo cuando la persona le da play. */
export function Presentation() {
  return (
    <section
      id="presentacion"
      aria-labelledby="presentacion-head"
      className="mx-auto grid max-w-7xl items-center gap-10 px-[var(--spacing-section-x)] py-[var(--spacing-section-y)] lg:grid-cols-[1.35fr_0.65fr] lg:gap-16"
    >
      <Reveal className="cut-lg overflow-hidden bg-surface">
        <video
          controls
          playsInline
          preload="none"
          poster="/media/studio/presentacion-poster.webp"
          width={1280}
          height={720}
          aria-label={`Presentación de ${site.name} por el ${site.founderTitle}`}
          className="aspect-video w-full object-cover"
        >
          <source src="/media/studio/presentacion.mp4" type="video/mp4" />
          Tu navegador no reproduce este video.
        </video>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="eyebrow text-muted">Presentación</p>
        <h2 id="presentacion-head" className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] md:text-5xl">
          Manabit en un minuto.
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted md:text-xl">Te cuento qué hago, cuánto cuesta y cómo empezamos.</p>
        <p className="mt-7 flex items-start gap-3 text-lg">
          <span className="mt-2 size-2.5 shrink-0 bg-accent" aria-hidden />
          <span>
            <strong>{site.founderTitle}</strong>
            <br />
            <span className="text-muted">Fundador de {site.name}</span>
          </span>
        </p>
        <Button href={SERVICES_PATH} className="mt-8">
          Ver servicios y precios <span aria-hidden>→</span>
        </Button>
      </Reveal>
    </section>
  );
}
