"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, RefreshCw, Rocket, Cpu, Headset, CheckCircle2 } from "lucide-react";
import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";

export default function Layanan() {


	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans">
			<ClientNavigation />

			{/* HEADER SECTION */}
			<section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center">
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
					Solusi{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">
						Tingkat Lanjut
					</span>
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed">
					Meningkatkan kapabilitas industri melalui integrasi robotika mutakhir, mesin khusus, dan edukasi teknis
					komprehensif.
				</p>
			</section>

			{/* BENTO GRID SERVICES */}
			<section className="py-10 px-6 max-w-7xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div className="col-span-1 md:col-span-2 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all">
						<div>
							<span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
								Edukasi
							</span>
							<h3 className="text-3xl font-extrabold text-blue-950 mb-4 group-hover:text-teal-600 transition-all">
								Edukasi Robotika
							</h3>
							<p className="text-gray-600 leading-relaxed max-w-md">
								Program pelatihan komprehensif yang dirancang untuk meningkatkan keterampilan tenaga kerja Anda dari
								tingkat dasar hingga pemrograman lanjutan.
							</p>
						</div>
						<div className="mt-8">
							<Link href="#" className="text-teal-600 font-bold flex items-center gap-2 hover:underline">
								Eksplorasi Kurikulum <ArrowRight size={18} />
							</Link>
						</div>
					</div>

					<div className="col-span-1 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all relative">
						<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-white">
							<RefreshCw className="text-blue-600" size={24} />
						</div>
						<div>
							<h3 className="text-2xl font-extrabold text-blue-950 mb-3 group-hover:text-teal-600 transition-all">
								Integrasi Sistem
							</h3>
							<p className="text-gray-600 text-sm leading-relaxed mb-6">
								Menghubungkan berbagai sistem terpisah secara mulus menjadi satu lini produksi otomatis yang efisien.
							</p>
						</div>
						<Link
							href="#"
							className="text-teal-600 font-bold text-sm flex items-center gap-1 border-t border-gray-200 pt-4 hover:underline"
						>
							Pelajari Lebih Lanjut <ArrowRight size={14} />
						</Link>
					</div>

					<div className="col-span-1 md:col-span-3 bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 group hover:-translate-y-1 transition-all">
						<div className="w-full md:w-1/2 h-64 bg-gray-200 rounded-2xl overflow-hidden border border-white/50">
							<img
								src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
								alt="Mesin Khusus"
								className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
						<div className="w-full md:w-1/2 flex flex-col justify-center py-4 pr-6">
							<span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block w-max">
								Rekayasa Kustom
							</span>
							<h3 className="text-3xl font-extrabold text-blue-950 mb-4 group-hover:text-teal-600 transition-all">
								Mesin Khusus (SPM)
							</h3>
							<p className="text-gray-600 leading-relaxed mb-6">
								Kami merancang dan memproduksi mesin khusus yang disesuaikan secara presisi dengan kebutuhan produksi
								unik Anda.
							</p>
							<div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-700">
								<span className="flex items-center gap-2">
									<CheckCircle2 className="text-teal-500" size={18} /> Rekayasa Presisi
								</span>
								<span className="flex items-center gap-2">
									<CheckCircle2 className="text-teal-500" size={18} /> Pembuatan Prototipe Cepat
								</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* KEUNGGULAN */}
			<section className="py-20 px-6 max-w-7xl mx-auto text-center">
				<h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">
					Keunggulan SynergiX
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{[
						{
							icon: <Rocket className="text-blue-600" size={32} />,
							title: "Penerapan Cepat",
							desc: "Meminimalkan waktu henti (downtime) dengan protokol integrasi efisien kami.",
						},
						{
							icon: <Cpu className="text-blue-600" size={32} />,
							title: "Teknologi AI Masa Depan",
							desc: "Memanfaatkan kemampuan AI terbaru dan machine vision untuk operasi Anda.",
						},
						{
							icon: <Headset className="text-blue-600" size={32} />,
							title: "Dukungan 24/7",
							desc: "Bantuan teknis berdedikasi untuk memastikan kelancaran operasi secara kontinu.",
						},
					].map((item, idx) => (
						<div
							key={idx}
							className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center"
						>
							<div className="w-20 h-20 bg-gradient-to-tr from-blue-100 to-teal-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
								{item.icon}
							</div>
							<h3 className="text-xl font-bold text-blue-950 mb-3">{item.title}</h3>
							<p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* FORM KONSULTASI (SUDAH DIKEMBALIKAN) */}
			<section id="konsultasi" className="py-16 px-6 max-w-4xl mx-auto relative z-10">
				<div className="bg-white/80 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/60 relative overflow-hidden">
					{/* Ornamen Gradasi Halus di Latar Form */}
					<div className="absolute top-0 right-0 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -z-10"></div>
					<div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl -z-10"></div>

					<h2 className="text-3xl font-extrabold text-blue-950 mb-2">Jadwalkan Konsultasi</h2>
					<p className="text-gray-600 mb-8 text-sm md:text-base">
						Ceritakan tantangan otomatisasi Anda, dan insinyur kami akan merancang solusi khusus yang tepat guna.
					</p>

					<form className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
									Nama Lengkap
								</label>
								<input
									type="text"
									placeholder="John Doe"
									className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm"
								/>
							</div>
							<div>
								<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">Perusahaan</label>
								<input
									type="text"
									placeholder="PT Maju Bersama"
									className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
								Layanan yang Diminati
							</label>
							<select className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm text-gray-700">
								<option>Edukasi Robotika</option>
								<option>Integrasi Sistem</option>
								<option>Mesin Khusus (SPM)</option>
								<option>Lainnya</option>
							</select>
						</div>

						<div>
							<label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
								Detail Proyek
							</label>
							<textarea
								rows={4}
								placeholder="Jelaskan secara singkat kebutuhan atau kendala Anda..."
								className="w-full bg-white/50 border border-teal-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm shadow-sm resize-none"
							></textarea>
						</div>

						<button
							type="button"
							className="w-full bg-gradient-to-r from-blue-900 to-teal-500 text-white py-4 rounded-xl font-extrabold hover:shadow-lg hover:shadow-teal-500/40 transition-all hover:-translate-y-1 text-lg flex items-center justify-center gap-2"
						>
							Kirim Permintaan Konsultasi <ArrowRight size={20} />
						</button>
					</form>
				</div>
			</section>

			<Footer />
		</main>
	);
}
