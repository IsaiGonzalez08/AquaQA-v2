import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authenticateRequest } from "@/lib/auth";

export async function GET(req: Request, context: { params: Promise<{ id: string }> }) {
  const authResult = authenticateRequest(req);
  if (!authResult.success) {
    return authResult.response;
  }

  try {
    const { id } = await context.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        lastname: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("GET USER ERROR:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
