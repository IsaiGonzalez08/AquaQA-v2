import { getCurrentUser } from "@/utils/auth";
import { updateRequestStatusInDB } from "../services/requestsRepository";

interface UpdateRequestStatusInput {
  requestId: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}

export async function updateRequestStatusUseCase(input: UpdateRequestStatusInput) {
  const admin = await getCurrentUser();

  if (!admin) {
    throw new Error("No autenticado");
  }

  if (admin.role !== "ADMIN") {
    throw new Error("No autorizado");
  }

  const { requestId, status, reason } = input;

  return updateRequestStatusInDB(requestId, status, reason);
}
