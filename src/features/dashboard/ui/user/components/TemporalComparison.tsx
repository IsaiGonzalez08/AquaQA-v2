"use client";

import { motion } from "framer-motion";
import { TemporalComparison as TemporalComparisonType } from "../types/analysis.types";
import { SensorType } from "../types/sensor.types";
import { Thermometer, Droplets, Waves, Magnet, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/cn";

interface TemporalComparisonProps {
  data: TemporalComparisonType[];
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

function ChangeIndicator({ value, label }: { value: number; label: string }) {
  const isPositive = value > 0;
  const isNeutral = Math.abs(value) < 1;

  return (
    <div className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className={cn(
        "flex items-center gap-1 text-xs font-medium",
        isNeutral ? "text-muted-foreground" : isPositive ? "text-amber-600" : "text-emerald-600"
      )}>
        {isNeutral ? (
          <Minus className="h-3 w-3" />
        ) : isPositive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        <span>{isPositive ? "+" : ""}{value.toFixed(1)}%</span>
      </div>
    </div>
  );
}

export function TemporalComparison({ data }: TemporalComparisonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Comparaciones Temporales</h3>
        <p className="text-sm text-muted-foreground">Cambios respecto a períodos anteriores</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.map((comparison, index) => {
          const Icon = iconMap[comparison.sensorType];

          return (
            <motion.div
              key={comparison.sensorType}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="rounded-lg border bg-background p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="rounded-md bg-primary/10 p-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium text-sm">{sensorLabels[comparison.sensorType]}</span>
              </div>

              <div className="mb-3">
                <span className="text-2xl font-bold tabular-nums">{comparison.currentValue}</span>
                <span className="text-sm text-muted-foreground ml-1">{comparison.unit}</span>
              </div>

              <div className="space-y-0">
                <ChangeIndicator value={comparison.changeFromYesterday} label="vs Ayer" />
                <ChangeIndicator value={comparison.changeFromLastWeek} label="vs Semana pasada" />
                <ChangeIndicator value={comparison.changeFromHistorical} label="vs Promedio histórico" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
