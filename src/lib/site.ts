/**
 * Datos públicos del negocio. WhatsApp en formato internacional sin "+".
 * Las redes sin URL no se muestran.
 */
export const site = {
  name: "Manabit",
  descriptor: "Estudio de software",
  tagline: "Webs que trabajan por tu negocio.",
  zone: "Portoviejo y Manta",
  url: "https://manabit-three.vercel.app",
  founder: "David Cevallos",
  portfolio: "https://davidcevallos.vercel.app",
  whatsappNumber: "593979107716",
  email: "jimdav1506ceva@gmail.com",
  social: {
    instagram: "",
    tiktok: "",
    linkedin: "https://www.linkedin.com/in/jimmy-david-cevallos-zambrano-859876191/",
  },
} as const;

/** Enlace a WhatsApp con mensaje prellenado. Sin número configurado abre el selector de chat. */
export function waLink(text: string): string {
  const base = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const CTA_DIAGNOSTICO = waLink("Hola, quiero el DIAGNÓSTICO gratis para mi negocio.");
