"use client";

import Link from "next/link";
import {
	LayoutDashboard,
	Settings,
	Users,
	Package,
	FileText,
	Search,
	Bell,
	LogOut,
	Download,
	Box,
	GraduationCap,
	MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
	return (
		<div className="min-h-screen bg-[#f4f7fb] flex font-sans text-gray-800">
			{/* SIDEBAR */}
			<aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
				<div className="h-20 flex items-center px-8 border-b border-gray-50">
					<Link href="/" className="flex items-center gap-2">
						<img src="/logo.png" alt="Logo" className="h-7 object-contain" />
						<span className="font-extrabold text-xl text-blue-950 tracking-tight">SynergX</span>
					</Link>
				</div>

				<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
					{/* Menu Aktif */}
					<Link
						href="/admin"
						className="flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-xl font-bold transition-colors"
					>
						<LayoutDashboard size={20} />
						<span>Ringkasan</span>
					</Link>

					{/* Menu Lainnya */}
					<Link
						href="#"
						className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors"
					>
						<Settings size={20} />
						<span>Layanan</span>
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors"
					>
						<Users size={20} />
						<span>Tim</span>
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors"
					>
						<Package size={20} />
						<span>Produk</span>
					</Link>
					<Link
						href="#"
						className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl font-medium transition-colors"
					>
						<FileText size={20} />
						<span>Berita</span>
					</Link>
				</nav>

				<div className="p-6 border-t border-gray-50 flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold shadow-md shrink-0">
						AD
					</div>
					<div className="overflow-hidden">
						<p className="text-sm font-bold text-gray-900 truncate">Admin User</p>
						<p className="text-xs text-gray-500 truncate">System Administrator</p>
					</div>
				</div>
			</aside>

			{/* MAIN CONTENT AREA */}
			<div className="flex-1 ml-64 flex flex-col min-h-screen">
				{/* TOP HEADER */}
				<header className="h-20 bg-[#f4f7fb]/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
					<div className="relative w-96">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<Search size={18} className="text-gray-400" />
						</div>
						<input
							type="text"
							placeholder="Cari di dashboard..."
							className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
						/>
					</div>

					<div className="flex items-center gap-6">
						<button className="relative text-gray-500 hover:text-blue-600 transition-colors">
							<Bell size={22} />
							<span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-[#f4f7fb] rounded-full"></span>
						</button>
						<Link
							href="/"
							className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md transition-colors"
						>
							<LogOut size={16} /> Keluar Admin
						</Link>
					</div>
				</header>

				{/* DASHBOARD CONTENT */}
				<main className="flex-1 p-8">
					{/* Header Title & Export Button */}
					<div className="flex items-end justify-between mb-8">
						<div>
							<h1 className="text-3xl font-extrabold text-gray-900 mb-1">Ringkasan Dashboard</h1>
							<p className="text-gray-500 text-sm">Selamat datang kembali. Berikut aktivitas terbaru hari ini.</p>
						</div>
						<button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
							<Download size={16} /> Ekspor Laporan
						</button>
					</div>

					{/* STATS CARDS GRID */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.4 }}
						className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
					>
						{/* Card 1 */}
						<div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
							<Box
								className="absolute -right-4 -top-4 text-gray-50 opacity-50 rotate-12 group-hover:scale-110 transition-transform"
								size={120}
							/>
							<div className="flex items-center gap-3 mb-6 relative z-10">
								<div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
									<Box size={20} />
								</div>
								<h3 className="text-gray-500 font-semibold text-sm">Total Produk</h3>
							</div>
							<div className="flex items-baseline gap-3 relative z-10">
								<span className="text-4xl font-extrabold text-gray-900">1,248</span>
								<span className="text-teal-500 text-sm font-bold flex items-center">~+12%</span>
							</div>
						</div>

						{/* Card 2 */}
						<div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
							<GraduationCap
								className="absolute -right-4 -top-4 text-gray-50 opacity-50 rotate-12 group-hover:scale-110 transition-transform"
								size={120}
							/>
							<div className="flex items-center gap-3 mb-6 relative z-10">
								<div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
									<GraduationCap size={20} />
								</div>
								<h3 className="text-gray-500 font-semibold text-sm">Pendaftar Magang</h3>
							</div>
							<div className="flex items-baseline gap-3 relative z-10">
								<span className="text-4xl font-extrabold text-gray-900">342</span>
								<span className="text-teal-500 text-sm font-bold flex items-center">~+5%</span>
							</div>
						</div>

						{/* Card 3 */}
						<div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
							<FileText
								className="absolute -right-4 -top-4 text-gray-50 opacity-50 rotate-12 group-hover:scale-110 transition-transform"
								size={120}
							/>
							<div className="flex items-center gap-3 mb-6 relative z-10">
								<div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
									<FileText size={20} />
								</div>
								<h3 className="text-gray-500 font-semibold text-sm">Berita Diposting</h3>
							</div>
							<div className="flex items-baseline gap-3 relative z-10">
								<span className="text-4xl font-extrabold text-gray-900">86</span>
								<span className="text-gray-400 text-sm font-bold flex items-center">→ Stabil</span>
							</div>
						</div>
					</motion.div>

					{/* BOTTOM SECTION (Chart & Activity) */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
						{/* Chart Area */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							className="lg:col-span-2 bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col"
						>
							<div className="flex items-center justify-between mb-8">
								<h3 className="font-extrabold text-gray-900">Aktivitas Sistem</h3>
								<button className="text-xs font-bold bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
									7 Hari Terakhir
								</button>
							</div>

							{/* Simulasi Grafik Batang (Placeholder) */}
							<div className="flex-1 bg-gray-50/50 rounded-xl border border-gray-100 flex items-end justify-between p-6 h-64 gap-2 relative">
								{/* Teks Watermark */}
								<div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
									<LayoutDashboard size={32} className="text-gray-400 mb-2" />
									<p className="text-xs font-bold text-gray-500">Area Visualisasi Grafik</p>
									<p className="text-[10px] text-gray-400">Membutuhkan library JS (Misal: Recharts)</p>
								</div>

								{/* Bar Dummy */}
								{[40, 30, 60, 100, 70, 85, 55, 75, 45].map((h, i) => (
									<div
										key={i}
										className="w-full bg-blue-200 rounded-t-sm hover:bg-blue-400 transition-colors cursor-pointer"
										style={{ height: `${h}%` }}
									></div>
								))}
							</div>
						</motion.div>

						{/* Recent Activity */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="lg:col-span-1 bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col"
						>
							<div className="flex items-center justify-between mb-6">
								<h3 className="font-extrabold text-gray-900">Aktivitas Terbaru</h3>
								<button className="text-gray-400 hover:text-blue-600">
									<MoreHorizontal size={20} />
								</button>
							</div>

							<div className="flex-1 space-y-6 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-0 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-100">
								<div className="relative pl-6">
									<div className="absolute left-0 top-1.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm"></div>
									<p className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-wider">10 Menit lalu</p>
									<p className="text-sm text-gray-700 leading-snug">
										Produk baru{" "}
										<Link href="#" className="text-blue-600 font-semibold hover:underline">
											RoboArm X1
										</Link>{" "}
										ditambahkan ke katalog.
									</p>
								</div>

								<div className="relative pl-6">
									<div className="absolute left-0 top-1.5 w-3 h-3 bg-teal-500 rounded-full border-2 border-white shadow-sm"></div>
									<p className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-wider">2 Jam lalu</p>
									<p className="text-sm text-gray-700 leading-snug">
										Pendaftaran magang diterima dari{" "}
										<Link href="#" className="text-teal-600 font-semibold hover:underline">
											Sarah Connor
										</Link>
										.
									</p>
								</div>

								<div className="relative pl-6">
									<div className="absolute left-0 top-1.5 w-3 h-3 bg-gray-400 rounded-full border-2 border-white shadow-sm"></div>
									<p className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Kemarin</p>
									<p className="text-sm text-gray-700 leading-snug">
										Artikel berita "Masa Depan Otomasi" berhasil dipublikasikan.
									</p>
								</div>

								<div className="relative pl-6">
									<div className="absolute left-0 top-1.5 w-3 h-3 bg-red-400 rounded-full border-2 border-white shadow-sm"></div>
									<p className="text-[10px] font-bold text-gray-400 mb-0.5 uppercase tracking-wider">Kemarin</p>
									<p className="text-sm text-gray-700 leading-snug">
										Pemeliharaan server dan database selesai dilakukan.
									</p>
								</div>
							</div>

							<button className="w-full mt-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
								Lihat Semua Aktivitas
							</button>
						</motion.div>
					</div>
				</main>
			</div>
		</div>
	);
}
