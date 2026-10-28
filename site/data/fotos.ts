// Fotos do último acampamento (esteira rolante). Enquanto a lista estiver vazia, a seção não aparece.
// Receita (docs/DESIGN.md): quadrada 1:1, 900×900 px, grão leve, duotom azul→amarelo, WebP, em public/esteira/.
// Só entram fotos com autorização de imagem (menores: autorização dos responsáveis).
export type Foto = { src: string; alt: string };

export const FOTOS: Foto[] = [
  { src: "/esteira/f7.webp", alt: "Foto de todo o grupo do acampamento, com os braços para o alto, em frente aos chalés" },
  { src: "/esteira/f1.webp", alt: "Jovem tocando bateria ao lado da fogueira, à noite" },
  { src: "/esteira/f8.webp", alt: "Três amigos sentados num banco à noite, sorrindo para a foto" },
  { src: "/esteira/f2.webp", alt: "Jovem com os braços erguidos durante o louvor" },
  { src: "/esteira/f10.webp", alt: "Sete amigas fantasiadas, abraçadas e sorrindo" },
  { src: "/esteira/f3.webp", alt: "Jovem cantando de joelhos, com o microfone na mão" },
  { src: "/esteira/f13.webp", alt: "Jovem tocando violão, curvado sobre o instrumento" },
  { src: "/esteira/f4.webp", alt: "Adolescente de óculos, de olhos fechados, em momento de oração" },
  { src: "/esteira/f14.webp", alt: "Grupo de jovens se divertindo no salão" },
  { src: "/esteira/f5.webp", alt: "Jovem ajoelhado com a cabeça no chão, em oração" },
  { src: "/esteira/f12.webp", alt: "Dois amigos ao lado da bateria, um abraçando o outro" },
  { src: "/esteira/f6.webp", alt: "Jovem de boné com os braços para o alto, cantando" },
  { src: "/esteira/f15.webp", alt: "Jovens abraçados em oração ao redor da fogueira" },
  { src: "/esteira/f11.webp", alt: "Jovem ajoelhado, de cabeça baixa, em oração" },
];
