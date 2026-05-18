import { defaultInvitation, Invitation } from "@/lib/invitation-data";

const shareKeys: (keyof Invitation)[] = [
  "eventType",
  "template",
  "names",
  "date",
  "time",
  "place",
  "description",
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
    if (typeof value === "string") acc[key] = key === "description" ? value.slice(0, 360) : value.slice(0, 120);
    return acc;
  }, {});
  return btoa(unescape(encodeURIComponent(JSON.stringify(compact))));
}

export function decodeInvitation(payload: string | null, fallback: Invitation = defaultInvitation) {
  if (!payload) return fallback;
  try {
    const decoded = JSON.parse(decodeURIComponent(escape(atob(payload)))) as Partial<Invitation>;
    return {
      ...fallback,
      ...decoded,
      id: fallback.id,
      slug: fallback.slug,
      images: fallback.images ?? [],
      visits: fallback.visits ?? 0,
      createdAt: fallback.createdAt
    };
  } catch {
    return fallback;
  }
}
