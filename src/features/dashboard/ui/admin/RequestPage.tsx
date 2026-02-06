"use client";

import { Button } from "@/components/button";
import { useEffect, useState, useCallback } from "react";
import { Request, RequestStatus } from "./types/request.types";
import { getAllRequestsService, updateRequestStatusService } from "../../services/requestsHttp.service";
import { StatusBadge } from "./components/StatusBadge";
import { RequestDetailModal } from "./components/RequestDetailModal";
import { Clock, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "@/components/input";
import Loading from "@/components/loading";
import { useSearchParams } from "next/navigation";

export function RequestPage() {
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "ALL">("PENDING");
  const [searchQuery, setSearchQuery] = useState("");

  const pageSize = 10;

  const fetchRequests = useCallback(async () => {
    try {
      setIsLoading(true);
      const filterStatus = statusFilter === "ALL" ? undefined : statusFilter;
      const data = await getAllRequestsService(currentPage, pageSize, filterStatus);
      setRequests(data.data);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setError("Error al cargar las solicitudes");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, statusFilter]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  useEffect(() => {
    const requestId = searchParams.get("id");
    if (requestId && requests.length > 0) {
      const request = requests.find((r) => r.id === requestId);
      if (request) {
        setSelectedRequest(request);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, requests]);

  const handleStatusFilterChange = (status: RequestStatus | "ALL") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = async (requestId: string) => {
    try {
      setIsActionLoading(true);
      await updateRequestStatusService({ requestId, status: "APPROVED" });
      await fetchRequests();
      setIsModalOpen(false);
      setSelectedRequest(null);
    } catch (err) {
      console.error(err);
      alert("Error al aprobar la solicitud");
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleReject = async (requestId: string, reason: string) => {
    try {
      setIsActionLoading(true);
      await updateRequestStatusService({ requestId, status: "REJECTED", reason });
      await fetchRequests();
      setIsModalOpen(false);
      setSelectedRequest(null);
    } catch (err) {
      console.error(err);
      alert("Error al rechazar la solicitud");
    } finally {
      setIsActionLoading(false);
    }
  };

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

  const filteredRequests = requests.filter((request) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      request.name.toLowerCase().includes(query) ||
      request.lastname.toLowerCase().includes(query) ||
      request.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Gestión de Solicitudes</h1>
          <p className="text-muted-foreground mt-2">Administra las solicitudes de acceso al sistema</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="text-muted-foreground h-4 w-4" />
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "ALL" ? "primary" : "ghost"}
              onClick={() => handleStatusFilterChange("ALL")}
            >
              Todas
            </Button>
            <Button
              variant={statusFilter === "PENDING" ? "primary" : "ghost"}
              onClick={() => handleStatusFilterChange("PENDING")}
            >
              Pendientes
            </Button>
            <Button
              variant={statusFilter === "APPROVED" ? "primary" : "ghost"}
              onClick={() => handleStatusFilterChange("APPROVED")}
            >
              Aprobadas
            </Button>
            <Button
              variant={statusFilter === "REJECTED" ? "primary" : "ghost"}
              onClick={() => handleStatusFilterChange("REJECTED")}
            >
              Rechazadas
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        {isLoading ? (
          <div className="flex h-96 items-center justify-center">
            <Loading />
          </div>
        ) : error ? (
          <div className="flex h-96 items-center justify-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex h-96 flex-col items-center justify-center">
            <p className="text-lg font-semibold">No se encontraron solicitudes</p>
            <p className="text-muted-foreground mt-2 text-sm">
              {searchQuery
                ? "Intenta con otros términos de búsqueda"
                : "No hay solicitudes con los filtros seleccionados"}
            </p>
          </div>
        ) : (
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
                  {filteredRequests.map((request) => (
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
                        <Button variant="secondary" onClick={() => handleViewDetails(request)}>
                          Ver detalles
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between border-t px-6 py-4">
                <div className="text-muted-foreground text-sm">
                  Mostrando {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, total)} de {total}{" "}
                  solicitudes
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
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
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        </div>
                      ))}
                  </div>
                  <Button
                    variant="ghost"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <RequestDetailModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRequest(null);
        }}
        onApprove={handleApprove}
        onReject={handleReject}
        isLoading={isActionLoading}
      />
    </div>
  );
}
