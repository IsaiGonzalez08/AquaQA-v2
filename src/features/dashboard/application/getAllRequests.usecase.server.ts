import { getCurrentUser } from "@/utils/auth";
import { getAllRequestsFromDB } from "../services/requestsRepository";
import { UserStatus } from "@prisma/client";

interface GetAllRequestsInput {
  page: number;
  pageSize: number;
  status?: UserStatus;
}

export async function getAllRequestsUseCase(input: GetAllRequestsInput) {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("No autenticado");
  }

  if (admin.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  return getAllRequestsFromDB(input);
}
