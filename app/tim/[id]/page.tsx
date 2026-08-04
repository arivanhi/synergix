"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Phone, Mail, User, BookOpen, FlaskConical, Calendar, ExternalLink } from "lucide-react";

// --- DATA DUMMY (Akan digantikan oleh data dari database CRM Prisma nanti) ---
const profilData = {
	nama: "Prof. Dr. Ir. Alan Turing",
	jabatan: "Peneliti AI Utama",
	gelar: "MSc., PhD dalam Robotika Kognitif",
	pengalaman: "15+ Tahun",
	paten: "24 Terdaftar",
	jumlahPublikasi: "100+ Sitasi",
	lokasi: "Pusat Riset, SMG",
	biografi:
		"Prof. Turing membawa lebih dari 15 tahun penelitian perintis dalam robotika kognitif dan integrasi machine learning untuk otomasi industri. Sebelum bergabung dengan SynergX, beliau memimpin Laboratorium Otomasi Lanjutan. Visinya adalah menciptakan sistem robotika yang tidak hanya melakukan tugas dengan presisi absolut, tetapi juga mampu belajar dan beradaptasi dengan lingkungan operasional yang sepenuhnya baru.",
	riset: [
		{
			judul: "Project NeuralWeave",
			desc: "Mengembangkan protokol edge-computing untuk swarm robotics, memungkinkan pemrosesan kolaboratif real-time tanpa pemrosesan terpusat.",
			tags: ["Swarm AI", "Edge Computing"],
		},
		{
			judul: "OpticGrip Initiative",
			desc: "Meningkatkan umpan balik loop sensor taktil menggunakan model deep learning berbasis visi untuk penanganan material rapuh.",
			tags: ["Computer Vision"],
		},
	],
	publikasi: [
		{ judul: "Adaptive Actuation in Unstructured Environments", jurnal: "Journal of Cognitive Robotics, 2023" },
		{ judul: "Neural Symbiosis for Human-Robot Collaboration", jurnal: "IEEE Transactions on Automation, 2022" },
	],
	foto: "/team_2.jpg",
};

export default function ProfilDetail() {
	const params = useParams();
	const [isScrolled, setIsScrolled] = useState(false);

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
								className={`transition-all duration-300 ${item.id === "tim" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-500 font-bold border-b-2 border-teal-500 scale-105" : "text-gray-500 hover:text-teal-500"}`}
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

			{/* BACK BUTTON */}
			<div className="pt-32 pb-6 px-6 max-w-7xl mx-auto">
				<Link
					href="/tim"
					className="inline-flex items-center gap-2 text-blue-700 font-bold hover:text-teal-600 transition-colors"
				>
					<ArrowLeft size={20} /> Kembali ke Tim
				</Link>
			</div>

			{/* KONTEN PROFIL */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"
			>
				{/* KOLOM KIRI (Foto Besar) */}
				<div className="col-span-1">
					<div className="relative w-full aspect-[3/4] md:aspect-square lg:aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
						<img src={profilData.foto} alt={profilData.nama} className="w-full h-full object-cover" />
						{/* Overlay Gradasi & Teks Bawah */}
						<div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-900/40 to-transparent flex flex-col justify-end p-8 text-white">
							<span className="bg-cyan-400/20 backdrop-blur-md text-cyan-200 text-xs font-bold px-3 py-1.5 rounded-full mb-3 w-max border border-cyan-400/30">
								{profilData.jabatan}
							</span>
							<h1 className="text-3xl font-extrabold mb-1">{profilData.nama}</h1>
							<p className="text-gray-300 text-sm font-medium">{profilData.gelar}</p>
						</div>
					</div>
				</div>

				{/* KOLOM KANAN (Informasi Detail & Bento Grid) */}
				<div className="col-span-1 lg:col-span-2 space-y-8">
					{/* Biografi & Statistik */}
					<div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all">
						<div className="flex items-center gap-3 mb-4 text-blue-700">
							<User size={24} />
							<h2 className="text-xl font-bold">Biografi</h2>
						</div>
						<p className="text-gray-600 leading-relaxed mb-8">{profilData.biografi}</p>

						{/* Statistik */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-blue-100 pt-6">
							<div>
								<p className="text-gray-500 text-xs font-bold uppercase mb-1">Pengalaman</p>
								<p className="text-blue-700 font-extrabold">{profilData.pengalaman}</p>
							</div>
							<div>
								<p className="text-gray-500 text-xs font-bold uppercase mb-1">Paten</p>
								<p className="text-blue-700 font-extrabold">{profilData.paten}</p>
							</div>
							<div>
								<p className="text-gray-500 text-xs font-bold uppercase mb-1">Publikasi</p>
								<p className="text-blue-700 font-extrabold">{profilData.jumlahPublikasi}</p>
							</div>
							<div>
								<p className="text-gray-500 text-xs font-bold uppercase mb-1">Lokasi</p>
								<p className="text-blue-700 font-extrabold">{profilData.lokasi}</p>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						{/* Riset Berjalan */}
						<div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all h-full">
							<div className="flex items-center gap-3 mb-6 text-teal-600">
								<FlaskConical size={24} />
								<h2 className="text-xl font-bold">Riset Berjalan</h2>
							</div>
							<ul className="space-y-6">
								{profilData.riset.map((item, idx) => (
									<li
										key={idx}
										className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2.5 before:h-2.5 before:bg-cyan-400 before:rounded-full"
									>
										<h3 className="font-bold text-gray-900 mb-1">{item.judul}</h3>
										<p className="text-gray-600 text-sm leading-relaxed mb-3">{item.desc}</p>
										<div className="flex flex-wrap gap-2">
											{item.tags.map((tag) => (
												<span
													key={tag}
													className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full border border-blue-100"
												>
													{tag}
												</span>
											))}
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* Kolom Publikasi & Kontak */}
						<div className="flex flex-col gap-8 h-full">
							{/* Publikasi Terbaru */}
							<div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all flex-1">
								<div className="flex items-center gap-3 mb-6 text-blue-700">
									<BookOpen size={24} />
									<h2 className="text-xl font-bold">Publikasi Terbaru</h2>
								</div>
								<ul className="space-y-5">
									{profilData.publikasi.map((item, idx) => (
										<li key={idx} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
											<h3 className="font-bold text-gray-900 text-sm mb-1 leading-snug">{item.judul}</h3>
											<p className="text-gray-500 text-xs">{item.jurnal}</p>
										</li>
									))}
								</ul>
							</div>

							{/* Kontak Personal */}
							<div className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl hover:shadow-2xl transition-all">
								<div className="flex items-center gap-3 mb-5 text-blue-700">
									<Mail size={24} />
									<h2 className="text-xl font-bold">Kontak</h2>
								</div>
								<ul className="space-y-4">
									<li>
										<Link
											href="#"
											className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition-colors text-sm font-medium"
										>
											<Mail size={18} className="text-teal-500" /> a.turing@synergx-robotics.com
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition-colors text-sm font-medium"
										>
											<ExternalLink size={18} className="text-teal-500" /> Profil LinkedIn
										</Link>
									</li>
									<li>
										<Link
											href="#"
											className="flex items-center gap-3 text-gray-600 hover:text-teal-600 transition-colors text-sm font-medium"
										>
											<Calendar size={18} className="text-teal-500" /> Jadwalkan Konsultasi Riset
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
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
								src="https://www.google.com/maps/embed?..."
								width="100%"
								height="100%"
								style={{ border: 0 }}
							></iframe>
						</div>
					</div>
				</div>
				<div className="relative z-10 border-t border-white/10 bg-black/40 text-center py-6 text-sm text-gray-400 font-medium">
					&copy; {new Date().getFullYear()} SynergX Robotics.
				</div>
			</footer>
		</main>
	);
}
