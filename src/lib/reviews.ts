/**
 * Reseñas de las clases, guardadas en Firestore y leídas desde el navegador (la web es un export estático).
 *
 * La seguridad vive en las reglas (firestore.rules): cualquiera puede enviar una reseña,
 * pero solo se listan las que tienen `approved == true`. La configuración web de Firebase
 * (apiKey y projectId) está pensada para ir en el navegador; no es un secreto.
 *
 * El SDK se importa de forma diferida para que solo pese en /clases y solo si las reseñas están activas.
 */
const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
};
const COLLECTION = "reviews";
const LIST_LIMIT = 100;

/** Sin variables de entorno la sección ofrece enviar la reseña por WhatsApp. */
export const reviewsEnabled = config.apiKey !== "" && config.projectId !== "";

export const REVIEW_LIMITS = { nameMin: 2, nameMax: 60, commentMin: 10, commentMax: 600 } as const;

export type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  /** ISO 8601. Vacío si el documento aún no tiene fecha del servidor. */
  createdAt: string;
};

export type ReviewDraft = { name: string; rating: number; comment: string };

let connected = false;

async function store() {
  const [{ getApps, initializeApp }, firestore] = await Promise.all([import("firebase/app"), import("firebase/firestore/lite")]);
  const app = getApps()[0] ?? initializeApp(config);
  const db = firestore.getFirestore(app);
  // Solo para pruebas locales con el emulador de Firestore.
  const emulator = process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR;
  if (emulator && !connected) {
    const [host, port] = emulator.split(":");
    firestore.connectFirestoreEmulator(db, host ?? "localhost", Number(port ?? 8080));
    connected = true;
  }
  return { db, ...firestore };
}

/** Reseñas aprobadas de un curso, de la más reciente a la más antigua. */
export async function listReviews(course: string): Promise<Review[]> {
  const { db, collection, getDocs, limit, query, where } = await store();
  // Solo filtros de igualdad: no necesita índice compuesto. El orden se resuelve aquí.
  const snapshot = await getDocs(
    query(collection(db, COLLECTION), where("course", "==", course), where("approved", "==", true), limit(LIST_LIMIT)),
  );
  return snapshot.docs
    .map((doc): Review => {
      const data = doc.data();
      const created: unknown = data.createdAt;
      return {
        id: doc.id,
        name: String(data.name ?? ""),
        rating: Number(data.rating ?? 0),
        comment: String(data.comment ?? ""),
        createdAt: created && typeof (created as { toDate?: unknown }).toDate === "function" ? (created as { toDate: () => Date }).toDate().toISOString() : "",
      };
    })
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** Guarda una reseña. Queda pendiente hasta que se aprueba en la consola de Firebase. */
export async function sendReview(course: string, draft: ReviewDraft): Promise<void> {
  const { db, addDoc, collection, serverTimestamp } = await store();
  await addDoc(collection(db, COLLECTION), {
    course,
    name: draft.name.trim(),
    rating: draft.rating,
    comment: draft.comment.trim(),
    approved: false,
    createdAt: serverTimestamp(),
  });
}

/** Valida igual que las reglas de Firestore, para avisar antes de enviar. */
export function validateReview(draft: ReviewDraft): Partial<Record<keyof ReviewDraft, string>> {
  const errors: Partial<Record<keyof ReviewDraft, string>> = {};
  const name = draft.name.trim();
  const comment = draft.comment.trim();
  if (name.length < REVIEW_LIMITS.nameMin) errors.name = "Escribe tu nombre.";
  else if (name.length > REVIEW_LIMITS.nameMax) errors.name = `Máximo ${REVIEW_LIMITS.nameMax} letras.`;
  if (!Number.isInteger(draft.rating) || draft.rating < 1 || draft.rating > 5) errors.rating = "Elige de 1 a 5.";
  if (comment.length < REVIEW_LIMITS.commentMin) errors.comment = "Cuéntame un poco más (mínimo 10 letras).";
  else if (comment.length > REVIEW_LIMITS.commentMax) errors.comment = `Máximo ${REVIEW_LIMITS.commentMax} letras.`;
  return errors;
}
