import { NextResponse } from "next/server";
import { loginUseCase } from "@/features/auth/application/login.usecase.server";
import { mapAuthErrorToHttp } from "@/features/auth/domain/authErrorMapper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await loginUseCase(body);

    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (error) {
    const { status, body } = mapAuthErrorToHttp(error);

    return NextResponse.json(body, { status });
  }
}
