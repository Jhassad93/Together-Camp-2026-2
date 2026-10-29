"use client";
import { useEffect, useRef } from "react";

// A palavra "Neon" pisca como letreiro quando entra na tela. São só 3 piscadas (menos de 5 s) e depois fica acesa:
// movimento curto, sem precisar de botão de pausa (WCAG 2.2.2). Quem prefere menos movimento vê a palavra acesa e parada.
export default function NeonWord() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("neon-pisca"); io.disconnect(); }
    }, { threshold: 0.8 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} className="neon">Neon</span>;
}
