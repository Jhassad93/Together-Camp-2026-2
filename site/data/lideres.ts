// Liderança de jovens e de adolescentes. Foto: quadrada (1:1), 900x900 px, em duotom azul→amarelo, WebP, em public/lideres/.
// Enquanto "foto" estiver vazia, aparece um quadro reservado.
export type Casal = { id: string; grupo: string; nomes: string; papel: string; foto?: string; bio: string[] };

export const LIDERES: Casal[] = [
  {
    id: "jovens",
    grupo: "Jovens",
    nomes: "Fred e Gabi",
    papel: "Liderança de jovens",
    foto: "/lideres/fred-gabi.webp",
    bio: [
      "Fred e Gabriela têm 28 anos, são casados, pais da Alice e diáconos da Bereana. Se conheceram na igreja ainda adolescentes: “introvertidos por natureza, extrovertidos pela misericórdia”.",
      "Em 2018 começaram a ajudar na liderança de jovens, casaram em 2021 e desde 2023 lideram a galera. Os dois são formados em Comunicação Social. Ela gosta de vôlei, séries e de tempo em família; ele é nerd, cinéfilo e programador, e adora uma boa conversa sobre a Palavra.",
      "Com a liderança dos adolescentes, criaram o Together: cultos, acampamentos e conferência.",
    ],
  },
  {
    id: "adolescentes",
    grupo: "Adolescentes",
    nomes: "Paulo e Tânia",
    papel: "Liderança de adolescentes",
    foto: "/lideres/paulo-tania.webp",
    bio: [
      "Paulo e Tânia são casados há 28 anos e pais do Heitor, de 18. Ele é presbítero, 56 anos; ela é diaconisa, 52.",
      "Membros da Bereana Sede desde 1992, cooperam com o ministério de adolescentes desde 2018 e lideram o grupo desde 2020. Paulo também é professor no Berekids há mais de 20 anos: boa parte da galera cresceu ouvindo as aulas dele.",
    ],
  },
];
