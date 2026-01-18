import { NextResponse } from "next/server";
import { registerUseCase } from "@/features/auth/application/register.usecase.server";
import { mapAuthErrorToHttp } from "@/features/auth/application/authErrorMapper";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await registerUseCase(body);

    return NextResponse.json({ message: "Register successful", user }, { status: 201 });
  } catch (error) {
    const { status, body } = mapAuthErrorToHttp(error);
    
    return NextResponse.json(body, { status });
  }
}
