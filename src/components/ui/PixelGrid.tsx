import { cn } from "@/lib/cn";

/** Rejilla de píxeles decorativa (el mismo motivo de los posts). Patrón fijo para no variar entre renders. */
const PATTERN = [1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1];

export function PixelGrid({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("grid grid-cols-6 gap-1.5 opacity-15", className)}>
      {PATTERN.map((on, i) => (
        <i key={i} className={cn("block size-3", on ? "bg-current" : "bg-transparent")} />
      ))}
    </div>
  );
}
