export interface UserData {
  userId: string;
  email: string;
  name: string;
}

export interface SensorData {
  temperature: number;
  ph: number;
  turbidity: number;
  magnetism: number;
}

export interface SensorConfig {
  id: string;
  name: string;
  unit: string;
  icon: React.ElementType;
  color: string;
  minOptimal: number;
  maxOptimal: number;
}

export type Period = "24h" | "7d" | "30d" | "custom";
export type SensorStatus = "normal" | "alert" | "critical";
export type Trend = "up" | "down" | "stable";
export type Resolution = "raw" | "minute" | "hour";
export type ViewMode = "single" | "compare" | "histogram";

export interface SensorAnalysis {
  id: string;
  name: string;
  unit: string;
  icon: React.ElementType;
  color: string;
  average: number;
  min: number;
  max: number;
  outOfRangePercent: number;
  outOfRangeTime: string;
  alertCount: number;
  status: SensorStatus;
  trend: Trend;
  trendData: number[];
  stability: number;
}

export interface DataPoint {
  timestamp: string;
  time: string;
  temperature: number;
  ph: number;
  turbidity: number;
  magnetism: number;
}

export interface AlertEvent {
  id: string;
  sensor: string;
  startTime: string;
  endTime: string;
  startIndex: number;
  endIndex: number;
  type: "warning" | "critical";
  message: string;
}

export interface HistoricalRecord {
  timestamp: string;
  sensor: string;
  value: number;
  status: "normal" | "warning" | "critical";
  event: string | null;
}
