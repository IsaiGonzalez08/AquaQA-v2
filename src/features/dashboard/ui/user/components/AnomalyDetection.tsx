"use client";

import { motion } from "framer-motion";
import { Anomaly } from "../types/charts.types";
import { SensorType } from "../types/sensor.types";
import { Thermometer, Droplets, Waves, Magnet, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/lib/cn";

interface AnomalyDetectionProps {
  anomalies: Anomaly[];
}

const iconMap: Record<SensorType, React.ElementType> = {
  temperature: Thermometer,
  ph: Droplets,
  turbidity: Waves,
  magnetism: Magnet,
};

const sensorLabels: Record<SensorType, string> = {
  temperature: "Temperatura",
  ph: "pH",
  turbidity: "Turbidez",
  magnetism: "Magnetismo",
};

const severityConfig = {
  low: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    label: "Bajo",
  },
  medium: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-600 dark:text-amber-400",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    label: "Medio",
  },
  high: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    iconBg: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-600 dark:text-red-400",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    label: "Alto",
  },
};

export function AnomalyDetection({ anomalies }: AnomalyDetectionProps) {
  const sortedAnomalies = [...anomalies].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffHours < 1) return "Hace menos de 1 hora";
    if (diffHours === 1) return "Hace 1 hora";
    if (diffHours < 24) return `Hace ${diffHours} horas`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays === 1) return "Hace 1 día";
    return `Hace ${diffDays} días`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">Detección de Anomalías</h3>
          <p className="text-sm text-muted-foreground">
            Valores atípicos detectados recientemente
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Total:</span>
          <span className="font-semibold">{anomalies.length}</span>
        </div>
      </div>

      {anomalies.length === 0 ? (
        <div className="text-center py-8">
          <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/30 p-3 w-fit mx-auto mb-3">
            <Info className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <p className="text-sm text-muted-foreground">No se han detectado anomalías</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {sortedAnomalies.map((anomaly, index) => {
            const severity = severityConfig[anomaly.severity];
            const SeverityIcon = severity.icon;
            const SensorIcon = iconMap[anomaly.sensorType];

            return (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={cn(
                  "p-4 rounded-lg border",
                  severity.bg,
                  severity.border
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn("rounded-full p-2 shrink-0", severity.iconBg)}>
                    <SeverityIcon className={cn("h-4 w-4", severity.iconColor)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <SensorIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">
                        {sensorLabels[anomaly.sensorType]}
                      </span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        severity.badge
                      )}>
                        {severity.label}
                      </span>
                    </div>
                    <p className="text-sm mb-2">{anomaly.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        Valor: <span className="font-medium text-foreground">{anomaly.value}</span>
                      </span>
                      <span>
                        Esperado: {anomaly.expectedRange.min} - {anomaly.expectedRange.max}
                      </span>
                      <span>{formatTimeAgo(anomaly.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
