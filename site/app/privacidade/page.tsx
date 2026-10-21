import type { Metadata } from "next";
import { WHATSAPP_URL } from "@/lib";

export const metadata: Metadata = {
  title: "Política de privacidade · Together Camp 2026.2",
  description: "Como o site do Together Camp 2026.2 trata dados e cookies.",
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  return (
    <main className="page">
      <div className="wrap prose">
        <p><a href="/">← Voltar ao site</a></p>
        <h1>Privacidade</h1>
        <p>Este site é mantido pela Igreja Evangélica Assembléia de Deus Bereana para divulgar o Together Camp 2026.2.</p>
        <h2>O que este site coleta</h2>
        <p>Este site não tem formulário e não guarda dados pessoais. A inscrição acontece no Google Formulários, que é um serviço do Google com regras próprias. Os dados enviados por lá são usados pela liderança só para organizar o acampamento.</p>
        <h2>Contador de vagas</h2>
        <p>Para mostrar quantas vagas restam, a página consulta um endereço do Google Apps Script mantido pela liderança, que devolve apenas um número. Nessa consulta, o seu navegador envia ao Google os dados técnicos de qualquer acesso à web (como o endereço IP). Nenhum dado seu é enviado ou guardado por nós. As fontes do site são hospedadas no próprio site, sem serviços externos.</p>
        <h2>Cookies</h2>
        <p>Se você permitir no aviso de cookies, usamos o Google Analytics para contar visitas e cliques nos botões (inscrição, WhatsApp e compartilhamento). Sem a sua permissão, nenhum cookie de medição é carregado. Para mudar a escolha, limpe os dados do site no seu navegador.</p>
        <h2>Contato</h2>
        <p>Dúvidas sobre privacidade: fale com a liderança pelo <a href={WHATSAPP_URL} target="_blank" rel="noopener">WhatsApp</a>.</p>
        <p className="muted">Atualizado em 21/10/2026.</p>
      </div>
    </main>
  );
}
