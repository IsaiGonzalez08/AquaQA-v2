import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "@/utils/auth";

export async function POST(req: Request) {
  try {
    const { email, password, name, lastname, username } = await req.json();

    if (!email || !password || !name || !lastname || !username) {
      return NextResponse.json({ error: "Todos los campos son requeridos" }, { status: 400 });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({ error: "El usuario ya existe" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        lastname,
        username,
      },
    });

    const cookieStore = await cookies();

    const payload = {
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
    };

    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    cookieStore.set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15,
    });

    cookieStore.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return NextResponse.json(
      {
        message: "Usuario registrado exitosamente",
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          lastname: newUser.lastname,
          username: newUser.username,
          role: newUser.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json({ error: "Algo salió mal" }, { status: 500 });
  }
}
