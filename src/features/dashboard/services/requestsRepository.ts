import { prisma } from "@/server/db/prisma";
import { UserStatus } from "@prisma/client";

export interface GetAllRequestsParams {
  page: number;
  pageSize: number;
  status?: UserStatus;
}

export interface RequestStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export async function getAllRequestsFromDB(params: GetAllRequestsParams) {
  const { page, pageSize, status } = params;

  const where = {
    role: "USER" as const,
    ...(status && { status }),
  };

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      where,
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
    prisma.user.count({ where }),
  ]);

  return {
    data,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getRequestStatsFromDB(): Promise<RequestStats> {
  const [pending, approved, rejected, total] = await Promise.all([
    prisma.user.count({
      where: {
        role: "USER",
        status: "PENDING",
      },
    }),
    prisma.user.count({
      where: {
        role: "USER",
        status: "APPROVED",
      },
    }),
    prisma.user.count({
      where: {
        role: "USER",
        status: "REJECTED",
      },
    }),
    prisma.user.count({
      where: {
        role: "USER",
      },
    }),
  ]);

  return {
    pending,
    approved,
    rejected,
    total,
  };
}

export async function updateRequestStatusInDB(
  requestId: string,
  status: "APPROVED" | "REJECTED",
  reason?: string
) {
  const user = await prisma.user.findUnique({
    where: { id: requestId },
  });

  if (!user) {
    throw new Error("Solicitud no encontrada");
  }

  if (user.role !== "USER") {
    throw new Error("Solo se pueden actualizar solicitudes de usuarios");
  }

  return prisma.user.update({
    where: { id: requestId },
    data: {
      status,
      ...(reason && { problemDescription: reason }),
    },
  });
}
