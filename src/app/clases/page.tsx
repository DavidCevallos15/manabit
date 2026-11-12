import type { Metadata } from "next";
import { PageBoot } from "@/components/brand/PageBoot";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelCursor } from "@/components/motion/PixelCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Spotlight } from "@/components/motion/Spotlight";
import { CLASS, CLASS_FROM } from "@/content/classes";
import { CLASSES_PATH, site } from "@/lib/site";
import { Closing } from "@/sections/Closing";
import { ClassesHero } from "@/sections/classes/ClassesHero";
import { ClassesProgram } from "@/sections/classes/ClassesProgram";
import { Reviews } from "@/sections/classes/Reviews";

const title = `Clases de ${CLASS.name} · ${site.name}`;
const description = `Clase en vivo para hacer tus deberes con inteligencia artificial: informes, diapositivas, infografías y mapas mentales con ${CLASS.tool}. Desde $${CLASS_FROM} por persona. Dicta el ${CLASS.teacher}.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: CLASSES_PATH },
  openGraph: {
    title,
    description,
    locale: "es_EC",
    type: "website",
    url: CLASSES_PATH,
    siteName: site.name,
    images: [{ url: "/opengraph-image.png", alt: `${site.name} · ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image.png"] },
};

/** Página de las clases de IA: es el link que se comparte por WhatsApp, también para pedir reseñas (#resenas). */
export default function ClasesPage() {
  return (
    <PageBoot instant>
      <SmoothScroll>
        <Spotlight />
        <SiteHeader />
        <main id="contenido" className="relative z-10">
          <ClassesHero />
          <ClassesProgram />
          <Reviews />
        </main>
        <div className="relative z-10">
          <Closing />
        </div>
        <FloatingCta />
        <PixelCursor />
      </SmoothScroll>
    </PageBoot>
  );
}
