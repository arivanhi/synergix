"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ArrowRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- DATA DUMMY TESTIMONI (Nanti bisa diganti dari database CRM) ---
const testimoniData = [
	{
		id: 1,
		nama: "Budi Santoso",
		jabatan: "Manajer Operasional, TechCorp",
		teks: "SynergX telah merevolusi lini produksi kami dengan sistem otomasi yang luar biasa. Efisiensi meningkat drastis dan dukungan timnya sangat profesional. Inovasi yang patut diacungi jempol!",
		foto: "/avatar_testimoni.jpg", // Pastikan gambar ini ada di folder public
	},
	{
		id: 2,
		nama: "Siti Aminah",
		jabatan: "Direktur Inovasi, RoboSys",
		teks: "Sistem robotika yang diintegrasikan oleh SynergX sangat presisi. Kami berhasil memangkas biaya operasional hingga 40% dalam kuartal pertama. Sangat direkomendasikan!",
		foto: "/avatar_testimoni.jpg", // Ganti dengan foto lain jika ada
	},
	{
		id: 3,
		nama: "Andi Wijaya",
		jabatan: "CEO, MechMach",
		teks: "Layanan purna jual dan dukungan 24/7 dari tim SynergX benar-benar di luar ekspektasi kami. Mesin khusus (SPM) buatan mereka bekerja tanpa henti tanpa masalah.",
		foto: "/avatar_testimoni.jpg",
	},
];

export default function Home() {
	const [activeSection, setActiveSection] = useState("beranda");
	const [isScrolled, setIsScrolled] = useState(false);
	const [currentTesti, setCurrentTesti] = useState(0);

	// Auto-slide untuk Testimoni (Bergeser tiap 5 detik)
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTesti((prev) => (prev + 1) % testimoniData.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	// Deteksi Menu Scroll
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);

			const sections = ["beranda", "layanan", "tim", "portofolio", "berita", "produk", "mitra", "magang", "kontak"];
			const scrollPosition = window.scrollY + 200;

			for (const section of sections) {
				const element = document.getElementById(section);
				if (element) {
					const { offsetTop, offsetHeight } = element;
					if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
						setActiveSection(section);
					}
				}
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Struktur Menu Navigasi
	const navLinks = [
		{ id: "beranda", label: "Beranda", href: "/" },
		{ id: "layanan", label: "Layanan", href: "/layanan" },
		{ id: "tim", label: "Tim", href: "/tim" },
		{ id: "portofolio", label: "Portofolio", href: "/portofolio" },
		{ id: "berita", label: "Berita", href: "/berita" },
		{ id: "produk", label: "Produk", href: "/produk" },
		{ id: "magang", label: "Magang", href: "/magang" },
	];

	// Konfigurasi Animasi Halus
	const fadeInUp = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
	};

	const nextTesti = () => setCurrentTesti((prev) => (prev + 1) % testimoniData.length);
	const prevTesti = () => setCurrentTesti((prev) => (prev === 0 ? testimoniData.length - 1 : prev - 1));

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans overflow-hidden">
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
								className={`transition-all duration-300 ${
									activeSection === item.id
										? "text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-500 font-bold scale-105"
										: "text-gray-500 hover:text-teal-500"
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>

					<div className="hidden md:block">
						<Link
							href="#kontak"
							className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all inline-block"
						>
							Hubungi Kami
						</Link>
					</div>
				</div>
			</nav>

			{/* 1. HERO SECTION */}
			<motion.section
				id="beranda"
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12"
			>
				<div className="flex-1 space-y-6">
					<p className="text-teal-600 font-bold tracking-widest text-sm uppercase">Solusi Teknologi</p>
					<h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
						Merekayasa <br />
						<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">
							Masa Depan Robotika
						</span>
					</h1>
					<p className="text-gray-600 text-lg max-w-lg leading-relaxed">
						Menghadirkan solusi otomatisasi mutakhir untuk meningkatkan efisiensi, akurasi, dan masa depan industri yang
						berkelanjutan.
					</p>
					<div className="flex gap-4 pt-4">
						<Link
							href="/layanan"
							className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-7 py-3.5 rounded-full font-bold shadow-lg hover:-translate-y-1 transition-all"
						>
							Eksplorasi Solusi
						</Link>
					</div>
				</div>
				<div className="flex-1">
					<div className="bg-white/40 backdrop-blur-lg p-4 rounded-3xl border border-white shadow-2xl">
						<img src="/hero_image.png" alt="Robot Arm" className="w-full h-auto rounded-2xl object-cover" />
					</div>
				</div>
			</motion.section>

			{/* 2. LAYANAN KAMI */}
			<motion.section
				id="layanan"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-20 px-6"
			>
				<div className="max-w-7xl mx-auto text-center">
					<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4 inline-block">
						Layanan Kami
					</h2>
					<p className="text-gray-500 mb-12 max-w-2xl mx-auto">
						Berbagai solusi teknologi yang kami tawarkan untuk merevolusi lini industri Anda.
					</p>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{[1, 2, 3].map((item) => (
							<div
								key={item}
								className="bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl hover:-translate-y-2 transition-all duration-300 text-left group"
							>
								<div className="bg-gradient-to-br from-gray-200 to-gray-300 w-full h-48 rounded-2xl mb-6 object-cover overflow-hidden">
									<img
										src={`/service_${item}.jpg`}
										alt="Service"
										className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
									/>
								</div>
								<h3 className="text-xl font-bold text-blue-950 mb-2">Layanan Otomasi {item}</h3>
								<p className="text-gray-600 text-sm leading-relaxed mb-4">
									Sistem integrasi robotika untuk mempercepat alur kerja dan meminimalisir error di lantai produksi.
								</p>
								<Link
									href="/layanan"
									className="text-teal-600 font-bold hover:underline flex items-center gap-1 text-sm"
								>
									Pelajari Lebih Lanjut <ArrowRight size={16} />
								</Link>
							</div>
						))}
					</div>
				</div>
			</motion.section>

			{/* 3. TIM AHLI */}
			<motion.section
				id="tim"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-20 px-6 max-w-7xl mx-auto text-center"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">
					Tim Ahli Kami
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
					{[1, 2, 3, 4].map((item) => (
						<div
							key={item}
							className="bg-white/60 backdrop-blur-md border border-white shadow-lg p-8 rounded-3xl flex flex-col items-center hover:shadow-2xl transition-all"
						>
							<div className="w-24 h-24 bg-gradient-to-tr from-blue-900 to-teal-400 rounded-full mb-5 p-1">
								<img
									src={`/team_${item}.jpg`}
									alt="Tim"
									className="w-full h-full object-cover rounded-full border-2 border-white"
								/>
							</div>
							<h4 className="font-bold text-gray-900 text-lg">Nama Anggota</h4>
							<p className="text-teal-600 text-sm font-semibold mb-4">Ketua Peneliti</p>

							{/* Tombol Lihat Profil yang terhubung ke halaman dinamis */}
							<Link
								href={`/tim/${item}`}
								className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-1 mt-auto"
							>
								Lihat Profil <ArrowRight size={16} />
							</Link>
						</div>
					))}
				</div>
			</motion.section>

			{/* 4. PORTOFOLIO */}
			<motion.section
				id="portofolio"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={fadeInUp}
				className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-50/50 text-center"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">
					Portofolio & Capstone
				</h2>
				<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
					{[1, 2, 3].map((item) => (
						<div
							key={item}
							className="bg-white/80 backdrop-blur-lg p-5 border border-white shadow-xl rounded-3xl text-left hover:-translate-y-2 transition-all"
						>
							<div className="bg-gray-300 w-full h-48 rounded-2xl mb-5 overflow-hidden">
								<img src={`/project_${item}.jpg`} alt="Project" className="w-full h-full object-cover" />
							</div>
							<h3 className="font-bold text-lg text-blue-950">Capstone Desain {item}</h3>
							<Link href="#" className="text-teal-600 text-sm font-bold flex items-center gap-1 mt-3 hover:underline">
								Lihat Detail <ArrowRight size={16} />
							</Link>
						</div>
					))}
				</div>
			</motion.section>

			{/* 5. BERITA */}
			<motion.section
				id="berita"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="py-20 px-6 max-w-7xl mx-auto text-center border-t border-teal-100/50"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4">
					Berita Terbaru
				</h2>
				<p className="text-gray-500 mb-8">Ikuti perkembangan riset dan inovasi terbaru dari tim kami.</p>
				<div className="h-32 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white shadow-sm">
					<p className="text-gray-400 font-medium">Data berita akan dimuat dari database CRM...</p>
				</div>
			</motion.section>

			{/* 6. PRODUK */}
			<motion.section
				id="produk"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="py-20 px-6 bg-white/30 text-center"
			>
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4">
					Katalog Produk & Paten
				</h2>
				<p className="text-gray-500 mb-8">Hasil produk inovasi siap pakai dan paten teknologi kami.</p>
				<div className="max-w-7xl mx-auto h-32 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white shadow-sm">
					<p className="text-gray-400 font-medium">Data produk akan dimuat dari database CRM...</p>
				</div>
			</motion.section>

			{/* 7. MITRA & KLIEN */}
			<motion.section
				id="mitra"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="pt-20 pb-10 border-t border-teal-100/50 bg-white/40 backdrop-blur-sm"
			>
				<div className="max-w-7xl mx-auto px-6 text-center">
					<h2 className="text-sm font-bold text-teal-600 tracking-widest uppercase mb-8">
						Dipercaya Oleh Mitra Industri
					</h2>
					<div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
						<span className="text-2xl font-black font-serif text-blue-900">TECHCORP</span>
						<span className="text-2xl font-black font-sans text-blue-900">ROBOSYS</span>
						<span className="text-2xl font-black font-mono text-blue-900">MECHMACH</span>
						<span className="text-2xl font-black text-blue-900 tracking-tighter">AI-AUTOM</span>
					</div>
				</div>
			</motion.section>

			{/* 8. TESTIMONI SLIDER */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="py-16 px-6 relative overflow-hidden"
			>
				{/* Latar Belakang Gradasi Halus */}
				<div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl -z-10"></div>
				<div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

				<div className="max-w-4xl mx-auto relative group">
					<div className="text-center bg-white/60 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-white/80 relative min-h-[350px] flex flex-col justify-center">
						<Quote className="mx-auto text-blue-900/20 mb-6 absolute top-10 left-1/2 -translate-x-1/2" size={80} />

						{/* Wrapper Animasi Pergantian Testimoni */}
						<AnimatePresence mode="wait">
							<motion.div
								key={currentTesti}
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								transition={{ duration: 0.4 }}
								className="relative z-10 pt-8"
							>
								<p className="text-xl md:text-2xl text-gray-800 font-medium italic my-4 leading-relaxed">
									"{testimoniData[currentTesti].teks}"
								</p>
								<div className="flex flex-col items-center gap-3 mt-8">
									<div className="w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-xl">
										<img src={testimoniData[currentTesti].foto} alt="Avatar" className="w-full h-full object-cover" />
									</div>
									<div>
										<h4 className="font-bold text-blue-950 text-lg">{testimoniData[currentTesti].nama}</h4>
										<p className="text-xs text-teal-600 font-bold">{testimoniData[currentTesti].jabatan}</p>
									</div>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Tombol Navigasi Slider */}
					<button
						onClick={prevTesti}
						className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-teal-600 hover:bg-teal-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
					>
						<ChevronLeft size={24} />
					</button>
					<button
						onClick={nextTesti}
						className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-lg border border-gray-100 text-teal-600 hover:bg-teal-50 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
					>
						<ChevronRight size={24} />
					</button>

					{/* Indikator Titik (Dots) */}
					<div className="flex justify-center gap-2 mt-6">
						{testimoniData.map((_, index) => (
							<button
								key={index}
								onClick={() => setCurrentTesti(index)}
								className={`w-2 h-2 rounded-full transition-all ${index === currentTesti ? "bg-teal-500 w-6" : "bg-gray-300"}`}
							/>
						))}
					</div>
				</div>
			</motion.section>

			{/* 9. MAGANG SMK */}
			<motion.section
				id="magang"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="py-20 px-6 max-w-6xl mx-auto"
			>
				<div className="bg-gradient-to-br from-blue-900 to-teal-600 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden text-white">
					<div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
					<div className="flex-1 relative z-10">
						<h2 className="text-3xl md:text-4xl font-extrabold mb-4">Program Magang SMK</h2>
						<p className="text-blue-100 leading-relaxed text-lg font-medium">
							Kami membuka kesempatan emas bagi siswa-siswi SMK untuk terjun langsung ke industri robotika dan otomasi.
						</p>
					</div>
					<div className="relative z-10">
						<button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-extrabold shadow-xl hover:scale-105 transition-all">
							Daftar Magang Sekarang
						</button>
					</div>
				</div>
			</motion.section>

			{/* 10. FOOTER */}
			<footer id="kontak" className="relative bg-[url('/footer_image.jpg')] bg-cover bg-center bg-no-repeat mt-12">
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
									Kota Semarang, Jawa Tengah 50123
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
					&copy; {new Date().getFullYear()} SynergX Robotics. Hak Cipta Dilindungi.
				</div>
			</footer>
		</main>
	);
}
