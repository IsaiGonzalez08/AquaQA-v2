"use client";

import { WaterQualityData } from "../types/sensor.types";
import { Droplet } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface WaterQualityScoreProps {
  data: WaterQualityData;
}

const statusConfig = {
  normal: {
    gradient: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-300",
    label: "Excelente",
    description: "La calidad del agua está dentro de los parámetros óptimos",
  },
  warning: {
    gradient: "from-amber-500 to-orange-500",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-300",
    label: "Atención",
    description: "Algunos parámetros requieren monitoreo",
  },
  critical: {
    gradient: "from-red-500 to-rose-500",
    bg: "bg-red-50 dark:bg-red-950/30",
    text: "text-red-700 dark:text-red-300",
    label: "Crítico",
    description: "Se requiere atención inmediata",
  },
};

function AnimatedScore({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayValue}</>;
}

export function WaterQualityScore({ data }: WaterQualityScoreProps) {
  const status = statusConfig[data.status];
  const circumference = 2 * Math.PI * 45;
  const [animatedOffset, setAnimatedOffset] = useState(circumference);

  useEffect(() => {
    const targetOffset = circumference - (data.overallScore / 100) * circumference;
    const controls = animate(circumference, targetOffset, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setAnimatedOffset(latest),
    });
    return () => controls.stop();
  }, [data.overallScore, circumference]);

  const formatLastUpdated = (date: Date) => {
    return date.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSensorStatusCounts = () => {
    const counts = { normal: 0, warning: 0, critical: 0 };
    data.sensors.forEach((sensor) => {
      counts[sensor.status]++;
    });
    return counts;
  };

  const statusCounts = getSensorStatusCounts();

  const getGradientColors = () => {
    if (data.status === "normal") return { start: "#10b981", end: "#14b8a6" };
    if (data.status === "warning") return { start: "#f59e0b", end: "#f97316" };
    return { start: "#ef4444", end: "#f43f5e" };
  };

  const colors = getGradientColors();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card rounded-xl border p-6 shadow-sm"
    >
      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <motion.div
          className="relative shrink-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <svg className="h-40 w-40 -rotate-90 transform">
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="currentColor"
              strokeWidth="10"
              fill="none"
              className="text-muted/20"
            />
            <circle
              cx="80"
              cy="80"
              r="45"
              stroke="url(#scoreGradient)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={animatedOffset}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colors.start} />
                <stop offset="100%" stopColor={colors.end} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Droplet className={cn("mb-1 h-6 w-6", status.text)} />
            </motion.div>
            <span className="text-4xl font-bold tabular-nums">
              <AnimatedScore value={data.overallScore} />
            </span>
            <span className="text-muted-foreground text-xs">de 100</span>
          </div>
        </motion.div>

        <div className="flex-1 text-center lg:text-left">
          <motion.div
            className="mb-2 flex items-center justify-center gap-2 lg:justify-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold">Calidad del Agua</h2>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.5 }}
              className={cn(
                "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                status.bg,
                status.text
              )}
            >
              {status.label}
            </motion.span>
          </motion.div>
          <motion.p
            className="text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {status.description}
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 lg:justify-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { color: "bg-emerald-500", count: statusCounts.normal, label: "Normal" },
              { color: "bg-amber-500", count: statusCounts.warning, label: "Advertencia" },
              { color: "bg-red-500", count: statusCounts.critical, label: "Crítico" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={cn("h-3 w-3 rounded-full", item.color)}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
                <span className="text-sm">
                  <span className="font-semibold">{item.count}</span> {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            className="text-muted-foreground mt-4 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Última actualización: {formatLastUpdated(data.lastUpdated)}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
