import { verifyAccessToken, verifyRefreshToken } from "shared/utils/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const accessToken = request.cookies.get("access_token")?.value;
    const refreshToken = request.cookies.get("refresh_token")?.value;

    if (!accessToken) {
      if (refreshToken) {
        const payload = await verifyRefreshToken(refreshToken);

        if (payload) {
          return NextResponse.next();
        }
      }

      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    const isValidAccessToken = await verifyAccessToken(accessToken);

    if (!isValidAccessToken) {
      if (refreshToken) {
        const payload = await verifyRefreshToken(refreshToken);

        if (payload) {
          return NextResponse.next();
        }
      }

      return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/auth/login")) {
    const accessToken = request.cookies.get("access_token")?.value;

    if (accessToken) {
      const isValid = await verifyAccessToken(accessToken);
      if (isValid) {
        return NextResponse.redirect(new URL("/dashboard/user", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login"],
};
