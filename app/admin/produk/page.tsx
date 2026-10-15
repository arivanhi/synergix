import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import ProdukClient from "./ProdukClient";

export const dynamic = 'force-dynamic';

export default async function ProdukAdminPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	const produk = await prisma.produk.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<ProdukClient initialData={produk} />
		</AdminLayout>
	);
}
