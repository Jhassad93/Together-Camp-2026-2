"use client";
import { useEffect, useState } from "react";
import { DEADLINE_ISO } from "@/lib";

type Parts = { d: number; h: number; m: number; s: number };

function diff(): Parts | null {
  const ms = new Date(DEADLINE_ISO).getTime() - Date.now();
  if (ms <= 0) return null;
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor((ms % 86400000) / 3600000),
    m: Math.floor((ms % 3600000) / 60000),
    s: Math.floor((ms % 60000) / 1000),
  };
}
const pad = (n: number) => String(n).padStart(2, "0");

// Contador grande DD:HH:MM:SS até o fim das inscrições (15/11, 23h59).
// Também é o que aparece quando a contagem de vagas não estiver disponível.
export default function Countdown() {
  const [t, setT] = useState<Parts | null | undefined>(undefined);
  useEffect(() => {
    setT(diff());
    const id = setInterval(() => setT(diff()), 1000);
    return () => clearInterval(id);
  }, []);
  if (t === null) return <p className="cd-done">Inscrições encerradas</p>;
  const cells: [string, string][] = t
    ? [[pad(t.d), "dias"], [pad(t.h), "horas"], [pad(t.m), "min"], [pad(t.s), "seg"]]
    : [["--", "dias"], ["--", "horas"], ["--", "min"], ["--", "seg"]];
  const label = t ? `Faltam ${t.d} dias, ${t.h} horas e ${t.m} minutos para o fim das inscrições` : "Inscrições até 15 de novembro";
  return (
    <div className="cd" role="timer" aria-label={label}>
      {cells.map(([v, l], i) => (
        <div className="cd-cell" key={l} aria-hidden="true">
          <span className="cd-num">{v}</span>
          <span className="cd-lbl">{l}</span>
          {i < 3 && <span className="cd-sep">:</span>}
        </div>
      ))}
    </div>
  );
}
