"use client";

import { useEffect, useState } from "react";
import { Request } from "./types/request.types";
import { RequestDetailModal } from "./components/RequestDetailModal";
import { RequestFilters } from "./components/RequestFilters";
import { RequestsTable } from "./components/RequestsTable";
import { useRequests } from "../../application/useRequests.hook";
import { useRequestFilters } from "../../application/useRequestFilters.hook";
import { useRequestActions } from "../../application/useRequestActions.hook";
import { useToast } from "@/components/toast";
import { useSearchParams } from "next/navigation";

export function RequestPage() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { allRequests, isLoading, isRefreshing, error, lastFetchTime, updateRequestInCache, refetch } = useRequests();

  const {
    currentPage,
    setCurrentPage,
    statusFilter,
    setStatusFilter,
    searchQuery,
    setSearchQuery,
    filteredRequests,
    total,
    totalPages,
  } = useRequestFilters({ requests: allRequests, pageSize: 10 });

  const handleActionSuccess = async () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
    const result = await refetch();
    if (result.success) {
      showToast("success", "Solicitud actualizada correctamente");
    }
  };

  const handleActionError = (error: string) => {
    showToast("error", error);
  };

  const { isActionLoading, approveRequest, rejectRequest } = useRequestActions({
    onSuccess: handleActionSuccess,
    onError: handleActionError,
    updateCache: updateRequestInCache,
  });

  useEffect(() => {
    const requestId = searchParams.get("id");
    if (requestId && allRequests.length > 0) {
      const request = allRequests.find((r) => r.id === requestId);
      if (request) {
        setSelectedRequest(request);
        setIsModalOpen(true);
      }
    }
  }, [searchParams, allRequests]);

  const handleViewDetails = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApprove = async (requestId: string) => {
    await approveRequest(requestId);
  };

  const handleReject = async (requestId: string, reason: string) => {
    await rejectRequest(requestId, reason);
  };

  const handleManualRefresh = async () => {
    const result = await refetch();
    if (result.success) {
      showToast("success", "Solicitudes actualizadas correctamente");
    } else {
      showToast("error", result.error || "Error al actualizar solicitudes");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Gestión de Solicitudes</h1>
          <p className="text-muted-foreground mt-2">Administra las solicitudes de acceso al sistema</p>
        </div>
      </div>

      <RequestFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onRefresh={handleManualRefresh}
        isRefreshing={isRefreshing}
        lastFetchTime={lastFetchTime}
      />

      <div className="bg-card rounded-lg border shadow-sm">
        <RequestsTable
          requests={filteredRequests}
          isLoading={isLoading}
          error={error}
          searchQuery={searchQuery}
          currentPage={currentPage}
          totalPages={totalPages}
          total={total}
          pageSize={10}
          onViewDetails={handleViewDetails}
          onPageChange={setCurrentPage}
        />
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
