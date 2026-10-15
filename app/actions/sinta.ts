"use server";
import { requireAdmin } from "../../lib/admin";
import { fetchSintaView } from "../../lib/sinta-fetch";
import type { SintaStatistics } from "../../lib/team-statistics";
import { normalizeSintaUrl, type AcademicEntry } from "../../lib/sinta-parser";

export async function importSinta(input: string) {
  await requireAdmin();
  try {
    const profileUrl = normalizeSintaUrl(input);
    const views = ["scopus", "services", "iprs"] as const;
    const results = await Promise.allSettled(views.map(view => fetchSintaView(profileUrl, view)));
    const data: Partial<Record<typeof views[number], AcademicEntry[]>> = {};
    const warnings: string[] = [];
    const statistics: SintaStatistics = {};
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        data[views[index]] = result.value.entries;
        Object.assign(statistics, result.value.statistics);
        if (!result.value.entries.length) warnings.push(`${views[index]}: tidak ada entri yang ditemukan; data lama dipertahankan.`);
      } else warnings.push(`SINTA ${views[index]}: ${result.reason instanceof Error ? result.reason.message : "tidak dapat diakses."}`);
    });
    return { profileUrl, data, statistics, warnings };
  } catch (error) { return { error: error instanceof Error ? error.message : "Gagal mengimpor SINTA." }; }
}
