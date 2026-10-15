"use client";
import { useState } from "react";
import { contentFields, type SiteContent } from "../../../lib/content-model";
import { saveSiteContent } from "../../actions/content";
import { uploadImage } from "../../actions/upload";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ContentEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [group, setGroup] = useState("Beranda");
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState("");
  const [search, setSearch] = useState("");
  const groups = [...new Set(contentFields.map(f => f.group)), "Lowongan Magang", "Mitra"];
  async function upload(file: File, key: string, partnerIndex?: number) {
    setUploading(key);
    try {
      const data = new FormData(); data.set("file", file);
      const result = await uploadImage(data);
      if (!result.url) throw new Error(result.error || "Unggah gagal.");
      const url = result.url;
      setContent(c => partnerIndex === undefined ? { ...c, values: { ...c.values, [key]: url } } : { ...c, partners: c.partners.map((p, i) => i === partnerIndex ? { ...p, logo: url } : p) });
    } catch (error) { toast.error(error instanceof Error ? error.message : "Unggah gagal."); }
    finally { setUploading(""); }
  }
  async function save(e: React.FormEvent) {
    e.preventDefault(); setBusy(true);
    try {
      const result = await saveSiteContent(content);
      if (result.error) throw new Error(result.error);
      toast.success("Konten website berhasil disimpan."); router.refresh();
    } catch (error) { toast.error(error instanceof Error ? error.message : "Gagal menyimpan."); }
    finally { setBusy(false); }
  }
  const inputClass = "w-full border border-gray-200 rounded-xl p-3 bg-gray-50 text-gray-900 focus:ring-2 focus:ring-teal-500";
  return <form onSubmit={save} className="space-y-6">
    <div className="flex items-center justify-between gap-4"><div><h1 className="text-2xl font-bold">Konten Website</h1><p className="text-gray-500 text-sm">Ubah isi halaman, gambar, dan mitra. Susunan dan desain halaman tetap sama.</p></div><button disabled={busy || !!uploading} className="bg-teal-600 text-white rounded-xl px-5 py-3 flex items-center gap-2 disabled:opacity-50">{busy ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Simpan Semua</button></div>
    <div className="flex flex-wrap gap-2">{groups.map(g => <button type="button" key={g} onClick={() => setGroup(g)} className={`px-4 py-2 rounded-lg text-sm font-bold ${g === group ? "bg-blue-700 text-white" : "bg-white text-gray-600 border"}`}>{g}</button>)}</div>
    <input placeholder="Cari judul atau isi konten..." value={search} onChange={e => setSearch(e.target.value)} className={inputClass} />
    <div className="bg-white p-6 rounded-2xl border border-gray-100 space-y-6">
      {group !== "Mitra" && group !== "Lowongan Magang" && contentFields.filter(f => f.group === group && `${f.label} ${content.values[f.key]}`.toLowerCase().includes(search.toLowerCase())).map(field => <div key={field.key}>
        <label htmlFor={field.key} className="block font-bold text-sm mb-2">{field.label}</label>
        {field.kind === "text" ? <textarea id={field.key} rows={field.value.length > 100 ? 3 : 1} value={content.values[field.key]} onChange={e => setContent(c => ({ ...c, values: { ...c.values, [field.key]: e.target.value } }))} className={inputClass} /> : <input id={field.key} value={content.values[field.key]} onChange={e => setContent(c => ({ ...c, values: { ...c.values, [field.key]: e.target.value } }))} className={inputClass} />}
        {field.kind === "image" && <div className="flex items-center gap-4 mt-3">{content.values[field.key] && <img src={content.values[field.key]} alt="Pratinjau" className="h-24 w-40 object-contain rounded-lg bg-gray-50" />}<label className="text-sm text-teal-700 font-bold">{uploading === field.key ? "Mengunggah..." : "Unggah gambar"}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={!!uploading || busy} onChange={e => { if (e.target.files?.[0]) void upload(e.target.files[0], field.key); }} className="block mt-2 text-gray-500" /></label></div>}
      </div>)}
      {group === "Lowongan Magang" && <>
        <p className="text-gray-500 text-sm">Isi bidang yang sedang menerima peserta magang. Aktifkan “Tampilkan lowongan” untuk menampilkan kartu di halaman Magang. Judul bagian dan label kartu dapat diubah pada tab Magang.</p>
        {!content.internships.length && <p className="text-gray-500 text-sm">Belum ada lowongan. Tambahkan informasi lowongan pertama Anda.</p>}
        {content.internships.map((opening, index) => ({ opening, index })).filter(({ opening }) => `${opening.bidang} ${opening.deskripsi} ${opening.persyaratan} ${opening.periode}`.toLowerCase().includes(search.toLowerCase())).map(({ opening, index }) => <div key={index} className="border rounded-xl p-4 space-y-4">
          <div className="flex justify-between items-center gap-3"><strong>Lowongan {index + 1}</strong><button type="button" aria-label={`Hapus lowongan ${index + 1}`} onClick={() => setContent(c => ({ ...c, internships: c.internships.filter((_, i) => i !== index) }))}><Trash2 className="text-red-600" size={18} /></button></div>
          {([['bidang', 'Bidang / posisi magang', 1, 150], ['deskripsi', 'Deskripsi tugas', 3, 5000], ['persyaratan', 'Persyaratan (satu per baris)', 3, 5000], ['periode', 'Periode / durasi magang', 1, 200]] as const).map(([key, label, rows, maxLength]) => <label key={key} className="block text-sm font-medium">{label}<textarea rows={rows} maxLength={maxLength} value={opening[key]} onChange={e => setContent(c => ({ ...c, internships: c.internships.map((p, i) => i === index ? { ...p, [key]: e.target.value } : p) }))} className={`${inputClass} mt-2`} /></label>)}
          <label className="flex items-center gap-2 text-sm font-bold text-teal-700"><input type="checkbox" checked={opening.tampil} onChange={e => setContent(c => ({ ...c, internships: c.internships.map((p, i) => i === index ? { ...p, tampil: e.target.checked } : p) }))} className="accent-teal-600" /> Tampilkan lowongan</label>
          <div className="flex gap-3">{[-1, 1].map(direction => <button type="button" key={direction} disabled={index + direction < 0 || index + direction >= content.internships.length} className="text-blue-700 text-sm disabled:opacity-30" onClick={() => setContent(c => { const internships = [...c.internships]; [internships[index], internships[index + direction]] = [internships[index + direction], internships[index]]; return { ...c, internships }; })}>{direction === -1 ? "Naik" : "Turun"}</button>)}</div>
        </div>)}
        <button type="button" disabled={content.internships.length >= 50} onClick={() => { setSearch(""); setContent(c => ({ ...c, internships: [...c.internships, { bidang: "", deskripsi: "", persyaratan: "", periode: "", tampil: false }] })); }} className="text-teal-700 flex items-center gap-2 font-bold disabled:opacity-50"><Plus size={18} /> Tambah Lowongan</button>
      </>}
      {group === "Mitra" && <><p className="text-gray-500 text-sm">Tambahkan logo, nama, dan tautan mitra. Urutan di bawah mengikuti urutan pada website.</p>{content.partners.map((partner, index) => <div key={index} className="border rounded-xl p-4 space-y-3">
        <div className="flex justify-between"><strong>Mitra {index + 1}</strong><button type="button" aria-label="Hapus mitra" onClick={() => setContent(c => ({ ...c, partners: c.partners.filter((_, i) => i !== index) }))}><Trash2 className="text-red-600" size={18} /></button></div>
        {([['nama', 'Nama mitra'], ['logo', 'URL logo'], ['url', 'Tautan website']] as const).map(([key, label]) => <label key={key} className="block text-sm">{label}<input value={partner[key]} onChange={e => setContent(c => ({ ...c, partners: c.partners.map((p, i) => i === index ? { ...p, [key]: e.target.value } : p) }))} className={inputClass} /></label>)}
        {partner.logo && <img src={partner.logo} alt={partner.nama} className="h-16 w-40 object-contain" />}<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" disabled={!!uploading || busy} onChange={e => { if (e.target.files?.[0]) void upload(e.target.files[0], `partner-${index}`, index); }} />
        <div className="flex gap-3">{[-1, 1].map(direction => <button type="button" key={direction} disabled={index + direction < 0 || index + direction >= content.partners.length} className="text-blue-700 text-sm disabled:opacity-30" onClick={() => setContent(c => { const partners = [...c.partners]; [partners[index], partners[index + direction]] = [partners[index + direction], partners[index]]; return { ...c, partners }; })}>{direction === -1 ? "Naik" : "Turun"}</button>)}</div>
      </div>)}<button type="button" onClick={() => setContent(c => ({ ...c, partners: [...c.partners, { nama: "Mitra Baru", logo: "", url: "" }] }))} className="text-teal-700 flex items-center gap-2 font-bold"><Plus size={18} /> Tambah Mitra</button></>}
    </div>
  </form>;
}
