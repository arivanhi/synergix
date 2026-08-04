"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, Award, GraduationCap, Users, School, UploadCloud } from "lucide-react";

export default function MagangPage() {
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
								className={`transition-all duration-300 ${item.id === "magang" ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-500 font-bold border-b-2 border-teal-500 scale-105" : "text-gray-500 hover:text-teal-500"}`}
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
				className="pt-40 pb-12 px-6 max-w-4xl mx-auto text-center flex flex-col items-center"
			>
				<span className="bg-cyan-100 text-cyan-800 text-xs font-extrabold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider shadow-sm border border-cyan-200">
					Program Magang SMK 2026
				</span>
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-950 mb-6">
					Mulai Karir{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">
						Robotika Anda
					</span>
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed max-w-2xl">
					Bergabunglah dengan program magang industri SynergX yang dirancang khusus untuk siswa Sekolah Menengah
					Kejuruan (SMK). Dapatkan pengalaman praktis dengan teknologi otomatisasi mutakhir.
				</p>
			</motion.section>

			{/* WHY INTERN SECTION (BENTO GRID) */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				variants={fadeInUp}
				className="py-10 px-6 max-w-6xl mx-auto"
			>
				<h2 className="text-3xl font-extrabold text-blue-950 text-center mb-10">Mengapa Magang Bersama Kami?</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Card 1: Real Equipment (Besar) */}
					<div className="md:col-span-2 relative h-72 md:h-80 bg-gray-200 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white group">
						<img
							src="/service_mesin.jpg"
							alt="Peralatan Industri"
							className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-900/40 to-transparent flex flex-col justify-end p-8 text-white">
							<div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/30">
								<span className="text-xl">⚙️</span>
							</div>
							<h3 className="text-2xl font-extrabold mb-2">Peralatan Industri Nyata</h3>
							<p className="text-gray-200 text-sm leading-relaxed max-w-md">
								Bekerja langsung dengan sistem otomatisasi yang sama dengan yang digunakan oleh perusahaan manufaktur
								terkemuka di dunia.
							</p>
						</div>
					</div>

					{/* Card 2: Mentorship */}
					<div className="md:col-span-1 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-center hover:-translate-y-1 transition-all">
						<div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center text-cyan-600 mb-6 shadow-sm">
							<Users size={24} />
						</div>
						<h3 className="text-xl font-bold text-blue-950 mb-3">Bimbingan Eksklusif</h3>
						<p className="text-gray-600 text-sm leading-relaxed">
							Bimbingan 1-on-1 langsung dari insinyur otomasi senior kami selama program berlangsung.
						</p>
					</div>

					{/* Card 3: Certification */}
					<div className="md:col-span-1 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl flex flex-col justify-center hover:-translate-y-1 transition-all">
						<div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-teal-600 mb-6 shadow-sm">
							<Award size={24} />
						</div>
						<h3 className="text-xl font-bold text-blue-950 mb-3">Sertifikasi</h3>
						<p className="text-gray-600 text-sm leading-relaxed">
							Dapatkan sertifikat keahlian yang diakui industri setelah berhasil menyelesaikan program magang.
						</p>
					</div>

					{/* Card 4: School Credit */}
					<div className="md:col-span-2 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:-translate-y-1 transition-all">
						<div className="w-16 h-16 shrink-0 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shadow-sm border border-white">
							<GraduationCap size={32} />
						</div>
						<div className="text-center sm:text-left mt-2">
							<h3 className="text-xl font-bold text-blue-950 mb-2">Integrasi Nilai Praktik (PKL)</h3>
							<p className="text-gray-600 text-sm leading-relaxed max-w-md">
								Program kami telah diselaraskan dengan standar persyaratan Praktik Kerja Lapangan (PKL) sehingga dapat
								dikonversi langsung ke dalam nilai akademik sekolah.
							</p>
						</div>
					</div>
				</div>
			</motion.section>

			{/* REGISTRATION & TIMELINE SECTION */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-50px" }}
				variants={fadeInUp}
				className="py-20 px-6 max-w-7xl mx-auto border-t border-teal-100/50 mt-10"
			>
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* KOLOM KIRI: Timeline Proses */}
					<div className="lg:col-span-1">
						<h2 className="text-2xl font-extrabold text-blue-950 mb-8">Proses Pendaftaran</h2>

						{/* WADAH TIMELINE YANG DIPERBAIKI (Garis pasti pas di tengah icon) */}
						<div className="space-y-8 relative before:absolute before:left-5 before:top-2 before:bottom-2 before:-translate-x-1/2 before:w-0.5 before:bg-gradient-to-b before:from-teal-400 before:to-gray-200">
							{[
								{
									step: "1",
									title: "Pendaftaran Online",
									desc: "Isi formulir pendaftaran dengan informasi sekolah dan data pribadi Anda.",
								},
								{
									step: "2",
									title: "Tinjauan Dokumen",
									desc: "Tim kami akan memverifikasi surat rekomendasi sekolah dan transkrip nilai.",
								},
								{
									step: "3",
									title: "Wawancara Teknis",
									desc: "Sesi wawancara singkat secara online untuk menilai pengetahuan dasar dan motivasi.",
								},
								{
									step: "4",
									title: "Onboarding",
									desc: "Selamat bergabung di SynergX! Hadiri pengarahan orientasi dan keselamatan.",
								},
							].map((item, idx) => (
								<div key={idx} className="relative flex items-start gap-6">
									{/* Lingkaran Angka */}
									<div
										className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center font-bold text-white shadow-md z-10 border-4 border-[#f4f7fb] ${idx === 0 ? "bg-teal-500" : "bg-gray-300"}`}
									>
										{item.step}
									</div>
									<div className="pt-2">
										<h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
										<p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* KOLOM KANAN: Form Pendaftaran (Glassmorphism) */}
					<div className="lg:col-span-2">
						<div className="bg-white/80 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/60 relative overflow-hidden">
							<div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -z-10"></div>

							<h2 className="text-3xl font-extrabold text-blue-950 mb-2">Daftar Sekarang</h2>
							<p className="text-gray-600 mb-8 text-sm">
								Pastikan semua informasi sesuai dengan data resmi sekolah Anda.
							</p>

							<form className="space-y-6">
								{/* Baris 1: Nama & NISN */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
											Nama Lengkap
										</label>
										<input
											type="text"
											placeholder="Masukkan nama lengkap"
											className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm"
										/>
									</div>
									<div>
										<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
											NISN (Nomor Induk Siswa Nasional)
										</label>
										<input
											type="text"
											placeholder="Contoh: 0012345678"
											className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm"
										/>
									</div>
								</div>

								{/* Group: Detail Sekolah */}
								<div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
									<div className="flex items-center gap-2 mb-4 text-blue-700">
										<School size={18} />
										<h3 className="font-bold text-sm">Detail Sekolah</h3>
									</div>
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
												Nama SMK
											</label>
											<input
												type="text"
												placeholder="SMK Negeri 1"
												className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm"
											/>
										</div>
										<div>
											<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
												Jurusan
											</label>
											<select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm text-gray-700">
												<option>Pilih Jurusan</option>
												<option>Teknik Mekatronika</option>
												<option>Teknik Elektronika Industri</option>
												<option>Rekayasa Perangkat Lunak</option>
												<option>Teknik Pemesinan</option>
											</select>
										</div>
									</div>
								</div>

								{/* Baris 3: Durasi & Upload Surat */}
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
											Durasi Magang
										</label>
										<select className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm text-gray-700">
											<option>3 Bulan</option>
											<option>6 Bulan</option>
										</select>
									</div>
									<div>
										<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
											Upload Surat Rekomendasi (PDF)
										</label>
										<div className="relative">
											<input type="file" accept=".pdf" className="hidden" id="file-upload" />
											<label
												htmlFor="file-upload"
												className="w-full flex items-center justify-between bg-white/50 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-white transition-all text-sm shadow-sm text-gray-500"
											>
												<span>Pilih file...</span>
												<UploadCloud size={18} className="text-blue-600" />
											</label>
										</div>
									</div>
								</div>

								{/* Baris 4: Motivasi */}
								<div>
									<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
										Mengapa Anda ingin magang di SynergX?
									</label>
									<textarea
										rows={4}
										placeholder="Jelaskan secara singkat minat Anda pada otomasi industri..."
										className="w-full bg-white/50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm resize-none"
									></textarea>
								</div>

								{/* Submit Area */}
								<div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4 border-t border-gray-100">
									<p className="text-xs text-gray-500 flex-1">
										Dengan mengirimkan form ini, Anda mengonfirmasi bahwa semua data telah diverifikasi oleh sekolah
										Anda.
									</p>
									<button
										type="button"
										className="w-full md:w-auto bg-gradient-to-r from-blue-900 to-teal-500 text-white px-8 py-3.5 rounded-xl font-extrabold hover:shadow-lg hover:shadow-teal-500/40 transition-all hover:-translate-y-1 text-sm flex items-center justify-center gap-2"
									>
										Kirim Pendaftaran <ArrowRight size={18} />
									</button>
								</div>
							</form>
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
					&copy; {new Date().getFullYear()} SynergX Robotics. Hak cipta dilindungi.
				</div>
			</footer>
		</main>
	);
}
