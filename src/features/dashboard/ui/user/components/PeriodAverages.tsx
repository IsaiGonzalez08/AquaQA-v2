"use client";

import { useState } from "react";
import { motion, animate } from "framer-motion";
import { useEffect } from "react";
import { PeriodAverage, TimePeriod } from "../types/analysis.types";
import { SensorType } from "../types/sensor.types";
import { Thermometer, Droplets, Waves, Magnet, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface PeriodAveragesProps {
  data: PeriodAverage[];
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

const periodLabels: Record<TimePeriod, string> = {
  day: "Hoy",
  week: "Semana",
  month: "Mes",
};

function AnimatedValue({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest),
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayValue.toFixed(decimals)}</>;
}

export function PeriodAverages({ data }: PeriodAveragesProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("day");

  const filteredData = data.filter((item) => item.period === selectedPeriod);
  const sensorTypes: SensorType[] = ["temperature", "ph", "turbidity", "magnetism"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border p-6 shadow-sm"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold">Promedios por Período</h3>
          <p className="text-muted-foreground text-sm">Valores promedio de cada sensor</p>
        </div>
        <div className="bg-muted flex gap-1 rounded-lg p-1">
          {(["day", "week", "month"] as TimePeriod[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                selectedPeriod === period
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sensorTypes.map((sensorType, index) => {
          const sensorData = filteredData.find((d) => d.sensorType === sensorType);
          if (!sensorData) return null;

          const Icon = iconMap[sensorType];
          const range = sensorData.max - sensorData.min;
          const avgPosition = ((sensorData.average - sensorData.min) / range) * 100;

          return (
            <motion.div
              key={sensorType}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-background rounded-lg border p-4"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="bg-primary/10 rounded-md p-2">
                  <Icon className="text-primary h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{sensorLabels[sensorType]}</span>
              </div>

              <div className="mb-3">
                <span className="text-2xl font-bold tabular-nums">
                  <AnimatedValue value={sensorData.average} />
                </span>
                <span className="text-muted-foreground ml-1 text-sm">{sensorData.unit}</span>
              </div>

              <div className="space-y-2">
                <div className="text-muted-foreground flex justify-between text-xs">
                  <span>
                    Mín: {sensorData.min}
                    {sensorData.unit}
                  </span>
                  <span>
                    Máx: {sensorData.max}
                    {sensorData.unit}
                  </span>
                </div>
                <div className="bg-muted relative h-2 overflow-hidden rounded-full">
                  <motion.div
                    className="to-primary absolute h-full rounded-full bg-linear-to-r from-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                  />
                  <motion.div
                    className="border-primary absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 bg-white shadow-sm"
                    initial={{ left: "0%" }}
                    animate={{ left: `${avgPosition}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    style={{ marginLeft: "-6px" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
