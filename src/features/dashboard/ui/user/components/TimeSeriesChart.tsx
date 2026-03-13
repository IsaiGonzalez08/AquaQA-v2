"use client";

import { motion } from "framer-motion";
import { TimeSeriesData } from "../types/charts.types";
import { SensorType } from "../types/sensor.types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { sensorRanges } from "../data/mockChartsData";

interface TimeSeriesChartProps {
  primaryData: TimeSeriesData;
  comparisonData?: TimeSeriesData;
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

export function TimeSeriesChart({ primaryData, comparisonData }: TimeSeriesChartProps) {
  const primaryRange = sensorRanges[primaryData.sensorType];

  const chartData = primaryData.data.map((point, index) => {
    const dataPoint: Record<string, unknown> = {
      time: point.timestamp.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }),
      date: point.timestamp.toLocaleDateString("es-MX", { day: "2-digit", month: "short" }),
      [primaryData.sensorType]: point.value,
    };

    if (comparisonData && comparisonData.data[index]) {
      dataPoint[comparisonData.sensorType] = comparisonData.data[index].value;
    }

    return dataPoint;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Serie Temporal</h3>
        <p className="text-sm text-muted-foreground">
          {sensorLabels[primaryData.sensorType]}
          {comparisonData && ` vs ${sensorLabels[comparisonData.sensorType]}`}
        </p>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              yAxisId="left"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              domain={[primaryRange.min, primaryRange.max]}
            />
            {comparisonData && (
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                domain={[
                  sensorRanges[comparisonData.sensorType].min,
                  sensorRanges[comparisonData.sensorType].max,
                ]}
              />
            )}
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-lg">
                      <p className="text-sm font-medium mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <p
                          key={index}
                          className="text-sm"
                          style={{ color: entry.color }}
                        >
                          {sensorLabels[entry.dataKey as SensorType]}: {entry.value}
                          {entry.dataKey === "temperature" && "°C"}
                          {entry.dataKey === "turbidity" && " NTU"}
                          {entry.dataKey === "magnetism" && " µT"}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              formatter={(value) => sensorLabels[value as SensorType]}
              wrapperStyle={{ paddingTop: "20px" }}
            />
            <ReferenceLine
              yAxisId="left"
              y={primaryRange.normal.min}
              stroke="#10b981"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <ReferenceLine
              yAxisId="left"
              y={primaryRange.normal.max}
              stroke="#10b981"
              strokeDasharray="5 5"
              strokeOpacity={0.5}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey={primaryData.sensorType}
              stroke={sensorColors[primaryData.sensorType]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />
            {comparisonData && (
              <Line
                yAxisId="right"
                type="monotone"
                dataKey={comparisonData.sensorType}
                stroke={sensorColors[comparisonData.sensorType]}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={1500}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-emerald-500" style={{ borderStyle: "dashed" }} />
          <span>Rango normal</span>
        </div>
      </div>
    </motion.div>
  );
}
