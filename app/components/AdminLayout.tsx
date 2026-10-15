"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	Settings,
	Users,
	Package,
	FileText,
	MessageSquare,
	Search,
	Bell,
	LogOut,
	UserCheck,
	Globe,
} from "lucide-react";
import { Toaster } from "react-hot-toast";

interface AdminLayoutProps {
	children: React.ReactNode;
	user?: {
		name?: string | null;
	};
}

export default function AdminLayout({ children, user }: AdminLayoutProps) {
	const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ title: string; href: string }[]>([]);
  const [pending, setPending] = useState(0);
  useEffect(() => { const controller = new AbortController(); fetch("/api/admin/overview", { signal: controller.signal }).then(r => r.ok ? r.json() : null).then(data => { if (data) setPending(data.pending); }).catch(() => {}); return () => controller.abort(); }, [pathname]);
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => { if (query.trim()) fetch("/api/admin/search?q=" + encodeURIComponent(query), { signal: controller.signal }).then(r => r.ok ? r.json() : []).then(setResults).catch(() => {}); }, 250);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);

	const isActive = (path: string) => {
		if (path === "/admin" && pathname === "/admin") return true;
		if (path !== "/admin" && pathname.startsWith(path)) return true;
		return false;
	};

	const navItems = [
		{ name: "Konten Website & Mitra", path: "/admin/konten", icon: Globe },
		{ name: "Konsultasi", path: "/admin/konsultasi", icon: MessageSquare },
		{ name: "Aktivitas", path: "/admin/aktivitas", icon: Bell },
		{ name: "Ringkasan", path: "/admin", icon: LayoutDashboard },
		{ name: "Layanan Web", path: "/admin/layanan-web", icon: Globe },
		{ name: "Produk", path: "/admin/produk", icon: Package },
		{ name: "Berita", path: "/admin/berita", icon: FileText },
		{ name: "Testimoni", path: "/admin/testimoni", icon: MessageSquare },
		{ name: "Tim", path: "/admin/tim", icon: Users },
		{ name: "Pendaftar Magang", path: "/admin/layanan", icon: UserCheck },
	];

	return (
		<div className="min-h-screen bg-[#f4f7fb] flex font-sans text-gray-800">
			<Toaster position="top-right" />
			{/* SIDEBAR */}
			<aside className="w-64 bg-white border-r border-gray-100 flex flex-col fixed h-full z-20">
				<div className="h-20 flex items-center px-8 border-b border-gray-50">
					<Link href="/" className="flex items-center gap-2">
						<img src="/logo.png" alt="Logo" className="h-7 object-contain" />
						<span className="font-extrabold text-xl text-blue-950 tracking-tight">SynergiX</span>
					</Link>
				</div>

				<nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
					{navItems.map((item) => (
						<Link
							key={item.path}
							href={item.path}
							className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${isActive(item.path)
									? "bg-blue-50 text-blue-700 font-bold"
									: "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
								}`}
						>
							<item.icon size={20} />
							<span>{item.name}</span>
						</Link>
					))}
				</nav>

				<div className="p-6 border-t border-gray-50 flex items-center gap-3">
					<div className="w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold shadow-md shrink-0 uppercase">
						{user?.name?.substring(0, 2) || "AD"}
					</div>
					<div className="overflow-hidden">
						<p className="text-sm font-bold text-gray-900 truncate">{user?.name || "Admin User"}</p>
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
							value={query} onChange={e => { setQuery(e.target.value); setResults([]); }} placeholder="Cari di dashboard..."
							className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
						/>{query.trim() && <div className="absolute top-full left-0 right-0 bg-white shadow-xl border rounded-lg max-h-72 overflow-auto z-50">{results.length ? results.map((r, i) => <Link key={i} href={r.href} onClick={() => { setQuery(""); setResults([]); }} className="block p-3 text-sm hover:bg-blue-50">{r.title}</Link>) : <p className="p-3 text-sm text-gray-500">Tidak ada hasil.</p>}</div>}
					</div>

					<div className="flex items-center gap-6">
						<Link href="/admin/aktivitas" aria-label={`Notifikasi: ${pending} permintaan belum diproses`} className="relative text-gray-500 hover:text-blue-600 transition-colors">
							<Bell size={22} />
							{pending > 0 && <span className="absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-[10px] px-1">{pending}</span>}
						</Link>
						<button
							onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
							className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg text-sm font-bold flex items-center gap-2 shadow-md transition-colors"
						>
							<LogOut size={16} /> Keluar Admin
						</button>
					</div>
				</header>

				{/* PAGE CONTENT */}
				<main className="flex-1 p-8">
					{children}
				</main>
			</div>
		</div>
	);
}
