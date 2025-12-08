export default function ChartsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Gráficas de Resultados</h2>
        <p className="text-muted-foreground mt-2">Visualización de datos históricos y tendencias del sistema.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Gráfica analítica</h3>
          <div className="bg-muted flex h-64 items-center justify-center rounded-lg">
            <p className="text-muted-foreground text-sm">
              Aquí se mostrará la gráfica de niveles de suministro de agua
            </p>
          </div>
          <p className="text-muted-foreground mt-3 text-sm">Nivel de suministro de agua</p>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Porcentaje de niveles de agua</h3>
          <div className="bg-muted flex h-64 items-center justify-center rounded-lg">
            <div className="text-center">
              <div className="text-primary text-6xl font-bold">70%</div>
              <p className="text-muted-foreground mt-2 text-sm">Porcentaje actual</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-6 shadow-sm md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">Comparativa de parámetros</h3>
          <div className="bg-muted flex h-64 items-center justify-center rounded-lg">
            <p className="text-muted-foreground text-sm">
              Gráfica de barras comparativa: pH, Turbidez, Niveles de agua
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          📊 <strong>Próximamente:</strong> Integración con librerías de gráficas (Chart.js, Recharts) para
          visualizaciones interactivas.
        </p>
      </div>
    </div>
  );
}
