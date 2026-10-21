# Plano de implementação — Together Camp 2026.2

Fontes: BRIEF.md · APP_FLOW.md · DESIGN.md · SCHEMA.md
Regra do kit: uma etapa por vez, com aprovação. Por decisão do responsável (prazo "até o fim do dia" em 20/10), as etapas 1 a 7 foram construídas em sequência contínua com revisões ao vivo; as aprovações estão registradas na conversa de 20/10.

Desvios do kit, aprovados: hospedagem na Vercel (não Cloudflare); CSS próprio (sem Tailwind/shadcn); sem análise de concorrentes; skills Impeccable/Taste não instaladas neste ambiente.

## Etapa 1 — Setup
- [x] Next.js 15 + TypeScript, exportação estática (`output: "export"`), em `site/`
- [x] Tokens do DESIGN.md em `app/globals.css`
- [x] Fontes hospedadas no site (`@fontsource`)
- Pronto quando: build gera `out/` — **feito**

## Etapa 2 — Layout base
- [x] Topo com marca, faixa rotativa, rodapé com contato e privacidade, 404 personalizada
- [x] `lang="pt-BR"`, HTML semântico, foco visível, link "pular para o conteúdo"
- Pronto quando: navegação e 404 funcionam — **feito**

## Etapa 3 — Home
- [x] Dez dobras do APP_FLOW.md, com textos do BRIEF.md e do manual anterior
- [x] CTA único acima da dobra, repetido no cartão e no botão fixo do celular
- [x] Pilha de seções, botões pulsantes, placas de revelação
- [x] Prints em 375/768/1280 (`docs/prints/`)
- Pronto quando: home completa no desktop e no celular — **feito**

## Etapa 4 — Banco de dados
- Não se aplica: inscrição no Google Forms, sem banco.

## Etapa 5 — Contador de vagas (substitui o formulário)
- [x] Apps Script na planilha devolvendo só `{inscritos, vagas}` (publicado pelo responsável em 20/10)
- [x] `components/Vagas.tsx`: 80 quadrados; consulta a cada 60 s; com falha, contador regressivo
- Pronto quando: número do site bate com a planilha — **feito (47 em 20/10)**

## Etapa 6 — Páginas legais e cookies
- [x] Política de privacidade e banner que bloqueia o GA4 antes do aceite
- [ ] Texto revisado pelo responsável; nome do encarregado de dados
- [ ] Termos de uso: não se aplica

## Etapa 7 — SEO, IA e analytics
- [x] Title, description, Open Graph, canonical, favicons e manifest, sitemap, JSON-LD (Event + FAQPage), robots.txt (liberar todos), llms.txt
- [x] GA4 com consentimento e eventos `clique_inscricao`, `clique_whatsapp` (código pronto)
- [ ] Cadastrar `NEXT_PUBLIC_GA_ID` na Vercel
- Pronto quando: Lighthouse > 90 em SEO e acessibilidade — **feito (100/100 local)**

## Etapa 8 — Publicação
- [x] Auditoria contra os três checklists (`docs/AUDITORIA.md`)
- [x] `docs/LICENCAS.md` completo
- [x] `vercel.json` com cabeçalhos de segurança
- [ ] `npx vercel --prod` (responsável) e confirmação do endereço final
- [ ] Pós-deploy: PageSpeed, securityheaders.com, Teste de pesquisa aprimorada, prévia no WhatsApp, Search Console e Bing com sitemap
- [ ] Repositório Git sem segredos
- Pronto quando: itens aplicáveis dos checklists OK no site publicado

## Etapa 8b — Crítica Impeccable e correções
- [x] Skill Impeccable 4.7.0 instalada em `.claude/skills/impeccable` (clonada do GitHub; download oficial bloqueado na rede)
- [x] Rodada 1: 23/36; P0 e P1 corrigidos (ver docs/CRITIQUE.md)
- [ ] Conteúdo para os pais (7 pendências em docs/CRITIQUE.md)

## Etapa 9 — Operação até o evento
- [ ] 22/10, 29/10, 05/11: receber foto (PNG sem fundo) e nome do pregador; preencher `site/data/pregadores.ts` e republicar
- [x] Publicar a programação quando fechar
- [x] Comportamento ao chegar em 80 vagas: lista de espera pelo WhatsApp (automático)
- [ ] 16/11: trocar o contador por "Inscrições encerradas" (automático pelo prazo) e revisar os textos
- [ ] Depois do evento: tirar o site do ar ou transformar em página de memórias

## Pendências (voltar depois)
Conteúdo para os pais e garantias de quem paga (P1 da crítica, rodada 2). Textos sugeridos em `docs/CRITIQUE.md`; nada disso está publicado até a liderança confirmar.
- [ ] Reembolso e desistência
- [ ] Nome e telefone do responsável pelo acampamento
- [ ] Protocolo de emergência
- [ ] Supervisão e alojamento (quartos, proporção de líderes)
- [ ] PDF da autorização (menor) e do termo de imagem (maior) para download
- [ ] Fotos de edições anteriores com autorização de imagem
- [x] Programação completa (o responsável envia)
- [ ] ID do GA4 (`NEXT_PUBLIC_GA_ID` na Vercel) e encarregado de dados (LGPD) na política de privacidade
- [ ] Publicação na Vercel e checagens pós-deploy (ver docs/AUDITORIA.md, auditoria 2 de 21/10 concluída: pronto para publicar)
