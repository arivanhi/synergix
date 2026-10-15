import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import TestimoniClient from "./TestimoniClient";

export const dynamic = 'force-dynamic';

export default async function TestimoniAdminPage() {
	const session = await getServerSession(authOptions);
	if (!session) redirect("/login");
	const testimoni = await prisma.testimoni.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<TestimoniClient initialData={testimoni} />
		</AdminLayout>
	);
}
