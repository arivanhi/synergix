import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "../../lib/prisma";
import AdminDashboardClient from "../components/AdminDashboardClient";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	const totalProduk = await prisma.produk.count();
	const pendaftarMagang = await prisma.pendaftarMagang.count();
	const totalBerita = await prisma.berita.count();

	const stats = {
		totalProduk,
		pendaftarMagang,
		totalBerita,
	};

	return (
		<AdminDashboardClient stats={stats} user={session.user || {}} />
	);
}
