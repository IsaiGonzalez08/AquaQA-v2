"use client";

import { useAuth } from "@/hooks/useAuth";
import { fetchWithAuth } from "@/lib/api";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTests: 0,
    activeToday: 0,
  });
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchWithAuth("/api/user/getUser");
      const data = await response.json();
      setUsers(data.users);
      setStats((prev) => ({ ...prev, totalUsers: data.count }));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Panel de Administración</h1>
        <p className="mt-2 text-gray-400">Bienvenido al panel de control, {user?.name}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-blue-500/10 to-transparent p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-2xl">👥</div>
            <div>
              <p className="text-sm text-gray-400">Total Usuarios</p>
              <p className="text-3xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-green-500/10 to-transparent p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20 text-2xl">📝</div>
            <div>
              <p className="text-sm text-gray-400">Total Tests</p>
              <p className="text-3xl font-bold">{stats.totalTests}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gradient-to-br from-purple-500/10 to-transparent p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/20 text-2xl">🟢</div>
            <div>
              <p className="text-sm text-gray-400">Activos Hoy</p>
              <p className="text-3xl font-bold">{stats.activeToday}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Usuarios Recientes</h2>
        {loading ? (
          <p className="text-gray-400">Cargando usuarios...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                  <th className="pb-3">Nombre</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Username</th>
                  <th className="pb-3">Fecha de Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.slice(0, 5).map((u) => (
                  <tr key={u.id} className="text-sm">
                    <td className="py-3 font-medium">{u.name}</td>
                    <td className="py-3 text-gray-400">{u.email}</td>
                    <td className="py-3 text-gray-400">@{u.username}</td>
                    <td className="py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-3 text-xl font-semibold">Acciones Rápidas</h3>
          <div className="space-y-2">
            <button className="bg-primary hover:bg-primary/80 w-full rounded-lg px-4 py-3 text-left font-medium transition-colors">
              ➕ Crear Nuevo Usuario
            </button>
            <button className="w-full rounded-lg bg-gray-800 px-4 py-3 text-left font-medium transition-colors hover:bg-gray-700">
              📊 Ver Todos los Reportes
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-3 text-xl font-semibold">Actividad del Sistema</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-green-500">●</span>
              <span>Sistema operando normalmente</span>
            </div>
            <div className="flex items-center gap-3 text-gray-400">
              <span className="text-blue-500">●</span>
              <span>Última actualización: Hoy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
