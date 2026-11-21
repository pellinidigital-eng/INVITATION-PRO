import { defaultInvitation, Invitation } from "@/lib/invitation-data";

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
  "tone"
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
