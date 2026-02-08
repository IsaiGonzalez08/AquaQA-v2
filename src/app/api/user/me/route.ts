import { meUseCase } from "@/features/dashboard/application/me.usecase.server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await meUseCase();
    return NextResponse.json(user);
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
  }
}
