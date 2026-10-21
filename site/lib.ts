export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://together-camp-2026-2-mify.vercel.app";
export const FORM_URL = "https://forms.gle/MqZYxLnfGr9GPpP87";
export const WHATSAPP_URL =
  "https://wa.me/5511984482098?text=" +
  encodeURIComponent("Oi! Tenho uma dúvida sobre o Together Camp 2026.2");
export const INSTA_JOVEM = "https://www.instagram.com/bereanajovem/";
export const INSTA_IGREJA = "https://www.instagram.com/bereana/";
export const MAPS_BERECAMP =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Estrada dos Fernandes, 3801, Mirante do Arujá, Arujá - SP");
export const MAPS_BEREANA =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("Rua Joaquim Távora, 1403, Vila Mariana, São Paulo - SP");
// Prazo final de inscrição, pagamento e documentos: 15/11/2026, 23:59 (horário de Brasília)
export const DEADLINE_ISO = "2026-11-15T23:59:59-03:00";
export const VAGAS = 80;
// Endereço do Apps Script que devolve {"inscritos": N, "vagas": 80}. Vazio = mostra só o contador regressivo.
export const VAGAS_API =
  process.env.NEXT_PUBLIC_VAGAS_API ||
  "https://script.google.com/macros/s/AKfycbxdjvP_WJbsxCbiRHOsPMV8FmuxBMPBqCvZve6rBoAKPBzcRmgR2s74tee2v8PQT8VIRw/exec";

// Lista de espera (quando as 80 vagas esgotarem)
export const ESPERA_URL =
  "https://wa.me/5511984482098?text=" +
  encodeURIComponent("Oi! Vi que as vagas do Together Camp 2026.2 esgotaram. Quero entrar na lista de espera.");

// Convite curto para compartilhar
export const CONVITE_MSG =
  "Bora comigo pro Together Camp? É de 19 a 22/11, no feriadão, no Berecamp (Arujá). Só 80 vagas, inscrições até 15/11. Dá uma olhada:";

// Fim do evento: depois disso o site entra no estado "realizado"
export const EVENTO_FIM_ISO = "2026-11-22T23:59:59-03:00";
