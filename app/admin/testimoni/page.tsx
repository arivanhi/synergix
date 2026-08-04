import { prisma } from "../../../lib/prisma";
import AdminLayout from "../../components/AdminLayout";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteTestimoni } from "../../actions/testimoni";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const dynamic = 'force-dynamic';

export default async function TestimoniAdminPage() {
	const session = await getServerSession(authOptions);
	const testimoni = await prisma.testimoni.findMany({
		orderBy: { createdAt: "desc" },
	});

	return (
		<AdminLayout user={session?.user || {}}>
			<div className="flex justify-between items-center mb-6">
				<div>
					<h1 className="text-2xl font-bold text-gray-900">Manajemen Testimoni</h1>
					<p className="text-gray-500 text-sm">Kelola ulasan dan testimoni dari client atau user.</p>
				</div>
				<Link
					href="/admin/testimoni/form"
					className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
				>
					<Plus size={16} /> Tambah Testimoni
				</Link>
			</div>

			<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
				<table className="w-full text-left border-collapse">
					<thead>
						<tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-sm">
							<th className="p-4 font-semibold w-24">Foto</th>
							<th className="p-4 font-semibold">Nama Client</th>
							<th className="p-4 font-semibold hidden md:table-cell">Testimoni</th>
							<th className="p-4 font-semibold text-right">Aksi</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-100">
						{testimoni.map((item) => (
							<tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
								<td className="p-4">
									{item.foto ? (
										<img src={item.foto} alt="Foto" className="w-12 h-12 object-cover rounded-full border border-gray-200" />
									) : (
										<div className="w-12 h-12 bg-gray-100 rounded-full border border-gray-200 flex items-center justify-center text-xs text-gray-400">Kosong</div>
									)}
								</td>
								<td className="p-4">
									<p className="font-bold text-gray-900 text-sm">{item.nama}</p>
									<p className="text-xs text-gray-500">{item.jabatan}</p>
								</td>
								<td className="p-4 hidden md:table-cell text-sm text-gray-600 line-clamp-2 max-w-sm">
									"{item.teks}"
								</td>
								<td className="p-4 text-right">
									<div className="flex justify-end gap-2">
										<Link
											href={`/admin/testimoni/form?id=${item.id}`}
											className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
										>
											<Edit size={18} />
										</Link>
										<form action={async () => {
											"use server";
											await deleteTestimoni(item.id);
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
						{testimoni.length === 0 && (
							<tr>
								<td colSpan={4} className="p-8 text-center text-gray-500">
									Belum ada data testimoni.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</AdminLayout>
	);
}
