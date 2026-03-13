"use client";

import { useSelector } from "react-redux";
import { RootState } from "shared/store/store";
import { SensorCard } from "./components/SensorCard";
import { WaterQualityScore } from "./components/WaterQualityScore";
import { mockWaterQualityData } from "./data/mockSensorData";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function InitPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  return (
    <div className="space-y-6">
      <motion.div
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <motion.h1
            className="text-4xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Bienvenido, {user?.name} 👋
          </motion.h1>
          <motion.p
            className="text-muted-foreground mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Monitoreo en tiempo real de la calidad del agua
          </motion.p>
        </div>
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="text-muted-foreground hidden text-xs sm:inline">
            Actualizado: {lastUpdated.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <Button onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Actualizar
          </Button>
        </motion.div>
      </motion.div>

      <WaterQualityScore data={mockWaterQualityData} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <h2 className="mb-4 text-xl font-semibold">Estado de Sensores</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockWaterQualityData.sensors.map((sensor, index) => (
            <SensorCard key={sensor.id} sensor={sensor} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
