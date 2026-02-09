import { RequestsResponse, RequestStats, UpdateRequestStatusInput } from "../ui/admin/types/request.types";

export async function getAllRequestsService(
  page: number = 1,
  pageSize: number = 10,
  status?: string
): Promise<RequestsResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
  });

  if (status) {
    params.append("status", status);
  }

  const res = await fetch(`/api/dashboard/admin/users/requests?${params.toString()}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error al obtener solicitudes");
  }

  return res.json();
}

export async function getRequestStatsService(): Promise<RequestStats> {
  const res = await fetch("/api/dashboard/admin/users/requests/stats", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error al obtener estadísticas");
  }

  return res.json();
}

export async function updateRequestStatusService(
  input: UpdateRequestStatusInput
): Promise<void> {
  const res = await fetch(`/api/dashboard/admin/users/requests/${input.requestId}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      status: input.status,
      reason: input.reason,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al actualizar solicitud");
  }

  return res.json();
}
