"use client";
import { useSiteContent } from "../../lib/content-context";

import { MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
	const content = useSiteContent();
	return (
		<footer style={{ backgroundImage: `url("${content.values.footer_background}")` }} id="kontak" className="relative bg-cover bg-center bg-no-repeat mt-12 w-full">
			<div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/90 to-blue-900/80 backdrop-blur-md"></div>
			<div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white grid grid-cols-1 md:grid-cols-3 gap-16">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-3 mb-6 bg-white p-3.5 rounded-2xl shadow-lg w-max">
						<img src={content.values["components_Footer_1"]} alt={content.values["components_Footer_2"]} className="h-10 object-contain" />
						<span className="font-extrabold text-3xl tracking-tight text-blue-950">{content.values["components_Footer_3"]}</span>
					</div>
					<p className="text-gray-300 leading-relaxed">{content.values["components_Footer_4"]}</p>
				</div>

				<div>
					<h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">{content.values["components_Footer_5"]}</h3>
					<ul className="space-y-5 text-gray-300">
						<li className="flex items-start gap-4">
							<MapPin className="text-teal-400 shrink-0" size={24} />
							<p>{content.values["components_Footer_6"]}<br />{content.values["components_Footer_7"]}</p>
						</li>
						<li className="flex items-center gap-4">
							<Phone className="text-teal-400 shrink-0" size={20} />
							<p>{content.values["components_Footer_8"]}</p>
						</li>
						<li className="flex items-center gap-4">
							<Mail className="text-teal-400 shrink-0" size={20} />
							<p>{content.values["components_Footer_9"]}</p>
						</li>
					</ul>
				</div>

				<div>
					<h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">{content.values["components_Footer_10"]}</h3>
					<div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
						<iframe
							src={content.values["components_Footer_11"]}
							width="100%"
							height="100%"
							style={{ border: 0 }}
						></iframe>
					</div>
				</div>
			</div>
			<div className="relative z-10 border-t border-white/10 bg-black/40 text-center py-6 text-sm text-gray-400 font-medium">
				&copy; {new Date().getFullYear()}{content.values["components_Footer_12"]}</div>
		</footer>
	);
}
