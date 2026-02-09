import { useState, useMemo } from "react";
import { Request, RequestStatus } from "../ui/admin/types/request.types";

interface UseRequestFiltersOptions {
  requests: Request[];
  pageSize?: number;
}

export function useRequestFilters({ requests, pageSize = 10 }: UseRequestFiltersOptions) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<RequestStatus | "ALL">("PENDING");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndPaginatedRequests = useMemo(() => {
    let filtered = requests;

    if (statusFilter !== "ALL") {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(req => 
        req.name.toLowerCase().includes(query) ||
        req.lastname.toLowerCase().includes(query) ||
        req.email.toLowerCase().includes(query)
      );
    }

    const total = filtered.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return { data: paginatedData, total, totalPages };
  }, [requests, statusFilter, searchQuery, currentPage, pageSize]);

  const handleStatusFilterChange = (status: RequestStatus | "ALL") => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,
    statusFilter,
    setStatusFilter: handleStatusFilterChange,
    searchQuery,
    setSearchQuery: handleSearchChange,
    filteredRequests: filteredAndPaginatedRequests.data,
    total: filteredAndPaginatedRequests.total,
    totalPages: filteredAndPaginatedRequests.totalPages,
  };
}
