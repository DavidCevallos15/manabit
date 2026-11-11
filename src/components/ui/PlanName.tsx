import { cn } from "@/lib/cn";

/** Nombre de plan manabita: la raíz en Bricolage y "bit" en mono, como el wordmark. */
export function PlanName({ stem, className }: { stem: string; className?: string }) {
  return (
    <span className={cn("font-extrabold tracking-[-0.04em]", className)}>
      {stem.charAt(0).toUpperCase()}
      {stem.slice(1)}
      <span className="font-mono tracking-[-0.06em]">bit</span>
    </span>
  );
}
