"use client";

import { motion } from "framer-motion";
import { SensorStabilityData } from "../types/analysis.types";
import { SensorType } from "../types/sensor.types";
import { Thermometer, Droplets, Waves, Magnet, TrendingUp, TrendingDown, Minus, Activity } from "lucide-react";
import { cn } from "@/lib/cn";

interface SensorStabilityProps {
  data: SensorStabilityData[];
}

const iconMap: Record<SensorType, React.ElementType> = {
  temperature: Thermometer,
  ph: Droplets,
  turbidity: Waves,
  magnetism: Magnet,
};

const trendConfig = {
  stable: {
    icon: Minus,
    label: "Estable",
    color: "text-emerald-600",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  increasing: {
    icon: TrendingUp,
    label: "En aumento",
    color: "text-amber-600",
    bg: "bg-amber-100 dark:bg-amber-900/30",
  },
  decreasing: {
    icon: TrendingDown,
    label: "En descenso",
    color: "text-blue-600",
    bg: "bg-blue-100 dark:bg-blue-900/30",
  },
  fluctuating: {
    icon: Activity,
    label: "Fluctuante",
    color: "text-red-600",
    bg: "bg-red-100 dark:bg-red-900/30",
  },
};

export function SensorStability({ data }: SensorStabilityProps) {
  const sortedData = [...data].sort((a, b) => b.stabilityScore - a.stabilityScore);
  const mostStable = sortedData[0];
  const leastStable = sortedData[sortedData.length - 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Estabilidad de Sensores</h3>
        <p className="text-sm text-muted-foreground">Variabilidad y tendencias de cada sensor</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-lg border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 dark:border-emerald-800 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-emerald-500 p-1">
              <Minus className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Más Estable</span>
          </div>
          <p className="text-lg font-bold">{mostStable.label}</p>
          <p className="text-sm text-muted-foreground">Score: {mostStable.stabilityScore}/100</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-amber-500 p-1">
              <Activity className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Más Fluctuaciones</span>
          </div>
          <p className="text-lg font-bold">{leastStable.label}</p>
          <p className="text-sm text-muted-foreground">Score: {leastStable.stabilityScore}/100</p>
        </motion.div>
      </div>

      <div className="space-y-3">
        {data.map((sensor, index) => {
          const Icon = iconMap[sensor.sensorType];
          const trend = trendConfig[sensor.trend];
          const TrendIcon = trend.icon;

          return (
            <motion.div
              key={sensor.sensorType}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg border bg-background"
            >
              <div className="rounded-md bg-primary/10 p-2">
                <Icon className="h-4 w-4 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm">{sensor.label}</span>
                  <span className={cn("flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full", trend.bg, trend.color)}>
                    <TrendIcon className="h-3 w-3" />
                    {trend.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={cn(
                        "h-full rounded-full",
                        sensor.stabilityScore >= 80 ? "bg-emerald-500" :
                        sensor.stabilityScore >= 60 ? "bg-amber-500" : "bg-red-500"
                      )}
                      initial={{ width: 0 }}
                      animate={{ width: `${sensor.stabilityScore}%` }}
                      transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                    />
                  </div>
                  <span className="text-xs font-medium tabular-nums w-8">{sensor.stabilityScore}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
