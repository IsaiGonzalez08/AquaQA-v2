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
      <h1 className="text-4xl font-bold">Bienvenido, {user?.name} 👋</h1>
      <p className="mt-2 text-gray-400">Aquí está tu resumen de actividad</p>
    </div>
  );
}
