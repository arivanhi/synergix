import type { KategoriProduk } from "@prisma/client";

export function portfolioMatchesTab(category: KategoriProduk, tab: string): boolean {
  if (category === "CAPSTONE_DESIGN") return false;
  if (tab === "Semua") return true;
  return ({ Paten: "PATEN", Publikasi: "PUBLIKASI", Produk: "PRODUK_BUATAN" } as Record<string, string>)[tab] === category;
}

export function portfolioCategoryLabel(category: KategoriProduk, values: Record<string, string>): string {
  const keys: Record<KategoriProduk, string> = {
    PRODUK_BUATAN: "portfolio_tab_Produk", CAPSTONE_DESIGN: "portofolio_PortofolioClient_3",
    PATEN: "portfolio_tab_Paten", PUBLIKASI: "portfolio_tab_Publikasi",
    HAK_CIPTA: "portfolio_copyright", DESAIN_INDUSTRI: "portfolio_industrial_design",
  };
  return values[keys[category]];
}

export function isRegisteredPortfolio(category: KategoriProduk): boolean {
  return ["PATEN", "HAK_CIPTA", "DESAIN_INDUSTRI"].includes(category);
}

export function normalizePortfolioSourceUrl(value?: string | null): string | null {
  const source = value?.trim();
  if (!source) return null;
  try {
    const url = new URL(source);
    if (source.length <= 512 && ["https:", "http:"].includes(url.protocol) && !url.username && !url.password) return source;
  } catch { /* Return the same validation error for malformed URLs. */ }
  throw new Error("URL sumber harus berupa tautan HTTP/HTTPS yang valid (maksimal 512 karakter).");
}
