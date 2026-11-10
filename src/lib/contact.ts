export const PHONE_DISPLAY = "(47) 9779-5558";
export const PHONE_E164 = "554797795558";
export const INSTAGRAM_URL = "https://www.instagram.com/addsky.escola.pilotagem/";
export const ADDRESS = "Rua Arthur Fischer, 153 — Itoupava Central, Blumenau — SC, 89068-024";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent("ADD SKY Escola de Pilotagem, Rua Arthur Fischer 153, Blumenau SC");

export const MESSAGES = {
  general: "Olá! Conheci a ADD SKY pelo site e gostaria de saber mais sobre os cursos de pilotagem.",
  cpa: "Olá! Gostaria de receber mais informações sobre o Curso de Piloto Aerodesportivo (CPA).",
  invcpa: "Olá! Gostaria de saber mais sobre o Curso de Instrutor de Voo Aerodesportivo (INVCPA).",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;
}
