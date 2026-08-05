import { prisma } from "../../../lib/prisma";
import ClientNavigation from "../../components/ClientNavigation";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function PortofolioDetail({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	const id = parseInt(resolvedParams.id);
	if (isNaN(id)) notFound();

	const produk = await prisma.produk.findUnique({
		where: { id }
	});

	if (!produk) notFound();

	// Fetch previous and next items
	const prevItem = await prisma.produk.findFirst({
		where: { id: { lt: id } },
		orderBy: { id: 'desc' },
		select: { id: true, nama: true }
	});
	
	const nextItem = await prisma.produk.findFirst({
		where: { id: { gt: id } },
		orderBy: { id: 'asc' },
		select: { id: true, nama: true }
	});

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans pt-28">
			<ClientNavigation />
			
			<div className="max-w-4xl mx-auto px-6 mb-8">
				<Link href="/portofolio" className="inline-flex items-center gap-2 text-blue-600 hover:text-teal-600 font-bold transition-colors">
					<ArrowLeft size={18} /> Kembali ke Portofolio & Produk
				</Link>
			</div>

			<section className="px-6 pb-20 max-w-4xl mx-auto">
				<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
					{/* Header Image */}
					<div className="w-full h-64 md:h-96 bg-gray-200 relative">
						{produk.gambar ? (
							<img src={produk.gambar} alt={produk.nama} className="w-full h-full object-cover" />
						) : (
							<div className="w-full h-full flex items-center justify-center text-gray-500">Gambar tidak tersedia</div>
						)}
					</div>

					{/* Content */}
					<div className="p-8 md:p-12">
						<div className="flex items-center gap-4 mb-4">
							<span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1">
								<Tag size={14}/> {produk.kategori.replace('_', ' ')}
							</span>
							<span className="text-gray-500 text-sm flex items-center gap-1">
								<Calendar size={14} /> {produk.createdAt.toLocaleDateString("id-ID")}
							</span>
						</div>
						
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
							{produk.nama}
						</h1>
						
						<div className="prose prose-lg text-gray-700 max-w-none">
							<p className="whitespace-pre-wrap leading-relaxed">{produk.deskripsi}</p>
						</div>

						{/* Navigation Prev / Next */}
						<div className="grid grid-cols-2 gap-4 mt-12 border-t border-gray-100 pt-8">
							{prevItem ? (
								<Link href={`/portofolio/${prevItem.id}`} className="group flex flex-col p-4 bg-gray-50 rounded-2xl hover:bg-teal-50 transition-colors border border-transparent hover:border-teal-100">
									<span className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1"><ArrowLeft size={14}/> Sebelumnya</span>
									<span className="font-bold text-gray-900 group-hover:text-teal-700 line-clamp-2">{prevItem.nama}</span>
								</Link>
							) : <div></div>}
							
							{nextItem ? (
								<Link href={`/portofolio/${nextItem.id}`} className="group flex flex-col p-4 bg-gray-50 rounded-2xl hover:bg-teal-50 transition-colors text-right items-end border border-transparent hover:border-teal-100">
									<span className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">Selanjutnya <ArrowLeft size={14} className="rotate-180"/></span>
									<span className="font-bold text-gray-900 group-hover:text-teal-700 line-clamp-2">{nextItem.nama}</span>
								</Link>
							) : <div></div>}
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
