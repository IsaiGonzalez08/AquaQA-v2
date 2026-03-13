import {
  AnalysisData,
  PeriodAverage,
  TemporalComparison,
  QualityTrendPoint,
  SensorStabilityData,
  AnalysisInsight,
} from "../types/analysis.types";
import { SensorType } from "../types/sensor.types";

const sensorLabels: Record<SensorType, string> = {
  temperature: "Temperatura",
  ph: "pH",
  turbidity: "Turbidez",
  magnetism: "Magnetismo",
};

const sensorUnits: Record<SensorType, string> = {
  temperature: "°C",
  ph: "",
  turbidity: "NTU",
  magnetism: "µT",
};

export const mockPeriodAverages: PeriodAverage[] = [
  { sensorType: "temperature", period: "day", average: 22.3, min: 21.5, max: 23.1, unit: "°C" },
  { sensorType: "temperature", period: "week", average: 22.1, min: 20.8, max: 23.5, unit: "°C" },
  { sensorType: "temperature", period: "month", average: 21.8, min: 19.5, max: 24.2, unit: "°C" },
  { sensorType: "ph", period: "day", average: 7.2, min: 7.0, max: 7.4, unit: "" },
  { sensorType: "ph", period: "week", average: 7.15, min: 6.9, max: 7.5, unit: "" },
  { sensorType: "ph", period: "month", average: 7.1, min: 6.8, max: 7.6, unit: "" },
  { sensorType: "turbidity", period: "day", average: 4.2, min: 3.5, max: 8.5, unit: "NTU" },
  { sensorType: "turbidity", period: "week", average: 4.8, min: 2.1, max: 9.2, unit: "NTU" },
  { sensorType: "turbidity", period: "month", average: 4.5, min: 1.8, max: 10.5, unit: "NTU" },
  { sensorType: "magnetism", period: "day", average: 44.5, min: 42.0, max: 47.0, unit: "µT" },
  { sensorType: "magnetism", period: "week", average: 45.2, min: 40.5, max: 49.8, unit: "µT" },
  { sensorType: "magnetism", period: "month", average: 44.8, min: 38.0, max: 52.0, unit: "µT" },
];

export const mockTemporalComparisons: TemporalComparison[] = [
  {
    sensorType: "temperature",
    currentValue: 22.5,
    previousDay: 22.1,
    previousWeek: 21.8,
    historicalAverage: 22.0,
    unit: "°C",
    changeFromYesterday: 1.8,
    changeFromLastWeek: 3.2,
    changeFromHistorical: 2.3,
  },
  {
    sensorType: "ph",
    currentValue: 7.2,
    previousDay: 7.15,
    previousWeek: 7.1,
    historicalAverage: 7.0,
    unit: "",
    changeFromYesterday: 0.7,
    changeFromLastWeek: 1.4,
    changeFromHistorical: 2.9,
  },
  {
    sensorType: "turbidity",
    currentValue: 8.5,
    previousDay: 4.2,
    previousWeek: 3.8,
    historicalAverage: 4.0,
    unit: "NTU",
    changeFromYesterday: 102.4,
    changeFromLastWeek: 123.7,
    changeFromHistorical: 112.5,
  },
  {
    sensorType: "magnetism",
    currentValue: 45.0,
    previousDay: 44.5,
    previousWeek: 45.8,
    historicalAverage: 44.0,
    unit: "µT",
    changeFromYesterday: 1.1,
    changeFromLastWeek: -1.7,
    changeFromHistorical: 2.3,
  },
];

const generateQualityTrend = (): QualityTrendPoint[] => {
  const points: QualityTrendPoint[] = [];
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    const baseScore = 75 + Math.random() * 20;
    const score = Math.round(baseScore);

    let status: "normal" | "warning" | "critical";
    if (score >= 80) status = "normal";
    else if (score >= 60) status = "warning";
    else status = "critical";

    points.push({ date, score, status });
  }

  return points;
};

export const mockQualityTrend: QualityTrendPoint[] = generateQualityTrend();

export const mockSensorStability: SensorStabilityData[] = [
  {
    sensorType: "temperature",
    label: "Temperatura",
    variance: 0.45,
    standardDeviation: 0.67,
    stabilityScore: 92,
    trend: "stable",
  },
  {
    sensorType: "ph",
    label: "pH",
    variance: 0.08,
    standardDeviation: 0.28,
    stabilityScore: 95,
    trend: "stable",
  },
  {
    sensorType: "turbidity",
    label: "Turbidez",
    variance: 4.2,
    standardDeviation: 2.05,
    stabilityScore: 58,
    trend: "fluctuating",
  },
  {
    sensorType: "magnetism",
    label: "Magnetismo",
    variance: 2.1,
    standardDeviation: 1.45,
    stabilityScore: 78,
    trend: "stable",
  },
];

export const mockInsights: AnalysisInsight[] = [
  {
    type: "success",
    message: "El pH se mantiene dentro del rango normal durante los últimos 7 días.",
    sensorType: "ph",
  },
  {
    type: "warning",
    message: "Se detecta un aumento significativo en la turbidez durante las últimas horas. Valor actual: 8.5 NTU.",
    sensorType: "turbidity",
  },
  {
    type: "info",
    message: "La temperatura se ha mantenido estable con variaciones menores a 1°C en la última semana.",
    sensorType: "temperature",
  },
  {
    type: "success",
    message: "El magnetismo presenta lecturas consistentes dentro del rango esperado.",
    sensorType: "magnetism",
  },
];

export const mockAnalysisData: AnalysisData = {
  periodAverages: mockPeriodAverages,
  temporalComparisons: mockTemporalComparisons,
  qualityTrend: mockQualityTrend,
  sensorStability: mockSensorStability,
  insights: mockInsights,
  lastUpdated: new Date(),
};

export { sensorLabels, sensorUnits };
