import { NextResponse } from "next/server";
import { registerUseCase } from "@/features/auth/application/register.usecase.server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await registerUseCase(body);

    return NextResponse.json(
      {
        message: "Usuario registrado exitosamente",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    const message = error instanceof Error ? error.message : "Algo salió mal";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
