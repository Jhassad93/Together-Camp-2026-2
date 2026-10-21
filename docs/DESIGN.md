# DESIGN.md — Together Camp 2026.2

> Documentado a partir do que foi construído e aprovado em 20/10/2026. Fonte da verdade visual do site.

## Direção visual
- Em uma frase: **cartaz de evento jovem, amarelo chapado, tipografia condensada gigante e blocos de cor que se empilham na rolagem.**
- Por que combina: o público tem de 14 a 30 anos e o tom é jovem e reverente. O amarelo como base dá energia sem parecer infantil; o azul profundo segura a seriedade do tema (Ekballo, enviado para fora); o cinza-quase-preto cria as pausas. Nada de foto de banco: a identidade vem do tipo e da cor.

## Estilo-base
- Referência de rolagem: efeito de cartões empilhados visto em alovehatestory.com (só a mecânica; nenhuma identidade copiada).
- Paleta e fontes definidas pelo responsável, sem Refero/Realtime Colors.

## Cores

| Papel | Valor | Uso |
| --- | --- | --- |
| Base (fundo) | `#FFCD12` amarelo | Fundo da página e das seções de leitura (topo, Quando e onde, Programação, Inscrição, Dúvidas) |
| Contraste 1 | `#2C2A29` cinza | Texto sobre amarelo; faixas de contraste (vagas, Tema, O que levar); rodapé |
| Contraste 2 | `#3D00FF` azul | Títulos e destaques sobre amarelo; faixas de impacto (Pregadores, Se liga, Convite); botão principal sobre amarelo |
| Neutro claro | `#F4F1EA` papel | Texto sobre cinza e azul |
| Exceção aprovada | `#D90429` vermelho | Só nas placas de data das revelações (em teste) |

Pares de contraste medidos: cinza/amarelo 9,5:1 · cinza/papel 14,3:1 · azul/branco 8,0:1 · azul/amarelo 5,3:1 (texto e botões). **Nunca:** azul sobre cinza (1,8:1) nem amarelo sobre branco (1,5:1). Botão amarelo só sobre cinza ou azul; botão azul só sobre amarelo.

## Tipografia
- Títulos: **Big Shoulders Display** 900, caixa alta, entrelinha 0,9, espaçamento +0,5%. Hospedada no site (`@fontsource`, OFL).
- Corpo: **Google Sans Flex** (variável, 400 a 700), 17 px, entrelinha 1,55. Hospedada no site (`@fontsource-variable`, OFL).
- Escala: H2 44–96 px fluido; EKBALLO do topo calculado para ocupar a largura (até 362 px); rótulos 13–15 px em caixa alta com +12% de espaçamento.
- A fonte Newback, pedida no início, foi substituída pela Big Shoulders Display por decisão do responsável (20/10).

## Imagens
- Origem: nenhuma fotografia. Silhuetas genéricas em SVG (não representam ninguém), ícone de câmera genérico, imagem Open Graph e ícones gerados no projeto.
- Quando os pregadores forem revelados: fotos fornecidas pela liderança, com autorização de imagem, recortadas no mesmo enquadramento das silhuetas (busto, fundo removido ou escurecido).
- Nunca: foto de banco.

## Celular (decisões próprias)
- Faixa rotativa de informações no topo, em vez de blocos de texto.
- EKBALLO reduzido para caber na largura sem cortar.
- 80 vagas viram 80 traços verticais numa única linha (quadrados ficariam com 3 px).
- Botão fixo "Garantir minha vaga" no rodapé da tela.
- FAQ em sanfona; checklist em duas colunas.
- Pilha de seções: seção mais alta que a tela rola até o fim e só então gruda e é coberta.

## Movimento
- Faixa rotativa (45 s por volta, pausa no hover), anel pulsante nos dois botões principais (1,8 s), pilha de seções (encolhe 6% e escurece 45% ao ser coberta). Só `transform` e `opacity`.
- `prefers-reduced-motion`: faixa parada mostrando os 5 itens, sem pulso, pilha sem encolher/escurecer.

## Espaçamento e forma
- Largura máxima 1160 px; margem lateral 16–40 px fluida; espaço entre seções 72–140 px fluido.
- Raio: cartões 14 px, botões pílula, placas 6 px.

## Componentes
- Biblioteca: nenhuma (CSS próprio em `app/globals.css`). Desvio do kit por prazo.
- Botão primário: pílula 56 px, peso 700, seta que desliza no hover.
- Cartão: contorno 2 px na cor do texto, sem preenchimento (sobre amarelo) ou contorno translúcido (sobre cinza/azul).

## Faça
- Amarelo como fundo; cinza e azul como contraste.
- Títulos sempre em caixa alta e condensados.
- Um botão principal por seção, no máximo.

## Não faça
- Azul sobre cinza, amarelo sobre branco.
- Fotos de banco; efeitos pesados (WebGL, vídeo de fundo).
- Mais de uma cor de exceção além do vermelho das placas.
