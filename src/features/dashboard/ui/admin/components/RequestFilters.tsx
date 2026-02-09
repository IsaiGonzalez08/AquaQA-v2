import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Search, Filter, RefreshCw } from "lucide-react";
import { RequestStatus } from "../types/request.types";

interface RequestFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: RequestStatus | "ALL";
  onStatusFilterChange: (status: RequestStatus | "ALL") => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastFetchTime: Date | null;
}

export function RequestFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onRefresh,
  isRefreshing,
  lastFetchTime,
}: RequestFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Actualizar solicitudes"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
          
          {lastFetchTime && (
            <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:inline">
              Actualizado: {lastFetchTime.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Filter className="h-4 w-4 text-muted-foreground mt-2 shrink-0" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          <Button
            variant={statusFilter === "ALL" ? "primary" : "ghost"}
            onClick={() => onStatusFilterChange("ALL")}
            className="w-full"
          >
            Todas
          </Button>
          <Button
            variant={statusFilter === "PENDING" ? "primary" : "ghost"}
            onClick={() => onStatusFilterChange("PENDING")}
            className="w-full"
          >
            Pendientes
          </Button>
          <Button
            variant={statusFilter === "APPROVED" ? "primary" : "ghost"}
            onClick={() => onStatusFilterChange("APPROVED")}
            className="w-full"
          >
            Aprobadas
          </Button>
          <Button
            variant={statusFilter === "REJECTED" ? "primary" : "ghost"}
            onClick={() => onStatusFilterChange("REJECTED")}
            className="w-full"
          >
            Rechazadas
          </Button>
        </div>
      </div>
    </div>
  );
}
