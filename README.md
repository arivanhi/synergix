# SynergiX CMS

Website Next.js 16.3.8 / React 19 dengan Prisma 6 dan MySQL 8. Konten awal mengikuti desain serta isi website yang ada.

## Penggunaan CMS

Masuk di `/login`, lalu pilih menu admin:

- **Konten Website & Mitra** (`/admin/konten`): teks dan gambar hero, informasi magang (manfaat, tahapan, formulir), halaman layanan, judul tim/portofolio/berita, navigasi, logo website, kontak, peta, footer, serta judul/deskripsi SEO. Pilih tab halaman, edit isian, kemudian **Simpan Semua**. Teks diproses sebagai teks biasa; tidak menerima HTML bebas.
- **Mitra** di editor konten: tambah/hapus mitra, unggah logo atau isi URL gambar, edit tautan, dan ubah urutan dengan Naik/Turun. Mitra tanpa logo tetap ditampilkan sebagai teks mengikuti gaya awal.
- **Layanan Web**, **Produk**, **Berita**, **Testimoni**, **Tim**: kelola data yang ditampilkan pada website. Layanan Web mengelola kartu beranda; rincian halaman Layanan diedit melalui tab Layanan pada Konten Website.
- **Pendaftar Magang**: baca surat, terima/tolak pendaftar, atau buka kembali status untuk koreksi. Surat baru disimpan privat dan hanya dapat dibuka admin. Surat lama yang sebelumnya disimpan di folder publik tetap memakai tautan sebelumnya.
- **Konsultasi**: permintaan dari form layanan tersimpan di database; tandai diproses atau buka kembali.
- Pencarian header menemukan produk, berita, tim, layanan, pendaftar, dan konsultasi. Notifikasi menghitung permintaan yang belum diproses. Ekspor Laporan mengunduh CSV. Dashboard dan Aktivitas menampilkan pembaruan terakhir konten dari database.

Gambar admin mendukung PNG/JPG/WEBP/GIF maksimal 8 MB. Surat magang mendukung PDF atau gambar tersebut maksimal 5 MB. Penyimpanan admin, API laporan/pencarian, dan dokumen privat memvalidasi sesi di server.

## Lowongan magang

Informasi lowongan magang dikelola di **Konten Website & Mitra → Lowongan Magang**. Tambah bidang/posisi, deskripsi tugas, persyaratan, dan periode; aktifkan **Tampilkan lowongan**, lalu klik **Simpan Semua**. Lowongan yang disembunyikan tetap tersimpan sebagai draf. Gunakan Naik/Turun untuk mengatur urutan kartu. Judul bagian, pengantar, pesan saat kosong, dan label kartu tersedia di tab **Magang**. Halaman publik menampilkan informasi lowongan setelah pengantar, proses pendaftaran horizontal di bawahnya (dapat digeser pada ponsel), dan formulir sebelum footer.

## Impor profil SINTA

Pada Tambah/Edit Tim, isi ID (misalnya `6956997`) atau URL `https://sinta.kemdiktisaintek.go.id/authors/profile/6956997/`, lalu klik **Ambil Data SINTA**.

- Publikasi: `?view=scopus`
- Pengabdian: `?view=services`
- Hak cipta: `?view=iprs`

Importer menampilkan maksimal empat entri terbaru setiap kategori, termasuk judul, penerbit/keterangan, tautan sumber, tahun, dan jenis IPR jika tersedia. Tinjau/edit hasil lalu klik **Simpan Profil Tim**. Jumlah publikasi dihitung otomatis dari total **Article — Scopus** profil, bukan sitasi atau batas empat cuplikan. Jika ringkasan Scopus belum sinkron dan lebih kecil dari daftar artikel yang ditampilkan, importer memakai jumlah artikel yang dapat ditemukan. Jumlah paten menghitung **Paten/Paten Sederhana** pada halaman IPRs yang dapat diakses publik (maksimal 20 halaman); hak cipta tidak dihitung sebagai paten. Riset berjalan dihitung dari daftar riset yang diisi admin di CMS dan tampil di judul bagian riset. Statistik tidak diisi manual. Jika daftar hasil impor diubah, statistik kategori tersebut dihitung kembali dari daftar yang disimpan; impor ulang untuk mengambil total terbaru dari SINTA. Kategori yang kosong atau gagal tidak menghapus data sebelumnya. Hasil belum tersimpan sampai profil disimpan.

Pengambilan langsung dari profil contoh menghasilkan empat publikasi Scopus serta tiga IPR: dua paten (termasuk paten sederhana) dan satu hak cipta. Halaman pengabdian profil tersebut memberikan respons `Document Not Found`, yang diperlakukan sebagai daftar kosong. SINTA dapat menolak akses dari IP server atau mengubah markup; aplikasi menampilkan kesalahan per kategori dan tetap menyediakan editor manual.

## Testimoni mitra

Bagikan tautan `/testimoni` kepada mitra. Formulir dapat diakses tanpa login dan menerima nama, jabatan, instansi, pengalaman kerja sama (20–2.000 karakter), foto opsional maksimal 2 MB, serta persetujuan publikasi. Teks formulir tersedia di **Konten Website & Mitra → Testimoni**.

Pengiriman publik selalu berstatus **Menunggu**. Admin meninjau isinya melalui **Testimoni**, lalu memilih **Setujui** atau **Tolak**. Hanya status **Tayang** yang ditampilkan oleh slider beranda. **Sembunyikan** mengembalikan testimoni ke antrean peninjauan. Testimoni yang sudah ada sebelum migrasi tetap tayang; testimoni yang dibuat langsung oleh admin dapat memilih status publikasi.

Formulir memakai validasi server, honeypot, pemeriksaan isi file gambar, dan pembatasan lima pengiriman per IP per jam dalam satu proses aplikasi. Batas ini direset saat container restart; instalasi multi-replika memerlukan penyimpanan limiter bersama. Tidak ada email atau data kontak privat yang diminta.

## Docker dan port

Port awal: website **4005**, MySQL **4006**, phpMyAdmin **4007**. MySQL/phpMyAdmin dibatasi ke localhost; website dapat diakses melalui jaringan/reverse proxy. Ketiga port tidak dipakai container lain saat pemeriksaan mesin pengembangan. Port dapat diubah melalui `SYNERGIX_WEB_PORT`, `SYNERGIX_DB_PORT`, dan `SYNERGIX_PMA_PORT` di `.env`.

1. Salin `.env.example` ke `.env`, sesuaikan akun MySQL yang sudah digunakan, dan isi `NEXTAUTH_SECRET` acak serta `NEXTAUTH_URL` sesuai URL website yang dibuka pengguna. Jangan mengganti credential database lama tanpa menyesuaikan akun pada MySQL yang sudah ada.
2. Untuk instalasi baru, isi `ADMIN_USERNAME`, `ADMIN_PASSWORD` (minimal 12 karakter), dan `ADMIN_NAME`. Akun lama tidak ditimpa. Tidak ada lagi endpoint publik untuk membuat admin dengan password bawaan.
3. Jalankan `npm run docker:up`. Perintah ini memeriksa port terhadap container dan proses lain sebelum menjalankan `docker compose up -d --build`. Jika port bentrok, ubah port di `.env`; sesuaikan `NEXTAUTH_URL` jika port website berubah.

Untuk memeriksa konfigurasi dan port tanpa menjalankan container, gunakan `npm run docker:up -- --check`.

Startup menunggu MySQL sehat, menerapkan migration, mengisi konten awal tanpa menimpa pengaturan tersimpan, lalu menjalankan server standalone. Database legacy dengan tujuh tabel asli dan tanpa histori migration ditandai dengan baseline sebelum migration penambahan CMS dijalankan. Migration menambah tabel/kolom serta pilihan peran; tidak menjalankan seed penghapusan data. Backup database sebelum menerapkan perubahan pada server produksi.

Volume database tetap `db_data`, file publik tetap `./public`, dan dokumen privat memakai volume `private_uploads`. Jalankan Compose dari folder/project yang sama dengan instalasi lama agar volume database yang sama digunakan. `docker compose down -v` akan menghapus volume, jadi jangan gunakan untuk pembaruan biasa.

Tambahkan akun admin pada server melalui environment yang sesuai dan `npm run admin:create`; perintah tidak menimpa akun yang sudah ada. Setelah akun pertama dibuat, `ADMIN_PASSWORD` tidak diperlukan lagi pada environment container.

## Pengembangan dan pemeriksaan

```powershell
npm ci
npx prisma generate
npm run db:migrate
npm run cms:init
npm run dev
```

Untuk pengembangan lokal, isi `DATABASE_URL` di `.env` (URL-encode karakter khusus pada password). Perintah migrasi, inisialisasi CMS, dan pembuatan admin memuat `.env` secara otomatis.

```powershell
npm run lint
npx tsc --noEmit
npm test
npm run build
```

Tes database dilewati secara default. Untuk menjalankannya, gunakan database sementara bernama `synergix_cms_test` dan set `RUN_DB_TESTS=1`. Jangan arahkan tes ke database produksi. `prisma/seed.ts` adalah seed demo lama yang menghapus konten; bukan bagian startup/update Docker.

Audit dependency setelah patch Next.js 16.3.8 tidak lagi melaporkan temuan kritis. Delapan temuan high masih dilaporkan melalui tooling Prisma/ESLint (termasuk `deepmerge-ts` pada konfigurasi Prisma). Perbaikan otomatis yang ditawarkan mengganti versi tooling secara tidak kompatibel, sehingga belum diterapkan. Konfigurasi Prisma berasal dari file proyek dan tidak menerima input pengunjung.
