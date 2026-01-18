import { NextResponse } from "next/server";
import { refreshUsecase } from "@/features/auth/application/refresh.usecase.server";

export async function POST() {
  try {
    const result = await refreshUsecase();
    return NextResponse.json(result);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "NO_REFRESH_TOKEN") {
      return NextResponse.json({ error: "No refresh token found" }, { status: 401 });
    }

    if (error instanceof Error && error.message === "INVALID_REFRESH_TOKEN") {
      return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
    }

    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
