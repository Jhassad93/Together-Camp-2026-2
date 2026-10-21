// Programação do Together Camp 2026.2 (enviada pela liderança em 21/10).
// Os nomes dos pregadores ficam fora daqui de propósito: eles são revelados aos poucos na seção Pregadores.
// "destaque" marca os cultos e momentos principais.
export type Atividade = { hora: string; nome: string; detalhe?: string; destaque?: boolean };
export type Dia = { dia: string; data: string; nota?: string; atividades: Atividade[] };

export const PROGRAMACAO: Dia[] = [
  {
    dia: "Quinta", data: "19/11",
    atividades: [
      { hora: "18h", nome: "Recepção e entrega das bagagens", detalhe: "Na AD Bereana" },
      { hora: "19h", nome: "Saída do ônibus", detalhe: "Cerca de 1h30 até o Berecamp" },
      { hora: "21h", nome: "Chegada e acomodação nos quartos" },
      { hora: "22h15", nome: "Abertura e Culto da Fogueira", destaque: true },
      { hora: "00h", nome: "Ceia e confraternização" },
    ],
  },
  {
    dia: "Sexta", data: "20/11", nota: "Feriado",
    atividades: [
      { hora: "8h–9h", nome: "Café da manhã" },
      { hora: "9h–12h", nome: "Culto da Manhã", destaque: true },
      { hora: "12h–13h30", nome: "Almoço" },
      { hora: "14h30–17h", nome: "Gincanas" },
      { hora: "19h–20h30", nome: "Jantar" },
      { hora: "20h30–23h30", nome: "Culto da Noite", destaque: true },
    ],
  },
  {
    dia: "Sábado", data: "21/11",
    atividades: [
      { hora: "8h–9h", nome: "Café da manhã" },
      { hora: "9h–12h", nome: "Culto da Manhã", destaque: true },
      { hora: "12h–13h30", nome: "Almoço" },
      { hora: "13h30–19h", nome: "Tarde livre" },
      { hora: "19h–20h30", nome: "Jantar e festa temática" },
      { hora: "20h30–23h30", nome: "Culto da Noite", detalhe: "Com uma atividade especial", destaque: true },
    ],
  },
  {
    dia: "Domingo", data: "22/11",
    atividades: [
      { hora: "8h–9h", nome: "Café da manhã" },
      { hora: "9h–12h", nome: "Culto da Manhã", destaque: true },
      { hora: "12h–13h30", nome: "Almoço" },
      { hora: "15h", nome: "Saída do ônibus", detalhe: "Cerca de 2h até a AD Bereana" },
      { hora: "18h", nome: "Culto juntos na Bereana", destaque: true },
    ],
  },
];
