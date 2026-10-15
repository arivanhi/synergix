import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin") && !token) return NextResponse.redirect(new URL("/login", request.url));
  if (pathname === "/login" && token) return NextResponse.redirect(new URL("/admin", request.url));
  return NextResponse.next();
}
export const config = { matcher: ["/admin/:path*", "/login"] };
