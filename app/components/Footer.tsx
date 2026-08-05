import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
	return (
		<footer id="kontak" className="relative bg-[url('/footer_image.jpg')] bg-cover bg-center bg-no-repeat mt-12 w-full">
			<div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/90 to-blue-900/80 backdrop-blur-md"></div>
			<div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white grid grid-cols-1 md:grid-cols-3 gap-16">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-3 mb-6 bg-white p-3.5 rounded-2xl shadow-lg w-max">
						<img src="/logo.png" alt="Logo" className="h-10 object-contain" />
						<span className="font-extrabold text-3xl tracking-tight text-blue-950">SynergiX</span>
					</div>
					<p className="text-gray-300 leading-relaxed">
						Mitra terpercaya Anda dalam merekayasa masa depan melalui solusi otomasi dan robotika.
					</p>
				</div>

				<div>
					<h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">Kontak Cepat</h3>
					<ul className="space-y-5 text-gray-300">
						<li className="flex items-start gap-4">
							<MapPin className="text-teal-400 shrink-0" size={24} />
							<p>
								Jl. Teknologi No. 123, Kawasan Inovasi
								<br />
								Kota Semarang, Jawa Tengah 50123
							</p>
						</li>
						<li className="flex items-center gap-4">
							<Phone className="text-teal-400 shrink-0" size={20} />
							<p>+62 812 3456 7890</p>
						</li>
						<li className="flex items-center gap-4">
							<Mail className="text-teal-400 shrink-0" size={20} />
							<p>info@synergix-robotics.com</p>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">Lokasi Kami</h3>
					<div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
						<iframe
							src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126715.79607412854!2d110.3398251347012!3d-6.993259877793392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e708b4d3f0d024d%3A0x1e0432b9da5cb9f2!2sSemarang%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
							width="100%"
							height="100%"
							style={{ border: 0 }}
						></iframe>
					</div>
				</div>
			</div>
			<div className="relative z-10 border-t border-white/10 bg-black/40 text-center py-6 text-sm text-gray-400 font-medium">
				&copy; {new Date().getFullYear()} SynergiX Robotics. Hak Cipta Dilindungi.
			</div>
		</footer>
	);
}
