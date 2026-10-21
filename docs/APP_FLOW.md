# App Flow — Together Camp 2026.2

## Páginas

| Rota | Página | Palavra-chave principal |
| --- | --- | --- |
| / | Landing page (10 dobras empilhadas) | Together Camp 2026.2 |
| /privacidade | Política de privacidade | — |
| (rota inexistente) | 404 | — |
| /robots.txt, /sitemap.xml, /llms.txt | arquivos para robôs | — |

Não há /obrigado nem formulário: a pré-inscrição acontece no Google Forms.

## Dobras da home, na ordem
1. Faixa rotativa (data, local, idade, vagas, preço) + topo com EKBALLO e CTA
2. Vagas: 80 quadrados preenchidos pela planilha; se falhar, contador regressivo até 15/11
3. Tema (Ekballo, Marcos 1.12 e Mateus 9.38)
4. Quando e onde (ida, lugar, volta, mapas)
5. Quem vem aí? (3 silhuetas, placas 23/10, 30/10, 06/11)
6. Programação (em breve)
7. Como garantir sua vaga (4 passos + cartão de investimento)
8. O que levar
9. Se liga (autorização, documento, medicação, proibido)
10. Dúvidas (FAQ, 10 perguntas) · Não vai sozinho (convite) · Rodapé

## Fluxo

```mermaid
flowchart TD
    A[Visitante chega à Home] --> B{GA4 configurado?}
    B -- Sim --> C[Banner de cookies: aceitar ou recusar]
    B -- Não --> D[Home]
    C --> D
    D --> V{Consulta ao Apps Script OK?}
    V -- Sim --> V1[80 quadrados: inscritos / vagas]
    V -- Não ou demora > 8 s --> V2[Contador regressivo DD:HH:MM:SS]
    V1 --> V3{Inscritos >= 80?}
    V3 -- Sim --> V4[Mostra 'Vagas esgotadas' - botão continua indo ao formulário]
    D -->|Garantir minha vaga: topo, cartão ou botão fixo| E[Google Forms de pré-inscrição]
    E --> E1[Login Google + comprovante + documentos até 15/11]
    D -->|Mandar no WhatsApp / Compartilhar / Copiar convite| F[Convite com link do site]
    D -->|Dúvida: FAQ ou rodapé| G[WhatsApp da liderança com mensagem pronta]
    D -->|Ver no mapa| H[Google Maps: Bereana ou Berecamp]
    D -->|@bereanajovem| I[Instagram: revelações]
    D -->|Rodapé| J[/privacidade]
    K[URL inexistente] --> L[404 com volta à Home e CTA]
```

Caminhos sem saída: nenhum. O caso "80 vagas" ainda não tem decisão (lista de espera ou formulário fechado).
