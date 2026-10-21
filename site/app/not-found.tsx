import { FORM_URL } from "@/lib";

export default function NotFound() {
  return (
    <main className="page">
      <div className="wrap">
        <h1>Página não encontrada</h1>
        <p className="lead">Esse caminho não existe, mas o acampamento existe sim.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <a className="btn btn-primary" href="/">Voltar ao início</a>
          <a className="btn btn-ghost" href={FORM_URL} target="_blank" rel="noopener">Garantir minha vaga</a>
        </div>
      </div>
    </main>
  );
}
