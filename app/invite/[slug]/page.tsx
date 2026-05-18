import { InvitePage } from "@/components/InvitePage";

export default function Page({ params }: { params: { slug: string } }) {
  return <InvitePage slug={params.slug} />;
}

