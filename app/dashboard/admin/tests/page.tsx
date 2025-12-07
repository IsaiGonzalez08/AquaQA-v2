"use client";

import { Button } from "@/components/ui/button";

export default function TestsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Gestión de Tests</h1>
          <p className="mt-2 text-gray-400">Administra todos los tests del sistema</p>
        </div>
        <Button variant="primary">➕ Nuevo Test</Button>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center rounded-lg border border-gray-800 bg-gray-900/50 p-12">
        <div className="mb-4 text-6xl">📝</div>
        <h2 className="mb-2 text-2xl font-semibold">No hay tests creados</h2>
        <p className="mb-6 text-gray-400">Comienza creando tu primer test para los usuarios</p>
        <Button variant="primary">Crear Primer Test</Button>
      </div>
    </div>
  );
}
