import test from "node:test";
import assert from "node:assert/strict";
import { normalizePortfolioSourceUrl, portfolioMatchesTab } from "../lib/portfolio-model";

test("publication filter includes media and keeps capstone and other HKI in their categories", () => {
  assert.equal(portfolioMatchesTab("PUBLIKASI", "Publikasi"), true);
  assert.equal(portfolioMatchesTab("PRODUK_BUATAN", "Publikasi"), false);
  assert.equal(portfolioMatchesTab("HAK_CIPTA", "Paten"), false);
  assert.equal(portfolioMatchesTab("DESAIN_INDUSTRI", "Semua"), true);
  assert.equal(portfolioMatchesTab("CAPSTONE_DESIGN", "Semua"), false);
});

test("source links permit clearing and reject executable or credential URLs", () => {
  assert.equal(normalizePortfolioSourceUrl("  https://dinus.ac.id/berita/  "), "https://dinus.ac.id/berita/");
  assert.equal(normalizePortfolioSourceUrl(""), null);
  for (const value of ["javascript:alert(1)", "//evil.example", "https://user:password@example.com", "https://example.com/" + "x".repeat(512)]) {
    assert.throws(() => normalizePortfolioSourceUrl(value));
  }
});
