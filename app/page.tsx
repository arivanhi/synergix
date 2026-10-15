import { getSiteContent } from "../lib/content";
import Link from "next/link";
import { BookOpen, Users, Cpu, FileText, ChevronRight, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import ClientNavigation from "./components/ClientNavigation";
import Footer from "./components/Footer";
import TestimonialSlider from "./components/TestimonialSlider";
import { prisma } from "../lib/prisma";

export const dynamic = 'force-dynamic';

export default async function Home() {
	const content = await getSiteContent();
	// Fetch data from database
	const beritaData = await prisma.berita.findMany({
		orderBy: { createdAt: "desc" },
		take: 3, // Tampilkan 3 berita terbaru
	});

	const produkData = await prisma.produk.findMany({
		where: { kategori: { in: ["PRODUK_BUATAN", "PATEN"] } },
		take: 3,
	});

	const layananData = await prisma.layanan.findMany({
		take: 3,
		orderBy: { createdAt: "asc" }
	});

	const capstoneData = await prisma.produk.findMany({
		where: { kategori: "CAPSTONE_DESIGN" },
		take: 3,
	});

	const timData = await prisma.keanggotaan.findMany({
		take: 4,
	});

	const testimoniData = await prisma.testimoni.findMany({
		where: { status: "DISETUJUI" },
		orderBy: { createdAt: "desc" },
	});

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans overflow-hidden">
			{/* NAVBAR (Client Component) */}
			<ClientNavigation />

			{/* 1. HERO SECTION */}
			<section
				id="beranda"
				className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12"
			>
				<div className="flex-1 space-y-6">
					<p className="text-teal-600 font-bold tracking-widest text-sm uppercase">{content.values["page_1"]}</p>
					<h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">{content.values["page_2"]}<br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">{content.values["page_3"]}</span>
					</h1>
					<p className="text-gray-600 text-lg max-w-lg leading-relaxed">{content.values["page_4"]}</p>
					<div className="flex gap-4 pt-4">
						<Link
							href={content.values.hero_link}
							className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-7 py-3.5 rounded-full font-bold shadow-lg hover:-translate-y-1 transition-all inline-block"
						>{content.values["page_5"]}</Link>
					</div>
				</div>
				<div className="flex-1">
					<div className="bg-white/40 backdrop-blur-lg p-4 rounded-3xl border border-white shadow-2xl">
						<img src={content.values["page_6"]} alt={content.values["page_7"]} className="w-full h-auto rounded-2xl object-cover" />
					</div>
				</div>
			</section>

			{/* 2. LAYANAN KAMI */}
			<section
				id="layanan"
				className="py-20 px-6"
			>
				<div className="max-w-7xl mx-auto text-center">
					<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4 inline-block">{content.values["page_8"]}</h2>
					<p className="text-gray-500 mb-12 max-w-2xl mx-auto">{content.values["page_9"]}</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{layananData.map((item) => (
							<div
								key={item.id}
								className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition-all duration-300 text-left group"
							>
								{item.gambar && (
									<div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full h-48 rounded-2xl mb-6 object-cover overflow-hidden">
										<img
											src={item.gambar}
											alt={item.judul}
											className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
										/>
									</div>
								)}
								<h3 className="text-xl font-bold text-blue-950 mb-2">{item.judul}</h3>
								<p className="text-gray-600 text-sm leading-relaxed mb-4">
									{item.deskripsi}
								</p>
								<Link
									href="/layanan"
									className="text-teal-600 font-bold hover:underline flex items-center gap-1 text-sm"
								>{content.values["page_10"]}<ArrowRight size={16} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 3. TIM AHLI */}
			<section
				id="tim"
				className="py-20 px-6 max-w-7xl mx-auto text-center"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">{content.values["page_11"]}</h2>
				{timData.length > 0 ? (
					<div className="flex flex-wrap justify-center gap-6">
						{timData.map((anggota) => (
							<div
								key={anggota.id}
								className="w-full sm:w-64 bg-white/60 backdrop-blur-md border border-white shadow-lg p-8 rounded-3xl flex flex-col items-center hover:shadow-2xl transition-all"
							>
								<div className="w-24 h-24 bg-gradient-to-tr from-blue-900 to-teal-400 rounded-full mb-5 p-1">
									{anggota.foto ? (
										<img
											src={anggota.foto}
											alt={anggota.nama}
											className="w-full h-full object-cover rounded-full border-2 border-white"
										/>
									) : (
										<div className="w-full h-full rounded-full border-2 border-white bg-gray-200" />
									)}
								</div>
								<h4 className="font-bold text-gray-900 text-lg text-center leading-tight mb-1">{anggota.nama}</h4>
								<p className="text-teal-600 text-sm font-semibold mb-4 text-center">{anggota.jabatan || anggota.peran.replace('_', ' ')}</p>

								<Link
									href={`/tim/${anggota.id}`}
									className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-1 mt-auto"
								>{content.values["page_12"]}<ArrowRight size={16} />
								</Link>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500">{content.values["page_13"]}</p>
				)}
			</section>

			{/* 4. PORTOFOLIO / CAPSTONE */}
			<section
				id="portofolio"
				className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-50/50 text-center"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">{content.values["page_14"]}</h2>
				{capstoneData.length > 0 ? (
					<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
						{capstoneData.map((capstone) => (
							<div
								key={capstone.id}
								className="bg-white/80 backdrop-blur-lg p-5 border border-white shadow-xl rounded-3xl text-left hover:-translate-y-2 transition-all"
							>
								<div className="bg-gray-300 w-full h-48 rounded-2xl mb-5 overflow-hidden">
									{capstone.gambar ? (
										<img src={capstone.gambar} alt={capstone.nama} className="w-full h-full object-cover" />
									) : (
										<div className="w-full h-full flex items-center justify-center text-gray-500">{content.values["page_15"]}</div>
									)}
								</div>
								<h3 className="font-bold text-lg text-blue-950">{capstone.nama}</h3>
								<Link href={`/portofolio/${capstone.id}`} className="text-teal-600 text-sm font-bold flex items-center gap-1 mt-3 hover:underline">{content.values["page_16"]}<ArrowRight size={16} />
								</Link>
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500">{content.values["page_17"]}</p>
				)}
			</section>

			{/* 5. BERITA */}
			<section
				id="berita"
				className="py-20 px-6 max-w-7xl mx-auto text-center border-t border-teal-100/50"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4">{content.values["page_18"]}</h2>
				<p className="text-gray-500 mb-8">{content.values["page_19"]}</p>
				{beritaData.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
						{beritaData.map((berita) => (
							<div key={berita.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-left">
								{berita.gambar && (
									<img src={berita.gambar} alt={berita.judul} className="w-full h-40 object-cover rounded-xl mb-4" />
								)}
								<h3 className="font-bold text-lg mb-2 text-gray-900">{berita.judul}</h3>
								<p className="text-gray-600 text-sm mb-4 line-clamp-3">{berita.konten}</p>
								<Link href={`/berita/${berita.id}`} className="text-blue-600 text-sm font-semibold hover:underline">{content.values["page_20"]}</Link>
							</div>
						))}
					</div>
				) : (
					<div className="h-32 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white shadow-sm">
						<p className="text-gray-400 font-medium">{content.values["page_21"]}</p>
					</div>
				)}
			</section>

			{/* 6. PRODUK */}
			<section
				id="produk"
				className="py-20 px-6 bg-white/30 text-center"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4">{content.values["page_22"]}</h2>
				<p className="text-gray-500 mb-8">{content.values["page_23"]}</p>
				{produkData.length > 0 ? (
					<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
						{produkData.map((produk) => (
							<div key={produk.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 text-left">
								{produk.gambar && (
									<img src={produk.gambar} alt={produk.nama} className="w-full h-40 object-cover rounded-xl mb-4" />
								)}
								<span className="text-xs font-bold bg-teal-100 text-teal-700 px-2 py-1 rounded mb-2 inline-block">
									{produk.kategori}
								</span>
								<h3 className="font-bold text-lg mb-2 text-gray-900">{produk.nama}</h3>
								<p className="text-gray-600 text-sm mb-4 line-clamp-2">{produk.deskripsi}</p>
								<Link href={`/portofolio/${produk.id}`} className="text-blue-600 text-sm font-semibold hover:underline">{content.values["page_24"]}</Link>
							</div>
						))}
					</div>
				) : (
					<div className="max-w-7xl mx-auto h-32 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white shadow-sm">
						<p className="text-gray-400 font-medium">{content.values["page_25"]}</p>
					</div>
				)}
			</section>

			{/* 7. MITRA & KLIEN */}
			<section
				id="mitra"
				className="pt-20 pb-10 border-t border-teal-100/50 bg-white/40 backdrop-blur-sm"
			>
				<div className="max-w-7xl mx-auto px-6 text-center">
					<h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-8">{content.values["page_26"]}</h2>
					<div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
						{content.partners.map((partner, index) => {
              const classes = ["text-2xl font-black font-serif text-blue-900", "text-2xl font-black font-sans text-blue-900", "text-2xl font-black font-mono text-blue-900", "text-2xl font-black text-blue-900 tracking-tighter"];
              const logo = partner.logo ? <img src={partner.logo} alt={partner.nama} className="h-12 max-w-40 object-contain" /> : <span className={classes[index % classes.length]}>{partner.nama}</span>;
              return partner.url ? <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer">{logo}</a> : <div key={index}>{logo}</div>;
            })}
          </div>
				</div>
			</section>

			{/* 8. TESTIMONI SLIDER (Client Component) */}
			<section className="py-16 px-6 relative overflow-hidden">
				<div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -z-10"></div>
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>
				<TestimonialSlider testimoniData={testimoniData} />
			</section>

			{/* 9. MAGANG SMK */}
			<section
				id="magang"
				className="py-20 px-6 max-w-6xl mx-auto"
			>
				<div className="bg-gradient-to-br from-blue-900 to-teal-600 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden text-white">
					<div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
					<div className="flex-1 relative z-10">
						<h2 className="text-3xl md:text-4xl font-extrabold mb-4">{content.values["page_31"]}</h2>
						<p className="text-blue-100 leading-relaxed text-lg font-medium">{content.values["page_32"]}</p>
					</div>
					<div className="relative z-10">
						<Link href="/magang" className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-extrabold shadow-xl hover:scale-105 transition-all inline-block">{content.values["page_33"]}</Link>
					</div>
				</div>
			</section>

			{/* 10. FOOTER */}
			<Footer />
		</main>
	);
}
