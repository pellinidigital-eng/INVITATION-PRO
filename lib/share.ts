import { defaultInvitation, EventType, Invitation, ProductPlan } from "@/lib/invitation-data";

export const shareCodePattern = /^[A-Za-z0-9_-]{16}$/;

export function publishedInviteCode(invitation: Invitation, plan: ProductPlan) {
  const link = invitation.publishedLink;
  return link && shareCodePattern.test(link.code) && link.plan === plan && link.payload === encodeInvitation(invitation)
    ? link.code : undefined;
}

const shareEventCopy = {
  matrimonio: { title: "Il matrimonio", phrase: "al matrimonio" },
  compleanno: { title: "Il compleanno", phrase: "al compleanno" },
  battesimo: { title: "Il battesimo", phrase: "al battesimo" },
  comunione: { title: "La Prima Comunione", phrase: "alla Prima Comunione" },
  "baby-shower": { title: "Il baby shower", phrase: "al baby shower" },
  laurea: { title: "La festa di laurea", phrase: "alla festa di laurea" },
  anniversario: { title: "L’anniversario", phrase: "all’anniversario" },
  business: { title: "L’evento", phrase: "all’evento" }
} satisfies Record<EventType, { title: string; phrase: string }>;

export function invitationShareTitle(invitation: Invitation) {
  const event = shareEventCopy[invitation.eventType];
  const name = invitation.names.trim();
  return event && name ? `${event.title} di ${name}` : event?.title ?? "Invito digitale";
}

export function invitationShareMessage(invitation: Invitation) {
  const phrase = shareEventCopy[invitation.eventType]?.phrase;
  const name = invitation.names.trim();
  return phrase && name ? `💌 Sei invitato ${phrase} di ${name}!` : "💌 Sei invitato!";
}

export function whatsappInviteLink(invitation: Invitation, url: string) {
  return `https://wa.me/?text=${encodeURIComponent(`${invitationShareMessage(invitation)}\n${url}`)}`;
}

const shareKeys: (keyof Invitation)[] = [
  "eventType",
  "template",
  "names",
  "date",
  "time",
  "place",
  "description",
  "story",
  "opening",
  "envelopeColor",
  "dressCode",
  "whatsapp",
  "palette",
  "font",
  "style",
  "tone",
  "writingStyle"
];

export function encodeInvitation(invitation: Invitation) {
  const compact = shareKeys.reduce<Record<string, string>>((acc, key) => {
    const value = invitation[key];
    if (typeof value === "string") acc[key] = value.slice(0, key === "description" || key === "story" ? 360 : 120);
    return acc;
  }, {});
  return btoa(unescape(encodeURIComponent(JSON.stringify(compact)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeInvitation(payload: string | null, fallback: Invitation = defaultInvitation) {
  if (payload === null) return fallback;
  try {
    const decoded = JSON.parse(decodeURIComponent(escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))))) as Partial<Invitation>;
    if (!decoded || typeof decoded.names !== "string" || !decoded.names.trim()) return undefined;
    const fields = Object.fromEntries(shareKeys.flatMap((key) =>
      typeof decoded[key] === "string" ? [[key, decoded[key]]] : []
    ));
    return {
      ...fallback,
      ...fields,
      id: fallback.id,
      slug: fallback.slug,
      images: fallback.images ?? [],
      visits: fallback.visits ?? 0,
      createdAt: fallback.createdAt
    };
  } catch {
    return undefined;
  }
}
