import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/bricolage-grotesque/opsz.css";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

const description =
  "Estudio de software en Portoviejo. Instalo el sistema que convierte los mensajes de tu WhatsApp, tus redes y tu web en citas confirmadas.";

export const metadata: Metadata = {
  title: "Manabit · Webs que trabajan por tu negocio",
  description,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Manabit · Estudio de software",
    description,
    locale: "es_EC",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#1c1e35",
  width: "device-width",
  initialScale: 1,
};

/** Aplica el tema guardado antes del primer pintado (evita el destello). */
const themeScript = `try{var t=localStorage.getItem('manabit-theme');if(t==='paper'||t==='night')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" data-theme="night" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
