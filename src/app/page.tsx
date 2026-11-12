import { FloatingCta } from "@/components/layout/FloatingCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelCursor } from "@/components/motion/PixelCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Spotlight } from "@/components/motion/Spotlight";
import { PageBoot } from "@/components/brand/PageBoot";
import { About } from "@/sections/About";
import { Building } from "@/sections/Building";
import { Closing } from "@/sections/Closing";
import { Faq } from "@/sections/Faq";
import { Hero } from "@/sections/Hero";
import { Presentation } from "@/sections/Presentation";
import { Process } from "@/sections/Process";
import { Rubros } from "@/sections/Rubros";
import { ServicesPreview } from "@/sections/ServicesPreview";
import { Work } from "@/sections/Work";

/**
 * Home de Manabit Sistemas: solo vende lo que ya existe (licencias, webs, sistemas a la medida)
 * y cuenta Tongabit como "en construcción". Problem, Bento y Plans quedan en pausa en el repo
 * hasta que el sistema esté listo.
 */
export default function Home() {
  return (
    <PageBoot>
      <SmoothScroll>
        <Spotlight />
        <SiteHeader />
        <main id="contenido" className="relative z-10">
          <Hero />
          <Presentation />
          <Rubros />
          <ServicesPreview />
          <Work />
          <Building />
          <About />
          <Process />
          <Faq />
        </main>
        <div className="relative z-10">
          <Closing />
        </div>
        <FloatingCta />
        <PixelCursor />
      </SmoothScroll>
    </PageBoot>
  );
}
