import { defaultInvitation, eventTypes, Invitation, ProductPlan } from "@/lib/invitation-data";

export const shareCodePattern = /^[A-Za-z0-9_-]{16}$/;

export function publishedInviteCode(invitation: Invitation, plan: ProductPlan) {
  const link = invitation.publishedLink;
  return link && shareCodePattern.test(link.code) && link.plan === plan && link.payload === encodeInvitation(invitation)
    ? link.code : undefined;
}

export function invitationShareTitle(invitation: Invitation) {
  const event = eventTypes.find(({ id }) => id === invitation.eventType);
  return `${event?.label ?? "Invito"} · ${invitation.names}`;
}

export function whatsappInviteLink(invitation: Invitation, url: string) {
  return `https://wa.me/?text=${encodeURIComponent(`💌 ${invitationShareTitle(invitation)}\nApri l’invito: ${url}`)}`;
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
