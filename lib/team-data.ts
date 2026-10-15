import type { AcademicEntry } from "./sinta-parser";
import { safeUrl } from "./content-model";
export type ResearchEntry = { judul: string; deskripsi: string; tags: string[] };
export function academicEntries(value: unknown): AcademicEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap(row => {
    if (!row || typeof row !== "object" || typeof row.judul !== "string") return [];
    return [{ judul: row.judul, jurnal: typeof row.jurnal === "string" ? row.jurnal : "", ...(typeof row.url === "string" && safeUrl(row.url) ? { url: row.url } : {}), ...(typeof row.tahun === "string" ? { tahun: row.tahun } : {}), ...(typeof row.jenis === "string" ? { jenis: row.jenis } : {}) }];
  });
}
export function researchEntries(value: unknown): ResearchEntry[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap(row => {
    if (!row || typeof row !== "object" || typeof row.judul !== "string") return [];
    return [{ judul: row.judul, deskripsi: typeof row.deskripsi === "string" ? row.deskripsi : typeof row.desc === "string" ? row.desc : "", tags: Array.isArray(row.tags) ? row.tags.filter((tag: unknown): tag is string => typeof tag === "string") : typeof row.tags === "string" ? row.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [] }];
  });
}
