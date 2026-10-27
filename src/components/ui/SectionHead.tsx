import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Props = { eyebrow: string; title: ReactNode; lead?: ReactNode; className?: string };

export function SectionHead({ eyebrow, title, lead, className }: Props) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <Reveal>
        <p className="eyebrow text-muted">{eyebrow}</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] md:text-6xl">{title}</h2>
      </Reveal>
      {lead ? (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
