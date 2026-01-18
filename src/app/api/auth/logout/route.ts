import { NextResponse } from "next/server";
import { logoutUseCase } from "@/features/auth/application/logout.usecase.server";

export async function POST() {
  const result = await logoutUseCase();
  return NextResponse.json(result);
}
