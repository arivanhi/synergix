import { academicEntries, researchEntries } from "./team-data";
import type { AcademicEntry } from "./sinta-parser";

export type SintaStatistics = { publications?: { total: number; signature: string }; patents?: { total: number; signature: string } };
export function entrySignature(entries: AcademicEntry[]): string {
  const text = JSON.stringify(entries.map(e => [e.judul, e.url || "", e.jenis || ""]));
  let hash = 2166136261;
  for (let i = 0; i < text.length; i++) hash = Math.imul(hash ^ text.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16);
}
export function isPatent(entry: AcademicEntry): boolean { return /^(paten|patent)(\s|$)/i.test(entry.jenis || ""); }
export function normalizeSintaStatistics(value: unknown): SintaStatistics {
  if (!value || typeof value !== "object") return {};
  const result: SintaStatistics = {};
  for (const key of ["publications", "patents"] as const) {
    const row = (value as SintaStatistics)[key];
    if (row && Number.isSafeInteger(row.total) && row.total >= 0 && row.total <= 10000000 && typeof row.signature === "string" && /^[0-9a-f]{1,8}$/.test(row.signature)) result[key] = { total: row.total, signature: row.signature };
  }
  return result;
}
export function teamStatistics(team: { publikasi?: unknown; hakCipta?: unknown; riset?: unknown; sintaStatistik?: unknown }) {
  const publications = academicEntries(team.publikasi).filter(e => e.judul.trim());
  const iprs = academicEntries(team.hakCipta).filter(e => e.judul.trim());
  const snapshot = normalizeSintaStatistics(team.sintaStatistik);
  return {
    publications: snapshot.publications?.signature === entrySignature(publications) ? Math.max(publications.length, snapshot.publications.total) : publications.length,
    patents: snapshot.patents?.signature === entrySignature(iprs) ? snapshot.patents.total : iprs.filter(isPatent).length,
    research: researchEntries(team.riset).filter(e => e.judul.trim()).length,
  };
}
