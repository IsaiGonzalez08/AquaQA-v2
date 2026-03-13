"use client";

import { SensorReading, SensorType } from "../types/sensor.types";
import { sensorConfigs } from "../data/mockSensorData";
import { Thermometer, Droplets, Waves, Magnet, Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

interface SensorCardProps {
  sensor: SensorReading;
  index?: number;
}

const iconMap: Record<SensorType, React.ElementType> = {
  temperature: Thermometer,
  ph: Droplets,
  turbidity: Waves,
  magnetism: Magnet,
};

const statusConfig = {
  normal: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
    icon: "text-emerald-600 dark:text-emerald-400",
    indicator: "bg-emerald-500",
    label: "Normal",
  },
  warning: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",
    icon: "text-amber-600 dark:text-amber-400",
    indicator: "bg-amber-500",
    label: "Advertencia",
  },
  critical: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    icon: "text-red-600 dark:text-red-400",
    indicator: "bg-red-500",
    label: "Crítico",
  },
};

function AnimatedValue({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(latest),
    });
    return () => controls.stop();
  }, [value]);

  return <>{displayValue.toFixed(decimals)}</>;
}

export function SensorCard({ sensor, index = 0 }: SensorCardProps) {
  const config = sensorConfigs[sensor.type];
  const Icon = iconMap[sensor.type];
  const status = statusConfig[sensor.status];
  const [isHovered, setIsHovered] = useState(false);

  const formatLastUpdated = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Hace un momento";
    if (diffMins === 1) return "Hace 1 minuto";
    if (diffMins < 60) return `Hace ${diffMins} minutos`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return "Hace 1 hora";
    return `Hace ${diffHours} horas`;
  };

  const getProgressPercentage = () => {
    const range = sensor.maxValue - sensor.minValue;
    return ((sensor.value - sensor.minValue) / range) * 100;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.15)",
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn("relative cursor-pointer overflow-hidden rounded-xl border p-5", status.bg, status.border)}
    >
      <motion.div
        className="absolute top-0 right-0 h-1 w-full"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
        style={{ originX: 0 }}
      >
        <div className={cn("h-full", status.indicator)} style={{ width: "100%" }} />
      </motion.div>

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className={cn("rounded-lg bg-white/80 p-2.5 dark:bg-black/20", status.icon)}
            animate={{
              rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="h-5 w-5" />
          </motion.div>
          <div>
            <h3 className="text-foreground font-semibold">{config.label}</h3>
            <motion.span
              className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", status.badge)}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {status.label}
            </motion.span>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-baseline gap-1">
          <span className="text-foreground text-3xl font-bold tabular-nums">
            <AnimatedValue value={sensor.value} />
          </span>
          <span className="text-muted-foreground text-sm">{sensor.unit}</span>
        </div>

        <div className="mt-3">
          <div className="text-muted-foreground mb-1 flex justify-between text-xs">
            <span>
              {sensor.minValue}
              {sensor.unit}
            </span>
            <span>
              Rango normal: {sensor.normalRange.min}-{sensor.normalRange.max}
              {sensor.unit}
            </span>
            <span>
              {sensor.maxValue}
              {sensor.unit}
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/60 dark:bg-black/20">
            <motion.div
              className={cn("h-full rounded-full", status.indicator)}
              initial={{ width: 0 }}
              animate={{ width: `${getProgressPercentage()}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.4, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      <motion.div
        className="text-muted-foreground mt-4 flex items-center gap-1.5 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.5 }}
      >
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}>
          <Clock className="h-3.5 w-3.5" />
        </motion.div>
        <span>{formatLastUpdated(sensor.lastUpdated)}</span>
      </motion.div>
    </motion.div>
  );
}
