import { getCurrentUser } from "@/utils/auth";
import { NextResponse } from "next/server";

export async function meUseCase() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("No autenticado");
  }

  return {
    userId: user.userId,
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    role: user.role,
    createdAt: user.createdAt,
  };
}
