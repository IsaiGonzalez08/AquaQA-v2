"use client";

import { useSelector } from "react-redux";
import { RootState } from "shared/store/store";
import { useEffect, useState } from "react";
import { KPICard } from "./components/KPICard";
import { StatusBadge } from "./components/StatusBadge";
import { Request, RequestStats } from "./types/request.types";
import { getAllRequestsService, getRequestStatsService } from "../../services/requestsHttp.service";
import { Clock, CheckCircle, XCircle, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/button";
import Link from "next/link";
import Loading from "@/components/loading";

export function InitPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [stats, setStats] = useState<RequestStats | null>(null);
  const [recentRequests, setRecentRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsData, requestsData] = await Promise.all([
          getRequestStatsService(),
          getAllRequestsService(1, 5, "PENDING"),
        ]);
        setStats(statsData);
        setRecentRequests(requestsData.data);
      } catch (err) {
        setError("Error al cargar los datos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const getWaitingTime = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (diffDays > 0) {
      return `${diffDays}d ${diffHours}h`;
    }
    return `${diffHours}h`;
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Bienvenido, {user?.name} 👋</h1>
        <p className="text-muted-foreground mt-2">Panel de administración del sistema</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Solicitudes Pendientes" value={stats?.pending || 0} icon={Clock} iconColor="text-yellow-500" />
        <KPICard
          title="Usuarios Aprobados"
          value={stats?.approved || 0}
          icon={CheckCircle}
          iconColor="text-green-500"
        />
        <KPICard title="Usuarios Rechazados" value={stats?.rejected || 0} icon={XCircle} iconColor="text-red-500" />
        <KPICard title="Total de Usuarios" value={stats?.total || 0} icon={Users} iconColor="text-blue-500" />
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="border-b p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Solicitudes Pendientes Recientes</h2>
              <p className="text-muted-foreground mt-1 text-sm">
                Últimas {recentRequests.length} solicitudes que requieren atención
              </p>
            </div>
            <Link href="/dashboard/admin/request">
              <Button variant="ghost">
                Ver todas
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-6">
          {recentRequests.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-lg font-semibold">¡Todo al día!</h3>
              <p className="text-muted-foreground mt-2 text-sm">No hay solicitudes pendientes en este momento</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div
                  key={request.id}
                  className="hover:bg-muted/50 flex items-center justify-between rounded-lg border p-4 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">
                        {request.name} {request.lastname}
                      </h3>
                      <StatusBadge status={request.status} />
                    </div>
                    <p className="text-muted-foreground mt-1 text-sm">{request.email}</p>
                    <div className="text-muted-foreground mt-2 flex items-center gap-4 text-xs">
                      <span>
                        {new Date(request.createdAt).toLocaleDateString("es-MX", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Esperando {getWaitingTime(request.createdAt)}
                      </span>
                    </div>
                  </div>
                  <Link href={`/dashboard/admin/request?id=${request.id}`}>
                    <Button variant="secondary">Revisar</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
