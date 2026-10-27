import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "solid" | "ghost" | "card";
  size?: "md" | "lg";
  children: ReactNode;
};

const variants = {
  solid: "bg-fg text-bg hover:bg-accent hover:text-bg",
  ghost: "bg-surface text-fg hover:bg-fg hover:text-bg",
  card: "bg-card-fg text-card hover:bg-card-accent",
} as const;

/** Botón-enlace con chaflán. Los externos (WhatsApp) abren en otra pestaña. */
export function Button({ variant = "solid", size = "md", className, children, href = "#", ...rest }: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "cut-sm inline-flex items-center gap-3 font-bold motion-interactive transition-colors",
        size === "lg" ? "px-7 py-4 text-lg" : "px-5 py-3 text-base",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </a>
  );
}
