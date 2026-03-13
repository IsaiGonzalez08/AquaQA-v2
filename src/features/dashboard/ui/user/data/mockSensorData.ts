import { SensorReading, WaterQualityData, SensorConfig, SensorType } from "../types/sensor.types";

export const sensorConfigs: Record<SensorType, SensorConfig> = {
  temperature: {
    type: "temperature",
    label: "Temperatura",
    unit: "°C",
    icon: "Thermometer",
    normalRange: { min: 20, max: 25 },
    warningRange: { min: 15, max: 30 },
    minValue: 0,
    maxValue: 40,
  },
  ph: {
    type: "ph",
    label: "pH",
    unit: "",
    icon: "Droplets",
    normalRange: { min: 6.5, max: 8.5 },
    warningRange: { min: 6.0, max: 9.0 },
    minValue: 0,
    maxValue: 14,
  },
  turbidity: {
    type: "turbidity",
    label: "Turbidez",
    unit: "NTU",
    icon: "Waves",
    normalRange: { min: 0, max: 5 },
    warningRange: { min: 0, max: 10 },
    minValue: 0,
    maxValue: 100,
  },
  magnetism: {
    type: "magnetism",
    label: "Magnetismo",
    unit: "µT",
    icon: "Magnet",
    normalRange: { min: 25, max: 65 },
    warningRange: { min: 20, max: 80 },
    minValue: 0,
    maxValue: 100,
  },
};

export const mockSensorReadings: SensorReading[] = [
  {
    id: "sensor-temp-001",
    type: "temperature",
    value: 22.5,
    unit: "°C",
    status: "normal",
    lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
    minValue: 0,
    maxValue: 40,
    normalRange: { min: 20, max: 25 },
  },
  {
    id: "sensor-ph-001",
    type: "ph",
    value: 7.2,
    unit: "",
    status: "normal",
    lastUpdated: new Date(Date.now() - 3 * 60 * 1000),
    minValue: 0,
    maxValue: 14,
    normalRange: { min: 6.5, max: 8.5 },
  },
  {
    id: "sensor-turb-001",
    type: "turbidity",
    value: 8.5,
    unit: "NTU",
    status: "warning",
    lastUpdated: new Date(Date.now() - 2 * 60 * 1000),
    minValue: 0,
    maxValue: 100,
    normalRange: { min: 0, max: 5 },
  },
  {
    id: "sensor-mag-001",
    type: "magnetism",
    value: 45.0,
    unit: "µT",
    status: "normal",
    lastUpdated: new Date(Date.now() - 1 * 60 * 1000),
    minValue: 0,
    maxValue: 100,
    normalRange: { min: 25, max: 65 },
  },
];

export const calculateWaterQualityScore = (sensors: SensorReading[]): number => {
  if (sensors.length === 0) return 0;

  let totalScore = 0;

  sensors.forEach((sensor) => {
    const { value, normalRange, minValue, maxValue } = sensor;
    const rangeMid = (normalRange.min + normalRange.max) / 2;
    const rangeSpan = normalRange.max - normalRange.min;

    const deviation = Math.abs(value - rangeMid);
    const maxDeviation = Math.max(maxValue - rangeMid, rangeMid - minValue);

    const normalizedScore = Math.max(0, 100 - (deviation / maxDeviation) * 100);
    totalScore += normalizedScore;
  });

  return Math.round(totalScore / sensors.length);
};

export const getOverallStatus = (score: number): "normal" | "warning" | "critical" => {
  if (score >= 80) return "normal";
  if (score >= 60) return "warning";
  return "critical";
};

export const mockWaterQualityData: WaterQualityData = {
  overallScore: calculateWaterQualityScore(mockSensorReadings),
  status: getOverallStatus(calculateWaterQualityScore(mockSensorReadings)),
  sensors: mockSensorReadings,
  lastUpdated: new Date(),
};
