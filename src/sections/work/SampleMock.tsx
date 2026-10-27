import type { Sample } from "@/content/samples";

/** Maqueta dibujada de una landing de muestra. Si `image` existe, se muestra la captura real. */
export function SampleMock({ sample }: { sample: Sample }) {
  const { bg, fg, accent } = sample.palette;
  return (
    <figure className="w-[min(78vw,520px)] shrink-0">
      <div className="cut overflow-hidden border border-line bg-surface p-2">
        <div className="flex items-center gap-1.5 px-2 py-2">
          <i className="size-2 bg-muted/50" />
          <i className="size-2 bg-muted/50" />
          <i className="size-2 bg-muted/50" />
          <span className="ml-3 font-mono text-[11px] font-bold text-muted">{sample.domain}</span>
        </div>
        {sample.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={sample.image} alt={`Landing de muestra para ${sample.rubro}`} loading="lazy" className="aspect-[16/11] w-full object-cover" />
        ) : (
          <div className="relative aspect-[16/11] w-full overflow-hidden p-[6%]" style={{ background: bg, color: fg }} aria-hidden>
            <div className="flex items-center justify-between">
              <span className="h-3 w-16" style={{ background: fg }} />
              <span className="flex gap-3">
                <span className="h-1.5 w-8 opacity-50" style={{ background: fg }} />
                <span className="h-1.5 w-8 opacity-50" style={{ background: fg }} />
                <span className="h-1.5 w-8 opacity-50" style={{ background: fg }} />
              </span>
            </div>
            <div className="mt-[8%] grid grid-cols-[1.25fr_1fr] gap-[6%]">
              <div>
                <p className="text-[clamp(1.25rem,3.4vw,2.1rem)] font-extrabold leading-[0.98] tracking-[-0.035em]">{sample.headline}</p>
                <span className="mt-3 block h-1.5 w-11/12 opacity-40" style={{ background: fg }} />
                <span className="mt-1.5 block h-1.5 w-8/12 opacity-40" style={{ background: fg }} />
                <span className="mt-5 inline-block px-3 py-2 text-[11px] font-bold" style={{ background: accent, color: bg }}>
                  {sample.cta}
                </span>
              </div>
              <div
                className="aspect-[4/5]"
                style={{ background: `repeating-linear-gradient(135deg, ${accent} 0 10px, transparent 10px 20px)`, opacity: 0.85 }}
              />
            </div>
          </div>
        )}
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <span className="text-xl font-extrabold tracking-[-0.02em]">{sample.rubro}</span>
        <span className="eyebrow text-muted">Landing de muestra</span>
      </figcaption>
    </figure>
  );
}
