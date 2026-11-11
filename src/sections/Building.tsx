import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { PixelGrid } from "@/components/ui/PixelGrid";
import { PlanName } from "@/components/ui/PlanName";
import { SectionHead } from "@/components/ui/SectionHead";
import { waLink } from "@/lib/site";
import { ChatDemo } from "./hero/ChatDemo";

const PARTS = ["Atiende los mensajes de tu web", "Agenda las citas", "Te muestra los números del mes"] as const;

/** Lo que está en desarrollo, contado como tal: sin precio ni fecha prometida. */
export function Building() {
  return (
    <section id="en-construccion" className="mx-auto grid max-w-7xl items-center gap-14 px-[var(--spacing-section-x)] py-[var(--spacing-section-y)] lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <SectionHead
          eyebrow="En construcción"
          title={
            <>
              Lo que estoy construyendo: <PlanName stem="tonga" />.
            </>
          }
          lead="Un sistema para negocios de servicio que reciben citas por mensaje. Está en desarrollo y el primer piloto corre en el propio Manabit."
        />
        <Reveal delay={0.1}>
          <ul className="mt-10 grid gap-3 border-t border-line pt-8">
            {PARTS.map((p) => (
              <li key={p} className="flex items-center justify-between gap-6 text-lg font-semibold">
                {p}
                <span className="eyebrow flex shrink-0 items-center gap-2 text-muted">
                  <span className="size-2.5 border border-current" aria-hidden />
                  En desarrollo
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.16} className="mt-9">
          <Button href={waLink("Hola, quiero que me avisen cuando Tongabit esté listo.")} variant="ghost" className="border border-line">
            Avísame cuando esté listo <span aria-hidden>→</span>
          </Button>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="relative mx-auto w-full max-w-[400px]">
        <PixelGrid className="absolute -right-2 -top-10 text-fg" />
        <div className="relative">
          <ChatDemo />
        </div>
      </Reveal>
    </section>
  );
}
