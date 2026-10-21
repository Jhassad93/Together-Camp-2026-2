# /impeccable critique — Together Camp 2026.2 (rodada 1, 21/10/2026)

Method: dual-agent (A: revisão de design · B: detector + navegador). impeccable 4.7.0, modos arquivo e URL, 375 e 1280.

## Nielsen: 23/36 (64%), Aceitável
1 Status 2 · 2 Mundo real 2 · 3 Controle 3 · 4 Consistência 3 · 5 Prevenção 2 · 6 Reconhecimento 3 · 7 n/a · 8 Minimalismo 2 · 9 Recuperação 3 · 10 Ajuda 3

## Especificidade
Específica no terço de cima (barra de 80 vagas, palco dos pregadores, voz do texto), intercambiável nos dois terços de baixo (mesmo molde 8×, zero fotos).
Detector: 13 achados (arquivo) / 28 (URL). 17 falsos positivos verificados no navegador (cramped-padding, nested-cards, contraste das silhuetas). Reais: 2 bordas laterais coloridas, rótulo-acima-do-título em 8 seções, marquee sem pausa, viúvas, linha de 90ch na privacidade.

## Prioridades
- P0 Abrir <details> do FAQ deixa o fim da seção inalcançável e perguntas 7-10 sem clique (pilha não recalcula altura).
- P1 Topo não diz o que é (acampamento, idade, data, lugar só no marquee).
- P1 CTA leva a login Google + upload sem reasseguro ao lado; fala com o filho, não com o responsável.
- P1 Pilha cobre o fim das seções cedo (placas visíveis por 80px; "Já sabe quem é?" por 30px); véu preto 45%; foco por teclado escondido sob seção seguinte; CTA fixo come 74px.
- P1 Estados esgotado/encerrado só na barra; botões, marquee, CTA fixo e cartão continuam vendendo.
- P1 Três animações infinitas sem controle de pausa (WCAG 2.2.2).
- P2 Programação vazia após o pico; Checklist + Se liga antes do FAQ; sem CTA no fim do desktop.
- P2 Pais sem lugar: cancelamento, PDF da autorização, telefone legível, responsável, emergência (depende da liderança).
- P2 9 alvos de toque < 44px; anel de foco azul sobre cinza 1,8:1; texto 12px no celular.
- P3 side-tabs (.tema-def, .aviso); eyebrows; EKBALLO H1+H2; 26.2 vs 2026.2; "Investimento"; marquee começa cortado; placas vermelhas fora da paleta; H2 uniforme; privacidade 90ch.

## Personas
Jordan: grego antes de "acampamento"; "preciso ser da Bereana?" a 77%; nenhuma imagem; cantina como custo oculto.
Casey: 2 CTAs na 1ª tela; 3 movimentos permanentes; 14 telas.
Riley: 80/80 e pós-15/11 inconsistentes; sem slot para nome/foto do pregador; "Já sabe quem é?" sem ação.
Pai/mãe: CTA fala com o filho; autorização sem PDF; R$ 500 sem política de reembolso.

Evidências dos agentes: scratchpad da sessão (critique/). Snapshot oficial da skill não gravado: o binário de critique-storage não baixa nesta rede.

---

# Correções aplicadas (21/10/2026, após a rodada 1)

Plano aprovado item a item pelo responsável.

| # | Item | Feito | Verificação |
| --- | --- | --- | --- |
| 1 | P0 FAQ inalcançável | Pilha recalcula com ResizeObserver | 8/8 perguntas clicáveis com todas abertas; link final clicável (375 e 1280) |
| 2 | Pilha cobre o fim das seções | Base da seção alinhada ao fim da tela (no celular, acima do botão fixo) + pausa de leitura de 35% da tela; véu cinza 20%; sem encolher no celular; foco por teclado rola até ficar visível | Janela de leitura da última linha: 300–820 px (antes 30–207 px). Foco coberto: 0 em toda a ordem de tabulação |
| 3 | Topo não diz o que é | Faixa ganhou "Acampamento de jovens" e "da igreja ou não"; começa alinhada à margem | — |
| 4 | Botão sem reasseguro | Linha "Abre no Google Forms · precisa de conta Google · menor de 18? o responsável preenche" sob os 3 botões | — |
| 5 | Esgotado/encerrado | Estado único em `<html data-estado>`: esgotado → "Entrar na lista de espera" (WhatsApp); encerrado → "Falar com a liderança"; faixa, cartão, contador e botão fixo acompanham. Abaixo de 10 inscritos, contador em vez da barra | Simulado 80/80 e 16/11: todos os textos e botões trocam |
| 6 | Animações sem pausa | Botão pausar/retomar na faixa; pulso limitado a 3 ciclos | Pausa verificada; com movimento reduzido: 0 animações |
| 7 | Toque/foco/fonte | Links ≥ 48 px de altura; anel amarelo no cartão de preço; mínimo 13 px | 0 alvos < 44 px (exceto "Pular para o conteúdo" fora da tela, 48 px ao focar) |
| 8 | Ritmo | Convite logo após Pregadores; Programação mantida (aguarda conteúdo); bloco "Para os pais"; Checklist + Se liga recolhidos em "Depois de inscrito"; CTA final "Bora pro feriadão?" com convite curto | — |
| 9 | Pais | Bloco com saída/volta, autorização e documentos, saúde, WhatsApp. FAQ sem os itens duplicados | Pendências abaixo |
| 10 | Detalhes | Sem bordas laterais; sem rótulos acima dos títulos; "O tema"; "Quanto custa"; "2026.2"; privacidade a ~70 caracteres; viúvas com text-wrap: pretty; sombra das placas com desfoque | Detector: side-tab e wide-tracking zerados |
| 11 | Placas | Vermelho mantido como cor de urgência | — |
| 12 | Revelação | `data/pregadores.ts`: nome, igreja e foto por posição; placa mostra o nome quando preenchido | — |

Lighthouse após as correções: celular 95/100/96/100; desktop (perfil desktop) 100/100/96/100. axe: 0 violações.

Detector após as correções (15 achados, todos já verificados): cramped-padding em seções/faixas (falso positivo: insets 16–207 px), contraste das silhuetas (falso positivo: 12–13:1 medido), marquee (exceção aprovada pelo cliente, agora com pausa).

## Pendências do bloco "Para os pais" (dependem da liderança)
1. Cancelamento e reembolso. Sugestão: "Desistência até 08/11: devolução integral. Depois disso, devolução só com substituição por outro acampante."
2. PDF da autorização (menor) e do termo de imagem (maior), para download.
3. Nome do responsável pelo acampamento e telefone visível.
4. Protocolo de emergência. Sugestão: "Em qualquer emergência, a liderança liga para o contato informado na inscrição."
5. Medicação controlada. Sugestão: "Avise no check-in: um líder acompanha os horários combinados com a família."
6. Alojamento e supervisão. Sugestão: "Quartos separados por sexo, com líderes no mesmo bloco. 1 líder para cada N acampantes."
7. Fotos de edições anteriores com autorização de imagem (a página ainda não tem nenhuma).

---

# Rodada 2 (21/10/2026) — avaliação independente, sem saber das mudanças

**Nielsen 28/36 (78%, Bom)** · rodada 1: 23/36 (64%, Aceitável).
1 Status 3 (+1) · 2 Mundo real 3 (+1) · 3 Controle 3 · 4 Consistência 3 · 5 Prevenção 3 (+1) · 6 Reconhecimento 2 (−1) · 7 n/a · 8 Minimalismo 3 (+1) · 9 Recuperação 3 · 10 Ajuda 4 (+1)

Corrigido logo após a rodada 2: botão fixo vazando no estado encerrado (rótulos curtos + ajuste ≤ 340 px, 0 vazamentos em 320/375 nos 4 estados); "Restam N" segue a mesma regra da barra (< 10 inscritos → "80 vagas"); texto do convite muda com o estado; título "Programação em breve"; datas dos cards sem quebra no meio.

Em aberto (decisão do responsável):
- P1 Linha parada no topo com "Acampamento · 19–22/11 · Arujá · R$ 500" (rejeitada na rodada 1; o avaliador insiste: a faixa em movimento não conta como texto de leitura).
- P1 Garantias para quem paga (reembolso, supervisão, responsável nomeado): depende da liderança.
- P2 Programação amarela colada na Inscrição amarela; repetições de ida/volta (3×) e autorização (5×); pausa de leitura soma ~2.300 px no celular (reduzir HOLD para 0,2?).
- P2 Placas com data vencida e sem nome; estado "evento já aconteceu" após 22/11.
- P3 Moldura amarela quando seções azul/cinza encolhem no desktop; anel do pulso fica ocre; "Dúvidas" sem palavra em destaque; quem recebe o Pix.

## Rodada 2 — decisões e correções (21/10, 01h)
- Linha fixa no topo: "Acampamento de jovens · 19–22/11 · Berecamp, Arujá · R$ 500 ou 5x R$ 100" (aprovada).
- Programação em cinza (alterna com a Inscrição amarela).
- Placas mantêm a data (responsável preenche o nome no dia).
- Estado pós-evento (após 22/11 23h59): "Foi incrível. Até o próximo!", botões levam ao @bereanajovem, inscrição some.
- "Ficou alguma dúvida?"; anel do pulso em cinza sobre amarelo; seções cobertas só escurecem (sem encolher, sem moldura).
- Passo 2 informa quem recebe o pagamento (Igreja Evangélica Assembléia de Deus Bereana, como no formulário).
- Pausa de leitura mantida em 35%.
Verificado: 320/375/1280 nos estados aberto e realizado, sem rolagem lateral, sem vazamento do botão fixo, axe 0 violações, sem erros de JavaScript.
