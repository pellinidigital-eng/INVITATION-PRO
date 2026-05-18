import { defaultInvitation, EventType, Invitation, palettes, smartCopy, templates } from "@/lib/invitation-data";

const MAX_TEXT = 180;
const MAX_LONG_TEXT = 620;
const FALLBACK_WHATSAPP = defaultInvitation.whatsapp;

export function cleanText(value: string, fallback = "", max = MAX_TEXT) {
  const compact = value.replace(/\s+/g, " ").trim();
  return (compact || fallback).slice(0, max);
}

export function cleanWhatsApp(value: string) {
  const digits = value.replace(/[^\d+]/g, "").replace(/(?!^)\+/g, "");
  const normalized = digits.startsWith("+") ? digits.slice(1) : digits;
  return normalized.length >= 8 && normalized.length <= 15 ? normalized : FALLBACK_WHATSAPP;
}

export function safeDate(value: string) {
  if (!value) return "";
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? value : "";
}

export function normalizeInvitation(invitation: Invitation): Invitation {
  const eventType = smartCopy[invitation.eventType] ? invitation.eventType : defaultInvitation.eventType;
  const template = templates.some((item) => item.id === invitation.template) ? invitation.template : defaultInvitation.template;
  const palette = palettes[invitation.palette as keyof typeof palettes] ? invitation.palette : defaultInvitation.palette;

  return {
    ...defaultInvitation,
    ...invitation,
    eventType: eventType as EventType,
    template,
    palette,
    names: cleanText(invitation.names, defaultInvitation.names, 86),
    date: safeDate(invitation.date),
    time: cleanText(invitation.time, defaultInvitation.time, 8),
    place: cleanText(invitation.place, defaultInvitation.place, 120),
    description: cleanText(invitation.description, smartCopy[eventType as EventType].intro.join(" "), MAX_LONG_TEXT),
    dressCode: cleanText(invitation.dressCode, "Elegante ma comodo", 72),
    whatsapp: cleanWhatsApp(invitation.whatsapp),
    font: cleanText(invitation.font, defaultInvitation.font, 40),
    style: cleanText(invitation.style, defaultInvitation.style, 40),
    tone: cleanText(invitation.tone, defaultInvitation.tone, 40),
    images: Array.isArray(invitation.images) ? invitation.images.slice(0, 6) : []
  };
}

export function invitationStatus(invitation: Invitation) {
  const missing = [
    ["nomi", invitation.names.trim()],
    ["data", invitation.date.trim()],
    ["luogo", invitation.place.trim()],
    ["WhatsApp", invitation.whatsapp.trim()]
  ].filter(([, value]) => !value);

  const pastDate = invitation.date ? new Date(invitation.date).getTime() < Date.now() - 86400000 : false;
  return {
    missing: missing.map(([label]) => label),
    pastDate
  };
}
