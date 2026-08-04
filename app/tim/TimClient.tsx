"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";

export default function TimClient({ pimpinanData, anggotaData }: { pimpinanData: any[]; anggotaData: any[] }) {
	const fadeInUp = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans">
			<ClientNavigation />

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
				<h2 className="text-3xl font-extrabold text-blue-700 text-center mb-10">Pimpinan</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{pimpinanData.length > 0 ? (
						pimpinanData.map((person) => (
							<div
								key={person.id}
								className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
							>
								<div className="w-32 h-32 shrink-0 bg-gray-200 rounded-full overflow-hidden shadow-inner border-4 border-white">
									<img src={person.foto || "/logo.png"} alt={person.nama} className="w-full h-full object-cover" />
								</div>
								<div className="text-center sm:text-left">
									<h3 className="text-2xl font-bold text-gray-900 mb-2">{person.nama}</h3>
									<span className="bg-cyan-100 text-cyan-800 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
										{person.jabatan || person.peran.replace("_", " ")}
									</span>
									<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
										{person.biografi || "Tidak ada biografi singkat."}
									</p>
									<Link
										href={`/tim/${person.id}`}
										className="text-teal-600 font-bold text-sm hover:underline flex items-center justify-center sm:justify-start gap-1"
									>
										Lihat Profil <ArrowRight size={16} />
									</Link>
								</div>
							</div>
						))
					) : (
						<p className="col-span-2 text-center text-gray-500">Belum ada data pimpinan.</p>
					)}
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
				<h2 className="text-3xl font-extrabold text-blue-700 text-center mb-10">Anggota</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
					{anggotaData.length > 0 ? (
						anggotaData.map((person) => (
							<div
								key={person.id}
								className="bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all"
							>
								<div className="w-28 h-28 bg-gray-200 rounded-full overflow-hidden shadow-inner border-4 border-white mb-6">
									<img src={person.foto || "/logo.png"} alt={person.nama} className="w-full h-full object-cover" />
								</div>
								<h3 className="text-xl font-bold text-gray-900 mb-2">{person.nama}</h3>
								<span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full mb-5">
									{person.jabatan || person.peran.replace("_", " ")}
								</span>
								<Link
									href={`/tim/${person.id}`}
									className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-1"
								>
									Lihat Profil <ArrowRight size={16} />
								</Link>
							</div>
						))
					) : (
						<p className="col-span-3 text-center text-gray-500">Belum ada data anggota.</p>
					)}
				</div>
			</motion.section>

			<Footer />
		</main>
	);
}
