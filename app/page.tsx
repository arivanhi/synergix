"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
// Import Icon Monochromatic
import { MapPin, Phone, Mail, ArrowRight, Quote } from "lucide-react"; 

export default function Home() {
  const [activeSection, setActiveSection] = useState("beranda");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ["beranda", "tim", "portofolio", "berita", "produk", "magang", "kontak"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Struktur Menu Global
  const navLinks = [
    { id: "beranda", label: "Beranda", href: "/" },
    { id: "layanan", label: "Layanan", href: "/layanan" },
    { id: "tim", label: "Tim", href: "/#tim" },
    { id: "portofolio", label: "Portofolio", href: "/#portofolio" },
    { id: "berita", label: "Berita", href: "/#berita" },
    { id: "produk", label: "Produk", href: "/#produk" },
    { id: "magang", label: "Magang", href: "/#magang" }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f4f7fb] to-[#e0f2fe] text-gray-800 font-sans">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-lg shadow-md border-b border-white/40" : "bg-white/50 backdrop-blur-sm border-b border-white/20"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-8 object-contain" />
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">SynergX</span>
          </Link>
          
          <div className="hidden md:flex gap-6 text-sm font-semibold">
            {navLinks.map((item) => (
              <Link 
                key={item.id} 
                href={item.href} 
                className={`transition-all duration-300 ${
                  activeSection === item.id 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-500 font-bold scale-105" 
                    : "text-gray-500 hover:text-teal-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:block">
            <Link href="#kontak" className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-lg transition-all">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="beranda" className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <p className="text-teal-600 font-bold tracking-widest text-sm uppercase">Solusi Teknologi</p>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Merekayasa <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">Masa Depan Robotika</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
            Menghadirkan solusi otomatisasi mutakhir untuk meningkatkan efisiensi, akurasi, dan masa depan industri yang berkelanjutan.
          </p>
          <div className="flex gap-4 pt-4">
            <Link href="/layanan" className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-7 py-3.5 rounded-full font-bold shadow-lg hover:-translate-y-1 transition-all">
              Eksplorasi Solusi
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="bg-white/40 backdrop-blur-lg p-4 rounded-3xl border border-white shadow-2xl">
            <img src="/hero_image.png" alt="Robot Arm" className="w-full h-auto rounded-2xl object-cover" />
          </div>
        </div>
      </section>

      {/* SEKSI TIM */}
      <section id="tim" className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">Tim Ahli Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white/60 backdrop-blur-md border border-white shadow-lg p-8 rounded-3xl flex flex-col items-center hover:shadow-2xl transition-all">
              <div className="w-24 h-24 bg-gradient-to-tr from-blue-900 to-teal-400 rounded-full mb-5 p-1">
                <img src={`/team_${item}.jpg`} alt="Tim" className="w-full h-full object-cover rounded-full border-2 border-white" />
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Nama Anggota</h4>
              <p className="text-teal-600 text-sm font-semibold">Ketua Peneliti</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI PORTOFOLIO */}
      <section id="portofolio" className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-50/50 text-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">Portofolio & Capstone</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/80 backdrop-blur-lg p-5 border border-white shadow-xl rounded-3xl text-left hover:-translate-y-2 transition-all">
              <div className="bg-gray-300 w-full h-48 rounded-2xl mb-5 overflow-hidden">
                 <img src={`/project_${item}.jpg`} alt="Project" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg text-blue-950">Capstone Desain {item}</h3>
              <Link href="#" className="text-teal-600 text-sm font-bold flex items-center gap-1 mt-3 hover:underline">
                Lihat Detail <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* SEKSI BERITA & PRODUK (Preview Singkat agar Nav Link Bekerja) */}
      <section id="berita" className="py-20 px-6 max-w-7xl mx-auto text-center border-t border-teal-100/50">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4">Berita Terbaru</h2>
        <p className="text-gray-500 mb-8">Ikuti perkembangan riset dan inovasi terbaru dari tim kami.</p>
        <div className="h-32 bg-white/50 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white shadow-sm">
          <p className="text-gray-400 font-medium">Data berita akan dimuat dari database CRM...</p>
        </div>
      </section>

      <section id="produk" className="py-20 px-6 bg-white/30 text-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-4">Katalog Produk & Paten</h2>
        <p className="text-gray-500 mb-8">Hasil produk inovasi siap pakai dan paten teknologi kami.</p>
        <div className="max-w-7xl mx-auto h-32 bg-white/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white shadow-sm">
          <p className="text-gray-400 font-medium">Data produk akan dimuat dari database CRM...</p>
        </div>
      </section>

      {/* SEKSI MAGANG */}
      <section id="magang" className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-blue-900 to-teal-600 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Program Magang SMK</h2>
            <p className="text-blue-100 leading-relaxed text-lg font-medium">
              Kami membuka kesempatan emas bagi siswa-siswi SMK untuk terjun langsung ke industri robotika dan otomasi.
            </p>
          </div>
          <div className="relative z-10">
            <button className="bg-white text-blue-900 px-8 py-4 rounded-2xl font-extrabold shadow-xl hover:scale-105 transition-all">
              Daftar Magang Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" className="relative bg-[url('/footer_image.jpg')] bg-cover bg-center bg-no-repeat mt-12">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/90 to-blue-900/80 backdrop-blur-md"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-white grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Logo" className="h-12 object-contain brightness-0 invert" />
              <span className="font-extrabold text-3xl tracking-tight">SynergX</span>
            </div>
            <p className="text-gray-300 leading-relaxed">Mitra terpercaya Anda dalam merekayasa masa depan melalui solusi otomasi dan robotika.</p>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">Kontak Cepat</h3>
            <ul className="space-y-5 text-gray-300">
              <li className="flex items-start gap-4">
                <MapPin className="text-teal-400 shrink-0" size={24} />
                <p>Jl. Teknologi No. 123, Kawasan Inovasi<br/>Kota Semarang, Jawa Tengah 50123</p>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-teal-400 shrink-0" size={20} />
                <p>+62 812 3456 7890</p>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-teal-400 shrink-0" size={20} />
                <p>info@synergx-robotics.com</p>
              </li>
            </ul>
          </div>

          <div>
             <h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">Lokasi Kami</h3>
             <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style={{ border: 0 }}></iframe>
             </div>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10 bg-black/40 text-center py-6 text-sm text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} SynergX Robotics. Hak Cipta Dilindungi.
        </div>
      </footer>
    </main>
  );
}