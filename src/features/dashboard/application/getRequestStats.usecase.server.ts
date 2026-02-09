import { getCurrentUser } from "@/utils/auth";
import { getRequestStatsFromDB } from "../services/requestsRepository";

export async function getRequestStatsUseCase() {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("No autenticado");
  }

  if (admin.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  return getRequestStatsFromDB();
}
