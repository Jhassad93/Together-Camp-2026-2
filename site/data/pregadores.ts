// Revelação dos pregadores: preencha nome, igreja e foto no dia de cada revelação.
// Foto: PNG com fundo transparente, busto, ~800x1000 px, em public/pregadores/ (ex.: "/pregadores/1.png").
// Enquanto "nome" estiver vazio, aparece a silhueta e a placa mostra a data.
export type Pregador = { data: string; dataISO: string; nome?: string; igreja?: string; foto?: string };

export const PREGADORES: Pregador[] = [
  { data: "24/out", dataISO: "2026-10-24", nome: "Pr. André Nascimento", igreja: "Assembleia de Deus Bereana de Belmonte", foto: "/pregadores/andre-nascimento.webp" },
  { data: "30/out", dataISO: "2026-10-30" },
  { data: "06/nov", dataISO: "2026-11-06" },
];
