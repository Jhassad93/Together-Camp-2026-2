"use client";
import { useEffect } from "react";

// Seções empilhadas: cada seção gruda com a base alinhada ao fim da tela, fica parada
// por uma "pausa de leitura" (HOLD) e só então a próxima sobe por cima.
// - Recalcula sempre que alguma seção muda de altura (FAQ e blocos recolhidos).
// - Seção coberta escurece levemente em cinza (sem encolher).
// - Foco por teclado nunca fica escondido atrás de outra seção.
const HOLD = 0.35; // fração da altura da tela

export default function Stack() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("#conteudo > section"));
    const footer = document.querySelector<HTMLElement>(".footer");
    const sticky = document.querySelector<HTMLElement>(".sticky-cta");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shades = els.map((el, i) => {
      el.style.zIndex = String(i + 1);
      const d = document.createElement("div");
      d.className = "stack-shade";
      d.setAttribute("aria-hidden", "true");
      el.appendChild(d);
      return d;
    });

    const frame = () => {
      if (reduce) return;
      const vh = alturaUtil();
      els.forEach((el, i) => {
        const n = els[i + 1] || footer;
        if (!n) return;
        const h = el.offsetHeight;
        const stickTop = parseFloat(el.style.top) || 0;
        const overlap = stickTop + h - n.getBoundingClientRect().top;
        const p = Math.min(1, Math.max(0, overlap / Math.min(h, vh)));
        shades[i].style.opacity = (0.2 * p).toFixed(3);
      });
    };

    // Altura útil: no celular, desconta o botão fixo de inscrição para a última linha não ficar atrás dele
    const alturaUtil = () => {
      const vh = window.innerHeight;
      if (!sticky || getComputedStyle(sticky).display === "none") return vh;
      return vh - (vh - sticky.getBoundingClientRect().top) - 8;
    };

    let medindo = false;
    const layout = () => {
      if (medindo) return;
      medindo = true;
      const vh = alturaUtil();
      // mede a posição natural (sem sticky)
      els.forEach((el) => { el.style.position = "relative"; el.style.top = ""; });
      const tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
      els.forEach((el, i) => {
        const h = el.offsetHeight;
        el.style.position = "";
        // primeira seção: gruda no topo; demais: base alinhada ao fim da tela
        const top = i === 0 ? Math.min(0, vh - h) : Math.min(vh - h, tops[i]);
        el.style.top = top + "px";
        el.style.marginBottom = i > 0 && i < els.length - 1 ? Math.round(vh * HOLD) + "px" : "0px";
      });
      medindo = false;
      frame();
    };

    let raf = 0;
    const agendar = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(layout); };
    const ro = new ResizeObserver(agendar);
    els.forEach((el) => ro.observe(el));

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { frame(); ticking = false; });
    };

    // Foco por teclado: se o elemento focado estiver coberto, rola até ele aparecer
    const onFocus = (e: FocusEvent) => {
      const alvo = e.target as HTMLElement;
      if (!alvo || !alvo.getBoundingClientRect) return;
      requestAnimationFrame(() => {
        const r0 = alvo.getBoundingClientRect();
        if (r0.bottom < 0 || r0.top > window.innerHeight) alvo.scrollIntoView({ block: "center", behavior: "instant" as ScrollBehavior });
        for (let k = 0; k < 60; k++) {
          const r = alvo.getBoundingClientRect();
          const x = Math.min(window.innerWidth - 1, Math.max(0, r.left + Math.min(r.width / 2, 20)));
          const y = r.top + r.height / 2;
          if (y > 0 && y < alturaUtil()) {
            const hit = document.elementFromPoint(x, y);
            if (hit && (alvo === hit || alvo.contains(hit))) break;
            const porBaixo = sticky && hit && sticky.contains(hit);
            window.scrollBy({ top: porBaixo ? 60 : -60, behavior: "instant" as ScrollBehavior });
          } else {
            window.scrollBy({ top: y <= 0 ? -60 : 60, behavior: "instant" as ScrollBehavior });
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", agendar);
    document.addEventListener("focusin", onFocus);
    document.fonts?.ready.then(agendar);
    layout();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", agendar);
      document.removeEventListener("focusin", onFocus);
      shades.forEach((d) => d.remove());
    };
  }, []);
  return null;
}
