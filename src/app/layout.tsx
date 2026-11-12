import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { site } from "@/lib/site";

const description =
  "Ficha de Google Maps, páginas web y sistemas a la medida para negocios de Portoviejo y Manta. Precios claros y atención directa por WhatsApp.";
const title = `${site.name} · Webs, Google Maps y sistemas en Portoviejo`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  authors: [{ name: site.founder, url: site.portfolio }],
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title,
    description,
    locale: "es_EC",
    type: "website",
    url: "/",
    siteName: site.name,
    images: [{ url: "/opengraph-image.png", alt: `${site.name} · ${site.tagline}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image.png"] },
};

export const viewport: Viewport = {
  themeColor: "#1c1e35",
  width: "device-width",
  initialScale: 1,
};

/** Aplica el tema guardado antes del primer pintado (evita el destello). */
const themeScript = `try{var t=localStorage.getItem('manabit-theme');if(t==='paper'||t==='night')document.documentElement.dataset.theme=t}catch(e){}`;
/** Páginas de destino (anuncios, links de WhatsApp): sin pantalla de carga para que pinten de inmediato. */
const NO_BOOT_PATHS = ["/servicios", "/clases"];
const bootScript = `if(!${JSON.stringify(NO_BOOT_PATHS)}.some(function(p){return location.pathname.indexOf(p)===0})){document.documentElement.classList.add('booting');setTimeout(function(){if(document.documentElement.classList.contains('booting')){document.documentElement.classList.remove('booting');document.documentElement.classList.add('boot-fallback')}},4500)}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-theme="night" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript><style>{`#page-loader{display:none}header[style],main [style],footer [style]{opacity:1!important;transform:none!important}`}</style></noscript>
      </head>
      <body><a href="#contenido" className="skip-link">Saltar al contenido</a>{children}</body>
    </html>
  );
}
