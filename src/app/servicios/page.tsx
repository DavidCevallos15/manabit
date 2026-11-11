import type { Metadata } from "next";
import { PageBoot } from "@/components/brand/PageBoot";
import { FloatingCta } from "@/components/layout/FloatingCta";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PixelCursor } from "@/components/motion/PixelCursor";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Spotlight } from "@/components/motion/Spotlight";
import { ALL_SERVICES, priceLabel } from "@/content/services";
import { SERVICES_PATH, site } from "@/lib/site";
import { Closing } from "@/sections/Closing";
import { ServiceCatalog } from "@/sections/services/ServiceCatalog";
import { ServicesHero } from "@/sections/services/ServicesHero";

const title = `Servicios y precios · ${site.name}`;
/** Arma la descripción con los precios vigentes de content/services.ts. */
const priceOf = (id: string) => {
  const s = ALL_SERVICES.find((x) => x.id === id);
  return s && s.price.kind === "fixed" ? ` a ${priceLabel(s.price)}` : "";
};
const description = `Ficha de Google Maps${priceOf("ficha-maps")}, página web Chiflebit${priceOf("chiflebit")}, sistemas a la medida y Office en Portoviejo y Manta. Pide por WhatsApp con el mensaje listo.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: SERVICES_PATH },
  openGraph: {
    title,
    description,
    locale: "es_EC",
    type: "website",
    url: SERVICES_PATH,
    siteName: site.name,
    images: [{ url: "/opengraph-image.png", alt: `${site.name} · ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image.png"] },
};

export default function ServiciosPage() {
  return (
    <PageBoot instant>
      <SmoothScroll>
        <Spotlight />
        <SiteHeader />
        <main id="contenido" className="relative z-10">
          <ServicesHero />
          <ServiceCatalog />
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
