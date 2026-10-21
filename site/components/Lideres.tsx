"use client";
import { useId, useRef, useState } from "react";
import type { Casal } from "@/data/lideres";

// Abas entre a liderança de jovens e a de adolescentes.
// Os dois painéis vão no HTML do servidor; o JS só alterna qual aparece (setas do teclado funcionam).
export default function Lideres({ casais }: { casais: Casal[] }) {
  const [ativo, setAtivo] = useState(0);
  const base = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = casais.length;
    let j = i;
    if (e.key === "ArrowRight") j = (i + 1) % n;
    else if (e.key === "ArrowLeft") j = (i - 1 + n) % n;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = n - 1;
    else return;
    e.preventDefault();
    setAtivo(j);
    tabs.current[j]?.focus();
  };

  return (
    <div className="lid">
      {casais.length > 1 && (
      <div className="lid-tabs" role="tablist" aria-label="Escolha a liderança">
        {casais.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => { tabs.current[i] = el; }}
            role="tab"
            id={`${base}-tab-${c.id}`}
            aria-selected={i === ativo}
            aria-controls={`${base}-painel-${c.id}`}
            tabIndex={i === ativo ? 0 : -1}
            className="lid-tab"
            onClick={() => setAtivo(i)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {c.grupo}
          </button>
        ))}
      </div>
      )}
      {casais.map((c, i) => (
        <div
          key={c.id}
          role={casais.length > 1 ? "tabpanel" : undefined}
          id={`${base}-painel-${c.id}`}
          aria-labelledby={casais.length > 1 ? `${base}-tab-${c.id}` : undefined}
          hidden={i !== ativo}
          className="lid-painel"
        >
          <div className="lid-foto">
            {c.foto ? (
              <img src={c.foto} alt={`${c.nomes}, ${c.papel.toLowerCase()}`} loading="lazy" />
            ) : (
              <div className="lid-foto-vazia" aria-hidden="true"><span>{c.nomes}</span></div>
            )}
          </div>
          <div className="lid-texto">
            <p className="lid-papel">{c.papel}</p>
            <h3 className="lid-nomes">{c.nomes}</h3>
            {c.bio.map((p, k) => <p key={k}>{p}</p>)}
          </div>
        </div>
      ))}
    </div>
  );
}
