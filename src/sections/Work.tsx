"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";
import type { CircularCarouselItem } from "@/components/reactbits/CircularCarousel";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECTS, TEMPLATES, type WorkItem } from "@/content/work";
import { useMediaQuery } from "@/lib/hooks";
import { waLink } from "@/lib/site";
import { PALETTE, useTheme } from "@/lib/theme";

/** Solo cliente: sus transformaciones 3D se calculan con el tamaño real del contenedor. */
const CircularCarousel = dynamic(() => import("@/components/reactbits/CircularCarousel"), { ssr: false });

type View = "projects" | "templates";

/** Con menos tarjetas el cilindro queda cerrado: la lista se repite hasta llenar el anillo. */
const MIN_RING = 6;

/** Las capturas del portafolio son 1200×750. */
const CARD_RATIO = 8 / 5;

const hrefOf = (item: WorkItem) =>
  item.href ?? waLink(`Hola, quiero conocer la demo ${item.title} para mi negocio de ${item.type.toLowerCase()}.`);

export function Work() {
  const [view, setView] = useState<View>("projects");
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const theme = useTheme();
  const wide = useMediaQuery("(min-width: 768px)");

  const items = view === "projects" ? PROJECTS : TEMPLATES;
  const slides = useMemo<CircularCarouselItem[]>(() => {
    const once = items.map((item) => ({
      src: `/media/projects/${item.image}-card.webp`,
      alt: `Captura de la web ${item.title}`,
      title: item.title,
      subtitle: item.type,
    }));
    const laps = Math.ceil(MIN_RING / once.length);
    return Array.from({ length: laps }, () => once).flat();
  }, [items]);
  const position = active % items.length;
  const current = items[position] ?? items[0];

  const show = (next: View) => {
    if (next === view) return;
    activeRef.current = 0;
    setActive(0);
    setView(next);
  };

  const onChange = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  /** Un clic trae la tarjeta al frente; si ya está al frente (o con Enter), abre el sitio. */
  const onItemClick = (_: CircularCarouselItem, index: number) => {
    const item = items[index % items.length];
    if (!item || index !== activeRef.current) return;
    window.open(hrefOf(item), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="trabajos" className="py-[var(--spacing-section-y)]">
      <Reveal className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-8 px-[var(--spacing-section-x)]">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-none tracking-[-0.035em] md:text-6xl">Del diseño a la web.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">Proyectos de David Cevallos y demos para imaginar el siguiente paso de tu negocio.</p>
        </div>
        <div className="work-filters flex flex-wrap gap-2" aria-label="Filtrar trabajos">
          <button type="button" aria-pressed={view === "projects"} onClick={() => show("projects")}>Proyectos publicados <span>{PROJECTS.length}</span></button>
          <button type="button" aria-pressed={view === "templates"} onClick={() => show("templates")}>Demos por rubro <span>{TEMPLATES.length}</span></button>
        </div>
      </Reveal>
      <p className="sr-only" role="status">{items.length} {view === "projects" ? "proyectos publicados" : "demos por rubro"}</p>

      {/* En móvil el anillo es más ancho que la pantalla: la tarjeta del frente gana tamaño y los lados se recortan. */}
      <Reveal className="work-carousel relative mt-8 h-[330px] overflow-hidden md:h-[540px]" data-cursor>
        <div className="absolute inset-y-0 left-1/2 w-[190%] -translate-x-1/2 md:w-full">
        <CircularCarousel
          key={view}
          items={slides}
          preset="cylinder"
          intro="rise"
          cardWidth={wide ? 440 : 250}
          aspectRatio={CARD_RATIO}
          speed={14}
          captions
          fadeColor={PALETTE[theme].bg}
          cornerRadius={0}
          onChange={onChange}
          onItemClick={onItemClick}
        />
        </div>
      </Reveal>

      <noscript>
        <ul className="mx-auto max-w-7xl px-[var(--spacing-section-x)]">
          {[...PROJECTS, ...TEMPLATES].map((item) => (
            <li key={item.image}><a href={hrefOf(item)}>{item.title} · {item.type}</a></li>
          ))}
        </ul>
      </noscript>

      {current && (
        <div className="mx-auto flex max-w-2xl flex-col items-center px-[var(--spacing-section-x)] text-center">
          <p className="font-mono text-xs font-bold tracking-[0.1em] text-muted" aria-hidden>
            {String(position + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </p>
          <p key={current.image} className="work-description mt-3 text-base leading-relaxed text-muted md:text-lg">{current.description}</p>
          <a href={hrefOf(current)} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-bold hover:text-accent" aria-label={`${current.href ? "Visitar" : "Consultar demo de"} ${current.title} (abre una pestaña nueva)`}>
            {current.href ? "Visitar web" : "Consultar esta demo"} <span className="ml-2" aria-hidden>→</span>
          </a>
          {view === "templates" && <p className="mt-5 text-sm text-muted">Demos de diseño adaptables a tu marca. Consulta por WhatsApp para ver cuál encaja con tu negocio.</p>}
        </div>
      )}
    </section>
  );
}
