import { NextResponse } from "next/server";
import { loginUseCase } from "@/features/auth/application/login.usecase.server";
import { InvalidCredentialsError, MissingCredentialsError } from "@/features/auth/domain/authErrors";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await loginUseCase(body);

    return NextResponse.json({ message: "Login successful", user }, { status: 200 });
  } catch (error) {
    if (error instanceof MissingCredentialsError) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    if (error instanceof InvalidCredentialsError) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.error("LOGIN ERROR:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
