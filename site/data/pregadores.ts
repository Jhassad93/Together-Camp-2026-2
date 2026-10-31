// Revelação dos pregadores: preencha nome, igreja e foto no dia de cada revelação.
// Foto: PNG com fundo transparente, busto, ~800x1000 px, em public/pregadores/ (ex.: "/pregadores/1.png").
// Enquanto "nome" estiver vazio, aparece a silhueta e a placa mostra a data.
export type Pregador = { data: string; dataISO: string; nome?: string; igreja?: string; foto?: string };

// A ordem da lista é a ordem das silhuetas na tela (esquerda, meio, direita) e das placas, não a ordem de revelação.
// Fred Nunes (revelado em 30/out) ocupa a silhueta da direita; a do meio fica para a revelação de 06/nov.
export const PREGADORES: Pregador[] = [
  { data: "24/out", dataISO: "2026-10-24", nome: "Pr. André Nascimento", igreja: "Assembleia de Deus Bereana de Belmonte", foto: "/pregadores/andre-nascimento.webp" },
  { data: "06/nov", dataISO: "2026-11-06" },
  { data: "30/out", dataISO: "2026-10-30", nome: "Fred Nunes", igreja: "Bereana Sede", foto: "/pregadores/fred-nunes.webp" },
];
