"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export default function UserDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    testsCompleted: 0,
    testsInProgress: 0,
    lastActivity: new Date().toLocaleDateString(),
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Bienvenido, {user?.name} 👋</h1>
        <p className="mt-2 text-gray-400">Aquí está tu resumen de actividad</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/10 text-2xl">✅</div>
            <div>
              <p className="text-sm text-gray-400">Tests Completados</p>
              <p className="text-3xl font-bold">{stats.testsCompleted}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-2xl">⏳</div>
            <div>
              <p className="text-sm text-gray-400">En Progreso</p>
              <p className="text-3xl font-bold">{stats.testsInProgress}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10 text-2xl">📅</div>
            <div>
              <p className="text-sm text-gray-400">Última Actividad</p>
              <p className="text-lg font-bold">{stats.lastActivity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Info Card */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Tu Información</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">Nombre Completo</p>
            <p className="text-lg font-medium">
              {user?.name} {user?.lastname}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-lg font-medium">@{user?.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">ID de Usuario</p>
            <p className="font-mono text-sm text-gray-300">{user?.id}</p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Actividad Reciente</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 rounded-lg bg-gray-800/50 p-4">
            <div className="text-2xl">🎯</div>
            <div className="flex-1">
              <p className="font-medium">Sin actividad reciente</p>
              <p className="text-sm text-gray-400">Comienza creando tu primer test</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
