"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { SensorType } from "./types/sensor.types";
import { TimeRange } from "./types/charts.types";
import { ChartControls } from "./components/ChartControls";
import { TimeSeriesChart } from "./components/TimeSeriesChart";
import { ValueDistribution } from "./components/ValueDistribution";
import { AnomalyDetection } from "./components/AnomalyDetection";
import { DataExport } from "./components/DataExport";
import { getTimeSeriesData, generateDistributionData, mockAnomalies } from "./data/mockChartsData";

export function ResultChartsPage() {
  const [selectedSensor, setSelectedSensor] = useState<SensorType>("temperature");
  const [timeRange, setTimeRange] = useState<TimeRange>("24h");
  const [comparisonSensor, setComparisonSensor] = useState<SensorType | undefined>(undefined);

  const primaryData = useMemo(() => getTimeSeriesData(selectedSensor, timeRange), [selectedSensor, timeRange]);

  const comparisonData = useMemo(
    () => (comparisonSensor ? getTimeSeriesData(comparisonSensor, timeRange) : undefined),
    [comparisonSensor, timeRange]
  );

  const distributionData = useMemo(() => generateDistributionData(selectedSensor), [selectedSensor]);

  const filteredAnomalies = useMemo(
    () => mockAnomalies.filter((a) => a.sensorType === selectedSensor),
    [selectedSensor]
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold">Gráficas de Resultados</h1>
        <p className="text-muted-foreground mt-2">Explora los datos en profundidad mediante gráficas interactivas</p>
      </motion.div>

      <ChartControls
        selectedSensor={selectedSensor}
        onSensorChange={setSelectedSensor}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        comparisonSensor={comparisonSensor}
        onComparisonSensorChange={setComparisonSensor}
        showComparison={true}
      />

      <TimeSeriesChart primaryData={primaryData} comparisonData={comparisonData} />

      <div className="grid gap-6 lg:grid-cols-2">
        <ValueDistribution data={distributionData} />
        <AnomalyDetection anomalies={filteredAnomalies} />
      </div>

      <DataExport data={primaryData.data} sensorType={selectedSensor} />
    </div>
  );
}
