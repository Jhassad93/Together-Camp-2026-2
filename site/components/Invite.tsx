"use client";
import { useState } from "react";
import { SITE_URL } from "@/lib";

const MSG =
  "Bora comigo pro Together Camp? É de 19 a 22/11, no feriadão, no Berecamp (Arujá). Só 80 vagas, inscrições até 15/11. Dá uma olhada:";

export default function Invite() {
  const [copied, setCopied] = useState("");
  const wa = "https://wa.me/?text=" + encodeURIComponent(`${MSG} ${SITE_URL}`);

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "Together Camp 2026.2", text: MSG, url: SITE_URL });
      } catch {}
      return;
    }
    copy();
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(`${MSG} ${SITE_URL}`);
      setCopied("Convite copiado. Agora é só colar na conversa.");
    } catch {
      setCopied("Não deu para copiar. O endereço é " + SITE_URL);
    }
  }
  return (
    <>
      <div className="convite-actions">
        <a className="btn btn-primary" href={wa} target="_blank" rel="noopener">
          Mandar no WhatsApp <span className="arrow" aria-hidden="true">→</span>
        </a>
        <button className="btn btn-ghost" type="button" onClick={share}>
          Compartilhar
        </button>
        <button className="btn btn-ghost" type="button" onClick={copy}>
          Copiar convite
        </button>
      </div>
      <p className="copied" role="status" aria-live="polite">{copied}</p>
    </>
  );
}
