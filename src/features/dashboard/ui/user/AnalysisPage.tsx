"use client";

import { motion } from "framer-motion";
import { PeriodAverages } from "./components/PeriodAverages";
import { TemporalComparison } from "./components/TemporalComparison";
import { QualityTrendChart } from "./components/QualityTrendChart";
import { SensorStability } from "./components/SensorStability";
import { AutoInterpretation } from "./components/AutoInterpretation";
import { mockAnalysisData } from "./data/mockAnalysisData";

export function AnalysisPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold">Análisis General</h1>
        <p className="text-muted-foreground mt-2">Resumen del comportamiento del sistema y tendencias de los datos</p>
      </motion.div>

      <PeriodAverages data={mockAnalysisData.periodAverages} />

      <TemporalComparison data={mockAnalysisData.temporalComparisons} />

      <QualityTrendChart data={mockAnalysisData.qualityTrend} />

      <div className="grid gap-6 lg:grid-cols-2">
        <SensorStability data={mockAnalysisData.sensorStability} />
        <AutoInterpretation insights={mockAnalysisData.insights} />
      </div>
    </div>
  );
}
