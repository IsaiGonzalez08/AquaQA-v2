export type SensorStatus = "normal" | "warning" | "critical";

export type SensorType = "temperature" | "ph" | "turbidity" | "magnetism";

export interface SensorReading {
  id: string;
  type: SensorType;
  value: number;
  unit: string;
  status: SensorStatus;
  lastUpdated: Date;
  minValue: number;
  maxValue: number;
  normalRange: {
    min: number;
    max: number;
  };
}

export interface WaterQualityData {
  overallScore: number;
  status: SensorStatus;
  sensors: SensorReading[];
  lastUpdated: Date;
}

export interface SensorConfig {
  type: SensorType;
  label: string;
  unit: string;
  icon: string;
  normalRange: {
    min: number;
    max: number;
  };
  warningRange: {
    min: number;
    max: number;
  };
  minValue: number;
  maxValue: number;
}
