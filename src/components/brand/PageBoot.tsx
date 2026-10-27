"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { ManabitLoader } from "./ManabitLoader";

const ReadyContext = createContext(false);
export const usePageReady = () => useContext(ReadyContext);

/** Espera a la página y las fuentes. Nunca depende de descargar un video. */
export function PageBoot({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let disposed = false;
    let finished = false;
    const finish = () => {
      if (disposed || finished) return;
      finished = true;
      document.documentElement.classList.remove("booting");
      setReady(true);
    };
    let onLoad = () => {};
    const loaded = new Promise<void>((resolve) => {
      onLoad = resolve;
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", onLoad, { once: true });
    });
    let entranceTimer: number;
    const entrance = new Promise<void>((resolve) => { entranceTimer = window.setTimeout(resolve, 850); });
    const timeout = window.setTimeout(finish, 3000);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) finish();
    else Promise.all([loaded, document.fonts.ready, entrance]).then(finish, finish);
    return () => {
      disposed = true;
      window.clearTimeout(timeout);
      window.clearTimeout(entranceTimer);
      window.removeEventListener("load", onLoad);
      document.documentElement.classList.remove("booting");
    };
  }, []);

  return (
    <ReadyContext.Provider value={ready}>
      <div id="page-loader" className="page-loader" aria-hidden={ready}>
        <ManabitLoader size={64} label="Cargando Manabit" />
        <p>Webs que trabajan por tu negocio.</p>
      </div>
      {children}
    </ReadyContext.Provider>
  );
}
