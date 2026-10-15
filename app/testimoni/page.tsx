import { getSiteContent } from "../../lib/content";
import ClientNavigation from "../components/ClientNavigation";
import Footer from "../components/Footer";
import TestimoniForm from "./TestimoniForm";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const content = await getSiteContent();
  return { title: `${content.values.testimonial_form_title} | SynergiX`, description: content.values.testimonial_form_intro };
}

export default function PartnerTestimonialPage() {
  return <main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 pt-28">
    <ClientNavigation />
    <TestimoniForm />
    <Footer />
  </main>;
}
