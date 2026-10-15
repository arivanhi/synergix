import { requireAdmin } from "../../../../lib/admin";
import { promises as fs } from "node:fs";
import path from "node:path";
import { mimeTypes } from "../../../../lib/upload-file";
export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  try { await requireAdmin(); } catch { return new Response("Tidak diizinkan", { status: 401 }); }
  const { filename } = await params;
  if (!/^[a-zA-Z0-9_-]+\.(pdf|png|jpg|jpeg|gif|webp)$/.test(filename)) return new Response("Tidak ditemukan", { status: 404 });
  try {
    const buffer = await fs.readFile(path.join(process.cwd(), "private-uploads", filename));
    return new Response(buffer, { headers: { "Content-Type": mimeTypes[path.extname(filename)] || "application/octet-stream", "Content-Disposition": `inline; filename="${filename}"`, "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
  } catch { return new Response("Tidak ditemukan", { status: 404 }); }
}
