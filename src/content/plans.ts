export type Plan = {
  stem: string;
  level: string;
  tagline: string;
  why: string;
  includes: readonly string[];
  forWho: string;
  featured?: boolean;
};

/** Precios fuera a propósito: los rangos aún se validan con los primeros diagnósticos. */
export const PLANS: readonly Plan[] = [
  {
    stem: "chifle",
    level: "Básico · Presencia",
    tagline: "Tu negocio visible, con botón de WhatsApp.",
    why: "El chifle es crujiente, rápido y se come en cualquier lado: entra fácil.",
    includes: [
      "Landing de una vista con diseño propio",
      "Botón de WhatsApp con mensaje listo",
      "Ubicación en el mapa y dominio",
      "Un lote de cambios al mes",
      "Reporte de mensajes que llegaron desde la web",
    ],
    forWho: "Negocios que hoy viven solo en Instagram o Facebook y quieren verse serios. Es la fase 1 del sistema.",
  },
  {
    stem: "tonga",
    level: "Medio · Sistema",
    tagline: "Página, reservas, WhatsApp y panel con tus números.",
    why: "La tonga es la comida completa envuelta en una sola hoja: todo viene incluido.",
    includes: [
      "Todo lo de Chiflebit",
      "Reservas en línea",
      "Confirmación de cita por WhatsApp",
      "Panel con resultados",
      "Reporte mensual: citas, inasistencias y clientes recuperados",
      "Mejoras cada mes",
    ],
    forWho: "Barberías, consultorios, gimnasios y academias con la agenda llena de mensajes.",
    featured: true,
  },
  {
    stem: "toquilla",
    level: "Premium · A la medida",
    tagline: "Software diseñado sobre el flujo de tu negocio.",
    why: "La toquilla se teje a mano y a la medida; lo más fino de Manabí sale de Montecristi.",
    includes: [
      "Diagnóstico a fondo de tu operación",
      "Usuarios, roles y módulos propios",
      "Base de datos y panel de gestión",
      "Capacitación al equipo",
      "Soporte prioritario",
    ],
    forWho: "Talleres, clínicas y negocios con procesos que ninguna plantilla cubre. Se cotiza por proyecto.",
  },
];
