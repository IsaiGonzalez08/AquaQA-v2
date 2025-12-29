"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
  BarChart,
  Bar,
  Brush,
  Legend,
  ComposedChart,
  Area,
} from "recharts";
import {
  Thermometer,
  Droplets,
  Waves,
  Magnet,
  Calendar,
  Filter,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  AlertTriangle,
  ChevronDown,
  Check,
  Clock,
  TrendingUp,
  BarChart3,
  Table,
  Layers,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Resolution = "raw" | "minute" | "hour";
type ViewMode = "single" | "compare" | "histogram";

interface SensorConfig {
  id: string;
  name: string;
  unit: string;
  icon: React.ElementType;
  color: string;
  minOptimal: number;
  maxOptimal: number;
}

interface DataPoint {
  timestamp: string;
  time: string;
  temperature: number;
  ph: number;
  turbidity: number;
  magnetism: number;
}

interface AlertEvent {
  id: string;
  sensor: string;
  startTime: string;
  endTime: string;
  startIndex: number;
  endIndex: number;
  type: "warning" | "critical";
  message: string;
}

interface HistoricalRecord {
  timestamp: string;
  sensor: string;
  value: number;
  status: "normal" | "warning" | "critical";
  event: string | null;
}

const SENSORS: SensorConfig[] = [
  {
    id: "temperature",
    name: "Temperatura",
    unit: "°C",
    icon: Thermometer,
    color: "#3b82f6",
    minOptimal: 18,
    maxOptimal: 28,
  },
  { id: "ph", name: "pH", unit: "", icon: Droplets, color: "#22c55e", minOptimal: 6.5, maxOptimal: 8.5 },
  { id: "turbidity", name: "Turbidez", unit: "NTU", icon: Waves, color: "#f59e0b", minOptimal: 0, maxOptimal: 25 },
  { id: "magnetism", name: "Magnetismo", unit: "μT", icon: Magnet, color: "#a855f7", minOptimal: 25, maxOptimal: 65 },
];

const generateTimeSeriesData = (hours: number = 24): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();

  for (let i = hours * 4; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 15 * 60 * 1000);
    const noise = Math.sin(i / 10) * 3;

    data.push({
      timestamp: time.toISOString(),
      time: time.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      temperature: 23 + noise + (Math.random() - 0.5) * 4,
      ph: 7.0 + noise / 10 + (Math.random() - 0.5) * 0.8,
      turbidity: 15 + Math.abs(noise) * 2 + Math.random() * 10,
      magnetism: 45 + noise * 2 + (Math.random() - 0.5) * 15,
    });
  }

  return data;
};

const generateAlertEvents = (): AlertEvent[] => [
  {
    id: "1",
    sensor: "temperature",
    startTime: "08:30",
    endTime: "09:15",
    startIndex: 20,
    endIndex: 23,
    type: "warning",
    message: "Temperatura elevada",
  },
  {
    id: "2",
    sensor: "ph",
    startTime: "14:00",
    endTime: "14:45",
    startIndex: 42,
    endIndex: 45,
    type: "critical",
    message: "pH fuera de rango crítico",
  },
  {
    id: "3",
    sensor: "turbidity",
    startTime: "18:30",
    endTime: "19:00",
    startIndex: 60,
    endIndex: 62,
    type: "warning",
    message: "Turbidez alta",
  },
];

const generateHistogramData = (sensorId: string, data: DataPoint[]) => {
  const values = data.map((d) => d[sensorId as keyof DataPoint] as number);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binCount = 15;
  const binSize = (max - min) / binCount;

  const bins = Array.from({ length: binCount }, (_, i) => ({
    range: `${(min + i * binSize).toFixed(1)}`,
    count: 0,
    binStart: min + i * binSize,
    binEnd: min + (i + 1) * binSize,
  }));

  values.forEach((v) => {
    const binIndex = Math.min(Math.floor((v - min) / binSize), binCount - 1);
    if (binIndex >= 0) bins[binIndex].count++;
  });

  return bins;
};

const generateHistoricalRecords = (data: DataPoint[], events: AlertEvent[]): HistoricalRecord[] => {
  const records: HistoricalRecord[] = [];

  data.slice(0, 50).forEach((point, index) => {
    SENSORS.forEach((sensor) => {
      const value = point[sensor.id as keyof DataPoint] as number;
      let status: "normal" | "warning" | "critical" = "normal";
      let event: string | null = null;

      if (value < sensor.minOptimal * 0.8 || value > sensor.maxOptimal * 1.2) {
        status = "critical";
      } else if (value < sensor.minOptimal || value > sensor.maxOptimal) {
        status = "warning";
      }

      const matchingEvent = events.find((e) => e.sensor === sensor.id && index >= e.startIndex && index <= e.endIndex);
      if (matchingEvent) {
        event = matchingEvent.message;
        status = matchingEvent.type === "critical" ? "critical" : "warning";
      }

      if (status !== "normal" || Math.random() > 0.7) {
        records.push({
          timestamp: point.timestamp,
          sensor: sensor.name,
          value: parseFloat(value.toFixed(2)),
          status,
          event,
        });
      }
    });
  });

  return records.slice(0, 30);
};

const SensorCheckbox = ({
  sensor,
  selected,
  onToggle,
}: {
  sensor: SensorConfig;
  selected: boolean;
  onToggle: () => void;
}) => {
  const Icon = sensor.icon;
  return (
    <button
      onClick={onToggle}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-muted hover:border-primary/50 hover:bg-muted/50"
      }`}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded ${
          selected ? "bg-primary text-primary-foreground" : "border"
        }`}
      >
        {selected && <Check className="h-3 w-3" />}
      </div>
      <Icon className="h-4 w-4" style={{ color: sensor.color }} />
      <span>{sensor.name}</span>
    </button>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-card rounded-lg border p-3 shadow-lg">
      <p className="mb-2 text-sm font-medium">{label}</p>
      {payload.map((entry, index) => {
        const sensor = SENSORS.find((s) => s.id === entry.name || s.name === entry.name);
        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-muted-foreground">{sensor?.name || entry.name}:</span>
            <span className="font-medium">
              {entry.value.toFixed(2)}
              {sensor?.unit}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export function ResultChartsPage() {
  const [selectedSensors, setSelectedSensors] = useState<string[]>(["temperature", "ph"]);
  const [resolution, setResolution] = useState<Resolution>("raw");
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [showFilters, setShowFilters] = useState(true);
  const [showEvents, setShowEvents] = useState(true);
  const [dateRange, setDateRange] = useState({ start: "2024-12-24", end: "2024-12-25" });
  const [zoomDomain, setZoomDomain] = useState<{ start: number; end: number } | null>(null);

  const timeSeriesData = useMemo(() => generateTimeSeriesData(24), []);
  const alertEvents = useMemo(() => generateAlertEvents(), []);
  const historicalRecords = useMemo(
    () => generateHistoricalRecords(timeSeriesData, alertEvents),
    [timeSeriesData, alertEvents]
  );

  const toggleSensor = (sensorId: string) => {
    setSelectedSensors((prev) =>
      prev.includes(sensorId) ? prev.filter((id) => id !== sensorId) : [...prev, sensorId]
    );
  };

  const handleZoomIn = () => {
    const dataLength = timeSeriesData.length;
    const currentStart = zoomDomain?.start ?? 0;
    const currentEnd = zoomDomain?.end ?? dataLength - 1;
    const range = currentEnd - currentStart;
    const newRange = Math.max(range * 0.5, 10);
    const center = (currentStart + currentEnd) / 2;
    setZoomDomain({
      start: Math.max(0, Math.floor(center - newRange / 2)),
      end: Math.min(dataLength - 1, Math.ceil(center + newRange / 2)),
    });
  };

  const handleZoomOut = () => {
    const dataLength = timeSeriesData.length;
    if (!zoomDomain) return;
    const range = zoomDomain.end - zoomDomain.start;
    const newRange = Math.min(range * 2, dataLength);
    const center = (zoomDomain.start + zoomDomain.end) / 2;
    setZoomDomain({
      start: Math.max(0, Math.floor(center - newRange / 2)),
      end: Math.min(dataLength - 1, Math.ceil(center + newRange / 2)),
    });
  };

  const handleResetZoom = () => setZoomDomain(null);

  const displayData = useMemo(() => {
    if (!zoomDomain) return timeSeriesData;
    return timeSeriesData.slice(zoomDomain.start, zoomDomain.end + 1);
  }, [timeSeriesData, zoomDomain]);

  const resolutionOptions = [
    { value: "raw", label: "Crudo (15 min)" },
    { value: "minute", label: "Por minuto" },
    { value: "hour", label: "Por hora" },
  ];

  const viewModeOptions = [
    { value: "single", label: "Series de tiempo", icon: TrendingUp },
    { value: "compare", label: "Comparación", icon: Layers },
    { value: "histogram", label: "Distribución", icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gráficas de Resultados</h2>
          <p className="text-muted-foreground mt-1">Análisis detallado del comportamiento histórico de los sensores</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="grid gap-6 lg:grid-cols-4">
              {/* Date Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Rango de fechas</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, start: e.target.value }))}
                      className="bg-background w-full rounded-md border py-2 pr-3 pl-10 text-sm"
                    />
                  </div>
                  <span className="text-muted-foreground">a</span>
                  <div className="relative flex-1">
                    <Calendar className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange((prev) => ({ ...prev, end: e.target.value }))}
                      className="bg-background w-full rounded-md border py-2 pr-3 pl-10 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Sensor Selection */}
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-medium">Sensores</label>
                <div className="flex flex-wrap gap-2">
                  {SENSORS.map((sensor) => (
                    <SensorCheckbox
                      key={sensor.id}
                      sensor={sensor}
                      selected={selectedSensors.includes(sensor.id)}
                      onToggle={() => toggleSensor(sensor.id)}
                    />
                  ))}
                </div>
              </div>

              {/* Resolution */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Resolución</label>
                <div className="relative">
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value as Resolution)}
                    className="bg-background w-full appearance-none rounded-md border py-2 pr-10 pl-3 text-sm"
                  >
                    {resolutionOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="text-muted-foreground pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* View Mode Tabs */}
      <div className="flex items-center gap-1 rounded-lg border p-1">
        {viewModeOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <button
              key={opt.value}
              onClick={() => setViewMode(opt.value as ViewMode)}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition-all ${
                viewMode === opt.value ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{opt.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Chart Area */}
      {viewMode === "single" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Series de Tiempo</CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEvents(!showEvents)}
                className={showEvents ? "bg-muted" : ""}
              >
                <AlertTriangle className="mr-1 h-4 w-4" />
                Eventos
              </Button>
              <div className="flex items-center rounded-md border">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleResetZoom}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={displayData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="time" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} width={50} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />

                  {/* Reference lines for thresholds */}
                  {selectedSensors.includes("temperature") && (
                    <>
                      <ReferenceLine
                        y={18}
                        stroke="#3b82f6"
                        strokeDasharray="5 5"
                        label={{ value: "Temp Min", fill: "#3b82f6", fontSize: 10 }}
                      />
                      <ReferenceLine
                        y={28}
                        stroke="#3b82f6"
                        strokeDasharray="5 5"
                        label={{ value: "Temp Max", fill: "#3b82f6", fontSize: 10 }}
                      />
                    </>
                  )}

                  {/* Alert event areas */}
                  {showEvents &&
                    alertEvents
                      .filter((e) => selectedSensors.includes(e.sensor))
                      .map((event) => (
                        <ReferenceArea
                          key={event.id}
                          x1={displayData[Math.max(0, event.startIndex - (zoomDomain?.start ?? 0))]?.time}
                          x2={
                            displayData[Math.min(displayData.length - 1, event.endIndex - (zoomDomain?.start ?? 0))]
                              ?.time
                          }
                          fill={event.type === "critical" ? "#ef444430" : "#f59e0b30"}
                          stroke={event.type === "critical" ? "#ef4444" : "#f59e0b"}
                          strokeWidth={1}
                        />
                      ))}

                  {/* Sensor lines */}
                  {selectedSensors.map((sensorId) => {
                    const sensor = SENSORS.find((s) => s.id === sensorId);
                    if (!sensor) return null;
                    return (
                      <Line
                        key={sensorId}
                        type="monotone"
                        dataKey={sensorId}
                        name={sensor.name}
                        stroke={sensor.color}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    );
                  })}

                  <Brush
                    dataKey="time"
                    height={30}
                    stroke="hsl(var(--primary))"
                    onChange={(e) => {
                      if (e.startIndex !== undefined && e.endIndex !== undefined) {
                        setZoomDomain({ start: e.startIndex, end: e.endIndex });
                      }
                    }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Events Legend */}
            {showEvents && (
              <div className="mt-4 flex flex-wrap gap-4 border-t pt-4">
                {alertEvents
                  .filter((e) => selectedSensors.includes(e.sensor))
                  .map((event) => {
                    const sensor = SENSORS.find((s) => s.id === event.sensor);
                    return (
                      <div
                        key={event.id}
                        className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                          event.type === "critical"
                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                        }`}
                      >
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">{sensor?.name}</span>
                        <span>•</span>
                        <span>
                          {event.startTime} - {event.endTime}
                        </span>
                        <span>•</span>
                        <span>{event.message}</span>
                      </div>
                    );
                  })}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Comparison View */}
      {viewMode === "compare" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {selectedSensors.slice(0, 2).map((sensorId) => {
            const sensor = SENSORS.find((s) => s.id === sensorId);
            if (!sensor) return null;
            const Icon = sensor.icon;

            return (
              <Card key={sensorId}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5" style={{ color: sensor.color }} />
                    {sensor.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={displayData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} />
                        <YAxis tick={{ fontSize: 10 }} tickLine={false} width={40} />
                        <Tooltip content={<CustomTooltip />} />

                        {/* Optimal range area */}
                        <ReferenceArea
                          y1={sensor.minOptimal}
                          y2={sensor.maxOptimal}
                          fill={`${sensor.color}15`}
                          stroke="none"
                        />
                        <ReferenceLine y={sensor.minOptimal} stroke={sensor.color} strokeDasharray="3 3" />
                        <ReferenceLine y={sensor.maxOptimal} stroke={sensor.color} strokeDasharray="3 3" />

                        <Area
                          type="monotone"
                          dataKey={sensorId}
                          fill={`${sensor.color}30`}
                          stroke={sensor.color}
                          strokeWidth={2}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                    <span>
                      Rango óptimo: {sensor.minOptimal} - {sensor.maxOptimal} {sensor.unit}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {selectedSensors.length >= 2 && (
            <Card className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Layers className="h-5 w-5" />
                  Correlación: {SENSORS.find((s) => s.id === selectedSensors[0])?.name} vs{" "}
                  {SENSORS.find((s) => s.id === selectedSensors[1])?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={displayData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" tick={{ fontSize: 10 }} tickLine={false} />
                      <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickLine={false} width={40} />
                      <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} tickLine={false} width={40} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      {selectedSensors.slice(0, 2).map((sensorId, index) => {
                        const sensor = SENSORS.find((s) => s.id === sensorId);
                        if (!sensor) return null;
                        return (
                          <Line
                            key={sensorId}
                            yAxisId={index === 0 ? "left" : "right"}
                            type="monotone"
                            dataKey={sensorId}
                            name={sensor.name}
                            stroke={sensor.color}
                            strokeWidth={2}
                            dot={false}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Histogram View */}
      {viewMode === "histogram" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {selectedSensors.map((sensorId) => {
            const sensor = SENSORS.find((s) => s.id === sensorId);
            if (!sensor) return null;
            const Icon = sensor.icon;
            const data = generateHistogramData(sensorId, timeSeriesData);

            return (
              <Card key={sensorId}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5" style={{ color: sensor.color }} />
                    Distribución de {sensor.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis
                          dataKey="range"
                          tick={{ fontSize: 10 }}
                          tickLine={false}
                          label={{ value: sensor.unit, position: "bottom", offset: -5, fontSize: 11 }}
                        />
                        <YAxis
                          tick={{ fontSize: 10 }}
                          tickLine={false}
                          label={{ value: "Frecuencia", angle: -90, position: "insideLeft", fontSize: 11 }}
                        />
                        <Tooltip
                          formatter={(value) => [value, "Lecturas"]}
                          labelFormatter={(label) => `Rango: ${label} ${sensor.unit}`}
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="count" fill={sensor.color} radius={[4, 4, 0, 0]} />
                        {/* Optimal range markers */}
                        <ReferenceLine x={sensor.minOptimal.toString()} stroke="#22c55e" strokeDasharray="5 5" />
                        <ReferenceLine x={sensor.maxOptimal.toString()} stroke="#22c55e" strokeDasharray="5 5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="text-muted-foreground mt-2 flex justify-between text-xs">
                    <span>
                      Líneas verdes: límites óptimos ({sensor.minOptimal} - {sensor.maxOptimal} {sensor.unit})
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Historical Data Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Table className="h-5 w-5" />
            Tabla de Datos Históricos y Eventos
          </CardTitle>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                  <th className="px-4 py-3 text-left font-medium">Sensor</th>
                  <th className="px-4 py-3 text-right font-medium">Valor</th>
                  <th className="px-4 py-3 text-center font-medium">Estado</th>
                  <th className="px-4 py-3 text-left font-medium">Evento</th>
                </tr>
              </thead>
              <tbody>
                {historicalRecords.map((record, index) => (
                  <tr key={index} className="hover:bg-muted/50 border-b">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="text-muted-foreground h-3 w-3" />
                        {new Date(record.timestamp).toLocaleString("es-MX")}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">{record.sensor}</td>
                    <td className="px-4 py-3 text-right font-mono">{record.value}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          record.status === "critical"
                            ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                            : record.status === "warning"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                              : "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                        }`}
                      >
                        {record.status === "critical" ? "Crítico" : record.status === "warning" ? "Alerta" : "Normal"}
                      </span>
                    </td>
                    <td className="text-muted-foreground px-4 py-3">{record.event || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-muted-foreground mt-4 flex items-center justify-between text-sm">
            <span>Mostrando {historicalRecords.length} registros</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Anterior
              </Button>
              <Button variant="outline" size="sm">
                Siguiente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
