"use client";
import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { CLASS, COURSE_ID, CTA_REVIEW_WHATSAPP } from "@/content/classes";
import { cn } from "@/lib/cn";
import { REVIEW_LIMITS, listReviews, reviewsEnabled, sendReview, validateReview, type Review, type ReviewDraft } from "@/lib/reviews";
import { REVIEWS_ANCHOR } from "@/lib/site";

const RATING_WORDS = ["", "Mala", "Regular", "Buena", "Muy buena", "Excelente"] as const;
const EMPTY: ReviewDraft = { name: "", rating: 0, comment: "" };
const monthYear = new Intl.DateTimeFormat("es-EC", { month: "long", year: "numeric" });

/** Calificación como cinco píxeles: el mismo motivo cuadrado de la marca. */
function Pixels({ rating, onCard = false }: { rating: number; onCard?: boolean }) {
  return (
    <span role="img" aria-label={`${rating} de 5`} className="inline-flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          aria-hidden
          className={cn("size-3", n <= rating ? (onCard ? "bg-card-accent" : "bg-accent") : onCard ? "bg-card-fg/20" : "bg-fg/20")}
        />
      ))}
    </span>
  );
}

function ReviewList() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!reviewsEnabled) return;
    let cancelled = false;
    listReviews(COURSE_ID)
      .then((list) => {
        if (!cancelled) setReviews(list);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const average = useMemo(() => {
    if (!reviews || reviews.length === 0) return null;
    return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  }, [reviews]);

  if (!reviewsEnabled || failed) {
    return (
      <p className="border-t border-line pt-6 text-lg leading-relaxed text-muted">
        {failed ? "No pude cargar las reseñas ahora. Vuelve a intentar en un momento." : "Aquí aparecen las reseñas de quienes ya tomaron la clase."}
      </p>
    );
  }
  if (reviews === null) {
    return (
      <p className="border-t border-line pt-6 text-lg text-muted" aria-live="polite">
        Cargando reseñas…
      </p>
    );
  }
  if (reviews.length === 0) {
    return (
      <p className="border-t border-line pt-6 text-lg leading-relaxed text-muted">
        Todavía no hay reseñas publicadas. Si ya tomaste la clase, la tuya puede ser la primera.
      </p>
    );
  }
  return (
    <div>
      {average !== null && (
        <p className="flex flex-wrap items-baseline gap-3 border-t border-line pt-6">
          <span className="font-mono text-4xl font-extrabold tracking-[-0.04em]">{average.toFixed(1).replace(".", ",")}</span>
          <span className="text-lg text-muted">
            de 5 · {reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"}
          </span>
        </p>
      )}
      <ul className="mt-6 grid gap-4">
        {reviews.map((review) => (
          <li key={review.id} className="cut border border-line bg-surface p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-lg font-bold">{review.name}</p>
              <Pixels rating={review.rating} />
            </div>
            <p className="mt-3 whitespace-pre-line text-lg leading-relaxed">{review.comment}</p>
            {review.createdAt !== "" && (
              <p className="eyebrow mt-4 text-muted">
                <time dateTime={review.createdAt}>{monthYear.format(new Date(review.createdAt))}</time>
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

/** Mensaje de error: píxel coral y texto en tinta, que contrasta mejor que el coral sobre la placa. */
function FieldError({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-base font-semibold">
      <span className="mt-2 size-2 shrink-0 bg-card-accent" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

function ReviewForm() {
  const id = useId();
  const [draft, setDraft] = useState<ReviewDraft>(EMPTY);
  const [trap, setTrap] = useState("");
  const [errors, setErrors] = useState<ReturnType<typeof validateReview>>({});
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateReview(draft);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("idle");
      return;
    }
    // Campo trampa: una persona no lo ve; si viene lleno es un bot y no se guarda nada.
    if (trap !== "") {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      await sendReview(COURSE_ID, draft);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="cut-lg bg-card p-7 text-card-fg md:p-9" role="status">
        <p className="eyebrow flex items-center gap-2 text-card-muted">
          <span className="size-2.5 bg-card-accent" aria-hidden />
          Reseña recibida
        </p>
        <p className="mt-4 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em]">Gracias{draft.name.trim() ? `, ${draft.name.trim()}` : ""}.</p>
        <p className="mt-4 text-lg leading-relaxed text-card-muted">Tu reseña quedó guardada. La leo y la publico en esta página.</p>
        <button
          type="button"
          onClick={() => {
            setDraft(EMPTY);
            setStatus("idle");
          }}
          className="mt-7 inline-flex min-h-11 items-center gap-3 font-bold hover:text-card-accent"
        >
          Escribir otra <span aria-hidden>→</span>
        </button>
      </div>
    );
  }

  const field = "mt-2 w-full border border-card-fg/30 bg-transparent px-4 py-3 text-lg text-card-fg placeholder:text-card-muted focus-visible:outline-card-accent";
  const left = REVIEW_LIMITS.commentMax - draft.comment.length;

  return (
    <form onSubmit={onSubmit} noValidate className="cut-lg grid gap-7 bg-card p-7 text-card-fg md:p-9" aria-labelledby={`${id}-title`}>
      <div>
        <p className="eyebrow text-card-muted">Tu reseña</p>
        <p id={`${id}-title`} className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em]">
          ¿Qué te pareció la clase?
        </p>
      </div>

      <fieldset aria-describedby={errors.rating ? `${id}-rating-error` : undefined}>
        <legend className="text-lg font-bold">Tu calificación</legend>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <label key={n} className="cursor-pointer">
              <input
                type="radio"
                name={`${id}-rating`}
                value={n}
                checked={draft.rating === n}
                onChange={() => setDraft({ ...draft, rating: n })}
                className="peer sr-only"
              />
              <span className="sr-only">
                {n} de 5: {RATING_WORDS[n]}
              </span>
              <span
                aria-hidden
                className={cn(
                  "grid size-12 place-items-center font-mono text-lg font-extrabold motion-micro transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-card-accent",
                  n <= draft.rating ? "bg-card-accent text-card" : "bg-card-fg/10 text-card-fg hover:bg-card-fg/20",
                )}
              >
                {n}
              </span>
            </label>
          ))}
          <span className="ml-2 text-lg font-semibold" aria-hidden>
            {RATING_WORDS[draft.rating]}
          </span>
        </div>
        {errors.rating && (
          <FieldError id={`${id}-rating-error`}>{errors.rating}</FieldError>
        )}
      </fieldset>

      <div>
        <label htmlFor={`${id}-name`} className="text-lg font-bold">
          Tu nombre
        </label>
        <input
          id={`${id}-name`}
          type="text"
          autoComplete="name"
          maxLength={REVIEW_LIMITS.nameMax}
          value={draft.name}
          onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
          placeholder="Como quieres que aparezca"
          className={field}
        />
        {errors.name && (
          <FieldError id={`${id}-name-error`}>{errors.name}</FieldError>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-comment`} className="text-lg font-bold">
          Tu comentario
        </label>
        <textarea
          id={`${id}-comment`}
          rows={5}
          maxLength={REVIEW_LIMITS.commentMax}
          value={draft.comment}
          onChange={(e) => setDraft({ ...draft, comment: e.target.value })}
          aria-invalid={errors.comment ? true : undefined}
          aria-describedby={`${id}-comment-help${errors.comment ? ` ${id}-comment-error` : ""}`}
          placeholder="Qué aprendiste, qué te sirvió, qué mejorarías"
          className={cn(field, "resize-y")}
        />
        <p id={`${id}-comment-help`} className="mt-2 font-mono text-sm text-card-muted">
          Te quedan {left} letras
        </p>
        {errors.comment && (
          <FieldError id={`${id}-comment-error`}>{errors.comment}</FieldError>
        )}
      </div>

      {/* Campo trampa para bots: fuera de la vista y del orden de tabulación. */}
      <div aria-hidden className="absolute left-[-9999px] size-px overflow-hidden">
        <label>
          No llenes este campo
          <input type="text" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      <div className="grid gap-4 border-t border-card-fg/15 pt-6">
        <button
          type="submit"
          disabled={status === "sending"}
          className="cut-sm inline-flex items-center justify-center gap-3 bg-card-fg px-7 py-4 text-lg font-bold text-card motion-interactive transition-colors hover:bg-card-accent disabled:cursor-wait disabled:opacity-60"
        >
          {status === "sending" ? "Enviando…" : "Enviar mi reseña"} <span aria-hidden>→</span>
        </button>
        {status === "error" && (
          <div role="alert">
            <FieldError>
              No se pudo enviar. Revisa tu internet y vuelve a intentar, o mándamela por{" "}
              <a href={CTA_REVIEW_WHATSAPP} target="_blank" rel="noopener noreferrer" className="underline">
                WhatsApp
              </a>
              .
            </FieldError>
          </div>
        )}
        <p className="text-base leading-relaxed text-card-muted">Tu nombre y tu comentario se muestran en esta página cuando la reseña se publica.</p>
      </div>
    </form>
  );
}

/** Reseñas de la clase: lista de las publicadas y formulario para dejar la tuya. */
export function Reviews() {
  return (
    <section
      id={REVIEWS_ANCHOR}
      aria-labelledby="resenas-head"
      className="mx-auto grid max-w-7xl gap-12 px-[var(--spacing-section-x)] pb-[var(--spacing-section-y)] lg:grid-cols-[1fr_1fr] lg:gap-16"
    >
      <div>
        <Reveal>
          <p className="eyebrow text-muted">03 · Reseñas</p>
          <h2 id="resenas-head" className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] md:text-5xl">
            Lo que dicen quienes ya la tomaron.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
            Si estuviste en la clase de {CLASS.name}, cuéntame cómo te fue. Me ayuda a mejorarla y a que otros se animen.
          </p>
        </Reveal>
        <div className="mt-10">
          <ReviewList />
        </div>
      </div>

      <Reveal delay={0.08} className="relative lg:sticky lg:top-28 lg:self-start">
        {reviewsEnabled ? (
          <ReviewForm />
        ) : (
          <div className="cut-lg bg-card p-7 text-card-fg md:p-9">
            <p className="eyebrow text-card-muted">Tu reseña</p>
            <p className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-[-0.03em]">¿Qué te pareció la clase?</p>
            <p className="mt-4 text-lg leading-relaxed text-card-muted">Escríbeme tu comentario por WhatsApp y lo publico aquí con tu nombre.</p>
            <Button href={CTA_REVIEW_WHATSAPP} variant="card" size="lg" className="mt-7">
              Enviar mi reseña <span aria-hidden>→</span>
            </Button>
          </div>
        )}
      </Reveal>
    </section>
  );
}
