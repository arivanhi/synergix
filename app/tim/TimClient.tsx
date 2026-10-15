"use client";
import { useSiteContent } from "../../lib/content-context";
import type { Keanggotaan } from "@prisma/client";


import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";
import CardCarousel from "../components/CardCarousel";

export default function TimClient({ pimpinanData, anggotaData }: { pimpinanData: Keanggotaan[]; anggotaData: Keanggotaan[] }) {
	const content = useSiteContent();
	const fadeInUp: Variants = {
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
				<h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-blue-950 mb-6">{content.values["tim_TimClient_1"]}{" "}
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">{content.values["tim_TimClient_2"]}</span>
				</h1>
				<p className="text-gray-600 text-lg leading-relaxed">{content.values["tim_TimClient_3"]}</p>
			</motion.section>

			{/* PIMPINAN PENELITI (FACULTY ADVISORS) */}
			<motion.section
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeInUp}
				className="py-10 px-6 max-w-6xl mx-auto"
			>
				<h2 className="text-3xl font-extrabold text-blue-700 text-center mb-10">{content.values["tim_TimClient_4"]}</h2>
				<div className="flex flex-wrap justify-center gap-6">
					{pimpinanData.length > 0 ? pimpinanData.map(person => (
						<div
							key={person.id}
							className="w-full sm:max-w-xl bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:shadow-2xl hover:-translate-y-1 transition-all"
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
									{person.biografi || content.values.team_bio_empty}
								</p>
								<Link
									href={`/tim/${person.id}`}
									className="text-teal-600 font-bold text-sm hover:underline flex items-center justify-center sm:justify-start gap-1"
								>{content.values["tim_TimClient_5"]}<ArrowRight size={16} />
								</Link>
							</div>
						</div>
					)) : (
						<p className="text-center text-gray-500">{content.values["tim_TimClient_6"]}</p>
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
				<h2 className="text-3xl font-extrabold text-blue-700 text-center mb-10">{content.values["tim_TimClient_7"]}</h2>
				<div className="max-w-6xl mx-auto">
					{anggotaData.length > 0 ? (
						<CardCarousel>
							{anggotaData.map((person) => (
								<div
									key={person.id}
									className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all"
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
										className="text-teal-600 font-bold text-sm hover:underline flex items-center gap-1 mt-auto"
									>{content.values["tim_TimClient_8"]}<ArrowRight size={16} />
									</Link>
								</div>
							))}
						</CardCarousel>
					) : (
						<p className="text-center text-gray-500">{content.values["tim_TimClient_9"]}</p>
					)}
				</div>
			</motion.section>

			<Footer />
		</main>
	);
}
