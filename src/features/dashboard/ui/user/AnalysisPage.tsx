"use client";

import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import {
  AlertTriangle,
  Clock,
  Activity,
  Shield,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  ChevronDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/card";
import { Button } from "@/components/button";
import { SENSORS, periodLabels } from "./data";
import type { Period, SensorStatus, Trend, SensorAnalysis } from "./types/user.dashboard.types";

const generateMockData = (period: Period): SensorAnalysis[] => {
  const periodMultiplier = period === "24h" ? 1 : period === "7d" ? 7 : 30;

  return SENSORS.map((sensor) => {
    const baseAlerts = Math.floor(Math.random() * 15) + 2;
    const alerts = baseAlerts * (periodMultiplier / 7);
    const outOfRange = Math.random() * 25 + 5;
    const stability = Math.random() * 40 + 60;

    const trendData = Array.from({ length: 12 }, () => 50 + (Math.random() - 0.5) * 30);

    const trendDirection = trendData[trendData.length - 1] - trendData[0];
    const trend: Trend = trendDirection > 5 ? "up" : trendDirection < -5 ? "down" : "stable";

    let status: SensorStatus = "normal";
    if (outOfRange > 20 || alerts > 10) status = "critical";
    else if (outOfRange > 10 || alerts > 5) status = "alert";

    const range = sensor.maxOptimal - sensor.minOptimal;
    const average = sensor.minOptimal + range * (0.3 + Math.random() * 0.4);
    const min = sensor.minOptimal - range * Math.random() * 0.3;
    const max = sensor.maxOptimal + range * Math.random() * 0.3;

    const hours = Math.floor((outOfRange * periodMultiplier * 24) / 100);
    const mins = Math.floor(Math.random() * 60);

    return {
      id: sensor.id,
      name: sensor.name,
      unit: sensor.unit,
      icon: sensor.icon,
      color: sensor.color,
      average: parseFloat(average.toFixed(1)),
      min: parseFloat(min.toFixed(1)),
      max: parseFloat(max.toFixed(1)),
      outOfRangePercent: parseFloat(outOfRange.toFixed(1)),
      outOfRangeTime: `${hours}h ${mins}m`,
      alertCount: Math.floor(alerts),
      status,
      trend,
      trendData,
      stability: parseFloat(stability.toFixed(0)),
    };
  });
};

const StatusBadge = ({ status }: { status: SensorStatus }) => {
  const config = {
    normal: {
      icon: CheckCircle2,
      label: "Normal",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    alert: {
      icon: AlertCircle,
      label: "Alerta",
      className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    },
    critical: {
      icon: XCircle,
      label: "Crítico",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  };
  const { icon: Icon, label, className } = config[status];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

const TrendIndicator = ({ trend }: { trend: Trend }) => {
  const config = {
    up: { icon: TrendingUp, label: "Subiendo", className: "text-red-500" },
    down: { icon: TrendingDown, label: "Bajando", className: "text-blue-500" },
    stable: { icon: Minus, label: "Estable", className: "text-green-500" },
  };
  const { icon: Icon, label, className } = config[trend];

  return (
    <span className={`inline-flex items-center gap-1 text-xs ${className}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
};

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <div className="hidden h-10 w-24 sm:block">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const KPICard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = "default",
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ElementType;
  variant?: "default" | "warning" | "danger" | "success";
}) => {
  const variantStyles = {
    default: "bg-card",
    warning: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
    danger: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800",
    success: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800",
  };

  const iconStyles = {
    default: "text-muted-foreground",
    warning: "text-amber-600 dark:text-amber-400",
    danger: "text-red-600 dark:text-red-400",
    success: "text-green-600 dark:text-green-400",
  };

  return (
    <Card className={`${variantStyles[variant]} transition-all hover:shadow-md`}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1 space-y-1">
            <p className="text-muted-foreground text-xs font-medium sm:text-sm">{title}</p>
            <p className="truncate text-lg font-bold sm:text-2xl">{value}</p>
            {subtitle && <p className="text-muted-foreground truncate text-xs">{subtitle}</p>}
          </div>
          <div className={`shrink-0 rounded-full p-2 sm:p-3 ${variant === "default" ? "bg-muted" : ""}`}>
            <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${iconStyles[variant]}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export function AnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("7d");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);

  const sensorData = useMemo(() => generateMockData(selectedPeriod), [selectedPeriod]);

  const globalStats = useMemo(() => {
    const totalAlerts = sensorData.reduce((sum, s) => sum + s.alertCount, 0);
    const totalOutOfRangeHours = sensorData.reduce((sum, s) => {
      const match = s.outOfRangeTime.match(/(\d+)h/);
      return sum + (match ? parseInt(match[1]) : 0);
    }, 0);

    const mostUnstable = [...sensorData].sort((a, b) => a.stability - b.stability)[0];

    const criticalCount = sensorData.filter((s) => s.status === "critical").length;
    const alertCount = sensorData.filter((s) => s.status === "alert").length;

    let systemStatus: SensorStatus = "normal";
    if (criticalCount > 0) systemStatus = "critical";
    else if (alertCount > 1) systemStatus = "alert";

    return { totalAlerts, totalOutOfRangeHours, mostUnstable, systemStatus };
  }, [sensorData]);

  const outOfRangeChartData = sensorData.map((s) => ({
    name: s.name,
    value: s.outOfRangePercent,
    fill: s.color,
  }));

  const alertsChartData = sensorData.map((s) => ({
    name: s.name,
    value: s.alertCount,
    fill: s.color,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Análisis General</h2>
          <p className="text-muted-foreground mt-1">
            Resumen del comportamiento del sistema en el período seleccionado
          </p>
        </div>

        {/* Period Selector */}
        <div className="relative">
          <Button
            variant="outline"
            onClick={() => setShowPeriodMenu(!showPeriodMenu)}
            className="w-full justify-between sm:w-48"
          >
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {periodLabels[selectedPeriod]}
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {showPeriodMenu && (
            <div className="bg-card absolute right-0 z-10 mt-2 w-48 rounded-md border shadow-lg">
              {(Object.keys(periodLabels) as Period[]).map((period) => (
                <button
                  key={period}
                  onClick={() => {
                    setSelectedPeriod(period);
                    setShowPeriodMenu(false);
                  }}
                  className={`hover:bg-muted w-full px-4 py-2 text-left text-sm ${
                    selectedPeriod === period ? "bg-muted font-medium" : ""
                  }`}
                >
                  {periodLabels[period]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* KPIs Globales */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KPICard
          title="Total de Alertas"
          value={globalStats.totalAlerts}
          subtitle={`En ${periodLabels[selectedPeriod].toLowerCase()}`}
          icon={AlertTriangle}
          variant={globalStats.totalAlerts > 20 ? "danger" : globalStats.totalAlerts > 10 ? "warning" : "default"}
        />
        <KPICard
          title="Tiempo Fuera de Rango"
          value={`${globalStats.totalOutOfRangeHours}h`}
          subtitle="Suma de todos los sensores"
          icon={Clock}
          variant={
            globalStats.totalOutOfRangeHours > 48
              ? "danger"
              : globalStats.totalOutOfRangeHours > 24
                ? "warning"
                : "default"
          }
        />
        <KPICard
          title="Sensor Más Inestable"
          value={globalStats.mostUnstable.name}
          subtitle={`Estabilidad: ${globalStats.mostUnstable.stability}%`}
          icon={Activity}
          variant={globalStats.mostUnstable.stability < 70 ? "warning" : "default"}
        />
        <KPICard
          title="Estado del Sistema"
          value={
            globalStats.systemStatus === "normal"
              ? "Óptimo"
              : globalStats.systemStatus === "alert"
                ? "Atención"
                : "Crítico"
          }
          subtitle={globalStats.systemStatus === "normal" ? "Todo funcionando correctamente" : "Requiere revisión"}
          icon={Shield}
          variant={
            globalStats.systemStatus === "normal"
              ? "success"
              : globalStats.systemStatus === "alert"
                ? "warning"
                : "danger"
          }
        />
      </div>

      {/* Resumen por Sensor - Tarjetas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5" />
            Resumen por Sensor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {sensorData.map((sensor) => {
              const Icon = sensor.icon;
              return (
                <div
                  key={sensor.id}
                  className="bg-muted/30 hover:border-primary/50 flex items-start gap-4 rounded-lg border p-4 transition-colors"
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${sensor.color}20` }}
                  >
                    <Icon className="h-6 w-6" style={{ color: sensor.color }} />
                  </div>

                  <div className="min-w-0 flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">{sensor.name}</h4>
                        <p className="text-muted-foreground text-sm">
                          Promedio:{" "}
                          <span className="text-foreground font-medium">
                            {sensor.average}
                            {sensor.unit}
                          </span>
                        </p>
                      </div>
                      <StatusBadge status={sensor.status} />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs">Mín</p>
                        <p className="font-medium">
                          {sensor.min}
                          {sensor.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Máx</p>
                        <p className="font-medium">
                          {sensor.max}
                          {sensor.unit}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs">Fuera rango</p>
                        <p className="font-medium">{sensor.outOfRangePercent}%</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-2">
                      <div className="flex items-center gap-4">
                        <TrendIndicator trend={sensor.trend} />
                        <span className="text-muted-foreground text-xs">{sensor.alertCount} alertas</span>
                      </div>
                      <Sparkline data={sensor.trendData} color={sensor.color} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Gráficas de Barras */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tiempo Fuera de Rango */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5" />
              Tiempo Fuera de Rango por Sensor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={outOfRangeChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, "auto"]} unit="%" />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Tiempo fuera de rango"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Número de Alertas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <AlertTriangle className="h-5 w-5" />
              Número de Alertas por Sensor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 sm:h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={alertsChartData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" domain={[0, "auto"]} />
                  <YAxis type="category" dataKey="name" width={80} />
                  <Tooltip
                    formatter={(value) => [`${value}`, "Alertas"]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicadores de Estabilidad */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Activity className="h-5 w-5" />
            Indicadores de Estabilidad y Calidad
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sensorData.map((sensor) => {
              const Icon = sensor.icon;
              const stabilityColor =
                sensor.stability >= 80 ? "text-green-500" : sensor.stability >= 60 ? "text-amber-500" : "text-red-500";
              const stabilityBg =
                sensor.stability >= 80 ? "bg-green-500" : sensor.stability >= 60 ? "bg-amber-500" : "bg-red-500";

              return (
                <div key={sensor.id} className="space-y-3 rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" style={{ color: sensor.color }} />
                    <span className="font-medium">{sensor.name}</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Estabilidad</span>
                      <span className={`font-semibold ${stabilityColor}`}>{sensor.stability}%</span>
                    </div>
                    <div className="bg-muted h-2 overflow-hidden rounded-full">
                      <div
                        className={`h-full transition-all ${stabilityBg}`}
                        style={{ width: `${sensor.stability}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs">
                    {sensor.stability >= 80
                      ? "Lecturas consistentes"
                      : sensor.stability >= 60
                        ? "Variabilidad moderada"
                        : "Alta variabilidad"}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
