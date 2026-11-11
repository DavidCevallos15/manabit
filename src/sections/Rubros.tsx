import { Marquee } from "@/components/motion/Marquee";

const ROW_A = ["Barberías", "Consultorios", "Talleres", "Restaurantes", "Tiendas"] as const;
const ROW_B = ["Oficinas", "Profesionales", "Emprendedores", "Gimnasios", "Reposterías"] as const;

function Item({ label, muted = false }: { label: string; muted?: boolean }) {
  return (
    <span className="flex items-center gap-8">
      <span
        className={
          muted
            ? "text-5xl font-extrabold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--muted)] md:text-7xl"
            : "text-5xl font-extrabold tracking-[-0.04em] md:text-7xl"
        }
      >
        {label}
      </span>
      <span className="size-3 bg-muted/60" aria-hidden />
    </span>
  );
}

/** Para quién trabajo: dos cintas en sentidos opuestos. */
export function Rubros() {
  return (
    <section aria-label="Para quién trabajo" className="relative border-y border-line py-12 md:py-16">
      <p className="eyebrow mb-8 px-[var(--spacing-section-x)] text-muted">Para quién trabajo</p>
      <div className="grid gap-6">
        <Marquee duration={42}>
          {ROW_A.map((r) => (
            <Item key={r} label={r} />
          ))}
        </Marquee>
        <Marquee duration={48} reverse>
          {ROW_B.map((r) => (
            <Item key={r} label={r} muted />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
