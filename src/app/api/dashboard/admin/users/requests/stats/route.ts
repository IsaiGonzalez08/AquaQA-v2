import { NextResponse } from "next/server";
import { getRequestStatsUseCase } from "@/features/dashboard/application/getRequestStats.usecase.server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const stats = await getRequestStatsUseCase();

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("GET REQUEST STATS ERROR:", error);

    if (error instanceof Error) {
      if (error.message === "No autenticado") {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "No autorizado") {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }

    return NextResponse.json({ error: "Error al obtener estadísticas" }, { status: 500 });
  }
}
