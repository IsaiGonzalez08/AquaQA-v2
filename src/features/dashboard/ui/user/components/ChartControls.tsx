"use client";

import { motion } from "framer-motion";
import { SensorType } from "../types/sensor.types";
import { TimeRange } from "../types/charts.types";
import { Thermometer, Droplets, Waves, Magnet, Calendar } from "lucide-react";
import { cn } from "@/lib/cn";

interface ChartControlsProps {
  selectedSensor: SensorType;
  onSensorChange: (sensor: SensorType) => void;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  comparisonSensor?: SensorType;
  onComparisonSensorChange?: (sensor: SensorType | undefined) => void;
  showComparison?: boolean;
}

const sensorConfig: Record<SensorType, { label: string; icon: React.ElementType; color: string }> = {
  temperature: { label: "Temperatura", icon: Thermometer, color: "text-orange-500" },
  ph: { label: "pH", icon: Droplets, color: "text-blue-500" },
  turbidity: { label: "Turbidez", icon: Waves, color: "text-cyan-500" },
  magnetism: { label: "Magnetismo", icon: Magnet, color: "text-purple-500" },
};

const timeRangeLabels: Record<TimeRange, string> = {
  "24h": "24 horas",
  "7d": "7 días",
  "30d": "30 días",
  custom: "Personalizado",
};

export function ChartControls({
  selectedSensor,
  onSensorChange,
  timeRange,
  onTimeRangeChange,
  comparisonSensor,
  onComparisonSensorChange,
  showComparison = false,
}: ChartControlsProps) {
  const sensorTypes: SensorType[] = ["temperature", "ph", "turbidity", "magnetism"];
  const timeRanges: TimeRange[] = ["24h", "7d", "30d"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Seleccionar Parámetro</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {sensorTypes.map((sensor) => {
              const config = sensorConfig[sensor];
              const Icon = config.icon;
              const isSelected = selectedSensor === sensor;

              return (
                <motion.button
                  key={sensor}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSensorChange(sensor)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border transition-all",
                    isSelected
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isSelected ? "text-primary" : config.color)} />
                  <span className="text-sm font-medium">{config.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Rango de Tiempo</h3>
          <div className="flex flex-wrap gap-2">
            {timeRanges.map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTimeRangeChange(range)}
                className={cn(
                  "px-4 py-2 rounded-lg border text-sm font-medium transition-all",
                  timeRange === range
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                {timeRangeLabels[range]}
              </motion.button>
            ))}
          </div>
        </div>

        {showComparison && onComparisonSensorChange && (
          <div>
            <h3 className="text-sm font-medium mb-3">Comparar con</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onComparisonSensorChange(undefined)}
                className={cn(
                  "flex items-center justify-center gap-2 p-3 rounded-lg border transition-all",
                  !comparisonSensor
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <span className="text-sm font-medium">Ninguno</span>
              </motion.button>
              {sensorTypes
                .filter((s) => s !== selectedSensor)
                .map((sensor) => {
                  const config = sensorConfig[sensor];
                  const Icon = config.icon;
                  const isSelected = comparisonSensor === sensor;

                  return (
                    <motion.button
                      key={sensor}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onComparisonSensorChange(sensor)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border transition-all",
                        isSelected
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      )}
                    >
                      <Icon className={cn("h-4 w-4", isSelected ? "text-primary" : config.color)} />
                      <span className="text-sm font-medium">{config.label}</span>
                    </motion.button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
