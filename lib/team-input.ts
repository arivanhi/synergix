import type { Prisma, PeranAnggota } from "@prisma/client";
import { safeUrl } from "./content-model";
import { normalizeSintaUrl } from "./sinta-parser";
import { normalizeSintaStatistics, teamStatistics } from "./team-statistics";
export type TeamInput = {
  nama: string; peran: PeranAnggota; jabatan?: string; biografi?: string; gelar?: string;
  pengalaman?: string; lokasi?: string; jumlahPublikasi?: string; paten?: string; foto?: string;
  sintaUrl?: string; hakCipta?: Prisma.InputJsonValue; pengabdian?: Prisma.InputJsonValue;
  publikasi?: Prisma.InputJsonValue; riset?: Prisma.InputJsonValue; email?: string; linkedin?: string; konsultasiUrl?: string;
  sintaStatistik?: Prisma.InputJsonValue;
};
export function validateTeam(data: TeamInput): TeamInput {
  if (!data || typeof data.nama !== "string" || !data.nama.trim() || data.nama.length > 191) throw new Error("Nama anggota tidak valid.");
  if (!["PIMPINAN", "KETUA", "ANGGOTA_PERISET", "WAKIL", "PENELITI_UTAMA", "DOSEN_PEMBIMBING", "ANGGOTA", "PENELITI_ALUMNI"].includes(data.peran)) throw new Error("Peran anggota tidak valid.");
  const result: TeamInput = { nama: data.nama.trim(), peran: data.peran };
  for (const key of ["jabatan", "biografi", "gelar", "pengalaman", "lokasi", "jumlahPublikasi", "paten", "foto", "sintaUrl", "email", "linkedin", "konsultasiUrl"] as const) {
    const value = data[key];
    if (value === undefined) continue;
    if (typeof value !== "string" || value.length > (["biografi", "gelar", "pengalaman", "lokasi", "paten"].includes(key) ? 20000 : 191)) throw new Error(`Isian ${key} tidak valid.`);
    if (key === "sintaUrl" && value.trim()) { result.sintaUrl = normalizeSintaUrl(value); continue; }
    if (["foto", "linkedin", "konsultasiUrl"].includes(key) && !safeUrl(value)) throw new Error(`URL ${key} tidak valid.`);
    if (key === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) throw new Error("Email anggota tidak valid.");
    result[key] = value;
  }
  for (const key of ["publikasi", "riset", "hakCipta", "pengabdian"] as const) {
    if (data[key] === undefined) continue;
    const entries = data[key];
    if (!Array.isArray(entries) || entries.length > 100) throw new Error(`Daftar ${key} tidak valid.`);
    for (const entry of entries) {
      if (!entry || typeof entry !== "object" || Array.isArray(entry) || typeof entry.judul !== "string" || !entry.judul.trim()) throw new Error(`Judul ${key} wajib diisi.`);
      if (typeof entry.url === "string" && !safeUrl(entry.url)) throw new Error(`Tautan ${key} tidak valid.`);
    }
    if (JSON.stringify(entries).length > 100000) throw new Error(`Daftar ${key} terlalu panjang.`);
    result[key] = entries;
  }
  result.sintaStatistik = normalizeSintaStatistics(data.sintaStatistik);
  const statistics = teamStatistics(result);
  result.jumlahPublikasi = String(statistics.publications);
  result.paten = String(statistics.patents);
  return result;
}
