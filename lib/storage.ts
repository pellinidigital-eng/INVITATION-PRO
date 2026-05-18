import { defaultInvitation, demoInvitations, Invitation } from "@/lib/invitation-data";

const KEY = "invitation-creator-pro:v1";
const DELETED_KEY = "invitation-creator-pro:deleted-slugs:v1";

export function loadInvitations(): Invitation[] {
  if (typeof window === "undefined") return demoInvitations;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Invitation[]) : [];
    return parsed.length ? parsed : demoInvitations;
  } catch {
    return demoInvitations;
  }
}

export function saveInvitation(invitation: Invitation) {
  const invitations = loadInvitations();
  const next = [invitation, ...invitations.filter((item) => item.id !== invitation.id && item.slug !== invitation.slug && item.id !== "demo")];
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    const lightNext = next.map((item) => ({ ...item, images: [], logo: undefined, video: undefined, music: undefined }));
    window.localStorage.setItem(KEY, JSON.stringify(lightNext));
    rememberDeletedSlug(invitation.slug, false);
    return lightNext;
  }
  rememberDeletedSlug(invitation.slug, false);
  return next;
}

export function findInvitation(slug: string) {
  if (isDeletedSlug(slug)) return undefined;
  return loadInvitations().find((item) => item.slug === slug) ?? (slug === defaultInvitation.slug ? defaultInvitation : undefined);
}

export function deleteInvitation(id: string) {
  const invitations = loadInvitations();
  const removed = invitations.find((item) => item.id === id);
  const next = invitations.filter((item) => item.id !== id);
  if (removed) rememberDeletedSlug(removed.slug, true);
  window.localStorage.setItem(KEY, JSON.stringify(next));
  return next.length ? next : demoInvitations;
}

export function uniqueSlug(baseSlug: string, currentId: string) {
  const invitations = loadInvitations();
  const clean = baseSlug || defaultInvitation.slug;
  const taken = new Set(invitations.filter((item) => item.id !== currentId).map((item) => item.slug));
  if (!taken.has(clean)) return clean;
  let index = 2;
  while (taken.has(`${clean}-${index}`)) index += 1;
  return `${clean}-${index}`;
}

function deletedSlugs() {
  if (typeof window === "undefined") return new Set<string>();
  try {
    return new Set(JSON.parse(window.localStorage.getItem(DELETED_KEY) ?? "[]") as string[]);
  } catch {
    return new Set<string>();
  }
}

export function isDeletedSlug(slug: string) {
  return deletedSlugs().has(slug);
}

function rememberDeletedSlug(slug: string, deleted: boolean) {
  if (!slug || typeof window === "undefined") return;
  const slugs = deletedSlugs();
  if (deleted) slugs.add(slug);
  else slugs.delete(slug);
  window.localStorage.setItem(DELETED_KEY, JSON.stringify(Array.from(slugs)));
}
