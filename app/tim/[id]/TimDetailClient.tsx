"use client";
import { useSiteContent } from "../../../lib/content-context";
import type { Keanggotaan } from "@prisma/client";
import { academicEntries, researchEntries } from "../../../lib/team-data";


import { teamStatistics } from "../../../lib/team-statistics";
import AcademicList from "../../components/AcademicList";
import Link from "next/link";
import { ArrowLeft, User, Mail, Calendar, ExternalLink, Beaker, FileText, Contact } from "lucide-react";
import ClientNavigation from "../../components/ClientNavigation";
import Footer from "../../components/Footer";

export default function TimDetailClient({ profilData, prevItem, nextItem }: { profilData: Keanggotaan; prevItem?: { id: number, nama: string } | null; nextItem?: { id: number, nama: string } | null }) {
	const content = useSiteContent();
	const statistics = teamStatistics(profilData);
	// Parsing JSON riset dan publikasi
	const riset = researchEntries(profilData.riset);
	const hakCipta = academicEntries(profilData.hakCipta);
	const pengabdian = academicEntries(profilData.pengabdian);
	const publikasi = academicEntries(profilData.publikasi);

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans pt-28">
			<ClientNavigation />

			<div className="max-w-6xl mx-auto px-6 mb-6">
				<Link href="/tim" className="inline-flex items-center gap-2 text-[#005a9c] hover:text-[#004a80] font-bold transition-colors">
					<ArrowLeft size={18} />{content.values["tim__id__TimDetailClient_1"]}</Link>
			</div>

			<section className="px-6 pb-20 max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
				
				{/* LEFT SIDEBAR: PROFILE PHOTO */}
				<div className="w-full md:w-1/3 shrink-0">
					<div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] bg-white flex flex-col justify-end p-8 border border-white">
						{/* Background Image / Faded Photo */}
						{profilData.foto ? (
							<img src={profilData.foto} alt={profilData.nama} className="absolute inset-0 w-full h-full object-cover" />
						) : (
							<div className="absolute inset-0 bg-gradient-to-t from-[#005a9c] to-blue-300"></div>
						)}
						<div className="absolute inset-0 bg-gradient-to-t from-[#001738]/90 via-[#001738]/20 to-transparent"></div>
						
						{/* Overlay Content */}
						<div className="relative z-10 text-white">
							<span className="inline-block bg-[#00a8ff] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-4 shadow-sm">
								{profilData.jabatan || profilData.peran.replace('_', ' ')}
							</span>
							<h1 className="text-xl font-bold mb-1">{profilData.nama}</h1>
							<p className="text-blue-100 text-sm font-medium">{profilData.gelar}</p>
						</div>
					</div>
				</div>

				{/* RIGHT CONTENT */}
				<div className="w-full md:w-2/3 flex flex-col gap-6">
					
					{/* TOP: BIOGRAPHY & STATS */}
					<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
						<div className="flex items-center gap-2 mb-4 text-[#00a8ff]">
							<User size={20} />
							<h2 className="text-sm font-bold">{content.values["tim__id__TimDetailClient_2"]}</h2>
						</div>
						
						<div className="prose prose-sm text-gray-600 max-w-none leading-relaxed mb-10 whitespace-pre-wrap">
							{profilData.biografi || "Tidak ada data biografi."}
						</div>
						
						{/* Stats Grid */}
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
							<div>
								<p className="text-xs text-gray-500 font-medium mb-1">{content.values["tim__id__TimDetailClient_3"]}</p>
								<p className="font-bold text-[#005a9c]">{profilData.pengalaman || "N/A"}</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 font-medium mb-1">{content.values["tim__id__TimDetailClient_4"]}</p>
								<p className="font-bold text-[#005a9c]">{statistics.patents}</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 font-medium mb-1">{content.values["tim__id__TimDetailClient_5"]}</p>
								<p className="font-bold text-[#005a9c]">{statistics.publications}</p>
							</div>
							<div>
								<p className="text-xs text-gray-500 font-medium mb-1">{content.values["tim__id__TimDetailClient_6"]}</p>
								<p className="font-bold text-[#005a9c]">{profilData.lokasi || "N/A"}</p>
							</div>
						</div>
					</div>

					{/* BOTTOM: SPLIT COLUMNS (Research vs Pub/Contact) */}
					<div className="flex flex-col sm:flex-row gap-6">
						
						{/* ONGOING RESEARCH */}
						<div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 relative overflow-hidden">
							{/* Subtle gradient behind */}
							<div className="absolute top-0 right-0 w-64 h-64 bg-[#e0f2fe] rounded-full filter blur-[80px] -z-0 opacity-50"></div>
							
							<div className="relative z-10">
								<div className="flex items-center gap-2 mb-6 text-[#00a8ff]">
									<Beaker size={20} />
									<h2 className="text-sm font-bold">{content.values["tim__id__TimDetailClient_7"]} ({statistics.research})</h2>
								</div>
								
								<div className="space-y-6">
									{riset.length > 0 ? riset.map((r, idx) => (
										<div key={idx} className="relative pl-4 border-l-2 border-gray-200">
											<div className="absolute -left-[5px] top-1.5 w-2 h-2 bg-[#00a8ff] rounded-full shadow-sm"></div>
											<h3 className="font-bold text-[#001738] text-sm mb-1">{r.judul}</h3>
											<p className="text-xs text-gray-500 leading-relaxed mb-3">
												{r.deskripsi}
											</p>
											{r.tags && Array.isArray(r.tags) && (
												<div className="flex flex-wrap gap-2">
													{r.tags.map((tag: string, tIdx: number) => (
														<span key={tIdx} className="bg-[#e0f2fe] text-[#005a9c] text-[10px] font-bold px-2.5 py-1 rounded-full">
															{tag}
														</span>
													))}
												</div>
											)}
										</div>
									)) : (
										<p className="text-gray-400 text-sm italic">{content.values["tim__id__TimDetailClient_8"]}</p>
									)}
								</div>
							</div>
						</div>

						{/* PUBLICATIONS & CONTACT */}
						<div className="flex-1 flex flex-col gap-6">
							
							{/* Recent Publications */}
							<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1">
								<div className="flex items-center gap-2 mb-6 text-[#00a8ff]">
									<FileText size={20} />
									<h2 className="text-sm font-bold">{content.values["tim__id__TimDetailClient_9"]}</h2>
								</div>
								
								<div className="space-y-4">
									{publikasi.length > 0 ? publikasi.map((pub, idx) => (
										<div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
											<h3 className="font-bold text-[#001738] text-sm mb-1">{pub.url ? <a href={pub.url} target="_blank" rel="noopener noreferrer">{pub.judul}</a> : pub.judul}</h3>
											<p className="text-xs text-gray-500">{pub.jurnal}</p>
										</div>
									)) : (
										<p className="text-gray-400 text-sm italic">{content.values["tim__id__TimDetailClient_10"]}</p>
									)}
								</div>
							</div>

							<AcademicList title={content.values.team_copyright} entries={hakCipta} /><AcademicList title={content.values.team_services} entries={pengabdian} />
 {/* Contact */}
							<div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1">
								<div className="flex items-center gap-2 mb-6 text-[#00a8ff]">
									<Contact size={20} />
									<h2 className="text-sm font-bold">{content.values["tim__id__TimDetailClient_11"]}</h2>
								</div>
								
								<ul className="space-y-4">
									<li>
										<Link href={profilData.email ? `mailto:${profilData.email}` : "/#kontak"} className="flex items-center gap-3 text-gray-600 hover:text-[#005a9c] transition-colors text-sm font-medium">
											<Mail size={18} className="text-[#005a9c]" /> {profilData.email || content.values.team_contact_empty}</Link>
									</li>
									<li>
										<Link href={profilData.linkedin || "/#kontak"} className="flex items-center gap-3 text-gray-600 hover:text-[#005a9c] transition-colors text-sm font-medium">
											<ExternalLink size={18} className="text-[#005a9c]" />{content.values["tim__id__TimDetailClient_13"]}</Link>
									</li>
									<li>
										<Link href={profilData.konsultasiUrl || "/layanan#konsultasi"} className="flex items-center gap-3 text-gray-600 hover:text-[#005a9c] transition-colors text-sm font-medium">
											<Calendar size={18} className="text-[#005a9c]" />{content.values["tim__id__TimDetailClient_14"]}</Link>
									</li>
								</ul>
							</div>

						</div>

					</div>

					{/* Navigation Prev / Next */}
					<div className="grid grid-cols-2 gap-4 mt-4 mb-8">
						{prevItem ? (
							<Link href={`/tim/${prevItem.id}`} className="group flex flex-col p-4 bg-white rounded-3xl shadow-sm border border-gray-100 hover:bg-teal-50 hover:border-teal-100 transition-colors">
								<span className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1"><ArrowLeft size={14}/>{content.values["tim__id__TimDetailClient_15"]}</span>
								<span className="font-bold text-gray-900 group-hover:text-[#005a9c] line-clamp-2">{prevItem.nama}</span>
							</Link>
						) : <div></div>}
						
						{nextItem ? (
							<Link href={`/tim/${nextItem.id}`} className="group flex flex-col p-4 bg-white rounded-3xl shadow-sm border border-gray-100 hover:bg-teal-50 hover:border-teal-100 transition-colors text-right items-end">
								<span className="text-xs text-gray-500 font-semibold mb-1 flex items-center gap-1">{content.values["tim__id__TimDetailClient_16"]}<ArrowLeft size={14} className="rotate-180"/></span>
								<span className="font-bold text-gray-900 group-hover:text-[#005a9c] line-clamp-2">{nextItem.nama}</span>
							</Link>
						) : <div></div>}
					</div>

				</div>
			</section>

			<Footer />
		</main>
	);
}
