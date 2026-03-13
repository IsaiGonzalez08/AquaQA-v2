"use client";

import { motion } from "framer-motion";
import { QualityTrendPoint } from "../types/analysis.types";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { cn } from "@/lib/cn";

interface QualityTrendChartProps {
  data: QualityTrendPoint[];
}

export function QualityTrendChart({ data }: QualityTrendChartProps) {
  const chartData = data.map((point) => ({
    date: point.date.toLocaleDateString("es-MX", { day: "2-digit", month: "short" }),
    score: point.score,
    status: point.status,
  }));

  const averageScore = Math.round(data.reduce((acc, p) => acc + p.score, 0) / data.length);
  const maxScore = Math.max(...data.map((p) => p.score));
  const minScore = Math.min(...data.map((p) => p.score));

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10b981";
    if (score >= 60) return "#f59e0b";
    return "#ef4444";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold">Tendencia de Calidad del Agua</h3>
          <p className="text-sm text-muted-foreground">Evolución del score en los últimos 30 días</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Promedio</p>
            <p className="text-lg font-bold" style={{ color: getScoreColor(averageScore) }}>{averageScore}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Máximo</p>
            <p className="text-lg font-bold text-emerald-600">{maxScore}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Mínimo</p>
            <p className="text-lg font-bold text-amber-600">{minScore}</p>
          </div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[50, 100]}
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              className="text-muted-foreground"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="rounded-lg border bg-background p-3 shadow-lg">
                      <p className="text-sm font-medium">{data.date}</p>
                      <p className="text-lg font-bold" style={{ color: getScoreColor(data.score) }}>
                        Score: {data.score}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorScore)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Excelente (80-100)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-500" />
          <span className="text-xs text-muted-foreground">Atención (60-79)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-muted-foreground">Crítico (&lt;60)</span>
        </div>
      </div>
    </motion.div>
  );
}
