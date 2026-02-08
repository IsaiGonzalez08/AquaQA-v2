import { useState, useCallback } from "react";
import { updateRequestStatusService } from "../services/requestsHttp.service";
import { Request, RequestStatus } from "../ui/admin/types/request.types";

interface UseRequestActionsOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  updateCache?: (requestId: string, updates: Partial<Request>) => void;
}

export function useRequestActions(options: UseRequestActionsOptions = {}) {
  const { onSuccess, onError, updateCache } = options;
  const [isActionLoading, setIsActionLoading] = useState(false);

  const approveRequest = useCallback(async (requestId: string) => {
    try {
      setIsActionLoading(true);
      
      if (updateCache) {
        updateCache(requestId, { status: "APPROVED" as RequestStatus });
      }
      
      await updateRequestStatusService({ requestId, status: "APPROVED" });
      
      onSuccess?.();
      return { success: true };
    } catch (err) {
      const errorMessage = "Error al aprobar la solicitud";
      console.error(err);
      onError?.(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsActionLoading(false);
    }
  }, [updateCache, onSuccess, onError]);

  const rejectRequest = useCallback(async (requestId: string, reason: string) => {
    try {
      setIsActionLoading(true);
      
      if (updateCache) {
        updateCache(requestId, { status: "REJECTED" as RequestStatus });
      }
      
      await updateRequestStatusService({ requestId, status: "REJECTED", reason });
      
      onSuccess?.();
      return { success: true };
    } catch (err) {
      const errorMessage = "Error al rechazar la solicitud";
      console.error(err);
      onError?.(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsActionLoading(false);
    }
  }, [updateCache, onSuccess, onError]);

  return {
    isActionLoading,
    approveRequest,
    rejectRequest,
  };
}
