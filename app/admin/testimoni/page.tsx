import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import TestimoniClient from "./TestimoniClient";

export const dynamic = 'force-dynamic';

export default async function TestimoniAdminPage() {
	const session = await getServerSession(authOptions);
	const testimoni = await prisma.testimoni.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<TestimoniClient initialData={testimoni} />
		</AdminLayout>
	);
}
