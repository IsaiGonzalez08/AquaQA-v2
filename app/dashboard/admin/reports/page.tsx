"use client";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Reportes y Estadísticas</h1>
        <p className="mt-2 text-gray-400">Visualiza métricas y reportes del sistema</p>
      </div>

      {/* Report Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-4 text-xl font-semibold">📊 Actividad de Usuarios</h3>
          <div className="flex h-48 items-center justify-center rounded-lg bg-gray-800/50">
            <p className="text-gray-500">Gráfico de actividad</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-4 text-xl font-semibold">✅ Tests Completados</h3>
          <div className="flex h-48 items-center justify-center rounded-lg bg-gray-800/50">
            <p className="text-gray-500">Gráfico de tests</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-4 text-xl font-semibold">📈 Crecimiento</h3>
          <div className="flex h-48 items-center justify-center rounded-lg bg-gray-800/50">
            <p className="text-gray-500">Gráfico de crecimiento</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
          <h3 className="mb-4 text-xl font-semibold">⏱️ Tiempo Promedio</h3>
          <div className="flex h-48 items-center justify-center rounded-lg bg-gray-800/50">
            <p className="text-gray-500">Métricas de tiempo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
