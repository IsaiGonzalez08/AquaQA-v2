export type RequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Request {
  id: string;
  email: string;
  name: string;
  lastname: string;
  problemDescription: string | null;
  status: RequestStatus;
  createdAt: string;
}

export interface RequestsResponse {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  data: Request[];
}

export interface RequestStats {
  pending: number;
  approved: number;
  rejected: number;
  total: number;
}

export interface UpdateRequestStatusInput {
  requestId: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}
