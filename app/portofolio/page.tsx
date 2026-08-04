"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, GraduationCap, FileText, Lightbulb, Package } from "lucide-react";

// --- DATA DUMMY CAPSTONE ---
const capstoneData = {
	utama: {
		id: 1,
		tag: "Robotika",
		judul: "Unit Perakitan Mikro Otonom",
		deskripsi:
			"Pendekatan revolusioner pada manufaktur presisi tinggi, dikembangkan oleh fakultas teknik utama kami. Proyek ini mengurangi waktu perakitan hingga 40% sekaligus meningkatkan hasil produksi.",
		tim: "Dr. Alan Turing & Tim",
		gambar: "/project_1.jpg",
	},
	sampingan: [
		{ id: 2, tag: "Integrasi AI", judul: "AI Pemeliharaan Prediktif", link: "#" },
		{ id: 3, tag: "Teknologi Sensor", judul: "Sistem Lidar Kuantum", link: "#" },
	],
};

// --- DATA DUMMY SEMUA KARYA (Paten, Publikasi, Produk) ---
const allWorksData = [
	{
		id: 1,
		kategori: "paten",
		meta: "US-2023-112A",
		judul: "Mekanisme Aktuator Sendi Fleksibel",
		deskripsi:
			"Mekanisme sendi baru yang memungkinkan rotasi terus menerus 360 derajat dengan daya dan data terintegrasi.",
		gambar: "/portfolio_1.jpg",
	},
	{
		id: 2,
		kategori: "publikasi",
		meta: "IEEE, 2023",
		judul: "Kecerdasan Swarm dalam Logistik",
		deskripsi:
			"Mengeksplorasi algoritma pengambilan keputusan terdesentralisasi untuk manajemen armada dalam otomasi gudang.",
		gambar: "/portfolio_2.jpg",
	},
	{
		id: 3,
		kategori: "produk",
		meta: "Tersedia",
		judul: "SynergX Aero-Inspector",
		deskripsi:
			"Drone otonom dalam ruangan yang dirancang untuk pemindaian inventaris cepat dan inspeksi keamanan di ruang sempit.",
		gambar: "/portfolio_3.jpg",
	},
	{
		id: 4,
		kategori: "paten",
		meta: "EU-4452-B",
		judul: "Inti Unit Pemrosesan Neural",
		deskripsi:
			"Arsitektur NPU berdaya rendah yang dioptimalkan secara khusus untuk komputasi edge di platform robotika seluler.",
		gambar: "/portfolio_4.jpg",
	},
];

export default function PortofolioPage() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [activeFilter, setActiveFilter] = useState("semua");

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 50);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ id: "beranda", label: "Beranda", href: "/" },
		{ id: "layanan", label: "Layanan", href: "/layanan" },
		{ id: "tim", label: "Tim", href: "/tim" },
		{ id: "portofolio", label: "Portofolio", href: "/portofolio" },
		{ id: "berita", label: "Berita", href: "/berita" },
		{ id: "magang", label: "Magang", href: "/magang" },
	];

	const fadeInUp = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
	};

	const filteredWorks =
		activeFilter === "semua" ? allWorksData : allWorksData.filter((work) => work.kategori === activeFilter);

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans">
			{/* NAVBAR */}
			<nav
				className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md border-b border-white/40 py-3" : "bg-white/50 backdrop-blur-sm border-b border-white/20 py-5"}`}
			>
				<div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
					<Link href="/" className="flex items-center gap-2">
						<img src="/logo.png" alt="Logo" className="h-8 object-contain" />
						<span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">
							SynergX
						</span>
					</Link>
					<div className="hidden md:flex gap-6 text-sm font-semibold">
						{navLinks.map((item) => (
							<Link
								key={item.id}
								href={item.href}
								className={`transition-all duration-300 ${item.id === "portofolio" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-500 font-bold border-b-2 border-teal-500 scale-105" : "text-gray-500 hover:text-teal-500"}`}
							>
								{item.label}
							</Link>
						))}
					</div>
					<div className="hidden md:block">
						<Link
							href="/#kontak"
							className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all"
						>
							Hubungi Kami
						</Link>
					</div>
				</div>
			</nav>

			{/* HEADER SECTION */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="pt-40 pb-12 px-6 max-w-4xl mx-auto text-center"
			>
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-950 mb-6">
					Inovasi &{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">Penemuan</span>
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
					Jelajahi portofolio paten kami, publikasi terobosan baru, dan produk komersial yang direkayasa untuk masa
					depan otomatisasi.
				</p>
			</motion.section>

			{/* CAPSTONE DESIGN SECTION */}
			<motion.section initial="hidden" animate="visible" variants={fadeInUp} className="py-10 px-6 max-w-7xl mx-auto">
				<div className="flex items-center gap-3 mb-8">
					<GraduationCap className="text-teal-600" size={32} />
					<h2 className="text-3xl font-extrabold text-gray-900">Capstone Design</h2>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					<div className="lg:col-span-2 bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col group hover:-translate-y-1 transition-all">
						<div className="h-64 bg-gray-200 relative overflow-hidden">
							<img
								src={capstoneData.utama.gambar}
								alt="Capstone"
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div className="p-8 flex-1 flex flex-col justify-between">
							<div>
								<span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
									{capstoneData.utama.tag}
								</span>
								<h3 className="text-3xl font-extrabold text-blue-950 mb-4">{capstoneData.utama.judul}</h3>
								<p className="text-gray-600 leading-relaxed mb-6">{capstoneData.utama.deskripsi}</p>
							</div>
							<Link href="#" className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-2">
								{capstoneData.utama.tim} <ArrowRight size={16} />
							</Link>
						</div>
					</div>

					<div className="flex flex-col gap-6">
						{capstoneData.sampingan.map((item) => (
							<div
								key={item.id}
								className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl flex-1 flex flex-col justify-between group hover:-translate-y-1 transition-all"
							>
								<div>
									<span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
										{item.tag}
									</span>
									<h3 className="text-xl font-bold text-blue-950 mb-2 group-hover:text-teal-600 transition-colors">
										{item.judul}
									</h3>
								</div>
								<Link
									href={item.link}
									className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-2 mt-4"
								>
									Lihat Detail <ArrowRight size={14} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</motion.section>

			{/* FILTER & SEMUA KARYA SECTION */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				variants={fadeInUp}
				className="py-16 px-6 max-w-7xl mx-auto"
			>
				<div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
					<h2 className="text-3xl font-extrabold text-gray-900">Semua Karya</h2>

					<div className="bg-white/60 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-white/50 flex space-x-1">
						{[
							{ id: "semua", label: "Semua" },
							{ id: "paten", label: "Paten" },
							{ id: "publikasi", label: "Publikasi" },
							{ id: "produk", label: "Produk" },
						].map((tab) => (
							<button
								key={tab.id}
								onClick={() => setActiveFilter(tab.id)}
								className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
									activeFilter === tab.id
										? "bg-white text-blue-700 shadow-md scale-105"
										: "text-gray-500 hover:text-gray-800 hover:bg-white/40"
								}`}
							>
								{tab.label}
							</button>
						))}
					</div>
				</div>

				<motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
					<AnimatePresence>
						{filteredWorks.map((work) => (
							<motion.div
								key={work.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.3 }}
								className="bg-white/70 backdrop-blur-xl border border-white rounded-[2rem] shadow-lg hover:shadow-2xl overflow-hidden flex flex-col group"
							>
								<div className="h-40 bg-gray-200 relative overflow-hidden flex items-center justify-center">
									{work.kategori === "publikasi" ? (
										<FileText className="text-gray-400" size={48} />
									) : (
										<img
											src={work.gambar}
											alt={work.judul}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									)}
								</div>

								<div className="p-6 flex-1 flex flex-col">
									<div className="flex items-center justify-between mb-4">
										<span className="bg-gray-100 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
											{work.kategori}
										</span>
										<span className="text-gray-500 text-xs font-semibold">{work.meta}</span>
									</div>
									<h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{work.judul}</h3>
									<p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">{work.deskripsi}</p>

									<Link
										href="#"
										className="block text-center border-2 border-blue-100 text-blue-700 font-bold text-sm py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
									>
										{work.kategori === "publikasi"
											? "Baca Jurnal"
											: work.kategori === "produk"
												? "Halaman Produk"
												: "Lihat Detail"}
									</Link>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</motion.div>
			</motion.section>

			{/* FOOTER */}
			<footer className="relative bg-[url('/footer_image.jpg')] bg-cover bg-center bg-no-repeat mt-12">
				<div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/90 to-blue-900/80 backdrop-blur-md"></div>
				<div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white grid grid-cols-1 md:grid-cols-3 gap-16">
					<div className="space-y-6">
						<div className="flex items-center gap-3 mb-6">
							<img src="/logo.png" alt="Logo" className="h-12 object-contain brightness-0 invert" />
							<span className="font-extrabold text-3xl tracking-tight">SynergX</span>
						</div>
						<p className="text-gray-300 leading-relaxed">
							Mitra terpercaya Anda dalam merekayasa masa depan melalui solusi otomasi dan robotika.
						</p>
					</div>
					<div>
						<h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">Kontak Cepat</h3>
						<ul className="space-y-5 text-gray-300">
							<li className="flex items-start gap-4">
								<MapPin className="text-teal-400 shrink-0" size={24} />
								<p>
									Jl. Teknologi No. 123, Kawasan Inovasi
									<br />
									Kota Semarang
								</p>
							</li>
							<li className="flex items-center gap-4">
								<Phone className="text-teal-400 shrink-0" size={20} />
								<p>+62 812 3456 7890</p>
							</li>
							<li className="flex items-center gap-4">
								<Mail className="text-teal-400 shrink-0" size={20} />
								<p>info@synergx-robotics.com</p>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">Lokasi Kami</h3>
						<div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126715.79607412854!2d110.3398251347012!3d-6.993259877793392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x1e0432b9da5cb9f2!2sSemarang%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
								width="100%"
								height="100%"
								style={{ border: 0 }}
							></iframe>
						</div>
					</div>
				</div>
				<div className="relative z-10 border-t border-white/10 bg-black/40 text-center py-6 text-sm text-gray-400 font-medium">
					&copy; {new Date().getFullYear()} SynergX Robotics. Hak cipta dilindungi.
				</div>
			</footer>
		</main>
	);
}
