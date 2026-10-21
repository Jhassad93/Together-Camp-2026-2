import { Fragment } from "react";
import Vagas from "@/components/Vagas";
import Stack from "@/components/Stack";
import Invite from "@/components/Invite";
import Silhouette from "@/components/Silhouette";
import MarqueePause from "@/components/MarqueePause";
import { RestamTexto } from "@/components/vagasStore";
import { PREGADORES } from "@/data/pregadores";
import { FORM_URL, WHATSAPP_URL, ESPERA_URL, CONVITE_MSG, INSTA_JOVEM, INSTA_IGREJA, MAPS_BERECAMP, MAPS_BEREANA, SITE_URL, VAGAS } from "@/lib";

const faq: { q: string; a: string }[] = [
  { q: "Preciso ser da Bereana para ir?", a: "Não. O Together Camp é aberto a qualquer adolescente ou jovem de 14 a 30 anos, frequente ou não a igreja. Chama quem você quiser." },
  { q: "E se eu não conhecer ninguém?", a: "Muita gente chega sem conhecer quase ninguém e volta com amigos novos. São quatro dias juntos, com quarto, refeições e programação em grupo, e a liderança fica de olho para ninguém ficar sozinho." },
  { q: "Quanto custa e o que está incluso?", a: "R$ 500,00, que pode ser à vista no Pix ou em até 5x de R$ 100 no cartão de crédito (não há desconto à vista). Estão inclusos o ônibus de ida e volta, a hospedagem e a alimentação." },
  { q: "A pré-inscrição já garante a vaga?", a: "Não. A vaga só é confirmada depois do pagamento e da entrega dos documentos na recepção da Bereana. São 80 vagas." },
  { q: "Até quando dá para se inscrever?", a: "Até 15/11/2026. Essa é a data final para a pré-inscrição, o pagamento e a entrega dos documentos assinados." },
  { q: "Sou menor de idade. Como faço?", a: "A pré-inscrição precisa ser preenchida pelo seu responsável legal. Ele também precisa entregar, impressa e assinada, a Autorização para Viagem e Participação em Acampamento e Uso de Imagem de Menor até 15/11. Sem ela, a participação pode ser impedida." },
  { q: "Por que o formulário pede login do Google?", a: "Porque ele recebe o comprovante de pagamento como arquivo, e o Google só aceita envio de arquivo com login. Tenha uma conta Google e o comprovante em mãos. Se o link abrir dentro do Instagram, abra no navegador do celular." },
  { q: "Tem sinal de celular?", a: "Vale contar com sinal instável. Leve sua Bíblia física: além de garantir a leitura, você foge das notificações." },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      name: "Together Camp 2026.2 · Ekballo",
      description: "Acampamento de adolescentes e jovens de 14 a 30 anos da Assembleia de Deus Bereana.",
      startDate: "2026-11-19T19:00:00-03:00",
      endDate: "2026-11-22T17:00:00-03:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      url: SITE_URL,
      image: [`${SITE_URL}/og.png`],
      maximumAttendeeCapacity: VAGAS,
      location: {
        "@type": "Place",
        name: "Berecamp",
        address: { "@type": "PostalAddress", streetAddress: "Estrada dos Fernandes, 3801", addressLocality: "Arujá", addressRegion: "SP", addressCountry: "BR" },
      },
      offers: { "@type": "Offer", price: "500.00", priceCurrency: "BRL", url: FORM_URL, availability: "https://schema.org/InStock", validThrough: "2026-11-15T23:59:59-03:00" },
      organizer: {
        "@type": "Organization",
        name: "Igreja Evangélica Assembléia de Deus Bereana",
        url: INSTA_IGREJA,
        address: { "@type": "PostalAddress", streetAddress: "Rua Joaquim Távora, 1403", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
        sameAs: [INSTA_IGREJA, INSTA_JOVEM],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};

function IconeFoto() {
  return (
    <svg className="social-ico" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h3l2-3h6l2 3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </svg>
  );
}

const AVISO_FORM = "Abre no Google Forms · precisa de conta Google · menor de 18? o responsável preenche";

// Um bloco de botão por estado; <html data-estado> mostra só o certo (aberto é o padrão sem JS)
function Cta({ local, pulse = false }: { local: string; pulse?: boolean }) {
  return (
    <div className="cta-block">
      <a className={pulse ? "btn btn-primary btn-pulse est-aberto" : "btn btn-primary est-aberto"} href={FORM_URL} target="_blank" rel="noopener" data-track="clique_inscricao" data-local={local}>
        Garantir minha vaga <span className="arrow" aria-hidden="true">→</span>
      </a>
      <a className="btn btn-primary est-esgotado" href={ESPERA_URL} target="_blank" rel="noopener" data-track="clique_espera" data-local={local}>
        Entrar na lista de espera <span className="arrow" aria-hidden="true">→</span>
      </a>
      <a className="btn btn-primary est-encerrado" href={WHATSAPP_URL} target="_blank" rel="noopener" data-track="clique_whatsapp" data-local={local}>
        Falar com a liderança <span className="arrow" aria-hidden="true">→</span>
      </a>
      <p className="cta-note est-aberto">{AVISO_FORM}</p>
      <p className="cta-note est-esgotado">As {VAGAS} vagas foram preenchidas. Deixe seu nome com a liderança para o caso de desistência.</p>
      <a className="btn btn-primary est-realizado" href={INSTA_JOVEM} target="_blank" rel="noopener" data-local={local}>
        Ver fotos no @bereanajovem <span className="arrow" aria-hidden="true">→</span>
      </a>
      <p className="cta-note est-encerrado">As inscrições encerraram em 15/11.</p>
      <p className="cta-note est-realizado">O Together Camp 2026.2 aconteceu de 19 a 22/11. Até o próximo!</p>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="marquee" role="region" aria-label="Resumo do acampamento">
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <ul key={n} aria-hidden={n === 1 ? true : undefined}>
              {[0, 1].map((r) => (
                <Fragment key={r}>
                  <li>Acampamento de jovens e adolescentes</li>
                  <li>19 a 22 de novembro</li>
                  <li>Berecamp · Arujá/SP</li>
                  <li>14 a 30 anos · <b>da igreja ou não</b></li>
                  <li><span className="est-aberto">Só <b>{VAGAS} vagas</b></span><span className="est-esgotado"><b>Vagas esgotadas</b></span><span className="est-encerrado"><b>Inscrições encerradas</b></span><span className="est-realizado"><b>Foi incrível. Até o próximo!</b></span></li>
                  <li>R$ 500 ou <b>5x de R$ 100</b></li>
                </Fragment>
              ))}
            </ul>
          ))}
        </div>
        <MarqueePause />
      </div>

      <header className="header">
        <div className="wrap">
          <a className="brand" href="/">Together Camp <span>2026.2</span></a>
          <span className="header-sep" aria-hidden="true" />
          <p className="header-tag">Acampamento de jovens e adolescentes</p>
        </div>
      </header>

      <main id="conteudo">
        {/* TOPO */}
        <section className="hero" aria-labelledby="titulo">
          <div className="wrap">
            <h1 id="titulo" className="hero-word"><span className="sr-only">Together Camp 2026.2: </span>Ekballo</h1>
            <h2 className="hero-sub">Quem vai construir a Igreja do amanhã?</h2>
            <p className="hero-meta">19–22/11 · Berecamp, Arujá · R$ 500 ou 5x R$ 100</p>
            <div className="hero-grid">
              <div className="hero-cta">
                <Cta local="hero" pulse />
              </div>
            </div>
          </div>
          <div className="ticker">
            <div className="wrap">
              <Vagas />
            </div>
          </div>
        </section>

        {/* TEMA */}
        <section className="sec sec-cinza" aria-labelledby="tema">
          <div className="wrap tema-grid">
            <div>
              <h2 id="tema">O <em>tema</em></h2>
              <p className="tema-greek" lang="grc">ἐκβάλλω</p>
              <p className="tema-gloss">impelir, lançar para fora, enviar</p>
            </div>
            <div className="tema-def">
              <p className="lead">É a palavra usada quando o Espírito impele Jesus para o deserto, e quando Jesus manda pedir ao Senhor da seara que envie trabalhadores.</p>
              <p className="muted">Os textos-base do acampamento:</p>
              <div className="refs"><span className="ref">Marcos 1.12</span><span className="ref">Mateus 9.38</span></div>
            </div>
          </div>
        </section>

        {/* QUANDO E ONDE */}
        <section className="sec sec-papel" aria-labelledby="quando">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="quando">Feriadão <em>no mato</em></h2>
              <p className="lead">De quinta a domingo. A sexta, 20/11, é feriado nacional.</p>
            </div>
            <div className="cards cards-3">
              <div className="card">
                <h3>Ida</h3>
                <p className="big"><span className="nw">Qui 19/11</span> · <span className="nw">19h</span></p>
                <p>Check-in na AD Bereana, Rua Joaquim Távora, 1403, Vila Mariana, São Paulo. Chegue no horário.</p>
                <p><a href={MAPS_BEREANA} target="_blank" rel="noopener">Ver no mapa</a></p>
              </div>
              <div className="card">
                <h3>Lugar</h3>
                <p className="big">Berecamp</p>
                <p>Estrada dos Fernandes, 3801, Mirante do Arujá, Arujá/SP.</p>
                <p><a href={MAPS_BERECAMP} target="_blank" rel="noopener">Ver no mapa</a></p>
              </div>
              <div className="card">
                <h3>Volta</h3>
                <p className="big"><span className="nw">Dom 22/11</span> · <span className="nw">17h</span></p>
                <p>O ônibus sai do Berecamp às 14h e chega à AD Bereana por volta das 17h. Combine com quem vai te buscar.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PREGADORES */}
        <section className="sec-azul preg-sec" aria-labelledby="pregadores">
          <div className="preg-stage">
            <div className="preg-figs">
              {[0, 2, 1].map((k) => {
                const p = PREGADORES[k];
                return (
                  <div key={k} className={`fig fig-${k + 1}`}>
                    {p.foto && p.nome ? <img src={p.foto} alt={`Foto de ${p.nome}`} className="fig-foto" /> : <Silhouette id={String(k)} />}
                  </div>
                );
              })}
            </div>
            <div className="preg-copy wrap">
              <h2 id="pregadores" className="preg-title">Quem vem aí?</h2>
              <p className="preg-chip">3 pregadores · 1 por semana</p>
              <p className="preg-when">Revelação toda semana no <a href={INSTA_JOVEM} target="_blank" rel="noopener">@bereanajovem</a></p>
            </div>
          </div>
          <div className="preg-foot">
            <ul className="wrap placas" aria-label="Pregadores e datas das revelações">
              {PREGADORES.map((p) => (
                <li key={p.dataISO} className={p.nome ? "placa revelada" : "placa"}>
                  {p.nome ? (
                    <><span className="placa-nome">{p.nome}</span>{p.igreja && <span className="placa-igreja">{p.igreja}</span>}</>
                  ) : (
                    <time dateTime={p.dataISO}>{p.data}</time>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <p className="preg-tease"><a href={INSTA_JOVEM} target="_blank" rel="noopener">Já sabe quem é? Comenta no @bereanajovem</a></p>
        </section>

        {/* CONVITE */}
        <section className="sec sec-cinza convite" aria-labelledby="convite">
          <div className="wrap">
            <h2 id="convite">Não vai <em>sozinho</em></h2>
            <p className="lead est-aberto">Quem você quer levar? Manda o convite agora. Só tem {VAGAS} vagas.</p>
            <p className="lead est-esgotado">As vagas acabaram, mas ainda dá para chamar alguém para a lista de espera.</p>
            <p className="lead est-encerrado">As inscrições encerraram. Manda o site para quem vai com você.</p>
            <p className="lead est-realizado">Foi incrível. Manda para quem precisa saber do próximo Together Camp.</p>
            <Invite />
          </div>
        </section>

        {/* PROGRAMAÇÃO */}
        <section className="sec sec-cinza" aria-labelledby="programacao">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="programacao">Programação <em>em breve</em></h2>
              <p className="lead">A programação completa sai nas próximas semanas. O que já está definido:</p>
            </div>
            <div className="cards cards-2">
              <div className="card"><h3>Quinta, 19/11</h3><p>19h · Check-in e saída da AD Bereana rumo ao Berecamp.</p></div>
              <div className="card"><h3>Domingo, 22/11</h3><p>14h · Saída do Berecamp. 17h · Chegada prevista à AD Bereana.</p></div>
            </div>
          </div>
        </section>

        {/* INSCRIÇÃO */}
        <section className="sec sec-papel" aria-labelledby="inscricao" id="inscricao-sec">
          <div className="wrap insc-grid">
            <div>
              <div className="sec-head">
                <h2 id="inscricao">Como garantir <em>sua vaga</em></h2>
              </div>
              <ol className="steps">
                <li><div><strong>Faça a pré-inscrição</strong><p>Preencha o formulário. Se você tem menos de 18 anos, quem preenche é o seu responsável legal.</p></div></li>
                <li><div><strong>Pague e envie o comprovante</strong><p>R$ 500 no Pix ou em até 5x de R$ 100 no cartão, pelo link do próprio formulário, para a Igreja Evangélica Assembléia de Deus Bereana. O comprovante vai junto.</p></div></li>
                <li><div><strong>Entregue os documentos</strong><p>Impressos e assinados, na recepção da Bereana: autorização de viagem e uso de imagem (menores) ou termo de imagem e voz (maiores).</p></div></li>
                <li><div><strong>Vaga confirmada</strong><p>Com pagamento e documentos entregues, a vaga é sua. Tudo até 15/11.</p></div></li>
              </ol>
            </div>
            <section className="preco" aria-label="Valor e o que está incluso">
              <h3 className="preco-title">Quanto custa</h3>
              <p className="valor">R$ 500</p>
              <p>ou 5x de R$ 100 no cartão de crédito</p>
              <ul>
                <li>Ônibus de ida e volta</li>
                <li>Hospedagem</li>
                <li>Alimentação</li>
              </ul>
              <Cta local="inscricao" pulse />
              <p className="prazo"><span className="est-aberto">Prazo final: 15/11 · <RestamTexto /></span><span className="est-esgotado">Vagas esgotadas</span><span className="est-encerrado">Inscrições encerradas em 15/11</span><span className="est-realizado">Evento realizado</span></p>
            </section>
          </div>
        </section>

        {/* PARA OS PAIS */}
        <section className="sec sec-azul" aria-labelledby="pais">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="pais">Para os <em>pais</em></h2>
              <p className="lead">O que a família precisa saber antes de autorizar.</p>
            </div>
            <div className="imp-grid">
              <div className="imp"><h3>Saída e volta</h3><p>Saída da AD Bereana (Rua Joaquim Távora, 1403, Vila Mariana) na quinta, 19/11, às 19h. Volta no domingo, 22/11, com chegada prevista às 17h no mesmo local. Ônibus de ida e volta incluso.</p></div>
              <div className="imp"><h3>Autorização e documentos</h3><p>Para menores de 18 anos, quem faz a pré-inscrição é o responsável legal, que também entrega impressa e assinada a autorização de viagem e uso de imagem até 15/11. Todo acampante leva documento original com foto.</p></div>
              <div className="imp"><h3>Saúde</h3><p>Na inscrição, a família informa contato de emergência, restrições alimentares e condições de saúde. A organização não fornece nem aplica remédios: quem usa remédio controlado ou tem alergia grave deve avisar a liderança no check-in.</p></div>
              <div className="imp"><h3>Fale com a liderança</h3><p>Qualquer dúvida antes de autorizar, fale direto com a liderança pelo WhatsApp.</p><p><a className="btn btn-ghost" href={WHATSAPP_URL} target="_blank" rel="noopener" data-track="clique_whatsapp" data-local="pais">WhatsApp da liderança</a></p></div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec sec-papel" aria-labelledby="duvidas">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="duvidas">Ficou alguma <em>dúvida?</em></h2>
            </div>
            <div className="faq">
              {faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <div className="ans"><p>{f.a}</p></div>
                </details>
              ))}
            </div>
            <p className="faq-more">
              Não achou sua resposta?{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" data-track="clique_whatsapp" data-local="faq"><strong>Fale com a liderança no WhatsApp</strong></a>.
            </p>
          </div>
        </section>

        {/* DEPOIS DE INSCRITO */}
        <section className="sec sec-cinza" aria-labelledby="depois">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="depois">Depois de <em>inscrito</em></h2>
              <p className="lead">Mala e regras do acampamento. Abra quando for se preparar.</p>
            </div>
            <details className="bloco">
              <summary>O que levar</summary>
              <p className="bloco-lead">Identifique suas coisas com nome. Objetos de valor ficam em casa.</p>
            <div className="check-grid">
                <div>
                  <h3>Essencial</h3>
                  <ul className="check">
                    <li>Bíblia física</li><li>Documento original com foto</li><li>Caderno e caneta</li><li>Garrafinha de água</li><li>Remédios de uso pessoal</li><li>Repelente e protetor solar</li><li>Dinheiro ou snacks para a cantina</li>
                  </ul>
                </div>
                <div>
                  <h3>Roupas</h3>
                  <ul className="check">
                    <li>Roupas confortáveis</li><li>Blusa de frio e calça moletom</li><li>Pijama</li><li>Chinelo e tênis</li><li>Boné e óculos de sol</li><li>Roupa de banho*</li><li>Saco para roupa suja</li>
                  </ul>
                  <p className="check-note">*Meninas: maiô e shorts<br />Meninos: bermuda/shorts de praia</p>
                </div>
                <div>
                  <h3>Higiene e cama</h3>
                  <ul className="check">
                    <li>Sabonete, shampoo e condicionador</li><li>Escova, creme e fio dental</li><li>Desodorante</li><li>Toalhas de banho e de rosto</li><li>Travesseiro e fronha</li><li>Lençol de solteiro</li><li>Cobertor</li>
                  </ul>
                </div>
              </div>
            </details>
            <details className="bloco">
              <summary>Se liga: regras e cuidados</summary>
            <div className="imp-grid">
                <div className="imp"><h3>Autorização</h3><p>Menores de 18 anos só vão com a autorização impressa e assinada pelo responsável legal, entregue até 15/11. Peça o modelo pelo formulário ou na recepção da Bereana.</p></div>
                <div className="imp"><h3>Documento</h3><p>Todo acampante, de qualquer idade, leva um documento de identificação original e válido durante todo o acampamento, inclusive na ida e na volta.</p></div>
                <div className="imp"><h3>Medicação</h3><p>A organização não fornece nem aplica remédios. Traga seu kit e seu antialérgico, se tiver. Remédio controlado ou alergia grave: avise a liderança no check-in.</p></div>
                <div className="imp"><h3>Proibido</h3><p>Cigarro, bebida alcoólica, armas, fogos de artifício e bombas, ovos, farinha ou qualquer coisa que danifique o local. E desânimo também.</p></div>
              </div>
            </details>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="sec sec-azul final" aria-labelledby="final">
          <div className="wrap final-grid">
            <div>
              <h2 id="final">Bora pro <em>feriadão?</em></h2>
              <p className="lead">19 a 22/11 no Berecamp. Inscrições até 15/11.</p>
            </div>
            <div className="final-acoes">
              <Cta local="final" />
              <p className="final-share est-aberto">Vai chamar alguém? <a href={"https://wa.me/?text=" + encodeURIComponent(CONVITE_MSG + " " + SITE_URL)} target="_blank" rel="noopener" data-track="compartilhar" data-local="final">Mandar o convite no WhatsApp</a></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap">
          <div className="footer-grid">
            <div>
              <h3>Together Camp 2026.2</h3>
              <p>19 a 22/11/2026 · Berecamp, Arujá/SP.<br />Realização: Igreja Evangélica Assembléia de Deus Bereana.</p>
            </div>
            <div>
              <h3>Contato</h3>
              <ul>
                <li><a href={WHATSAPP_URL} target="_blank" rel="noopener" data-track="clique_whatsapp" data-local="rodape">WhatsApp da liderança</a></li>
                <li><a className="social" href={INSTA_JOVEM} target="_blank" rel="noopener" aria-label="Instagram @bereanajovem"><IconeFoto />@bereanajovem</a></li>
                <li><a className="social" href={INSTA_IGREJA} target="_blank" rel="noopener" aria-label="Instagram @bereana"><IconeFoto />@bereana</a></li>
              </ul>
            </div>
            <div>
              <h3>AD Bereana</h3>
              <p>Rua Joaquim Távora, 1403<br />Vila Mariana, São Paulo/SP</p>
              <p><a className="caps" href="/privacidade">POLÍTICA DE PRIVACIDADE</a></p>
            </div>
          </div>
          <p className="legal">Atualizado em 21/10/2026.</p>
        </div>
      </footer>

      <Stack />

      <div className="sticky-cta" role="region" aria-label="Inscrição rápida">
        <span><span className="est-aberto"><RestamTexto /></span><span className="est-esgotado">Vagas esgotadas</span><span className="est-encerrado">Encerradas</span><span className="est-realizado">Até o próximo!</span></span>
        <a className="btn btn-primary est-aberto" href={FORM_URL} target="_blank" rel="noopener" data-track="clique_inscricao" data-local="fixo_celular">Garantir minha vaga</a>
        <a className="btn btn-primary est-esgotado" href={ESPERA_URL} target="_blank" rel="noopener" data-track="clique_espera" data-local="fixo_celular">Lista de espera</a>
        <a className="btn btn-primary est-encerrado" href={WHATSAPP_URL} target="_blank" rel="noopener" data-track="clique_whatsapp" data-local="fixo_celular">Liderança</a>
        <a className="btn btn-primary est-realizado" href={INSTA_JOVEM} target="_blank" rel="noopener" data-local="fixo_celular">@bereanajovem</a>
      </div>
    </>
  );
}
