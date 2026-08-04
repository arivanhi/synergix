"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Lock, ArrowLeft, LogIn } from "lucide-react";

export default function LoginPage() {
	const router = useRouter();

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault();
		// Simulasi login sukses, langsung arahkan ke dashboard
		router.push("/admin");
	};

	return (
		<main className="min-h-screen bg-gradient-to-br from-[#0a192f] via-blue-950 to-teal-900 flex items-center justify-center p-6 relative overflow-hidden font-sans">
			{/* Ornamen Latar Belakang */}
			<div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]"></div>
			<div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md"
			>
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold mb-8 transition-colors"
				>
					<ArrowLeft size={18} /> Kembali ke Beranda
				</Link>

				<div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-10 rounded-[2.5rem] shadow-2xl">
					<div className="flex flex-col items-center mb-10">
						<div className="bg-white p-3 rounded-2xl shadow-lg mb-4">
							<img src="/logo.png" alt="SynergX Logo" className="h-10 object-contain" />
						</div>
						<h1 className="text-3xl font-extrabold text-white mb-2">Admin Portal</h1>
						<p className="text-blue-200 text-sm text-center">Silakan masuk untuk mengelola sistem CRM SynergX.</p>
					</div>

					<form onSubmit={handleLogin} className="space-y-6">
						<div>
							<label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Username</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-300">
									<User size={18} />
								</div>
								<input
									type="text"
									placeholder="admin"
									required
									className="w-full bg-blue-950/50 border border-blue-800/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm placeholder:text-blue-700"
								/>
							</div>
						</div>

						<div>
							<label className="block text-xs font-bold text-blue-200 mb-2 uppercase tracking-wide">Password</label>
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-blue-300">
									<Lock size={18} />
								</div>
								<input
									type="password"
									placeholder="••••••••"
									required
									className="w-full bg-blue-950/50 border border-blue-800/50 text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all text-sm placeholder:text-blue-700"
								/>
							</div>
						</div>

						<button
							type="submit"
							className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 rounded-xl font-extrabold hover:shadow-lg hover:shadow-teal-500/30 transition-all hover:-translate-y-1 text-sm flex items-center justify-center gap-2 mt-4"
						>
							<LogIn size={18} /> Masuk ke Dashboard
						</button>
					</form>
				</div>
			</motion.div>
		</main>
	);
}
