import { SensorType, SensorStatus } from "./sensor.types";

export type TimeRange = "24h" | "7d" | "30d" | "custom";

export interface TimeSeriesDataPoint {
  timestamp: Date;
  value: number;
  sensorType: SensorType;
}

export interface TimeSeriesData {
  sensorType: SensorType;
  data: TimeSeriesDataPoint[];
  unit: string;
}

export interface ComparisonDataPoint {
  timestamp: Date;
  sensor1Value: number;
  sensor2Value: number;
}

export interface DistributionBucket {
  range: string;
  min: number;
  max: number;
  count: number;
  percentage: number;
}

export interface DistributionData {
  sensorType: SensorType;
  buckets: DistributionBucket[];
  mean: number;
  median: number;
  standardDeviation: number;
  unit: string;
}

export interface Anomaly {
  id: string;
  timestamp: Date;
  sensorType: SensorType;
  value: number;
  expectedRange: { min: number; max: number };
  severity: "low" | "medium" | "high";
  description: string;
}

export interface ChartConfig {
  selectedSensor: SensorType;
  timeRange: TimeRange;
  customDateRange?: { start: Date; end: Date };
  comparisonSensor?: SensorType;
}

export interface ExportData {
  sensorType: SensorType;
  timeRange: TimeRange;
  data: TimeSeriesDataPoint[];
  exportedAt: Date;
}
