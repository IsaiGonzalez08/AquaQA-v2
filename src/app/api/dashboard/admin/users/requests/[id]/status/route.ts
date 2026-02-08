import { NextResponse } from "next/server";
import { updateRequestStatusUseCase } from "@/features/dashboard/application/updateRequestStatus.usecase.server";

export const runtime = "nodejs";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status, reason } = body;

    if (!status || !["APPROVED", "REJECTED"].includes(status)) {
      return NextResponse.json(
        { error: "Estado inválido. Debe ser APPROVED o REJECTED" },
        { status: 400 }
      );
    }

    await updateRequestStatusUseCase({
      requestId: id,
      status,
      reason,
    });

    return NextResponse.json({ message: "Solicitud actualizada correctamente" }, { status: 200 });
  } catch (error) {
    console.error("UPDATE REQUEST STATUS ERROR:", error);

    if (error instanceof Error) {
      if (error.message === "No autenticado") {
        return NextResponse.json({ error: error.message }, { status: 401 });
      }
      if (error.message === "No autorizado") {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
      if (error.message === "Solicitud no encontrada") {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (error.message === "Solo se pueden actualizar solicitudes de usuarios") {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
    }

    return NextResponse.json({ error: "Error al actualizar solicitud" }, { status: 500 });
  }
}
