import { site } from "./site";

/** Build a wa.me deep link to the company's official WhatsApp number with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const defaultWhatsappMessage =
  "Hello Pak Arab Manpower Supply, I would like to enquire about manpower for a project.";
