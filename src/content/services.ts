/**
 * Lista de servicios y precios: la única fuente para /servicios, el resumen de la home
 * y la tarjeta del hero. Para cambiar un precio, edita `price` aquí y vuelve a desplegar.
 *
 * - fixed: precio cerrado en USD (`from: true` lo muestra como "Desde $X").
 * - quote: se cotiza por proyecto.
 * - ask:   aún sin precio publicado; el botón lleva a preguntar por WhatsApp.
 * - soon:  en desarrollo o por habilitar.
 */
export type Price =
  | { kind: "fixed"; amount: number; from?: boolean }
  | { kind: "quote" }
  | { kind: "ask" }
  | { kind: "soon" };

export type ServiceStatus = "available" | "soon";

export type Service = {
  id: string;
  /** Raíz del nombre de plan manabita: "chifle" → Chiflebit. */
  plan?: string;
  name: string;
  /** Nombre corto para listas (tarjeta del hero y resumen de la home). */
  short: string;
  summary: string;
  includes?: readonly string[];
  price: Price;
  status: ServiceStatus;
  featured?: boolean;
  /** Mensaje prellenado de WhatsApp. Si el precio es fijo se agrega solo (ver waMessage). */
  waText: string;
};

export type ServiceGroup = {
  id: string;
  index: string;
  label: string;
  title: string;
  lead: string;
  services: readonly Service[];
};

export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    id: "presencia",
    index: "01",
    label: "Tu negocio en internet",
    title: "Que te encuentren y te escriban.",
    lead: "Tu ficha de Google Maps y tu página, con tu WhatsApp a un toque.",
    services: [
      {
        id: "ficha-maps",
        name: "Ficha de Google Maps + WhatsApp Business",
        short: "Ficha de Maps + WhatsApp",
        summary: "Voy a tu local y dejo tu negocio fácil de encontrar y de escribir. Pagas cuando lo veas funcionando.",
        includes: [
          "Ficha de Google Maps con teléfono, horario, ubicación y fotos",
          "WhatsApp Business con catálogo de tus servicios",
          "Respuesta automática para cuando estás atendiendo",
          "Lo configuro en tu local, en Portoviejo",
        ],
        price: { kind: "fixed", amount: 35 },
        status: "available",
        featured: true,
        waText: "Hola, quiero la ficha de Google Maps + WhatsApp Business para mi negocio.",
      },
      {
        id: "chiflebit",
        plan: "chifle",
        name: "Página web de una sola página",
        short: "Chiflebit · página web",
        summary: "Tu negocio visible y serio en internet, con un solo objetivo: que te escriban.",
        includes: [
          "Diseño propio con tu marca",
          "Botón de WhatsApp con mensaje listo",
          "Ubicación en Google Maps",
          "Rápida en el celular",
          "Publicada y lista para compartir",
        ],
        price: { kind: "fixed", amount: 200 },
        status: "available",
        waText: "Hola, quiero una página web (Chiflebit) para mi negocio.",
      },
    ],
  },
  {
    id: "sistemas",
    index: "02",
    label: "Sistemas",
    title: "Software sobre cómo trabaja tu negocio.",
    lead: "Para procesos que ninguna plantilla cubre.",
    services: [
      {
        id: "toquillabit",
        plan: "toquilla",
        name: "Sistema a la medida",
        short: "Toquillabit · a la medida",
        summary: "Se teje a la medida, como la toquilla: módulos, usuarios y panel según tu operación.",
        includes: [
          "Primera conversación sin costo",
          "Usuarios, roles y módulos propios",
          "Base de datos y panel de gestión",
          "Capacitación a tu equipo",
        ],
        price: { kind: "quote" },
        status: "available",
        waText: "Hola, quiero cotizar un sistema a la medida (Toquillabit).",
      },
      {
        id: "tongabit",
        plan: "tonga",
        name: "Recepción y agenda automática",
        short: "Tongabit · agenda automática",
        summary: "Atiende los mensajes de tu web, agenda citas y te muestra los números del mes. En desarrollo: el primer piloto corre en Manabit.",
        price: { kind: "soon" },
        status: "soon",
        waText: "Hola, quiero que me avisen cuando Tongabit esté listo.",
      },
    ],
  },
  {
    id: "licencias",
    index: "03",
    label: "Licencias y ofimática",
    title: "Office listo para trabajar.",
    lead: "Remoto o en persona. Escríbeme y te paso el precio.",
    services: [
      {
        id: "office-2024",
        name: "Office 2024 instalado y activado",
        short: "Office 2024",
        summary: "Lo dejo instalado y activado en tu computadora, de forma remota o en persona.",
        includes: ["Remoto o en persona", "Queda activado y listo para usar", "Ayuda por WhatsApp si algo falla"],
        price: { kind: "ask" },
        status: "available",
        waText: "Hola, quiero activar Office 2024. ¿Cuánto cuesta?",
      },
      {
        id: "office-antivirus",
        name: "Office 2024 + antivirus",
        short: "Office + antivirus",
        summary: "Office 2024 y un antivirus instalados juntos.",
        includes: ["Office 2024 instalado y activado", "Antivirus instalado y configurado"],
        price: { kind: "ask" },
        status: "available",
        waText: "Hola, quiero Office 2024 + antivirus. ¿Cuánto cuesta?",
      },
      {
        id: "microsoft-365",
        name: "Microsoft 365 para negocios",
        short: "Microsoft 365",
        summary: "Suscripción para tu equipo, contratada y configurada conmigo. Estoy habilitando este servicio.",
        price: { kind: "soon" },
        status: "soon",
        waText: "Hola, quiero que me avisen cuando tengan Microsoft 365 para negocios.",
      },
    ],
  },
];

const usd = new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Texto del precio tal como se muestra. */
export function priceLabel(price: Price): string {
  switch (price.kind) {
    case "fixed":
      return price.from ? `Desde ${usd.format(price.amount)}` : usd.format(price.amount);
    case "quote":
      return "Cotización";
    case "ask":
      return "Consúltalo";
    case "soon":
      return "Pronto";
  }
}

/** Nombre visible: el plan manabita si existe ("Chiflebit"), si no el nombre del servicio. */
export function planName(stem: string): string {
  return `${stem.charAt(0).toUpperCase()}${stem.slice(1)}bit`;
}

/** Mensaje de WhatsApp del servicio, con el precio vigente cuando es fijo. */
export function waMessage(service: Service): string {
  return service.price.kind === "fixed" ? `${service.waText} Precio en la web: ${priceLabel(service.price)}.` : service.waText;
}

export const ALL_SERVICES: readonly Service[] = SERVICE_GROUPS.flatMap((g) => g.services);
