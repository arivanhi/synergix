import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteProduk } from "../../actions/produk";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export default async function ProdukAdminPage() {
	const session = await getServerSession(authOptions);
	const produk = await prisma.produk.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
					<p className="text-gray-500 text-sm">Kelola produk, paten, dan capstone design.</p>
				</div>
				<Link
					href="/admin/produk/form"
					className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
				>
					<Plus size={16} /> Tambah Produk
				</Link>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
							<th className="p-4 font-semibold w-24">Foto</th>
							<th className="p-4 font-semibold">Nama Produk</th>
							<th className="p-4 font-semibold hidden md:table-cell">Kategori</th>
							<th className="p-4 font-semibold text-right">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{produk.map((item) => (
							<tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
								<td className="p-4">
									{item.gambar ? (
										<img src={item.gambar} alt="Produk" className="w-16 h-12 object-cover rounded-md border border-gray-200" />
									) : (
										<div className="w-16 h-12 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-xs text-gray-400">Kosong</div>
									)}
								</td>
								<td className="p-4">
									<p className="font-bold text-gray-900 text-sm">{item.nama}</p>
									<p className="text-xs text-gray-500 line-clamp-1">{item.deskripsi}</p>
								</td>
								<td className="p-4 hidden md:table-cell text-sm">
									<span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">
										{item.kategori.replace('_', ' ')}
									</span>
								</td>
								<td className="p-4 text-right">
									<div className="flex justify-end gap-2">
										<Link
											href={`/admin/produk/form?id=${item.id}`}
											className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
										>
											<Edit size={18} />
										</Link>
										<form action={async () => {
											"use server";
											await deleteProduk(item.id);
										}}>
											<button
												type="submit"
												className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
												title="Hapus"
											>
												<Trash2 size={18} />
											</button>
										</form>
									</div>
								</td>
							</tr>
						))}
						{produk.length === 0 && (
							<tr>
								<td colSpan={4} className="p-8 text-center text-gray-500">
									Belum ada data produk.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</AdminLayout>
	);
}
