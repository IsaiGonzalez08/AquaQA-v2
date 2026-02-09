import { useState, useCallback, useEffect, useRef } from "react";
import { Request, RequestStatus } from "../ui/admin/types/request.types";
import { getAllRequestsService } from "../services/requestsHttp.service";

interface UseRequestsOptions {
  pollingInterval?: number;
  pageSize?: number;
}

export function useRequests(options: UseRequestsOptions = {}) {
  const { pollingInterval = 2 * 60 * 1000, pageSize = 1000 } = options;

  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchAllRequests = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }
      
      const data = await getAllRequestsService(1, pageSize);
      setAllRequests(data.data);
      setLastFetchTime(new Date());
      setError(null);
      
      return { success: true, data: data.data };
    } catch (err) {
      const errorMessage = "Error al cargar las solicitudes";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchAllRequests();

    if (pollingInterval > 0) {
      pollingIntervalRef.current = setInterval(() => {
        fetchAllRequests(false);
      }, pollingInterval);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchAllRequests, pollingInterval]);

  const updateRequestInCache = useCallback((requestId: string, updates: Partial<Request>) => {
    setAllRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, ...updates } : req
      )
    );
  }, []);

  const refetch = useCallback(() => {
    return fetchAllRequests(false);
  }, [fetchAllRequests]);

  return {
    allRequests,
    isLoading,
    isRefreshing,
    error,
    lastFetchTime,
    updateRequestInCache,
    refetch,
  };
}
