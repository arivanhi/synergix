"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
// Import Icon Monochromatic
import { MapPin, Phone, Mail, ArrowRight, RefreshCw, Rocket, Cpu, Headset, CheckCircle2 } from "lucide-react";

export default function Layanan() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Struktur Menu Global (Sama Persis)
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
                  item.href === "/layanan" 
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-500 font-bold scale-105" 
                    : "text-gray-500 hover:text-teal-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="hidden md:block">
            <Link href="/#kontak" className="bg-gradient-to-r from-blue-900 to-teal-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:scale-105 transition-all">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </nav>

      {/* HEADER SECTION */}
      <section className="pt-36 pb-12 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
          Solusi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400">Tingkat Lanjut</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Meningkatkan kapabilitas industri melalui integrasi robotika mutakhir, mesin khusus, dan edukasi teknis komprehensif.
        </p>
      </section>

      {/* BENTO GRID SERVICES */}
      <section className="py-10 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="col-span-1 md:col-span-2 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all">
            <div>
              <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">Edukasi</span>
              <h3 className="text-3xl font-extrabold text-blue-950 mb-4 group-hover:text-teal-600 transition-all">Edukasi Robotika</h3>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Program pelatihan komprehensif yang dirancang untuk meningkatkan keterampilan tenaga kerja Anda dari tingkat dasar hingga pemrograman lanjutan.
              </p>
            </div>
            <div className="mt-8">
              <Link href="#" className="text-teal-600 font-bold flex items-center gap-2 hover:underline">
                Eksplorasi Kurikulum <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="col-span-1 bg-white/70 backdrop-blur-xl border border-white p-8 rounded-3xl shadow-xl flex flex-col justify-between group hover:-translate-y-1 transition-all relative">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 shadow-sm border border-white">
              <RefreshCw className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-blue-950 mb-3 group-hover:text-teal-600 transition-all">Integrasi Sistem</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                Menghubungkan berbagai sistem terpisah secara mulus menjadi satu lini produksi otomatis yang efisien.
              </p>
            </div>
            <Link href="#" className="text-teal-600 font-bold text-sm flex items-center gap-1 border-t border-gray-200 pt-4 hover:underline">
              Pelajari Lebih Lanjut <ArrowRight size={14} />
            </Link>
          </div>

          <div className="col-span-1 md:col-span-3 bg-white/70 backdrop-blur-xl border border-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row gap-8 group hover:-translate-y-1 transition-all">
            <div className="w-full md:w-1/2 h-64 bg-gray-200 rounded-2xl overflow-hidden border border-white/50">
              <img src="/service_mesin.jpg" alt="Mesin Khusus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center py-4 pr-6">
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block w-max">Rekayasa Kustom</span>
              <h3 className="text-3xl font-extrabold text-blue-950 mb-4 group-hover:text-teal-600 transition-all">Mesin Khusus (SPM)</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Kami merancang dan memproduksi mesin khusus yang disesuaikan secara presisi dengan kebutuhan produksi unik Anda.
              </p>
              <div className="flex flex-wrap gap-4 text-sm font-semibold text-gray-700">
                <span className="flex items-center gap-2"><CheckCircle2 className="text-teal-500" size={18} /> Rekayasa Presisi</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="text-teal-500" size={18} /> Pembuatan Prototipe Cepat</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* KEUNGGULAN */}
      <section className="py-20 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-teal-400 mb-12">Keunggulan SynergX</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Rocket className="text-blue-600" size={32} />, title: "Penerapan Cepat", desc: "Meminimalkan waktu henti (downtime) dengan protokol integrasi efisien kami." },
            { icon: <Cpu className="text-blue-600" size={32} />, title: "Teknologi AI Masa Depan", desc: "Memanfaatkan kemampuan AI terbaru dan machine vision untuk operasi Anda." },
            { icon: <Headset className="text-blue-600" size={32} />, title: "Dukungan 24/7", desc: "Bantuan teknis berdedikasi untuk memastikan kelancaran operasi secara kontinu." }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/60 backdrop-blur-md border border-white p-8 rounded-3xl shadow-lg flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-tr from-blue-100 to-teal-50 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
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
              <li className="flex items-start gap-4"><MapPin className="text-teal-400 shrink-0" size={24} /><p>Jl. Teknologi No. 123, Kawasan Inovasi<br/>Kota Semarang, Jawa Tengah</p></li>
              <li className="flex items-center gap-4"><Phone className="text-teal-400 shrink-0" size={20} /><p>+62 812 3456 7890</p></li>
              <li className="flex items-center gap-4"><Mail className="text-teal-400 shrink-0" size={20} /><p>info@synergx-robotics.com</p></li>
            </ul>
          </div>
          <div>
             <h3 className="font-bold text-xl mb-6 border-b-2 border-teal-500 pb-2 inline-block">Lokasi Kami</h3>
             <div className="w-full h-56 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <iframe src="https://www.google.com/maps/embed?..." width="100%" height="100%" style={{ border: 0 }}></iframe>
             </div>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10 bg-black/40 text-center py-6 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} SynergX Robotics. Hak Cipta Dilindungi.
        </div>
      </footer>
    </main>
  );
}