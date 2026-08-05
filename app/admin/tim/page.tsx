import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import TimClient from "./TimClient";

export const dynamic = 'force-dynamic';

export default async function TimAdminPage() {
	const session = await getServerSession(authOptions);
	const keanggotaan = await prisma.keanggotaan.findMany({
		orderBy: { createdAt: "asc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<TimClient initialData={keanggotaan} />
		</AdminLayout>
	);
}
