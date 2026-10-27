import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

export function About() {
  return (
    <section id="estudio" className="about-section mx-auto max-w-7xl px-[var(--spacing-section-x)] py-[var(--spacing-section-y)]">
      <Reveal><h2 className="text-4xl font-extrabold leading-none tracking-[-0.035em] md:text-6xl">De Manabí, para tu negocio.</h2></Reveal>
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="studio-film cut-lg overflow-hidden bg-surface">
          <video controls playsInline preload="none" poster="/media/studio/coding-loop-poster.webp" width={1280} height={720}
            aria-label="Ilustración animada del estudio de desarrollo" className="aspect-video w-full object-cover">
            <source src="/media/studio/coding-loop.webm" type="video/webm" />
            <source src="/media/studio/coding-loop.mp4" type="video/mp4" />
            Tu navegador no reproduce este video.
          </video>
          <p className="px-6 py-4 text-sm text-muted">Una mirada al estudio · ilustración animada</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mb-6 flex items-center gap-5">
            <img src="/media/studio/neutral.webp" alt="Avatar de David Cevallos" width={80} height={80} loading="lazy" className="size-20 object-cover object-top" />
            <p className="text-lg"><strong>{site.founder}</strong><br /><span className="text-muted">Fundador · Desarrollador full-stack</span></p>
          </div>
          <p className="text-xl leading-relaxed">Soy David, de Manabit. Construyo sitios y sistemas web para profesionales y negocios: desde lo que ve tu cliente hasta el panel que usa tu equipo.</p>
          <p className="mt-5 text-lg leading-relaxed text-muted">Trabajo desde Portoviejo, con foco en Portoviejo y Manta. Hablas conmigo durante el diagnóstico, el desarrollo y el soporte. Fuera de Manabí, nos conectamos por videollamada.</p>
          <a href={site.portfolio} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center gap-3 font-bold hover:text-accent">Conoce mi portafolio <span aria-hidden>↗</span></a>
        </Reveal>
      </div>
    </section>
  );
}
