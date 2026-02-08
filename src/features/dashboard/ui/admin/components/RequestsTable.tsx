import { Button } from "@/components/button";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Request } from "../types/request.types";
import { StatusBadge } from "./StatusBadge";
import Loading from "@/components/loading";

interface RequestsTableProps {
  requests: Request[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onViewDetails: (request: Request) => void;
  onPageChange: (page: number) => void;
}

export function RequestsTable({
  requests,
  isLoading,
  error,
  searchQuery,
  currentPage,
  totalPages,
  total,
  pageSize,
  onViewDetails,
  onPageChange,
}: RequestsTableProps) {
  const getWaitingTime = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays} día${diffDays > 1 ? "s" : ""} ${diffHours}h`;
    }
    return `${diffHours} hora${diffHours !== 1 ? "s" : ""}`;
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-96 items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex h-96 flex-col items-center justify-center">
        <p className="text-lg font-semibold">No se encontraron solicitudes</p>
        <p className="mt-2 text-sm text-muted-foreground">
          {searchQuery
            ? "Intenta con otros términos de búsqueda"
            : "No hay solicitudes con los filtros seleccionados"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Nombre</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Fecha</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Estado</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Tiempo en espera</th>
              <th className="px-6 py-4 text-right text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.map((request) => (
              <tr key={request.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium">
                    {request.name} {request.lastname}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground text-sm">{request.email}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    {new Date(request.createdAt).toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={request.status} />
                </td>
                <td className="px-6 py-4">
                  <div className="text-muted-foreground flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3" />
                    {getWaitingTime(request.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="secondary" onClick={() => onViewDetails(request)}>
                    Ver detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t px-6 py-4">
          <div className="text-muted-foreground text-sm">
            Mostrando {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, total)} de {total}{" "}
            solicitudes
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Anterior</span>
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1)
                .map((page, idx, arr) => (
                  <div key={page} className="flex items-center">
                    {idx > 0 && arr[idx - 1] !== page - 1 && (
                      <span className="text-muted-foreground px-2">...</span>
                    )}
                    <Button
                      variant={currentPage === page ? "primary" : "ghost"}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </Button>
                  </div>
                ))}
            </div>
            <Button
              variant="ghost"
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <span className="hidden sm:inline">Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
