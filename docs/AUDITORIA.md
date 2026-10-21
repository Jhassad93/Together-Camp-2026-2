# Auditoria pré-publicação — Together Camp 2026.2

Auditoria 2 · 21/10/2026, 16h · Feita sobre a exportação estática de `site/` (`npm run build`, pasta `out/`), servida localmente com URLs limpas, gzip e os cabeçalhos do `vercel.json`, como a Vercel faz. Substitui a auditoria 1 (21/10, 00h30), feita antes da seção do Tema com o gráfico, da programação dia a dia e dos ajustes de texto do dia.

## Resultados automáticos

| Verificação | 320 | 375 | 768 | 1280 |
| --- | --- | --- | --- | --- |
| Rolagem horizontal | não | não | não | não |
| CTA "Garantir minha vaga" visível sem rolar | sim | sim | sim | sim |
| Botão fixo do celular cabe sem transbordar | sim | sim | oculto | oculto |
| axe-core (WCAG 2.1 A/AA + boas práticas) | 0 violações | 0 | 0 | 0 |
| Teclado: Tab por todos os 32–33 elementos focáveis, nenhum coberto pela pilha ou pelo botão fixo, todos com anel de foco | ok | ok | ok | ok |
| Um H1; H2/H3 sem salto de nível | ok | ok | ok | ok |
| Texto de exemplo, `[TBD]`, links `#` ou sem `href` | nenhum | nenhum | nenhum | nenhum |
| Links externos com `rel="noopener"` | todos | todos | todos | todos |
| Última linha de cada seção alcançável na pilha | sim | sim | sim | sim |
| Erros de JavaScript | nenhum | nenhum | nenhum | nenhum |

| Lighthouse (desempenho / acessibilidade / boas práticas / SEO) | LCP | TBT | CLS |
| --- | --- | --- | --- |
| Home, celular (Moto G simulado, 4G lento): **94 / 100 / 96 / 100** (duas rodadas iguais) | 1,7 s | 240 ms | 0,001 |
| Home, desktop: **100 / 100 / 96 / 100** | 0,5 s | 0 ms | 0,001 |
| Privacidade, celular: **97 / 100 / 100 / 100** | | | |

Os 4 pontos perdidos em "boas práticas" vêm de um único erro de console: neste ambiente a consulta ao Apps Script é bloqueada pela rede. Em produção ela responde (testada no navegador em 20/10).

**Estados** (375 e 1280, sem erros, sem rolagem lateral): aberto com dados (barra 47/80), aberto sem dados (contagem regressiva), esgotado (lista de espera), encerrado (falar com a liderança), realizado (fotos no Instagram), movimento reduzido (faixa parada, pulso desligado, pilha sem sombra). 404 e `/privacidade` abertas e sem violações.

Prints conferidos por uma pessoa: `docs/prints/home-375.png`, `home-768.png`, `home-1280.png`, `estado-*.png`, `404-375.png`, `privacidade-375.png`.

## Correções feitas nesta auditoria
- **Desempenho no celular tinha caído para 78** depois de a página crescer (Tema com gráfico e programação): o `Stack.tsx` lia e escrevia o layout dentro do mesmo laço (um reflow forçado por seção) e recalculava três vezes na carga. Agora lê tudo de uma vez, escreve depois e deixa o primeiro cálculo para o `ResizeObserver`. TBT caiu de 820 ms para 240 ms.
- **Salto de layout (CLS 0,053) na troca de fonte:** o "EKBALLO", o cabeçalho e o subtítulo começavam na fonte do sistema, mais larga, e encolhiam quando a Big Shoulders chegava. Solução: as duas fontes (só o subconjunto latino) passaram para `public/fonts/` com nome estável e `<link rel="preload">`, e uma fonte de reserva (`Big Shoulders Fallback`) com `size-adjust` e métricas ajustadas ocupa o mesmo espaço enquanto a fonte real não chega. As larguras máximas em `ch` dos títulos viraram `em`, para não dependerem da fonte carregada. CLS foi a 0,001. Saem 11 `@font-face` de alfabetos que o site não usa e os pacotes `@fontsource` do `package.json`.
- Gráfico das gerações: vazava para fora da tela no celular (rolagem horizontal da página inteira); agora rola dentro do próprio quadro, com aviso "Arraste o gráfico pro lado" e foco por teclado.
- Impeccable `detect`: linha longa no texto do Tema (máximo 56ch) e palavra solitária no fim de parágrafo (`text-wrap: pretty` em parágrafos e itens de lista).

## Impeccable `detect` (home e privacidade)
Privacidade: nenhum achado. Home: três achados, todos com decisão registrada.

| Achado | Decisão |
| --- | --- |
| `all-caps-body`: fecho do Tema (140 caracteres em caixa alta) | Mantido. É uma frase de pôster, na fonte dos títulos, no mesmo registro dos H2 e H3 do site; não é parágrafo de leitura corrida. |
| `nested-cards` (14): cartões do Tema, de "Quando e onde", da programação e de "Para os pais" | Falso positivo. O detector toma a seção empilhada, que tem sombra, por um cartão; a seção é uma faixa de página inteira. Dentro dela há um só nível de cartões. |
| `marquee`: faixa rotativa do topo | Mantida por decisão do responsável (20/10). Tem botão de pausa, para com `prefers-reduced-motion` e repete só dados curtos que também estão no corpo da página. |

## Checklist de produção (31)

| # | Item | Resultado | Onde |
| --- | --- | --- | --- |
| 1 | 404 personalizada | OK | `site/app/not-found.tsx` → `out/404.html`; print `docs/prints/404-375.png` |
| 2 | CTA acima da dobra | OK | "Garantir minha vaga" visível sem rolar em 320/375/768/1280; repetido no Tema (botão fixo), na inscrição e no fecho |
| 3 | Meta title por página | OK | `app/layout.tsx` (52 car.), `app/privacidade/page.tsx`; a 404 herda o título do site |
| 4 | Meta description | OK | idem (150 car.) |
| 5 | Imagem Open Graph | OK | `public/og.png` 1200×630, 47 KB. Testar no WhatsApp após o deploy |
| 6 | Favicons | OK | `icon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` |
| 7 | robots.txt | OK | `public/robots.txt`, "liberar todos" aprovado em 20/10, aponta para o sitemap |
| 8 | sitemap.xml | OK | `public/sitemap.xml` (2 páginas; site estático sem rotas dinâmicas) |
| 9 | Alt em imagens | OK | não há `<img>`; SVGs decorativos com `aria-hidden`; gráfico com `<desc>` e tabela para leitor de tela; silhuetas rotuladas |
| 10 | Celular desenhado para celular | OK | faixa rotativa, 80 vagas viram traços, FAQ em sanfona, programação em coluna, gráfico com rolagem própria, botão fixo; sem rolagem lateral em 320 e 375 |
| 11 | CTA fixo no celular | OK | `.sticky-cta` (só < 760 px), texto curto em 320 |
| 12 | Estados de carregamento | OK | contagem mostra `--` até calcular; barra de vagas só aparece com resposta válida |
| 13 | Erros em formulário | não se aplica | não há formulário no site |
| 14 | Página de agradecimento | não se aplica | inscrição no Google Forms |
| 15 | Política de privacidade | OK, revisar | `app/privacidade/page.tsx`: sem coleta; cookies só com aceite; contador de vagas. **Falta nome/contato do encarregado (LGPD)** |
| 16 | Termos de uso | não se aplica | site informativo |
| 17 | Banner de cookies | OK | `components/CookieConsent.tsx`: GA só carrega após "Aceitar"; sem GA configurado, não aparece |
| 18 | Analytics | pendente | código pronto; falta `NEXT_PUBLIC_GA_ID` na Vercel |
| 19 | Endereço de contato real | OK | rodapé: endereço e telefone (11) 5083-1830 da Bereana, WhatsApp da liderança; não é e-commerce |
| 20 | HTTPS forçado | verificar pós-deploy | Vercel força HTTPS; HSTS em `vercel.json` |
| 21 | Imagens comprimidas | OK | única imagem: `og.png` 47 KB; fontes 14 KB + 51 KB |
| 22 | Velocidade | OK (local 94 celular, 100 desktop) | medir no PageSpeed Insights após o deploy |
| 23 | Contraste | OK | axe sem falhas; tabela de pares no DESIGN.md |
| 24 | Links | OK | nenhum `#`; externos com `rel="noopener"`; destinos reais |
| 25 | Proteção contra spam | não se aplica | sem formulário |
| 26 | Sem cara de site gerado por IA | OK | `npx impeccable detect` na home e na privacidade (tabela acima); duas rodadas de `critique` em `docs/CRITIQUE.md`; visual aprovado pelo responsável |
| 27 | Verificação visual registrada | OK | `docs/prints/` atualizados nesta auditoria; animações só com `transform`/`opacity` e `prefers-reduced-motion` |
| 28 | Direção visual definida e seguida | OK | `docs/DESIGN.md` |
| 29 | Tipografia e paleta | OK | Big Shoulders Display + Google Sans Flex; amarelo/azul/cinza + papel; vermelho das placas é exceção aprovada |
| 30 | Imagens com intenção e direito de uso | OK | sem fotos de banco; silhuetas, gráfico e OG próprios (`docs/LICENCAS.md`) |
| 31 | Teclado e HTML semântico | OK | 1 H1, hierarquia conferida, `header/main/section/footer`; Tab percorre tudo com foco visível |

## Checklist de segurança (19)

| # | Item | Resultado | Onde |
| --- | --- | --- | --- |
| 1 | Chaves de API | OK | nenhuma chave; a URL do Apps Script e o ID do GA4 são públicos por natureza; `NEXT_PUBLIC_` só em URL do site, URL do contador e ID do GA |
| 2 | `.env` | OK | `.gitignore` ignora `.env*`; nenhum `.env` no histórico (só `config/.env.example`, vazio) |
| 3 | Segredo no código | OK | busca por key/secret/password/token: só o nome do cookie de consentimento |
| 4–9 | Login, permissões, RLS, Storage, admin | não se aplica | sem login, sem banco |
| 10 | Modo debug | OK | build de produção; sem ferramentas de dev no `out/` |
| 11 | Sem erro detalhado | OK | falha no contador mostra só a contagem regressiva |
| 12 | Validar no servidor | não se aplica | |
| 13 | Sanitização (XSS) | OK | único `dangerouslySetInnerHTML` é o JSON-LD, gerado de constantes do código |
| 14–16 | Upload, SQL, limite de tentativas | não se aplica | |
| 17 | Git sem segredos | OK | repositório em github.com/Jhassad93/Together-Camp-2026-2; busca no histórico inteiro por padrões de chave (Google, OpenAI, GitHub, PEM, service role): nada |
| 18 | Headers e CORS | OK local, verificar pós-deploy | `vercel.json` (CSP, HSTS, nosniff, DENY, Referrer-Policy, Permissions-Policy) aplicados no servidor de teste; conferir em securityheaders.com |
| 19 | Testar como estranho | responsável | abrir em janela anônima e pelo celular; testar inscrição, WhatsApp, mapas, telefone e compartilhar |

## Checklist de SEO e IA (16)

| # | Item | Resultado | Onde |
| --- | --- | --- | --- |
| 1 | Conteúdo no servidor | OK | todo o texto, inclusive gráfico e programação, está em `out/index.html` |
| 2 | Um H1 | OK | "Together Camp 2026.2: Ekballo" |
| 3 | Semântico e idioma | OK | `lang="pt-BR"`; `lang="grc"` na palavra grega |
| 4 | URLs legíveis | OK | `/`, `/privacidade` |
| 5 | Canônica | OK | `metadataBase` + `alternates.canonical` |
| 6 | Palavra-chave por página | OK | "Together Camp 2026.2" no title, no H1 e na description |
| 7 | Dados estruturados | OK, validar | `Event` (com `Organization` + telefone, `Place`, `Offer`) + `FAQPage`; validar no Teste de pesquisa aprimorada após o deploy |
| 8 | Search Console e Bing | pendente | verificar o domínio e enviar o sitemap |
| 9 | Perfil da Empresa no Google | não se aplica | evento, não negócio local |
| 10 | Formato de resposta | OK | 8 perguntas do FAQ respondidas na primeira frase; dias da programação com horários |
| 11 | Fatos verificáveis | OK | datas, horários, preço, vagas, prazo, telefone, "Atualizado em", fonte dos dados do gráfico (IBGE) |
| 12 | Entidade consistente | parcial | nome, endereço, telefone e Instagram iguais no rodapé, no JSON-LD (`sameAs`) e no `llms.txt`; **CNPJ não informado** |
| 13 | Política para robôs de IA | OK | "liberar todos" aprovado; sem bloqueio, não há nomes a verificar. Testar após o deploy |
| 14 | Autoria e credenciais | parcial | organização presente; pregadores entram nas revelações |
| 15 | Tráfego de IA | pendente | depende do GA4 |
| 16 | llms.txt | OK | `public/llms.txt` com horários, telefone e regra para menores |

## Pendências para o responsável
Nada abaixo impede a publicação; os itens 1 e 2 são o próprio deploy e suas checagens.
1. Publicar na Vercel (`npx vercel --prod` dentro de `site/`, ou importar o repositório no painel com "Root Directory" = `site`) e confirmar o endereço final. Endereço confirmado em 21/10. Se mudar, ajustar `NEXT_PUBLIC_SITE_URL`, `sitemap.xml`, `robots.txt` e `llms.txt`.
2. Após o deploy: PageSpeed Insights, securityheaders.com, Teste de pesquisa aprimorada, compartilhar o link no WhatsApp para ver a imagem, testar como estranho (item 19), conferir se o contador de vagas responde.
3. Criar a conta GA4 e cadastrar `NEXT_PUBLIC_GA_ID` na Vercel.
4. Informar o encarregado de dados (LGPD) e, se quiser, o CNPJ no rodapé.
5. Enviar foto e nome de cada pregador até a véspera de 23/10, 30/10 e 06/11; os nomes podem entrar também na programação.
6. Conteúdo para os pais ainda não publicado (reembolso, responsável, emergência, supervisão), ver `docs/IMPLEMENTATION_PLAN.md`.
