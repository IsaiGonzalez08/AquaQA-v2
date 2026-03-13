import { SensorType, SensorStatus } from "./sensor.types";

export type TimePeriod = "day" | "week" | "month";

export interface PeriodAverage {
  sensorType: SensorType;
  period: TimePeriod;
  average: number;
  min: number;
  max: number;
  unit: string;
}

export interface TemporalComparison {
  sensorType: SensorType;
  currentValue: number;
  previousDay: number;
  previousWeek: number;
  historicalAverage: number;
  unit: string;
  changeFromYesterday: number;
  changeFromLastWeek: number;
  changeFromHistorical: number;
}

export interface QualityTrendPoint {
  date: Date;
  score: number;
  status: SensorStatus;
}

export interface SensorStabilityData {
  sensorType: SensorType;
  label: string;
  variance: number;
  standardDeviation: number;
  stabilityScore: number;
  trend: "stable" | "increasing" | "decreasing" | "fluctuating";
}

export interface AnalysisInsight {
  type: "info" | "warning" | "success" | "alert";
  message: string;
  sensorType?: SensorType;
}

export interface AnalysisData {
  periodAverages: PeriodAverage[];
  temporalComparisons: TemporalComparison[];
  qualityTrend: QualityTrendPoint[];
  sensorStability: SensorStabilityData[];
  insights: AnalysisInsight[];
  lastUpdated: Date;
}
