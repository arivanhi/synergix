import { prisma } from "../../lib/prisma";
import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function BeritaPage() {
	const beritaData = await prisma.berita.findMany({
		orderBy: { createdAt: "desc" }
	});

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans pt-28">
			<ClientNavigation />
			<section className="py-20 px-6 max-w-7xl mx-auto text-center">
				<h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-6">
					Berita & Artikel
				</h1>
				<p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
					Informasi terbaru, publikasi, dan pencapaian dari SynergX Robotics.
				</p>
				
				{beritaData.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{beritaData.map((berita) => (
							<div
								key={berita.id}
								className="bg-white/80 backdrop-blur-lg p-5 border border-white shadow-xl rounded-3xl text-left hover:-translate-y-2 transition-all flex flex-col"
							>
								<div className="bg-gray-200 w-full h-56 rounded-2xl mb-4 overflow-hidden relative">
									{berita.gambar ? (
										<img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover" />
									) : (
										<div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
									)}
								</div>
								<span className="text-gray-500 text-xs flex items-center gap-1 mb-2">
									<Calendar size={12} /> {berita.createdAt.toLocaleDateString("id-ID")}
								</span>
								<h3 className="font-bold text-xl text-blue-950 mb-3">{berita.judul}</h3>
								<p className="text-gray-600 text-sm mb-6 line-clamp-3">{berita.konten}</p>
								<Link href={`/berita/${berita.id}`} className="mt-auto text-teal-600 text-sm font-bold flex items-center gap-1 hover:underline">
									Baca Selengkapnya <ArrowRight size={16} />
								</Link>
							</div>
						))}
					</div>
				) : (
					<div className="bg-white/50 backdrop-blur-md p-12 rounded-3xl border border-white shadow-sm inline-block w-full max-w-2xl">
						<p className="text-gray-500 font-medium">Belum ada berita saat ini.</p>
					</div>
				)}
			</section>
			<Footer />
		</main>
	);
}
