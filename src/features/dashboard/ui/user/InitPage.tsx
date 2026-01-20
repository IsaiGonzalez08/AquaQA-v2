"use client";

import { useSelector } from "react-redux";
import { RootState } from "shared/store/store";

export function InitPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Bienvenido, {user?.name} 👋</h1>
        <p className="text-muted-foreground mt-2">Monitoreo en tiempo real de la calidad del agua</p>
      </div>
    </div>
  );
}
