import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { SERVICE_GROUPS } from "@/content/services";
import { CTA_WHATSAPP, site } from "@/lib/site";

/**
 * Cabecera de /servicios: titular, saltos a cada grupo y WhatsApp directo con el número visible.
 * Sin animación de entrada: es la página de destino de los anuncios y debe pintarse de inmediato.
 */
export function ServicesHero() {
  return (
    <section
      id="inicio"
      className="relative mx-auto grid max-w-7xl items-end gap-12 px-[var(--spacing-section-x)] pb-12 pt-36 lg:grid-cols-[1.25fr_0.75fr] lg:pt-44"
    >
      <div>
        <p className="eyebrow text-muted">
          Servicios y precios · {site.name}
        </p>
        <h1
          className="mt-6 text-[clamp(2.4rem,5.2vw,5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]"
        >
          Lo que hago y cuánto cuesta
          <span className="ml-[0.04em] inline-block size-[0.16em] bg-accent align-baseline" aria-hidden />
          <span className="sr-only">.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
          Precios en dólares. Cada servicio tiene su botón: me escribes por WhatsApp con el mensaje listo y te respondo yo.
        </p>
        <nav aria-label="Grupos de servicios" className="mt-9 flex flex-wrap gap-2">
          {SERVICE_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="cut-sm inline-flex min-h-11 items-center gap-3 bg-surface px-4 py-2.5 text-base font-semibold motion-micro transition-colors hover:bg-fg hover:text-bg"
            >
              <span className="font-mono text-sm font-bold text-muted">{g.index}</span>
              {g.label}
            </a>
          ))}
        </nav>
      </div>

      <aside aria-labelledby="wa-directo" className="relative">
        <PixelGrid className="absolute -right-1 -top-12 text-fg" />
        <div className="cut-lg relative bg-card p-7 text-card-fg md:p-9">
          <p id="wa-directo" className="eyebrow text-card-muted">
            WhatsApp directo
          </p>
          <p className="mt-4 font-mono text-[clamp(1.6rem,3vw,2.1rem)] font-extrabold tracking-[-0.03em]">{site.whatsappDisplay}</p>
          <p className="mt-3 leading-relaxed text-card-muted">¿No ves lo que buscas? Pregúntame igual.</p>
          <Magnetic strength={0.2} className="mt-7 inline-block">
            <Button href={CTA_WHATSAPP} variant="card" size="lg">
              Abrir WhatsApp <span aria-hidden>→</span>
            </Button>
          </Magnetic>
        </div>
      </aside>
    </section>
  );
}
