"use client";

import { Box, GraduationCap, FileText, LayoutDashboard, MoreHorizontal, Download } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import AdminLayout from "./AdminLayout";

interface AdminDashboardClientProps {
 activities: { title: string; href: string; date: string }[];
 days: { day: string; count: number }[];
	stats: {
		totalProduk: number;
		pendaftarMagang: number;
		totalBerita: number;
	};
	user: {
		name?: string | null;
	};
}

export default function AdminDashboardClient({ stats, user, activities, days }: AdminDashboardClientProps) {
	return (
		<AdminLayout user={user}>
			<div className="flex items-end justify-between mb-8">
				<div>
					<h1 className="text-3xl font-extrabold text-gray-900 mb-1">Ringkasan Dashboard</h1>
					<p className="text-gray-500 text-sm">Selamat datang kembali, {user?.name || "Admin"}.</p>
				</div>
				<a href="/api/admin/report" className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-50 shadow-sm transition-colors">
					<Download size={16} /> Ekspor Laporan
				</a>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
				className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
			>
				{/* Card 1 */}
				<div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
					<Box className="absolute -right-4 -top-4 text-gray-50 opacity-50 rotate-12 group-hover:scale-110 transition-transform" size={120} />
					<div className="flex items-center gap-3 mb-6 relative z-10">
						<div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
							<Box size={20} />
						</div>
						<h3 className="text-gray-500 font-semibold text-sm">Total Produk</h3>
					</div>
					<div className="flex items-baseline gap-3 relative z-10">
						<span className="text-4xl font-extrabold text-gray-900">{stats.totalProduk}</span>
					</div>
				</div>

				{/* Card 2 */}
				<div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
					<GraduationCap className="absolute -right-4 -top-4 text-gray-50 opacity-50 rotate-12 group-hover:scale-110 transition-transform" size={120} />
					<div className="flex items-center gap-3 mb-6 relative z-10">
						<div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
							<GraduationCap size={20} />
						</div>
						<h3 className="text-gray-500 font-semibold text-sm">Pendaftar Magang</h3>
					</div>
					<div className="flex items-baseline gap-3 relative z-10">
						<span className="text-4xl font-extrabold text-gray-900">{stats.pendaftarMagang}</span>
					</div>
				</div>

				{/* Card 3 */}
				<div className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
					<FileText className="absolute -right-4 -top-4 text-gray-50 opacity-50 rotate-12 group-hover:scale-110 transition-transform" size={120} />
					<div className="flex items-center gap-3 mb-6 relative z-10">
						<div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-xl flex items-center justify-center">
							<FileText size={20} />
						</div>
						<h3 className="text-gray-500 font-semibold text-sm">Berita Diposting</h3>
					</div>
					<div className="flex items-baseline gap-3 relative z-10">
						<span className="text-4xl font-extrabold text-gray-900">{stats.totalBerita}</span>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="lg:col-span-2 bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col"
				>
					<div className="flex items-center justify-between mb-8">
						<h3 className="font-extrabold text-gray-900">Pembaruan Konten — 7 Hari</h3>
					</div>
					<div className="flex-1 bg-gray-50/50 rounded-xl border border-gray-100 flex items-end justify-between p-6 h-64 gap-2 relative">
						{days.map(day => <div key={day.day} title={day.day + ": " + day.count + " pembaruan"} className="w-full flex flex-col justify-end h-full items-center gap-2"><span className="text-xs text-gray-600">{day.count}</span><div className="w-full bg-blue-200 rounded-t-sm hover:bg-blue-400 transition-colors" style={{ height: Math.max(2, day.count / Math.max(1, ...days.map(d => d.count)) * 80) + "%" }} /><span className="text-[10px] text-gray-500">{day.day.slice(5)}</span></div>)}

					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="lg:col-span-1 bg-white p-6 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col"
				>
					<div className="flex items-center justify-between mb-6">
						<h3 className="font-extrabold text-gray-900">Aktivitas Terbaru</h3>
						<Link href="/admin/aktivitas" aria-label="Semua aktivitas" className="text-gray-400 hover:text-blue-600">
							<MoreHorizontal size={20} />
						</Link>
					</div>

					<div className="flex-1 space-y-6 relative before:absolute before:inset-0 before:ml-1.5 before:-translate-x-px md:before:mx-0 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-100">
						{activities.length ? activities.map((activity, index) => <Link key={index} href={activity.href} className="block relative pl-6"><div className="absolute left-0 top-1.5 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-sm" /><p className="text-[10px] font-bold text-gray-400 mb-0.5">{new Date(activity.date).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}</p><p className="text-sm text-gray-700 leading-snug">{activity.title}</p></Link>) : <p className="text-sm text-gray-500">Belum ada aktivitas.</p>}

					</div>

					<Link href="/admin/aktivitas" className="block text-center w-full mt-6 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 transition-colors">
						Lihat Semua Aktivitas
					</Link>
				</motion.div>
			</div>
		</AdminLayout>
	);
}
