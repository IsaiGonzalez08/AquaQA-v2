"use client";

import React, { createContext, useContext, useCallback, useRef, useState, useEffect } from "react";
import { Request, RequestStats } from "../ui/admin/types/request.types";
import { getAllRequestsService, getRequestStatsService } from "../services/requestsHttp.service";

interface RequestsContextType {
  allRequests: Request[];
  stats: RequestStats | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  lastFetchTime: Date | null;
  refetch: () => Promise<{ success: boolean; error?: string }>;
  updateRequestInCache: (requestId: string, updates: Partial<Request>) => void;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export function useRequestsContext() {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error("useRequestsContext must be used within RequestsProvider");
  }
  return context;
}

interface RequestsProviderProps {
  children: React.ReactNode;
  pollingInterval?: number;
}

export function RequestsProvider({ children, pollingInterval = 2 * 60 * 1000 }: RequestsProviderProps) {
  const [allRequests, setAllRequests] = useState<Request[]>([]);
  const [stats, setStats] = useState<RequestStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<Date | null>(null);
  
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasFetchedRef = useRef(false);

  const fetchData = useCallback(async (showLoader = true) => {
    try {
      if (showLoader) {
        setIsLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const [requestsData, statsData] = await Promise.all([
        getAllRequestsService(1, 1000),
        getRequestStatsService(),
      ]);

      setAllRequests(requestsData.data);
      setStats(statsData);
      setLastFetchTime(new Date());
      setError(null);
      hasFetchedRef.current = true;

      return { success: true };
    } catch (err) {
      const errorMessage = "Error al cargar los datos";
      setError(errorMessage);
      console.error(err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      fetchData();
    }

    if (pollingInterval > 0) {
      pollingIntervalRef.current = setInterval(() => {
        fetchData(false);
      }, pollingInterval);
    }

    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, [fetchData, pollingInterval]);

  const updateRequestInCache = useCallback((requestId: string, updates: Partial<Request>) => {
    setAllRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, ...updates } : req))
    );
  }, []);

  const refetch = useCallback(() => {
    return fetchData(false);
  }, [fetchData]);

  const value: RequestsContextType = {
    allRequests,
    stats,
    isLoading,
    isRefreshing,
    error,
    lastFetchTime,
    refetch,
    updateRequestInCache,
  };

  return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
}
