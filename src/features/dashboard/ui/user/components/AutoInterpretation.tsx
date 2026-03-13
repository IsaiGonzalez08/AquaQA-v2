"use client";

import { motion } from "framer-motion";
import { AnalysisInsight } from "../types/analysis.types";
import { SensorType } from "../types/sensor.types";
import { Thermometer, Droplets, Waves, Magnet, Info, AlertTriangle, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";

interface AutoInterpretationProps {
  insights: AnalysisInsight[];
}

const iconMap: Record<SensorType, React.ElementType> = {
  temperature: Thermometer,
  ph: Droplets,
  turbidity: Waves,
  magnetism: Magnet,
};

const insightConfig = {
  info: {
    icon: Info,
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    iconBg: "bg-blue-100 dark:bg-blue-900",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-800",
    iconBg: "bg-amber-100 dark:bg-amber-900",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-800",
    iconBg: "bg-emerald-100 dark:bg-emerald-900",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  alert: {
    icon: AlertCircle,
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    iconBg: "bg-red-100 dark:bg-red-900",
    iconColor: "text-red-600 dark:text-red-400",
  },
};

export function AutoInterpretation({ insights }: AutoInterpretationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="rounded-lg bg-primary/10 p-2">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Interpretación Automática</h3>
          <p className="text-sm text-muted-foreground">Resumen generado por el sistema</p>
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const config = insightConfig[insight.type];
          const TypeIcon = config.icon;
          const SensorIcon = insight.sensorType ? iconMap[insight.sensorType] : null;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className={cn(
                "flex items-start gap-3 p-4 rounded-lg border",
                config.bg,
                config.border
              )}
            >
              <div className={cn("rounded-full p-1.5 shrink-0", config.iconBg)}>
                <TypeIcon className={cn("h-4 w-4", config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">{insight.message}</p>
                {SensorIcon && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <SensorIcon className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground capitalize">
                      {insight.sensorType === "ph" ? "pH" : insight.sensorType}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-4 pt-4 border-t"
      >
        <p className="text-xs text-muted-foreground text-center">
          Este análisis se genera automáticamente basado en los datos de los sensores
        </p>
      </motion.div>
    </motion.div>
  );
}
