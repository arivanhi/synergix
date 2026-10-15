import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import BeritaClient from "./BeritaClient";

export const dynamic = 'force-dynamic';

export default async function BeritaAdminPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	const berita = await prisma.berita.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<BeritaClient initialData={berita} />
		</AdminLayout>
	);
}
