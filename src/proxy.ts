import { verifyAccessToken, verifyRefreshToken, signAccessToken } from "shared/utils/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload) return NextResponse.next();
  }

  if (refreshToken) {
    const payload = await verifyRefreshToken(refreshToken);
    if (payload) {
      const newAccessToken = await signAccessToken(payload);
      const response = NextResponse.next();
      response.cookies.set("access_token", newAccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      return response;
    }
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*"],
};