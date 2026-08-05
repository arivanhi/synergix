import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import LayananWebClient from "./LayananWebClient";

export const dynamic = 'force-dynamic';

export default async function LayananWebAdminPage() {
	const session = await getServerSession(authOptions);
	const layanan = await prisma.layanan.findMany({
		orderBy: { createdAt: "asc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<LayananWebClient initialData={layanan} />
		</AdminLayout>
	);
}
