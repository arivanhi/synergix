export async function GET() {
  return Response.json({ error: "Inisialisasi admin tersedia melalui npm run admin:create di server." }, { status: 410 });
}
