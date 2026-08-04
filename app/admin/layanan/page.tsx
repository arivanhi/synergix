import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import { Check, X, Clock } from "lucide-react";
import { updateStatusMagang } from "../../actions/magang";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export default async function LayananAdminPage() {
	const session = await getServerSession(authOptions);
	const pendaftar = await prisma.pendaftarMagang.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Pendaftar Magang</h1>
					<p className="text-gray-500 text-sm">Kelola siswa SMK yang mendaftar program magang.</p>
				</div>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
							<th className="p-4 font-semibold">Nama Siswa</th>
							<th className="p-4 font-semibold">Asal Sekolah</th>
							<th className="p-4 font-semibold hidden md:table-cell">Kontak (Email)</th>
							<th className="p-4 font-semibold hidden md:table-cell">Berkas</th>
							<th className="p-4 font-semibold">Status</th>
							<th className="p-4 font-semibold text-right">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{pendaftar.map((item) => (
							<tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
								<td className="p-4">
									<p className="font-bold text-gray-900 text-sm">{item.nama}</p>
									<p className="text-xs text-gray-500">{item.createdAt.toLocaleDateString('id-ID')}</p>
								</td>
								<td className="p-4 text-sm text-gray-700">
									{item.asalSekolah}
								</td>
								<td className="p-4 hidden md:table-cell text-sm text-gray-500">
									<a href={`mailto:${item.email}`} className="text-blue-600 hover:underline">{item.email}</a>
								</td>
								<td className="p-4 hidden md:table-cell text-sm">
									{item.suratRekomendasi ? (
										<a href={item.suratRekomendasi} target="_blank" rel="noreferrer" className="text-teal-600 font-bold hover:underline">Lihat Surat</a>
									) : (
										<span className="text-gray-400 italic">Tidak ada</span>
									)}
								</td>
								<td className="p-4">
									{item.status === "MENUNGGU" && <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1"><Clock size={12}/> Menunggu</span>}
									{item.status === "DITERIMA" && <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1"><Check size={12}/> Diterima</span>}
									{item.status === "DITOLAK" && <span className="bg-red-100 text-red-700 px-2.5 py-1 rounded-full text-xs font-bold flex items-center w-max gap-1"><X size={12}/> Ditolak</span>}
								</td>
								<td className="p-4 text-right">
									{item.status === "MENUNGGU" ? (
										<div className="flex justify-end gap-2">
											<form action={async () => {
												"use server";
												await updateStatusMagang(item.id, "DITERIMA");
											}}>
												<button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">
													Terima
												</button>
											</form>
											<form action={async () => {
												"use server";
												await updateStatusMagang(item.id, "DITOLAK");
											}}>
												<button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">
													Tolak
												</button>
											</form>
										</div>
									) : (
										<span className="text-xs text-gray-400 italic">Telah Diproses</span>
									)}
								</td>
							</tr>
						))}
						{pendaftar.length === 0 && (
							<tr>
								<td colSpan={5} className="p-8 text-center text-gray-500">
									Belum ada data pendaftar magang.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</AdminLayout>
	);
}
