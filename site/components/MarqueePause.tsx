"use client";
import { useState } from "react";

// Botão para pausar a faixa rotativa (WCAG 2.2.2: movimento automático precisa de pausa)
export default function MarqueePause() {
  const [pausado, setPausado] = useState(false);
  const alternar = () => {
    const m = document.querySelector(".marquee");
    m?.classList.toggle("is-paused", !pausado);
    setPausado(!pausado);
  };
  return (
    <button type="button" className="marquee-pause" onClick={alternar} aria-pressed={pausado} aria-label={pausado ? "Retomar faixa" : "Pausar faixa"}>
      {pausado ? (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5v14l12-7z" fill="currentColor" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>
      )}
    </button>
  );
}
