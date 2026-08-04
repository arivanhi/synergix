import { prisma } from "../../lib/prisma";
import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";
import PortofolioClient from "./PortofolioClient";

export const dynamic = 'force-dynamic';

export default async function PortofolioPage() {
	// Ambil semua produk, paten, dan capstone
	const allItems = await prisma.produk.findMany({
		orderBy: { createdAt: "desc" }
	});

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans pt-28">
			<ClientNavigation />
			<PortofolioClient allItems={allItems} />
			<Footer />
		</main>
	);
}
