import { RequestStatus } from "../types/request.types";

interface StatusBadgeProps {
  status: RequestStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const statusConfig = {
    PENDING: {
      label: "Pendiente",
      className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    },
    APPROVED: {
      label: "Aprobado",
      className: "bg-green-500/10 text-green-500 border-green-500/20",
    },
    REJECTED: {
      label: "Rechazado",
      className: "bg-red-500/10 text-red-500 border-red-500/20",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}
