import { prisma } from "@/server/db/prisma";
import { getCurrentUser } from "@/utils/auth";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const admin = await getCurrentUser();

  if (!admin) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  if (admin.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = Number(searchParams.get("page") ?? 1);
  const pageSize = 10;

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where: {
        role: "USER",
        status: "PENDING",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        email: true,
        name: true,
        lastname: true,
        problemDescription: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.user.count({
      where: {
        role: "USER",
        status: "PENDING",
      },
    }),
  ]);

  return NextResponse.json({
    page,
    pageSize,
    total,
    totalPages: Math.ceil(total / pageSize),
    data,
  });
}
