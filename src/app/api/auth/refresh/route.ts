import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyRefreshToken, signAccessToken } from "@/utils/auth";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: "No refresh token found" }, { status: 401 });
    }

    const payload = await verifyRefreshToken(refreshToken);

    if (!payload) {
      cookieStore.delete("refresh_token");
      cookieStore.delete("access_token");
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    const newAccessToken = await signAccessToken(payload);

    cookieStore.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    return NextResponse.json({ message: "Token refreshed successfully" }, { status: 200 });
  } catch (error) {
    console.error("REFRESH TOKEN ERROR:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
