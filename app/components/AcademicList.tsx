import type { AcademicEntry } from "../../lib/sinta-parser";
import { FileText } from "lucide-react";
export default function AcademicList({ title, entries }: { title: string; entries: AcademicEntry[] }) {
  if (!entries.length) return null;
  return <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex-1"><div className="flex items-center gap-2 mb-6 text-[#00a8ff]"><FileText size={20} /><h2 className="text-sm font-bold">{title}</h2></div><div className="space-y-4">{entries.map((entry, index) => <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100"><h3 className="font-bold text-[#001738] text-sm mb-1">{entry.url ? <a href={entry.url} target="_blank" rel="noopener noreferrer">{entry.judul}</a> : entry.judul}</h3><p className="text-xs text-gray-500">{entry.jurnal}{entry.tahun ? ` · ${entry.tahun}` : ""}</p></div>)}</div></div>;
}
