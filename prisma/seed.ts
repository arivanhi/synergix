const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log("Menjalankan seeder...");

  // --- Hapus semua data yang ada ---
  await prisma.testimoni.deleteMany();
  await prisma.pendaftarMagang.deleteMany();
  await prisma.keanggotaan.deleteMany();
  await prisma.produk.deleteMany();
  await prisma.berita.deleteMany();
  await prisma.layanan.deleteMany();

  // --- Seed Layanan ---
  console.log("Seeding Layanan...");
  await prisma.layanan.createMany({
    data: [
      {
        judul: "Edukasi Robotika",
        deskripsi: "Program pelatihan komprehensif yang dirancang untuk meningkatkan keterampilan tenaga kerja Anda dari tingkat dasar hingga pemrograman lanjutan.",
        ikon: "BookOpen"
      },
      {
        judul: "Integrasi Sistem",
        deskripsi: "Menghubungkan berbagai sistem terpisah secara mulus menjadi satu lini produksi otomatis yang efisien.",
        ikon: "RefreshCw"
      },
      {
        judul: "Mesin Khusus (SPM)",
        deskripsi: "Kami merancang dan memproduksi mesin khusus yang disesuaikan secara presisi dengan kebutuhan produksi unik Anda.",
        ikon: "Cpu",
        gambar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80"
      }
    ]
  });

  // --- Seed Berita ---
  console.log("Seeding Berita...");
  await prisma.berita.createMany({
    data: [
      {
        judul: "SynergX Meluncurkan Lengan Robotika Tercepat di Kelasnya",
        konten: "Lengan robot terbaru dari SynergX memiliki tingkat presisi dan kecepatan luar biasa yang dapat mempercepat produksi hingga 40%. Inovasi ini diperkenalkan pada eksebisi teknologi industri bulan lalu.",
        gambar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
      },
      {
        judul: "Membangun Kolaborasi dengan SMK di Jawa Tengah",
        konten: "Demi meningkatkan serapan tenaga kerja, SynergX menandatangani MoU dengan berbagai SMK di Jawa Tengah untuk program magang dan pengembangan kurikulum Mekatronika.",
        gambar: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
      }
    ]
  });

  // --- Seed Produk / Portofolio ---
  console.log("Seeding Produk & Capstone...");
  await prisma.produk.createMany({
    data: [
      {
        nama: "Automated Sorting Conveyor V2",
        deskripsi: "Konveyor cerdas yang dilengkapi dengan sistem Computer Vision untuk memilah barang berdasarkan warna, bentuk, dan ukuran dengan tingkat akurasi 99%.",
        kategori: "PRODUK_BUATAN",
        gambar: "https://images.unsplash.com/photo-1614030424736-22a4658e8749?w=800&q=80"
      },
      {
        nama: "Algoritma Pathfinding AGV",
        deskripsi: "Sistem navigasi cerdas yang telah dipatenkan untuk kendaraan pandu otomatis (AGV) yang secara drastis mengurangi potensi tabrakan di gudang logistik.",
        kategori: "PATEN"
      },
      {
        nama: "Sistem Hidroponik Cerdas (Capstone)",
        deskripsi: "Karya akhir mahasiswa vokasi berupa sistem irigasi nutrisi yang dipantau menggunakan aplikasi IoT.",
        kategori: "CAPSTONE_DESIGN",
        gambar: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e48d?w=800&q=80"
      }
    ]
  });

  // --- Seed Tim ---
  console.log("Seeding Tim...");
  await prisma.keanggotaan.createMany({
    data: [
      {
        nama: "Prof. Dr. Ir. Alan Turing",
        peran: "PIMPINAN",
        jabatan: "Lead AI Researcher",
        biografi: "Dr. Turing brings over 15 years of pioneering research in cognitive robotics and machine learning integration for industrial automation. Before joining Synergix, he directed the Advanced Automation Lab at the Technical Institute, where his team developed the foundational algorithms for dynamic obstacle avoidance in warehouse environments.\n\nAt Synergix, he leads the AI Research division, focusing on bridging the gap between theoretical neural network models and real-time physical actuation. His vision is to create robotic systems that not only perform tasks with absolute precision but also learn and adapt to entirely new operational paradigms on the fly, ensuring \"digital transparency\" across complex systems.",
        gelar: "MSc., PhD in Cognitive Robotics",
        pengalaman: "15+ Years",
        paten: "24 Filed",
        jumlahPublikasi: "100+ Cited",
        lokasi: "HQ, Zurich",
        foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
        riset: [
          {
            judul: "Project NeuralWeave",
            deskripsi: "Developing edge-computing protocols for swarm robotics, enabling real-time cooperative assembly without centralized processing.",
            tags: ["Swarm AI", "Edge Computing"]
          },
          {
            judul: "OpticGrip Initiative",
            deskripsi: "Enhancing tactile sensor feedback loops using vision-based deep learning models for fragile material handling.",
            tags: ["Computer Vision"]
          }
        ],
        publikasi: [
          {
            judul: "Adaptive Actuation in Unstructured Environments",
            jurnal: "Journal of Cognitive Robotics, 2023"
          },
          {
            judul: "Neural Symbiosis for Human-Robot Collaboration",
            jurnal: "IEEE Transactions on Automation, 2022"
          }
        ]
      },
      {
        nama: "Ayu Lestari, S.T., M.T.",
        peran: "KETUA",
        jabatan: "Ketua Tim Software Engineer",
        biografi: "Spesialis dalam pengembangan sistem kontrol terdistribusi dan visi komputer (Computer Vision).",
        foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
      },
      {
        nama: "Joko Widodo Jr.",
        peran: "ANGGOTA_PERISET",
        jabatan: "Junior Mechanical Engineer",
        biografi: "Ahli dalam desain mekanikal 3D dan pengujian material untuk komponen robot.",
        foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80"
      }
    ]
  });

  // --- Seed Testimoni ---
  console.log("Seeding Testimoni...");
  await prisma.testimoni.createMany({
    data: [
      {
        nama: "Hendrik Gunawan",
        jabatan: "Manajer Operasional PT Inovasi",
        teks: "Sistem SPM buatan SynergX Robotics mengubah cara kerja pabrik kami. Efisiensi melonjak hingga 60% dengan cacat produk yang minim.",
        foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80"
      },
      {
        nama: "Siti Aisyah",
        jabatan: "Kepala Sekolah SMK N 1 Teknologi",
        teks: "Kerja sama magang dengan SynergX memberikan wawasan langsung kepada para siswa tentang ekosistem industri 4.0 yang sesungguhnya.",
        foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
      }
    ]
  });

  console.log("Database berhasil di-seed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
