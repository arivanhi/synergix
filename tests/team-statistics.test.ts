import { test } from "node:test";
import assert from "node:assert/strict";
import { entrySignature, teamStatistics } from "../lib/team-statistics";
import { fetchSintaView } from "../lib/sinta-fetch";
import { validateTeam } from "../lib/team-input";
import { parseScopusTotal, sintaPageNumbers } from "../lib/sinta-parser";

const row = (title: string, kind = "") => `<div class="ar-list-item"><div class="ar-title"><a href="/record/${title}">${title}</a></div><span class="ar-quartile">${kind}</span></div>`;
test("Counts use the full Scopus Article total rather than four preview records or citation totals", async () => {
  const html = `<table><thead><tr><th></th><th>Scopus</th><th>GScholar</th></tr></thead><tbody><tr><td>Article</td><td>123</td><td>999</td></tr><tr><td>Citation</td><td>456</td><td>9999</td></tr></tbody></table>` + Array.from({ length: 10 }, (_, i) => row(String(i))).join("");
  assert.equal(parseScopusTotal(html), 123);
  const imported = await fetchSintaView("6956997", "scopus", async () => html);
  assert.equal(imported.entries.length, 4);
  const team = { nama: "Uji", peran: "ANGGOTA" as const, publikasi: imported.entries, sintaStatistik: imported.statistics, jumlahPublikasi: "999" };
  assert.equal(teamStatistics(team).publications, 123);
  assert.equal(validateTeam(team).jumlahPublikasi, "123");
});
test("IPR counting traverses pages, counts patents and simple patents, and excludes copyright", async () => {
  const imported = await fetchSintaView("6956997", "iprs", async url => url.includes("page=2") ? row("PatenKedua", "Paten Sederhana") : row("HakCipta", "Hak Cipta") + row("PatenPertama", "Paten") + '<a href="?view=iprs&page=2">2</a>');
  assert.equal(imported.entries.length, 3);
  const team = { nama: "Uji", peran: "ANGGOTA" as const, hakCipta: imported.entries, sintaStatistik: imported.statistics, paten: "999", riset: [{ judul: "Riset A" }, { judul: "Riset B" }] };
  assert.deepEqual(teamStatistics(team), { publications: 0, patents: 2, research: 2 });
  assert.equal(validateTeam(team).paten, "2");
  assert.deepEqual(sintaPageNumbers('<a href="https://evil.example/?view=iprs&page=3">3</a><a href="?view=scopus&page=4">4</a>', 'https://sinta.kemdiktisaintek.go.id/authors/profile/6956997/?view=iprs'), []);
});
test("A stale zero Scopus summary does not discard articles visible in the source", async () => {
  const summary = '<table><thead><tr><th></th><th>Scopus</th></tr></thead><tbody><tr><td>Article</td><td>0</td></tr></tbody></table>';
  const first = summary + Array.from({ length: 5 }, (_, i) => row(String(i))).join('') + '<a href="?view=scopus&page=2">2</a>';
  const imported = await fetchSintaView('6145883', 'scopus', async url => url.includes('page=2') ? row('5') : first);
  assert.equal(imported.entries.length, 4);
  assert.equal(teamStatistics({ publikasi: imported.entries, sintaStatistik: imported.statistics }).publications, 6);
});
test("Editing the imported list recalculates local counts and never retains an unrelated source total", () => {
  const publikasi = [{ judul: "Artikel", jurnal: "" }];
  const sintaStatistik = { publications: { total: 25, signature: entrySignature(publikasi) } };
  assert.equal(teamStatistics({ publikasi, sintaStatistik }).publications, 25);
  assert.equal(teamStatistics({ publikasi: [...publikasi, { judul: "Artikel baru", jurnal: "" }], sintaStatistik }).publications, 2);
  assert.equal(teamStatistics({ publikasi: [], sintaStatistik, riset: [{ judul: "" }] }).research, 0);
});
test("Over-limit pagination aborts instead of reporting a partial patent count", async () => {
  await assert.rejects(fetchSintaView("6956997", "iprs", async () => row("Paten", "Paten") + '<a href="?view=iprs&page=21">21</a>'), /20 halaman/);
});
