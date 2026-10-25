// Fotos do último acampamento (esteira rolante). Enquanto a lista estiver vazia, a seção não aparece.
// Receita (docs/DESIGN.md): quadrada 1:1, 900×900 px, grão leve, duotom azul→amarelo, WebP, em public/esteira/.
// Só entram fotos com autorização de imagem (menores: autorização dos responsáveis).
export type Foto = { src: string; alt: string };

export const FOTOS: Foto[] = [];
