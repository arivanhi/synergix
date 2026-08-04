"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// --- DATA DUMMY (Sesuai Skema Prisma Keanggotaan) ---
const pimpinanData = [
	{
		id: 1,
		nama: "Dr. Aris Munandar",
		jabatan: "Ketua Peneliti Utama",
		desc: "Spesialisasi dalam sistem kendali lanjutan dan navigasi otonom untuk aplikasi robotika industri.",
		foto: "/team_1.jpg",
	},
	{
		id: 2,
		nama: "Prof. Dr. Ir. Alan Turing",
		jabatan: "Peneliti AI Utama",
		desc: "Merintis model machine learning untuk pemeliharaan prediktif dan pengambilan keputusan real-time.",
		foto: "/team_2.jpg",
	},
];

const anggotaData = [
	{ id: 3, nama: "Budi Santoso", jabatan: "Insinyur Robotika", foto: "/team_3.jpg" },
	{ id: 4, nama: "Siti Aminah", jabatan: "Spesialis AI", foto: "/team_4.jpg" },
	{ id: 5, nama: "Ahmad Fauzi", jabatan: "Ketua Perangkat Keras", foto: "/team_1.jpg" },
];

export default function TimPage() {
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

			{/* HEADER SECTION */}
			<motion.section
				initial="hidden"
				animate="visible"
				variants={fadeInUp}
				className="pt-40 pb-12 px-6 max-w-4xl mx-auto text-center"
			>
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-950 mb-6">
					Mengenal Tim Ahli{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">SynergX</span>
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed">
					Tim Pusat Robotika Digital membawa keahlian kelas dunia dalam AI, teknik mesin, dan arsitektur perangkat lunak
					untuk merintis masa depan otomasi industri.
				</p>
			</motion.section>

			{/* PIMPINAN PENELITI (FACULTY ADVISORS) */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="py-10 px-6 max-w-6xl mx-auto"
			>
				<h2 className="text-3xl font-extrabold text-blue-700 text-center mb-10">Pimpinan Peneliti</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{pimpinanData.map((person) => (
						<div
							key={person.id}
							className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
						>
							<div className="w-32 h-32 shrink-0 bg-gray-200 rounded-full overflow-hidden shadow-inner border-4 border-white">
								<img src={person.foto} alt={person.nama} className="w-full h-full object-cover" />
							</div>
							<div className="text-center sm:text-left">
								<h3 className="text-2xl font-bold text-gray-900 mb-2">{person.nama}</h3>
								<span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
									{person.jabatan}
								</span>
								<p className="text-gray-600 text-sm leading-relaxed mb-4">{person.desc}</p>
								<Link
									href={`/tim/${person.id}`}
									className="text-teal-600 font-bold text-sm hover:underline flex items-center justify-center sm:justify-start gap-1"
								>
									Lihat Profil <ArrowRight size={16} />
								</Link>
							</div>
						</div>
					))}
				</div>
			</motion.section>

			{/* ANGGOTA PERISET (STUDENT RESEARCHERS) */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="py-16 px-6 max-w-6xl mx-auto"
			>
				<h2 className="text-3xl font-extrabold text-blue-700 text-center mb-10">Anggota Periset</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{anggotaData.map((person) => (
						<div
							key={person.id}
							className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all"
						>
							<div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden shadow-inner border-4 border-white mb-6">
								<img src={person.foto} alt={person.nama} className="w-full h-full object-cover" />
							</div>
							<h3 className="text-xl font-bold text-gray-900 mb-2">{person.nama}</h3>
							<span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-5">
								{person.jabatan}
							</span>
							<Link
								href={`/tim/${person.id}`}
								className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-1"
							>
								Lihat Profil <ArrowRight size={16} />
							</Link>
						</div>
					))}
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
