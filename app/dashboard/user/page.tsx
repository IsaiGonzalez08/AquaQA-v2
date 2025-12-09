"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function UserDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div>
      <h1 className="text-4xl font-bold mt-10">Bienvenido, {user?.name} 👋</h1>
      <p className="mt-2 text-gray-400">Aquí está tu resumen de actividad</p>
    </div>
  );
}
