import { redirect } from "next/navigation";
export default async function LegacyProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/portofolio/${encodeURIComponent(id)}`);
}
