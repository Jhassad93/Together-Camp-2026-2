// Fotos do último acampamento (esteira rolante). Enquanto a lista estiver vazia, a seção não aparece.
// Receita (docs/DESIGN.md): quadrada 1:1, 900×900 px, grão leve, duotom azul→amarelo, WebP, em public/esteira/.
// Só entram fotos com autorização de imagem (menores: autorização dos responsáveis).
export type Foto = { src: string; alt: string };

export const FOTOS: Foto[] = [
  { src: "/esteira/f1.webp", alt: "Jovem tocando bateria ao lado da fogueira, à noite" },
  { src: "/esteira/f2.webp", alt: "Jovem com os braços erguidos durante o louvor" },
  { src: "/esteira/f3.webp", alt: "Jovem cantando de joelhos, com o microfone na mão" },
  { src: "/esteira/f4.webp", alt: "Adolescente de óculos, de olhos fechados, em momento de oração" },
  { src: "/esteira/f5.webp", alt: "Jovem ajoelhado com a cabeça no chão, em oração" },
  { src: "/esteira/f6.webp", alt: "Jovem de boné com os braços para o alto, cantando" },
];
