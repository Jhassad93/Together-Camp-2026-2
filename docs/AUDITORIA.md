# Auditoria pré-publicação — Together Camp 2026.2

Data: 21/10/2026, 00h30 · Feita sobre a exportação estática de `site/` (`npm run build`, pasta `out/`), servida localmente com compressão e URLs limpas, como a Vercel faz.

## Resultados automáticos

| Verificação | Celular (375) | Tablet (768) | Desktop (1280) |
| --- | --- | --- | --- |
| Lighthouse: desempenho / acessibilidade / boas práticas / SEO | 99 / 100 / 96 / 100 | — | 91 / 100 / 96 / 100 |
| LCP · TBT · CLS | 1,5 s · 120 ms · 0,02 | — | 1,6 s · 140 ms · 0,01 |
| axe-core (WCAG 2.1 AA + boas práticas) | 0 violações | 0 | 0 |
| Rolagem horizontal | não | não | não |
| CTA visível sem rolar | sim | sim | sim |
| Foco visível por teclado (12 primeiros elementos) | sim | sim | sim |
| Erros de JavaScript | nenhum | nenhum | nenhum |
| Movimento reduzido desliga faixa, pulso e encolhimento | sim | sim | sim |

Os 4 pontos perdidos em "boas práticas" vêm de um único erro de console: no ambiente de auditoria a consulta ao Apps Script é bloqueada pela rede. Em produção ela responde (testada no navegador em 20/10).
Prints conferidos: `docs/prints/home-375.png`, `home-768.png`, `home-1280.png`.

## Correções feitas nesta auditoria
- Fontes passaram a ser hospedadas no próprio site (pacotes `@fontsource`, licença OFL). Sai o pedido ao Google Fonts, que bloqueava a renderização e enviava o IP do visitante ao Google.
- Cartão de investimento deixou de ser `<aside>` dentro de `<main>`; botão fixo do celular virou uma região nomeada.
- Rótulo da marca no topo igual ao texto visível.
- `vercel.json` com URLs limpas, cache dos arquivos estáticos e cabeçalhos de segurança (CSP, HSTS, nosniff, frame-ancestors, Referrer-Policy, Permissions-Policy).
- Manifest e ícones 192/512 para Android.
- Política de privacidade explica a consulta ao contador de vagas.

## Checklist de produção (31)

| # | Item | Resultado | Onde |
| --- | --- | --- | --- |
| 1 | 404 personalizada | OK | `site/app/not-found.tsx` (vira `out/404.html`; a Vercel serve automaticamente) |
| 2 | CTA acima da dobra | OK | prints 375/768/1280; CTA único "Garantir minha vaga" repetido ao longo da página |
| 3 | Meta title por página | OK | `app/layout.tsx` (52 car.), `app/privacidade/page.tsx` |
| 4 | Meta description | OK | idem (150 car.) |
| 5 | Imagem Open Graph | OK | `public/og.png` 1200×630, 47 KB. Testar no WhatsApp após o deploy |
| 6 | Favicons | OK | `icon.svg`, `apple-touch-icon.png`, `icon-192/512.png`, `site.webmanifest` |
| 7 | robots.txt | OK | `public/robots.txt`, política "liberar todos" aprovada em 20/10, aponta para o sitemap |
| 8 | sitemap.xml | OK | `public/sitemap.xml` (manual, 2 páginas; site estático sem rotas dinâmicas) |
| 9 | Alt em imagens | OK | não há `<img>`; SVGs decorativos com `aria-hidden`; silhuetas rotuladas |
| 10 | Celular desenhado para celular | OK | faixa rotativa, 80 vagas viram traços, FAQ em sanfona, pilha com seções altas, botão fixo |
| 11 | CTA fixo no celular | OK | `.sticky-cta` (só < 760 px) |
| 12 | Estados de carregamento | OK | contador mostra `--` até calcular; vagas só aparecem com resposta válida |
| 13 | Erros em formulário | não se aplica | não há formulário no site |
| 14 | Página de agradecimento | não se aplica | inscrição acontece no Google Forms |
| 15 | Política de privacidade | OK, revisar | `app/privacidade/page.tsx`: sem coleta; cookies só com aceite; contador de vagas. **Falta nome/contato do encarregado (LGPD)** |
| 16 | Termos de uso | não se aplica | site informativo, sem serviço, conta ou compra |
| 17 | Banner de cookies | OK | `components/CookieConsent.tsx`: GA só carrega após "Aceitar"; sem GA configurado, não aparece |
| 18 | Analytics | pendente | código pronto; falta `NEXT_PUBLIC_GA_ID` na Vercel |
| 19 | Endereço de contato real | OK | rodapé: endereço da Bereana e WhatsApp da liderança; não é e-commerce |
| 20 | HTTPS forçado | verificar pós-deploy | Vercel força HTTPS; HSTS em `vercel.json` |
| 21 | Imagens comprimidas | OK | única imagem: `og.png` 47 KB |
| 22 | Velocidade | OK (local 99) | medir no PageSpeed Insights após o deploy |
| 23 | Contraste | OK | axe sem falhas; tabela de pares no DESIGN.md |
| 24 | Links | OK | nenhum `#`; externos com `rel="noopener"`; destinos reais testados |
| 25 | Proteção contra spam | não se aplica | sem formulário |
| 26 | Sem cara de site gerado por IA | não verificado | `impeccable` não instalado neste ambiente; visual aprovado pelo responsável em 20/10 |
| 27 | Verificação visual registrada | OK | `docs/prints/`; animações: faixa, pulso, pilha (só transform/opacity) |
| 28 | Direção visual definida e seguida | OK | `docs/DESIGN.md` |
| 29 | Tipografia e paleta | OK | Big Shoulders Display + Google Sans Flex; amarelo/azul/cinza + papel; vermelho das placas é exceção aprovada |
| 30 | Imagens com intenção e direito de uso | OK | sem fotos de banco; silhuetas e OG próprias (`docs/LICENCAS.md`) |
| 31 | Teclado e HTML semântico | OK | 1 H1, hierarquia conferida, `header/main/section/footer`; sem `nav` por ser página única |

## Checklist de segurança (19)

| # | Item | Resultado | Onde |
| --- | --- | --- | --- |
| 1 | Chaves de API | OK | nenhuma chave; a URL do Apps Script e o ID do GA4 são públicos por natureza |
| 2 | `.env` | OK | `site/.gitignore` ignora `.env*`; nenhum `.env` criado |
| 3 | Segredo no código | OK | busca por key/secret/password/token: só o nome do cookie de consentimento |
| 4 | Login | não se aplica | |
| 5 | Permissões no servidor | não se aplica | |
| 6 | Dados de outro usuário | não se aplica | |
| 7 | RLS | não se aplica | sem banco |
| 8 | Regras de Storage | não se aplica | |
| 9 | Páginas de admin | não se aplica | |
| 10 | Modo debug | OK | build de produção; sem ferramentas de dev no `out/` |
| 11 | Sem erro detalhado | OK | falha no contador mostra só o regressivo |
| 12 | Validar no servidor | não se aplica | |
| 13 | Sanitização (XSS) | OK | único `dangerouslySetInnerHTML` é o JSON-LD, gerado de constantes do código |
| 14 | Upload | não se aplica | |
| 15 | SQL | não se aplica | |
| 16 | Limite de tentativas | não se aplica | |
| 17 | Git sem segredos | pendente | ainda não há repositório Git; criar sem `.env` e sem `node_modules` |
| 18 | Headers e CORS | verificar pós-deploy | `vercel.json`; conferir em securityheaders.com |
| 19 | Testar como estranho | responsável | abrir em janela anônima e pelo celular; testar inscrição, WhatsApp, mapas e compartilhar |

## Checklist de SEO e IA (16)

| # | Item | Resultado | Onde |
| --- | --- | --- | --- |
| 1 | Conteúdo no servidor | OK | todo o texto está em `out/index.html` |
| 2 | Um H1 | OK | "Together Camp 2026.2: Ekballo" |
| 3 | Semântico e idioma | OK | `lang="pt-BR"` |
| 4 | URLs legíveis | OK | `/`, `/privacidade` |
| 5 | Canônica | OK | `metadataBase` + `alternates.canonical` |
| 6 | Palavra-chave por página | OK | "Together Camp 2026.2" no title, no H1 e na description |
| 7 | Dados estruturados | OK, validar | `Event` (com `Organization`, `Place`, `Offer`) + `FAQPage`; validar no Teste de pesquisa aprimorada após o deploy |
| 8 | Search Console e Bing | pendente | verificar o domínio e enviar o sitemap |
| 9 | Perfil da Empresa no Google | não se aplica | evento, não negócio local |
| 10 | Formato de resposta | OK | 10 perguntas do FAQ respondidas na primeira frase |
| 11 | Fatos verificáveis | OK | datas, horários, preço, vagas, prazo, "Atualizado em" |
| 12 | Entidade consistente | parcial | nome e endereço iguais ao Instagram; **CNPJ não informado** |
| 13 | Política para robôs de IA | OK | "liberar todos" aprovado; sem bloqueio, não há nomes a verificar. Testar após o deploy |
| 14 | Autoria e credenciais | parcial | organização presente; pregadores entram nas revelações |
| 15 | Tráfego de IA | pendente | depende do GA4 |
| 16 | llms.txt | OK | `public/llms.txt` |

## Pendências para o responsável
1. Publicar (`npx vercel --prod`) e confirmar o endereço final. Se não for `togethercamp.vercel.app`, ajustar `NEXT_PUBLIC_SITE_URL`, `sitemap.xml`, `robots.txt` e `llms.txt`.
2. Após o deploy: PageSpeed Insights, securityheaders.com, Teste de pesquisa aprimorada, compartilhar o link no WhatsApp para ver a imagem, testar como estranho (item 19).
3. Criar a conta GA4 e cadastrar `NEXT_PUBLIC_GA_ID` na Vercel.
4. Informar o encarregado de dados (LGPD) e, se quiser, o CNPJ no rodapé.
5. Criar o repositório Git (sem `node_modules` e `.env`).
6. Enviar foto e nome de cada pregador até a véspera de 23/10, 30/10 e 06/11.
7. Decidir o que acontece ao chegar em 80 vagas (hoje: "Vagas esgotadas", formulário continua aberto).
