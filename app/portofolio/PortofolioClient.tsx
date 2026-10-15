"use client";
import { useSiteContent } from "../../lib/content-context";
import type { Produk } from "@prisma/client";
import { isRegisteredPortfolio, portfolioCategoryLabel, portfolioMatchesTab } from "../../lib/portfolio-model";


import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import CardCarousel from "../components/CardCarousel";

export default function PortofolioClient({ allItems }: { allItems: Produk[] }) {
	const content = useSiteContent();
	const [activeTab, setActiveTab] = useState("Semua");

	const capstoneItems = allItems.filter(item => item.kategori === "CAPSTONE_DESIGN");
	const filteredWorks = allItems.filter(item => portfolioMatchesTab(item.kategori, activeTab));

	return (
		<div className="text-left w-full max-w-6xl mx-auto px-6 pb-20">
			
			{/* HERO HEADER */}
			<div className="text-center max-w-3xl mx-auto mb-16 pt-6">
				<h1 className="text-4xl md:text-5xl font-extrabold text-[#005a9c] mb-6 leading-tight tracking-tight">{content.values["portofolio_PortofolioClient_1"]}</h1>
				<p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">{content.values["portofolio_PortofolioClient_2"]}</p>
			</div>

			{/* CAPSTONE DESIGN SECTION (Bento Grid) */}
			{capstoneItems.length > 0 && (
				<div className="mb-20">
					<div className="flex items-center gap-3 mb-6 text-[#001738]">
						<div className="p-2 bg-teal-100 rounded-lg text-teal-600">
							<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
						</div>
						<h2 className="text-2xl font-bold">{content.values["portofolio_PortofolioClient_3"]}</h2>
					</div>
					
					<div className="max-w-6xl mx-auto">
						<CardCarousel>
							{capstoneItems.map((item) => (
								<div key={item.id} className="w-full sm:w-[calc(50%-12px)] shrink-0 snap-start bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col justify-center relative group hover:shadow-md transition-shadow min-h-[300px]">
									{item.gambar && (
										<img src={item.gambar} alt={item.nama} className="absolute inset-0 w-full h-full object-cover opacity-10 transition-transform duration-700 group-hover:scale-105 rounded-3xl" />
									)}
									<div className="relative z-10 flex flex-col h-full">
										<span className="inline-block bg-[#e0f2fe] text-[#005a9c] text-xs font-bold px-3 py-1 rounded-full mb-4 w-max shadow-sm border border-blue-100">{content.values["portofolio_PortofolioClient_4"]}</span>
										<h3 className="text-2xl font-bold text-[#001738] mb-4">{item.nama}</h3>
										<p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
											{item.deskripsi}
										</p>
										<Link href={`/portofolio/${item.id}`} className="mt-auto text-[#005a9c] font-bold text-sm flex items-center gap-1 hover:underline">{content.values["portofolio_PortofolioClient_5"]}<ArrowUpRight size={16} />
										</Link>
									</div>
								</div>
							))}
						</CardCarousel>
					</div>
				</div>
			)}

			{/* ALL WORKS SECTION */}
			<div>
				<div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
					<h2 className="text-3xl font-bold text-[#001738]">{content.values["portofolio_PortofolioClient_6"]}</h2>
					
					{/* Tabs */}
					<div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border border-gray-100">
						{["Semua", "Paten", "Publikasi", "Produk"].map((tab) => (
							<button
								key={tab}
								onClick={() => setActiveTab(tab)}
								className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
									activeTab === tab 
										? "bg-slate-100 text-[#001738] shadow-sm" 
										: "text-gray-500 hover:text-gray-700 hover:bg-slate-50"
								}`}
							>
								{content.values[`portfolio_tab_${tab}`]}
							</button>
						))}
					</div>
				</div>

				{/* Grid */}
				<div className="max-w-6xl mx-auto">
					{filteredWorks.length > 0 ? (
						<CardCarousel>
							{filteredWorks.map((item) => (
								<motion.div
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.95 }}
									transition={{ duration: 0.3 }}
									key={item.id}
									className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-start bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow"
								>
									<div className="bg-gray-100 w-full h-40 rounded-xl mb-4 overflow-hidden">
										{item.gambar ? (
											<img src={item.gambar} alt={item.nama} className="w-full h-full object-cover" />
										) : (
											<div className="w-full h-full flex items-center justify-center text-gray-300">
												<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
											</div>
										)}
									</div>
									
									<div className="flex items-center justify-between mb-3">
										<span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
											{portfolioCategoryLabel(item.kategori, content.values)}
										</span>
										<span className="text-[10px] text-gray-400 font-medium">
											{isRegisteredPortfolio(item.kategori) ? content.values.portfolio_patent_status : item.kategori === "PUBLIKASI" ? content.values.portfolio_media_status : content.values.portfolio_available}
										</span>
									</div>

									<h3 className="font-bold text-sm text-[#001738] mb-2 leading-tight">{item.nama}</h3>
									<p className="text-gray-500 text-xs mb-4 line-clamp-3 leading-relaxed">
										{item.deskripsi}
									</p>
									
									<Link 
										href={`/portofolio/${item.id}`} 
										className="mt-auto w-full py-2 border border-[#005a9c]/20 text-[#005a9c] text-xs font-bold rounded-lg text-center hover:bg-[#e0f2fe] transition-colors"
									>
										{item.kategori === "PRODUK_BUATAN" ? content.values.portfolio_product : content.values.portfolio_detail}
									</Link>
								</motion.div>
							))}
						</CardCarousel>
					) : (
						<div className="text-center py-12 text-gray-400 text-sm w-full">{content.values["portofolio_PortofolioClient_7"]}</div>
					)}
				</div>
			</div>
		</div>
	);
}
