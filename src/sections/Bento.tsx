import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/cn";

function Cell({ title, body, className, delay, children }: { title: string; body: string; className?: string; delay: number; children?: ReactNode }) {
  return (
    <Reveal delay={delay} className={cn("cut flex min-w-0 flex-col justify-between gap-8 overflow-hidden border border-line bg-surface p-6 md:p-8", className)}>
      <div className="min-w-0" aria-hidden>{children}</div>
      <div>
        <h3 className="text-2xl font-extrabold tracking-[-0.025em]">{title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{body}</p>
      </div>
    </Reveal>
  );
}

/** Mini maqueta de página: barra, titular y bloque de imagen. */
function PageMock() {
  return (
    <div className="cut-sm border border-line bg-bg p-4">
      <div className="flex items-center gap-1.5">
        <i className="size-2 bg-muted/50" />
        <i className="size-2 bg-muted/50" />
        <i className="size-2 bg-muted/50" />
        <span className="ml-3 h-2 w-24 bg-line" />
      </div>
      <div className="mt-5 grid grid-cols-[1.3fr_1fr] gap-4">
        <div className="grid content-start gap-2.5">
          <span className="h-4 w-11/12 bg-fg" />
          <span className="h-4 w-8/12 bg-fg" />
          <span className="mt-2 h-2 w-10/12 bg-line" />
          <span className="h-2 w-9/12 bg-line" />
          <span className="cut-sm mt-3 h-7 w-28 bg-fg" />
        </div>
        <div className="aspect-[4/3] bg-[repeating-linear-gradient(135deg,var(--line)_0_8px,transparent_8px_16px)]" />
      </div>
    </div>
  );
}

function CalendarMock() {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {Array.from({ length: 21 }, (_, i) => (
        <i key={i} className={cn("aspect-square", i === 10 ? "bg-accent" : i % 4 === 0 ? "bg-fg/70" : "bg-line")} />
      ))}
    </div>
  );
}

function ChatMock() {
  return (
    <div className="grid gap-2">
      <span className="h-7 w-9/12 bg-line" />
      <span className="h-7 w-8/12 justify-self-end bg-fg/80" />
      <span className="cut-sm flex h-8 w-10/12 items-center gap-2 justify-self-end border border-fg/60 px-2 font-mono text-[10px] font-bold">
        CITA CONFIRMADA
      </span>
    </div>
  );
}

function PanelMock() {
  const bars = [38, 52, 45, 64, 58, 72, 80] as const;
  return (
    <div>
      <div className="flex h-32 items-end gap-2">
        {bars.map((h, i) => (
          <span key={i} className="flex-1 bg-fg/80" style={{ height: `${h}%` }} />
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-muted">Vista de ejemplo</p>
    </div>
  );
}

function ReportMock() {
  return (
    <ul className="grid gap-2 font-mono text-sm font-bold">
      {["Citas confirmadas", "Inasistencias", "Clientes recuperados"].map((l) => (
        <li key={l} className="flex justify-between border-b border-line pb-2">
          <span>{l}</span>
          <span className="text-muted">— —</span>
        </li>
      ))}
    </ul>
  );
}

/** Qué incluye un sistema Manabit, en celdas con entrada escalonada. */
export function Bento() {
  return (
    <section id="sistema" className="mx-auto max-w-7xl px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <SectionHead
        eyebrow="Qué se instala"
        title="No es una web suelta. Es un sistema."
        lead="Cada pieza se conecta con la siguiente: el cliente te encuentra, reserva, recibe la confirmación y tú ves los números."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-6">
        <Cell delay={0} className="md:col-span-4" title="Página con sello visual" body="Diseño propio, rápida en el celular y con un solo objetivo: que te escriban.">
          <PageMock />
        </Cell>
        <Cell delay={0.08} className="md:col-span-2" title="Reservas en línea" body="Tus clientes eligen día y hora sin esperar respuesta.">
          <CalendarMock />
        </Cell>
        <Cell delay={0.16} className="md:col-span-2" title="Confirmación por WhatsApp" body="La cita queda confirmada en el chat que ya usan.">
          <ChatMock />
        </Cell>
        <Cell delay={0.24} className="md:col-span-4" title="Panel con resultados" body="Cuántos mensajes llegaron, cuántos agendaron y de dónde vinieron.">
          <PanelMock />
        </Cell>
        <Cell delay={0.32} className="md:col-span-3" title="Reporte mensual" body="Los números del mes en una sola hoja, sin adornos.">
          <ReportMock />
        </Cell>
        <Cell delay={0.4} className="md:col-span-3" title="Mejoras cada mes" body="Mantenimiento y ajustes sobre la misma plataforma. No se empieza de cero.">
          <div className="flex items-center gap-3 font-mono text-sm font-bold">
            <span className="size-3 bg-fg" />
            <span className="h-px flex-1 bg-line" />
            <span className="size-3 bg-fg" />
            <span className="h-px flex-1 bg-line" />
            <span className="size-3 bg-fg" />
          </div>
        </Cell>
      </div>
    </section>
  );
}
