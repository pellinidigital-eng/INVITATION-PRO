import { publishInvitation } from "@/lib/published-invitation";

const maxBytes = 12_000;

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return Response.json({ error: "Formato non valido" }, { status: 415 });
  }
  if (Number(request.headers.get("content-length")) > maxBytes) {
    return Response.json({ error: "Invito troppo lungo" }, { status: 413 });
  }
  const body = await request.text();
  if (new TextEncoder().encode(body).length > maxBytes) {
    return Response.json({ error: "Invito troppo lungo" }, { status: 413 });
  }
  let input;
  try {
    input = JSON.parse(body);
  } catch {
    return Response.json({ error: "Invito non valido" }, { status: 400 });
  }
  if (typeof input?.payload !== "string" || !/^[A-Za-z0-9_-]+$/.test(input.payload) ||
      (input.plan !== "free" && input.plan !== "premium")) {
    return Response.json({ error: "Invito non valido" }, { status: 400 });
  }
  try {
    const code = await publishInvitation(input.payload, input.plan);
    return code
      ? Response.json({ code }, { status: 201 })
      : Response.json({ error: "Invito non valido" }, { status: 400 });
  } catch {
    return Response.json({ error: "Link breve temporaneamente non disponibile" }, { status: 503 });
  }
}
