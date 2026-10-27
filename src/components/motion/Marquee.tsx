import type { CSSProperties, ReactNode } from "react";

type Props = { children: ReactNode; duration?: number; reverse?: boolean };

/** Cinta infinita en CSS puro: se duplica el contenido y se desplaza -50 %. Pausa al pasar el puntero. */
export function Marquee({ children, duration = 42, reverse = false }: Props) {
  const style = {
    "--marquee-duration": `${duration}s`,
    animationDirection: reverse ? "reverse" : "normal",
  } as CSSProperties;
  return (
    <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]" style={style}>
        <div className="flex items-center gap-8 pr-8">{children}</div>
        <div className="flex items-center gap-8 pr-8" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
