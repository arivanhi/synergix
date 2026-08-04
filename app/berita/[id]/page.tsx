import { prisma } from "../../../lib/prisma";
import ClientNavigation from "../../components/ClientNavigation";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function BeritaDetail({ params }: { params: Promise<{ id: string }> }) {
	const resolvedParams = await params;
	const id = parseInt(resolvedParams.id);
	if (isNaN(id)) notFound();

	const berita = await prisma.berita.findUnique({
		where: { id }
	});

	if (!berita) notFound();

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans pt-28">
			<ClientNavigation />
			
			<div className="max-w-4xl mx-auto px-6 mb-8">
				<Link href="/berita" className="inline-flex items-center gap-2 text-blue-600 hover:text-teal-600 font-bold transition-colors">
					<ArrowLeft size={18} /> Kembali ke Berita
				</Link>
			</div>

			<section className="px-6 pb-20 max-w-4xl mx-auto">
				<div className="bg-white rounded-3xl shadow-xl overflow-hidden">
					{/* Header Image */}
					{berita.gambar && (
						<div className="w-full h-64 md:h-96 bg-gray-200 relative">
							<img src={berita.gambar} alt={berita.judul} className="w-full h-full object-cover" />
						</div>
					)}

					{/* Content */}
					<div className="p-8 md:p-12">
						<div className="flex items-center gap-4 mb-4">
							<span className="text-gray-500 text-sm flex items-center gap-1 font-medium bg-gray-100 px-3 py-1 rounded-full">
								<Calendar size={14} /> {berita.createdAt.toLocaleDateString("id-ID")}
							</span>
						</div>
						
						<h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
							{berita.judul}
						</h1>
						
						<div className="prose prose-lg text-gray-700 max-w-none">
							<p className="whitespace-pre-wrap leading-relaxed">{berita.konten}</p>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
