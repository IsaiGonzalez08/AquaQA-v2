export default function AnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Análisis General</h2>
        <p className="text-muted-foreground mt-2">Vista detallada de todos los parámetros del sistema de monitoreo.</p>
      </div>

      <div className="bg-card rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Parámetros del agua</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">Temperatura</p>
                <p className="text-muted-foreground text-sm">Rango óptimo: 20-30°C</p>
              </div>
              <div className="text-right">
                <p className="text-primary text-2xl font-bold">28°C</p>
                <span className="text-xs font-medium text-green-600">Estable</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">Turbidez</p>
                <p className="text-muted-foreground text-sm">Máximo permitido: 5 NTU</p>
              </div>
              <div className="text-right">
                <p className="text-primary text-2xl font-bold">20%</p>
                <span className="text-xs font-medium text-green-600">Estable</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <p className="font-medium">Niveles de pH</p>
                <p className="text-muted-foreground text-sm">Rango óptimo: 6.5-8.5</p>
              </div>
              <div className="text-right">
                <p className="text-primary text-2xl font-bold">70%</p>
                <span className="text-xs font-medium text-green-600">Estable</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Niveles de agua</p>
                <p className="text-muted-foreground text-sm">Capacidad total</p>
              </div>
              <div className="text-right">
                <p className="text-primary text-2xl font-bold">50%</p>
                <span className="text-xs font-medium text-green-600">Estable</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
