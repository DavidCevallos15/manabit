/**
 * Datos públicos del negocio. WhatsApp en formato internacional sin "+".
 * Las redes sin URL no se muestran.
 */
export const site = {
  name: "Manabit Sistemas",
  shortName: "Manabit",
  descriptor: "Sistemas",
  tagline: "Tu área de sistemas, en Manabí.",
  zone: "Portoviejo y Manta",
  url: "https://manabitsistemas.vercel.app",
  founder: "David Cevallos",
  portfolio: "https://davidcevallos.me",
  whatsappNumber: "593979107716",
  /** Cómo se lee el número en pantalla. */
  whatsappDisplay: "+593 97 910 7716",
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

/** Consulta general: header, botón flotante y cierre. */
export const CTA_WHATSAPP = waLink("Hola, vi la web de Manabit Sistemas y quiero hacer una consulta.");

/** Ruta de la lista de precios. */
export const SERVICES_PATH = "/servicios";
