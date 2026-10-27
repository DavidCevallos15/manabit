/**
 * Datos del negocio. Completa `whatsappNumber` (formato internacional sin "+": 5939XXXXXXXX)
 * y las redes cuando estén reservadas; los enlaces vacíos no se muestran.
 */
export const site = {
  name: "Manabit",
  descriptor: "Estudio de software",
  tagline: "Webs que trabajan por tu negocio.",
  zone: "Portoviejo y Manta",
  whatsappNumber: "",
  email: "",
  social: {
    instagram: "",
    tiktok: "",
    linkedin: "",
  },
} as const;

/** Enlace a WhatsApp con mensaje prellenado. Sin número configurado abre el selector de chat. */
export function waLink(text: string): string {
  const base = site.whatsappNumber ? `https://wa.me/${site.whatsappNumber}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export const CTA_DIAGNOSTICO = waLink("Hola, quiero el DIAGNÓSTICO gratis para mi negocio.");
