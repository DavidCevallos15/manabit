import type { SVGProps } from "react";
import {
  EMBLEM_BASE,
  EMBLEM_BIT,
  WORDMARK_BIT,
  WORDMARK_MANA,
  WORDMARK_WIDTH,
  WORDMARK_XHEIGHT,
} from "./manabit-paths";

export type ManabitVariant = "horizontal" | "vertical" | "emblem" | "wordmark";
/** color: tinta + bit coral · mono: un solo color, el bit queda como hueco */
export type ManabitTone = "color" | "mono";

type Props = Omit<SVGProps<SVGSVGElement>, "viewBox"> & {
  variant?: ManabitVariant;
  tone?: ManabitTone;
  /** Texto para lectores de pantalla. */
  title?: string;
};

/**
 * Logo de manabit en contornos.
 * - La tinta usa `currentColor`: contrólala con clases (`text-[#282B4A]`, `text-brand-ink`…).
 * - El bit usa `--manabit-bit` (por defecto coral #D4573F). En fondo oscuro usa #F08A74.
 */
export function ManabitLogo({ variant = "horizontal", tone = "color", title = "manabit", ...rest }: Props) {
  const bitFill = "var(--manabit-bit, #D4573F)";
  const emblem = (
    <>
      <path fillRule="evenodd" d={EMBLEM_BASE} fill="currentColor" />
      {tone === "color" && <path d={EMBLEM_BIT} fill={bitFill} />}
    </>
  );
  const wordmark = (
    <>
      <path d={WORDMARK_MANA} fill="currentColor" />
      {WORDMARK_BIT.map((d, i) => (
        <path key={i} d={d} fill="currentColor" />
      ))}
    </>
  );

  // Proporciones del sistema: altura de x del wordmark = 0.40 de la altura del emblema (horizontal)
  const kH = (48 * 0.4) / WORDMARK_XHEIGHT;
  const kV = (48 * 0.42) / WORDMARK_XHEIGHT;
  const lx = 48 * 1.28;

  if (variant === "emblem")
    return (
      <svg viewBox="0 0 48 48" role="img" aria-label={title} {...rest}>
        {emblem}
      </svg>
    );

  if (variant === "wordmark")
    return (
      <svg viewBox={`-2 -72 ${WORDMARK_WIDTH + 4} 76`} role="img" aria-label={title} {...rest}>
        {wordmark}
      </svg>
    );

  if (variant === "vertical") {
    const w = WORDMARK_WIDTH * kV;
    const h = 48 + 18 + 72 * kV + 2;
    return (
      <svg viewBox={`0 0 ${w.toFixed(2)} ${h.toFixed(2)}`} role="img" aria-label={title} {...rest}>
        <g transform={`translate(${((w - 48) / 2).toFixed(2)},0)`}>{emblem}</g>
        <g transform={`translate(0,${(h - 2).toFixed(2)}) scale(${kV.toFixed(5)})`}>{wordmark}</g>
      </svg>
    );
  }

  const width = lx + WORDMARK_WIDTH * kH + 1;
  return (
    <svg viewBox={`0 0 ${width.toFixed(2)} 48`} role="img" aria-label={title} {...rest}>
      {emblem}
      <g transform={`translate(${lx.toFixed(2)},38.4) scale(${kH.toFixed(5)})`}>{wordmark}</g>
    </svg>
  );
}
