"use client";

import { Button } from "@/components/ui/button";

export function RequestPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Gestión de Usuarios</h1>
          <p className="mt-2 text-gray-400">Administra todos los usuarios del sistema</p>
        </div>
        <Button variant="primary">➕ Nuevo Usuario</Button>
      </div>
    </div>
  );
}
