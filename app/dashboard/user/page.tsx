export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Bienvenido, <span className="text-primary">Usuario</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Aquí puedes ver un resumen general de tu sistema de monitoreo de agua.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-sm font-medium">Temperatura</h3>
            <span className="text-2xl">🌡️</span>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-bold">28°C</p>
            <p className="mt-1 text-xs text-green-600">Estable</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-sm font-medium">Nivel de pH</h3>
            <span className="text-2xl">💧</span>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-bold">7.2</p>
            <p className="mt-1 text-xs text-green-600">Óptimo</p>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-sm font-medium">Turbidez</h3>
            <span className="text-2xl">🔍</span>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-bold">3.5 NTU</p>
            <p className="mt-1 text-xs text-yellow-600">Aceptable</p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          💡 <strong>Tip:</strong> Usa el menú lateral para acceder al análisis detallado y las gráficas de resultados.
        </p>
      </div>
    </div>
  );
}
