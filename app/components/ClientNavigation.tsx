"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientNavigation() {
	const [isScrolled, setIsScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ id: "beranda", label: "Beranda", href: "/" },
		{ id: "layanan", label: "Layanan", href: "/layanan" },
		{ id: "tim", label: "Tim", href: "/tim" },
		{ id: "portofolio", label: "Portofolio & Produk", href: "/portofolio" },
		{ id: "berita", label: "Berita", href: "/berita" },
		{ id: "magang", label: "Magang", href: "/magang" },
	];

	return (
		<nav
			className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md border-b border-white/40 py-3" : "bg-white/50 backdrop-blur-sm border-b border-white/20 py-5"}`}
		>
			<div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
				<Link href="/" className="flex items-center gap-2">
					<img src="/logo.png" alt="Logo" className="h-8 object-contain" />
					<span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">
						SynergiX
					</span>
				</Link>

				<div className="hidden md:flex gap-6 text-sm font-semibold">
					{navLinks.map((item) => {
						// Highlight jika berada di halaman tersebut
						const isActive = pathname === item.href;

						return (
							<Link
								key={item.id}
								href={item.href}
								className={`transition-all duration-300 ${isActive
										? "text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-500 font-bold scale-105"
										: "text-gray-500 hover:text-teal-500"
									}`}
							>
								{item.label}
							</Link>
						);
					})}
				</div>

				<div className="hidden md:block">
					<Link
						href="/#kontak"
						className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all inline-block"
					>
						Hubungi Kami
					</Link>
				</div>
			</div>
		</nav>
	);
}
