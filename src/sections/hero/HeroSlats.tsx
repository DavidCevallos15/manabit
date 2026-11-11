"use client";
import dynamic from "next/dynamic";
import { usePageReady } from "@/components/brand/PageBoot";
import { PALETTE, useTheme, type Theme } from "@/lib/theme";

/** WebGL (ogl) fuera del bundle inicial: se descarga solo en el cliente. */
const MicroSlats = dynamic(() => import("@/components/reactbits/MicroSlats"), { ssr: false });

/** Listones en el tono de la superficie; el coral solo aparece en las crestas. */
const SLATS: Record<Theme, { color: string; glint: string }> = {
  night: { color: PALETTE.night.accent, glint: PALETTE.night.fg },
  paper: { color: PALETTE.paper.accent, glint: PALETTE.paper.fg },
};

/**
 * Fondo del hero: mar de listones (React Bits · MicroSlats) con la paleta Manabit.
 * Se monta al terminar el loader para que la entrada coincida con la del titular,
 * y se desvanece hacia el texto y hacia la siguiente sección.
 */
export function HeroSlats() {
  const ready = usePageReady();
  const theme = useTheme();
  const { color, glint } = SLATS[theme];
  return (
    <div aria-hidden className="hero-slats pointer-events-none absolute inset-0 -z-10">
      {ready && (
        <MicroSlats
          preset="swell"
          color={color}
          glintColor={glint}
          backgroundColor={PALETTE[theme].bg}
          slatWidth={10}
          slatHeight={25}
          gap={3}
          roundness={0.75}
          interactive
          cursorStrength={1}
          cursorSize={40}
          swirl={0}
          trail={1.4}
          lean={0}
          intro
        />
      )}
    </div>
  );
}
