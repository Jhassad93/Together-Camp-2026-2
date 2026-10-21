"use client";
import { useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "tc-consent";

function loadGA() {
  if (!GA_ID || (window as any).__gaLoaded) return;
  (window as any).__gaLoaded = true;
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.gtag = function () { w.dataLayer.push(arguments); };
  w.gtag("js", new Date());
  w.gtag("config", GA_ID);
}

export function track(event: string, params: Record<string, string> = {}) {
  const w = window as any;
  if (typeof w.gtag === "function") w.gtag("event", event, params);
}

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!GA_ID) return; // sem GA configurado, nada a pedir
    let v: string | null = null;
    try { v = localStorage.getItem(KEY); } catch {}
    if (v === "yes") loadGA();
    else if (v !== "no") setShow(true);
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[data-track]") as HTMLAnchorElement | null;
      if (a) track(a.dataset.track!, { local: a.dataset.local || "" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  if (!show) return null;
  const choose = (yes: boolean) => {
    try { localStorage.setItem(KEY, yes ? "yes" : "no"); } catch {}
    if (yes) loadGA();
    setShow(false);
  };
  return (
    <div className="cookie" role="dialog" aria-label="Cookies">
      <p>
        Usamos cookies do Google Analytics só para contar visitas e cliques, se você permitir.{" "}
        <a href="/privacidade">Saiba mais</a>.
      </p>
      <div className="row">
        <button className="btn btn-azul" onClick={() => choose(true)}>Aceitar</button>
        <button className="btn btn-ghost" onClick={() => choose(false)}>Recusar</button>
      </div>
    </div>
  );
}
