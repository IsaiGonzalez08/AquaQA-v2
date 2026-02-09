import { NextResponse } from "next/server";
import { getAllRequestsUseCase } from "@/features/dashboard/application/getAllRequests.usecase.server";
import { UserStatus } from "@prisma/client";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") ?? 1);
    const pageSize = Number(searchParams.get("pageSize") ?? 10);
    const statusParam = searchParams.get("status");

    let status: UserStatus | undefined;
    if (statusParam && ["PENDING", "APPROVED", "REJECTED"].includes(statusParam)) {
      status = statusParam as UserStatus;
    }

    const result = await getAllRequestsUseCase({ page, pageSize, status });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("GET ALL REQUESTS ERROR:", error);

    if (error instanceof Error) {
      if (error.message === "No autenticado") {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "No autorizado") {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }

    return NextResponse.json({ error: "Error al obtener solicitudes" }, { status: 500 });
  }
}
