"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECTS, TEMPLATES, type WorkItem } from "@/content/work";
import { waLink } from "@/lib/site";

export function Work() {
  const [view, setView] = useState<"projects" | "templates">("projects");
  const items = view === "projects" ? PROJECTS : TEMPLATES;
  return (
    <section id="trabajos" className="mx-auto max-w-7xl px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <Reveal className="flex flex-wrap items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-extrabold leading-none tracking-[-0.035em] md:text-6xl">Del diseño a la web.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">Proyectos de David Cevallos y demos para imaginar el siguiente paso de tu negocio.</p>
        </div>
        <div className="work-filters flex flex-wrap gap-2" aria-label="Filtrar trabajos">
          <button type="button" aria-pressed={view === "projects"} onClick={() => setView("projects")}>Proyectos publicados <span>{PROJECTS.length}</span></button>
          <button type="button" aria-pressed={view === "templates"} onClick={() => setView("templates")}>Demos por rubro <span>{TEMPLATES.length}</span></button>
        </div>
      </Reveal>
      <p className="sr-only" role="status">{items.length} {view === "projects" ? "proyectos publicados" : "demos por rubro"}</p>
      <div className="work-grid mt-12" key={view}>
        {items.map((item, index) => <WorkCard key={item.image} item={item} index={index} />)}
      </div>
      {view === "templates" && <p className="mt-7 text-base text-muted">Demos de diseño adaptables a tu marca. Consulta por WhatsApp para ver cuál encaja con tu negocio.</p>}
    </section>
  );
}

function WorkCard({ item, index }: { item: WorkItem; index: number }) {
  const href = item.href ?? waLink(`Hola, quiero conocer la demo ${item.title} para mi negocio de ${item.type.toLowerCase()}.`);
  return (
    <Reveal delay={Math.min(index * 0.06, 0.18)} className="work-item">
      <article>
        <a href={href} target="_blank" rel="noopener noreferrer" className="work-preview block overflow-hidden bg-surface" aria-label={`${item.href ? "Visitar" : "Consultar demo de"} ${item.title} (abre una pestaña nueva)`}>
          <img src={`/media/projects/${item.image}-card.webp`} alt={`Captura de la web ${item.title}`} width={1200} height={750} loading="lazy" className="aspect-[8/5] w-full object-cover object-top transition-transform duration-500 hover:scale-[1.025]" />
        </a>
        <div className="pt-5">
          <p className="text-base text-muted">{item.type}</p>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight"><a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-accent">{item.title} <span aria-hidden className="text-xl">↗</span></a></h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{item.description}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center font-bold hover:text-accent">{item.href ? "Visitar web" : "Consultar esta demo"} <span className="ml-2" aria-hidden>→</span></a>
        </div>
      </article>
    </Reveal>
  );
}
