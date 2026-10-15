import { requireAdmin } from "../../../../lib/admin";
import { getOverview } from "../../../../lib/overview";
export async function GET() {
  try { await requireAdmin(); } catch { return Response.json({ error: "Tidak diizinkan." }, { status: 401 }); }
  return Response.json(await getOverview());
}
