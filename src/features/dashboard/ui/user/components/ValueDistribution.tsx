"use client";

import { motion } from "framer-motion";
import { DistributionData } from "../types/charts.types";
import { SensorType } from "../types/sensor.types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { cn } from "@/lib/cn";

interface ValueDistributionProps {
  data: DistributionData;
}

const sensorColors: Record<SensorType, string> = {
  temperature: "#f97316",
  ph: "#3b82f6",
  turbidity: "#06b6d4",
  magnetism: "#a855f7",
};

const sensorLabels: Record<SensorType, string> = {
  temperature: "Temperatura",
  ph: "pH",
  turbidity: "Turbidez",
  magnetism: "Magnetismo",
};

export function ValueDistribution({ data }: ValueDistributionProps) {
  const color = sensorColors[data.sensorType];

  const chartData = data.buckets.map((bucket) => ({
    range: bucket.range,
    count: bucket.count,
    percentage: bucket.percentage,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Distribución de Valores</h3>
          <p className="text-sm text-muted-foreground">
            Histograma de {sensorLabels[data.sensorType]}
          </p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="text-center px-3 py-1 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground">Media</p>
            <p className="font-semibold">{data.mean}{data.unit}</p>
          </div>
          <div className="text-center px-3 py-1 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground">Mediana</p>
            <p className="font-semibold">{data.median}{data.unit}</p>
          </div>
          <div className="text-center px-3 py-1 rounded-lg bg-muted">
            <p className="text-xs text-muted-foreground">Desv. Est.</p>
            <p className="font-semibold">±{data.standardDeviation}</p>
          </div>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
            <XAxis
              dataKey="range"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-lg">
                      <p className="text-sm font-medium">Rango: {data.range}</p>
                      <p className="text-sm">Muestras: {data.count}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.percentage.toFixed(1)}% del total
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1500}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={color}
                  fillOpacity={0.3 + (entry.percentage / 100) * 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
