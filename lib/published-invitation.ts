import { get, put } from "@vercel/blob";
import { randomBytes } from "node:crypto";
import { cache } from "react";
import type { ProductPlan } from "@/lib/invitation-data";
import { normalizeInvitation } from "@/lib/invitation-utils";
import { decodeInvitation, encodeInvitation, shareCodePattern } from "@/lib/share";

const blobPath = (code: string) => `invitations/v1/${code}.json`;

export async function publishInvitation(payload: string, plan: ProductPlan) {
  const decoded = decodeInvitation(payload);
  if (!decoded) return null;
  const code = randomBytes(12).toString("base64url");
  await put(blobPath(code), JSON.stringify({ payload: encodeInvitation(normalizeInvitation(decoded)), plan }), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false
  });
  return code;
}

export const getPublishedInvitation = cache(async (code: string) => {
  if (!shareCodePattern.test(code)) return null;
  const result = await get(blobPath(code), { access: "private" });
  if (result?.statusCode !== 200) return null;
  const { payload, plan } = await new Response(result.stream).json() as { payload: string; plan: ProductPlan };
  const decoded = decodeInvitation(payload);
  return decoded ? { invitation: normalizeInvitation({ ...decoded, slug: code }), plan } : null;
});
