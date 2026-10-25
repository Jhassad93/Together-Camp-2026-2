"use client";
import { useRef, useState } from "react";
import type { Foto } from "@/data/fotos";

// Esteira rolante de fotos. Movimento automático tem botão de pausa (WCAG 2.2.2),
// pausa ao passar o mouse e vira faixa rolável com o dedo/teclado se a pessoa prefere menos movimento.
export default function Esteira({ fotos }: { fotos: Foto[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pausado, setPausado] = useState(false);
  // com poucas fotos, repete dentro de cada cópia para a faixa nunca ficar com buraco
  const base = fotos.length >= 6 ? fotos : [...fotos, ...fotos, ...fotos];
  const dur = Math.max(30, base.length * 5);
  return (
    <div className={`esteira${pausado ? " is-paused" : ""}`} ref={ref} role="region" aria-label="Fotos do último acampamento" tabIndex={0} style={{ ["--dur" as string]: `${dur}s` }}>
      <div className="esteira-track">
        {[0, 1].map((n) => (
          <ul key={n} aria-hidden={n === 1 ? true : undefined}>
            {base.map((f, i) => (
              <li key={i}>
                <img src={f.src} alt={n === 0 && i < fotos.length ? f.alt : ""} width={900} height={900} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button type="button" className="esteira-pause" onClick={() => setPausado((p) => !p)} aria-pressed={pausado} aria-label={pausado ? "Retomar esteira de fotos" : "Pausar esteira de fotos"}>
        {pausado ? (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5v14l12-7z" fill="currentColor" /></svg>
        ) : (
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" /></svg>
        )}
      </button>
    </div>
  );
}
