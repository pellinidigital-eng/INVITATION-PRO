import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InvitePage } from "@/components/InvitePage";
import { getPublishedInvitation } from "@/lib/published-invitation";
import { invitationShareTitle } from "@/lib/share";

export const dynamic = "force-dynamic";

type Props = { params: { code: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shared = await getPublishedInvitation(params.code);
  if (!shared) notFound();
  const title = invitationShareTitle(shared.invitation);
  const description = "Apri l’invito digitale per scoprire i dettagli dell’evento.";
  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    openGraph: { title, description, locale: "it_IT", type: "website" }
  };
}

export default async function Page({ params }: Props) {
  const shared = await getPublishedInvitation(params.code);
  if (!shared) notFound();
  return <InvitePage slug={params.code} published={shared} />;
}
