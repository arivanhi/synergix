import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";
import MagangClient from "./MagangClient";

export const dynamic = 'force-dynamic';

export default function MagangPage() {
	return (
		<main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans pt-28">
			<ClientNavigation />
			<section className="py-20 px-6 max-w-7xl mx-auto">
				<MagangClient />
			</section>
			<Footer />
		</main>
	);
}
