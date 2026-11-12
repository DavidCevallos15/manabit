/**
 * Clases de IA para todos: la única fuente para /clases.
 * Para cambiar un precio o un tema, edita aquí y vuelve a desplegar.
 */
import { site, waLink } from "@/lib/site";

/** Identificador del curso en la tabla de reseñas. Si lo cambias, las reseñas anteriores dejan de listarse. */
export const COURSE_ID = "ia-para-todos";

export const CLASS = {
  name: "IA para todos",
  teacher: site.founderTitle,
  tool: "Gemini Notebook",
  toolFormerly: "NotebookLM",
  duration: "2 horas",
  minGroup: 5,
  maxGroup: 15,
} as const;

/** Lo que cada persona sale sabiendo hacer. */
export const CLASS_TOPICS: readonly string[] = [
  "Subir tus PDF, guías y apuntes y pedir un resumen claro",
  "Armar un informe que indica de dónde salió cada dato",
  "Sacar tus referencias en formato APA",
  "Crear las diapositivas de tu exposición",
  "Hacer infografías y mapas mentales",
  "Ordenar las ideas para tus cuadros sinópticos",
  "Generar preguntas para repasar antes del examen",
];

export const CLASS_INCLUDES: readonly string[] = [
  "Guía paso a paso en PDF",
  "Grabación de la clase",
  "Grupo de WhatsApp para dudas durante 7 días",
];

export type ClassTier = { id: string; group: string; amount: number; featured?: boolean };

/** Precio por persona según el tamaño del grupo, en USD. */
export const CLASS_TIERS: readonly ClassTier[] = [
  { id: "grupo-10", group: "10 a 15 personas", amount: 5, featured: true },
  { id: "grupo-7", group: "7 a 9 personas", amount: 6 },
  { id: "grupo-5", group: "5 a 6 personas", amount: 8 },
];

export const CLASS_FROM = Math.min(...CLASS_TIERS.map((t) => t.amount));

export const CTA_CLASS = waLink(`Hola, quiero apartar mi cupo en la clase de ${CLASS.name}.`);
export const CTA_CLASS_GROUP = waLink(`Hola, somos un grupo y queremos la clase de ${CLASS.name}. ¿Qué fechas tienes?`);
export const CTA_REVIEW_WHATSAPP = waLink(`Hola David, tomé la clase de ${CLASS.name} y quiero dejarte mi reseña: `);
