"use client";
import { useSyncExternalStore } from "react";
import { DEADLINE_ISO, EVENTO_FIM_ISO, VAGAS, VAGAS_API } from "@/lib";

export type Dados = { inscritos: number; vagas: number } | null;
export type Estado = "aberto" | "esgotado" | "encerrado" | "realizado";

let dados: Dados = null;
let iniciado = false;
const subs = new Set<() => void>();

async function buscar(): Promise<Dados> {
  if (!VAGAS_API) return null;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 8000);
  try {
    const r = await fetch(VAGAS_API, { signal: ctrl.signal, cache: "no-store" });
    const j = await r.json();
    if (j.erro || typeof j.inscritos !== "number") return null;
    return { inscritos: j.inscritos, vagas: typeof j.vagas === "number" ? j.vagas : VAGAS };
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}

export function estadoAtual(): Estado {
  if (Date.now() > new Date(EVENTO_FIM_ISO).getTime()) return "realizado";
  if (Date.now() > new Date(DEADLINE_ISO).getTime()) return "encerrado";
  if (dados && dados.inscritos >= dados.vagas) return "esgotado";
  return "aberto";
}

// Um único estado governa botões, faixa, cartão de preço e botão fixo (via <html data-estado>)
function aplicarEstado() {
  document.documentElement.dataset.estado = estadoAtual();
}

function iniciar() {
  if (iniciado || typeof window === "undefined") return;
  iniciado = true;
  aplicarEstado();
  const tick = () =>
    buscar().then((d) => {
      if (!d) return;
      dados = d;
      aplicarEstado();
      subs.forEach((f) => f());
    });
  tick();
  setInterval(tick, 60000);
  setInterval(aplicarEstado, 30000);
}

function subscribe(fn: () => void) {
  subs.add(fn);
  iniciar();
  return () => { subs.delete(fn); };
}

export function useVagas(): Dados {
  return useSyncExternalStore(subscribe, () => dados, () => null);
}

// Texto curto "Restam N vagas" (ou "80 vagas" sem dado)
export function RestamTexto() {
  const d = useVagas();
  // mesma regra da barra: com poucos inscritos, não exibe "Restam N"
  if (!d || d.inscritos < 10) return <>{VAGAS} vagas</>;
  const r = Math.max(0, d.vagas - d.inscritos);
  if (r === 0) return <>Vagas esgotadas</>;
  return <>Restam {r} {r === 1 ? "vaga" : "vagas"}</>;
}
