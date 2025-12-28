import { NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "No autenticado" }, { status: 401 });
    }

    return NextResponse.json(
      {
        userId: user.userId,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET CURRENT USER ERROR:", error);
    return NextResponse.json({ error: "Error al obtener usuario" }, { status: 500 });
  }
}
