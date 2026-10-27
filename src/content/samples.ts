export type Sample = {
  rubro: string;
  domain: string;
  headline: string;
  cta: string;
  palette: { bg: string; fg: string; accent: string };
  /** Ruta a una captura real (public/trabajos/…). Si existe, reemplaza el mockup dibujado. */
  image?: string;
};

/** Landings de muestra del portafolio (no son clientes). Colores por rubro, sin marcas de terceros. */
export const SAMPLES: readonly Sample[] = [
  { rubro: "Barbería", domain: "barberia.demo", headline: "Tu corte, a tu hora.", cta: "Reservar turno", palette: { bg: "#161616", fg: "#ede6da", accent: "#c8a26b" } },
  { rubro: "Cafetería", domain: "cafeteria.demo", headline: "Café de origen, pan de la casa.", cta: "Ver menú", palette: { bg: "#3b2a21", fg: "#f1e6d2", accent: "#d9a066" } },
  { rubro: "Comedor", domain: "comedor.demo", headline: "Almuerzos que saben a casa.", cta: "Pedir por WhatsApp", palette: { bg: "#f4ebdd", fg: "#5a2318", accent: "#c4472d" } },
  { rubro: "Gimnasio", domain: "gimnasio.demo", headline: "Entrena con un plan.", cta: "Clase de prueba", palette: { bg: "#0e0f11", fg: "#f2f2f2", accent: "#c6f432" } },
  { rubro: "Academia de karate", domain: "dojo.demo", headline: "Disciplina desde los 5 años.", cta: "Inscribirme", palette: { bg: "#f3f0e8", fg: "#1b1b1b", accent: "#b3261e" } },
  { rubro: "Estudio de arquitectura", domain: "arqui.demo", headline: "Espacios que se habitan.", cta: "Ver proyectos", palette: { bg: "#e7e4dd", fg: "#1f1f1f", accent: "#77776d" } },
  { rubro: "Hamburguesería", domain: "burger.demo", headline: "Smash, papas y salsa de la casa.", cta: "Ordenar", palette: { bg: "#151515", fg: "#f7efe3", accent: "#f2701d" } },
  { rubro: "Repostería", domain: "dulce-atelier.demo", headline: "Tortas por encargo.", cta: "Hacer pedido", palette: { bg: "#f7e3e8", fg: "#5e2a3e", accent: "#c2577a" } },
];
