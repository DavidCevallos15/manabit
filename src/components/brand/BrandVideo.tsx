"use client";

import { useEffect, useRef, useState } from "react";
import { ManabitLogo } from "./ManabitLogo";

/** Los MP4 del kit se cargan cerca del viewport. El logo es el fallback. */
export function BrandVideo({ kind, className = "" }: { kind: "inicio" | "cierre"; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [theme, setTheme] = useState("medianoche");
  const [reduce, setReduce] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.dataset.theme === "paper" ? "vainilla" : "medianoche");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduce(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => { observer.disconnect(); media.removeEventListener("change", syncMotion); };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce || failed) return;
    video.load();
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        video.preload = "auto";
        video.play().catch(() => {});
      } else video.pause();
    }, { threshold: 0.25 });
    observer.observe(video);
    return () => { observer.disconnect(); video.pause(); };
  }, [theme, reduce, failed]);

  const controlLabel = playing ? "Pausar" : ended ? "Repetir" : "Reproducir";
  return (
    <div className={`brand-film ${className}`}>
      <div className="brand-film-fallback" aria-hidden>
        <ManabitLogo variant="horizontal" className="w-3/5 text-fg" />
      </div>
      {!failed && !reduce && (
        <video ref={ref} className={`relative size-full object-contain ${ended ? "opacity-0" : ""}`} width={1920} height={1080}
          muted playsInline preload="none" onError={() => setFailed(true)}
          onPlay={() => { setPlaying(true); setEnded(false); }} onPause={() => setPlaying(false)} onEnded={() => { setPlaying(false); setEnded(true); }}
          aria-label={`Animación de ${kind} de Manabit`}>
          <source src={`/media/brand/manabit-${kind}-16x9-${theme}.mp4`} type="video/mp4" />
        </video>
      )}
      {!failed && !reduce && <button type="button" className="absolute bottom-1 right-3 min-h-11 px-3 text-sm text-muted hover:text-fg"
        aria-label={`${controlLabel} animación de ${kind}`}
        onClick={() => { const video = ref.current; if (!video) return; if (video.paused) { if (video.ended) video.currentTime = 0; video.play().catch(() => {}); } else video.pause(); }}>
        {controlLabel} <span aria-hidden>{playing ? "Ⅱ" : "↻"}</span>
      </button>}
    </div>
  );
}
