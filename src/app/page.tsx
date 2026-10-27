import { FloatingCta } from "@/components/layout/FloatingCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelCursor } from "@/components/motion/PixelCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Spotlight } from "@/components/motion/Spotlight";
import { Bento } from "@/sections/Bento";
import { Closing } from "@/sections/Closing";
import { Faq } from "@/sections/Faq";
import { Hero } from "@/sections/Hero";
import { Plans } from "@/sections/Plans";
import { Problem } from "@/sections/Problem";
import { Process } from "@/sections/Process";
import { Rubros } from "@/sections/Rubros";
import { Work } from "@/sections/Work";

export default function Home() {
  return (
    <SmoothScroll>
      <Spotlight />
      <SiteHeader />
      <main className="relative z-10">
        <Hero />
        <Rubros />
        <Problem />
        <Bento />
        <Plans />
        <Work />
        <Process />
        <Faq />
      </main>
      <div className="relative z-10">
        <Closing />
      </div>
      <FloatingCta />
      <PixelCursor />
    </SmoothScroll>
  );
}
