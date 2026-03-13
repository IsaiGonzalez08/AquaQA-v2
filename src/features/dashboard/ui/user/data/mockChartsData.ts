import {
  TimeSeriesData,
  TimeSeriesDataPoint,
  DistributionData,
  DistributionBucket,
  Anomaly,
  TimeRange,
} from "../types/charts.types";
import { SensorType } from "../types/sensor.types";

const sensorUnits: Record<SensorType, string> = {
  temperature: "°C",
  ph: "",
  turbidity: "NTU",
  magnetism: "µT",
};

const sensorRanges: Record<SensorType, { min: number; max: number; normal: { min: number; max: number } }> = {
  temperature: { min: 15, max: 30, normal: { min: 20, max: 25 } },
  ph: { min: 5, max: 9, normal: { min: 6.5, max: 8.5 } },
  turbidity: { min: 0, max: 20, normal: { min: 0, max: 5 } },
  magnetism: { min: 20, max: 80, normal: { min: 25, max: 65 } },
};

const generateTimeSeriesData = (
  sensorType: SensorType,
  timeRange: TimeRange,
  customRange?: { start: Date; end: Date }
): TimeSeriesDataPoint[] => {
  const now = new Date();
  const data: TimeSeriesDataPoint[] = [];
  const range = sensorRanges[sensorType];

  let startDate: Date;
  let intervalMinutes: number;
  let points: number;

  switch (timeRange) {
    case "24h":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      intervalMinutes = 30;
      points = 48;
      break;
    case "7d":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      intervalMinutes = 180;
      points = 56;
      break;
    case "30d":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      intervalMinutes = 720;
      points = 60;
      break;
    case "custom":
      if (customRange) {
        startDate = customRange.start;
        const diffMs = customRange.end.getTime() - customRange.start.getTime();
        points = Math.min(100, Math.max(20, Math.floor(diffMs / (60 * 60 * 1000))));
        intervalMinutes = diffMs / (points * 60 * 1000);
      } else {
        startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        intervalMinutes = 30;
        points = 48;
      }
      break;
  }

  const baseValue = (range.normal.min + range.normal.max) / 2;
  const variance = (range.normal.max - range.normal.min) / 2;

  for (let i = 0; i < points; i++) {
    const timestamp = new Date(startDate.getTime() + i * intervalMinutes * 60 * 1000);
    const randomVariation = (Math.random() - 0.5) * variance * 2;
    const trendVariation = Math.sin(i / 10) * variance * 0.3;
    let value = baseValue + randomVariation + trendVariation;

    if (Math.random() < 0.05) {
      value = value + (Math.random() > 0.5 ? 1 : -1) * variance * 2;
    }

    value = Math.max(range.min, Math.min(range.max, value));

    data.push({
      timestamp,
      value: Number(value.toFixed(2)),
      sensorType,
    });
  }

  return data;
};

export const getTimeSeriesData = (
  sensorType: SensorType,
  timeRange: TimeRange,
  customRange?: { start: Date; end: Date }
): TimeSeriesData => {
  return {
    sensorType,
    data: generateTimeSeriesData(sensorType, timeRange, customRange),
    unit: sensorUnits[sensorType],
  };
};

export const generateDistributionData = (sensorType: SensorType): DistributionData => {
  const range = sensorRanges[sensorType];
  const bucketCount = 10;
  const bucketSize = (range.max - range.min) / bucketCount;
  const buckets: DistributionBucket[] = [];

  const totalSamples = 1000;
  const mean = (range.normal.min + range.normal.max) / 2;
  const stdDev = (range.normal.max - range.normal.min) / 4;

  const values: number[] = [];
  for (let i = 0; i < totalSamples; i++) {
    let u1 = Math.random();
    let u2 = Math.random();
    let z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    let value = mean + z * stdDev;
    value = Math.max(range.min, Math.min(range.max, value));
    values.push(value);
  }

  for (let i = 0; i < bucketCount; i++) {
    const min = range.min + i * bucketSize;
    const max = min + bucketSize;
    const count = values.filter((v) => v >= min && v < max).length;

    buckets.push({
      range: `${min.toFixed(1)}-${max.toFixed(1)}`,
      min,
      max,
      count,
      percentage: (count / totalSamples) * 100,
    });
  }

  const sortedValues = [...values].sort((a, b) => a - b);
  const median = sortedValues[Math.floor(sortedValues.length / 2)];
  const actualMean = values.reduce((a, b) => a + b, 0) / values.length;
  const actualStdDev = Math.sqrt(
    values.reduce((sum, v) => sum + Math.pow(v - actualMean, 2), 0) / values.length
  );

  return {
    sensorType,
    buckets,
    mean: Number(actualMean.toFixed(2)),
    median: Number(median.toFixed(2)),
    standardDeviation: Number(actualStdDev.toFixed(2)),
    unit: sensorUnits[sensorType],
  };
};

export const generateAnomalies = (): Anomaly[] => {
  const anomalies: Anomaly[] = [];
  const sensorTypes: SensorType[] = ["temperature", "ph", "turbidity", "magnetism"];
  const now = new Date();

  const anomalyData = [
    {
      sensorType: "turbidity" as SensorType,
      hoursAgo: 2,
      value: 12.5,
      severity: "high" as const,
      description: "Pico de turbidez detectado, valor significativamente por encima del rango normal",
    },
    {
      sensorType: "temperature" as SensorType,
      hoursAgo: 8,
      value: 27.8,
      severity: "medium" as const,
      description: "Temperatura elevada detectada durante la tarde",
    },
    {
      sensorType: "ph" as SensorType,
      hoursAgo: 18,
      value: 8.9,
      severity: "low" as const,
      description: "pH ligeramente por encima del rango óptimo",
    },
    {
      sensorType: "magnetism" as SensorType,
      hoursAgo: 36,
      value: 72.3,
      severity: "medium" as const,
      description: "Fluctuación inusual en el campo magnético",
    },
  ];

  anomalyData.forEach((data, index) => {
    const range = sensorRanges[data.sensorType];
    anomalies.push({
      id: `anomaly-${index + 1}`,
      timestamp: new Date(now.getTime() - data.hoursAgo * 60 * 60 * 1000),
      sensorType: data.sensorType,
      value: data.value,
      expectedRange: range.normal,
      severity: data.severity,
      description: data.description,
    });
  });

  return anomalies;
};

export const mockAnomalies = generateAnomalies();

export const exportToCSV = (data: TimeSeriesDataPoint[], sensorType: SensorType): string => {
  const headers = ["Fecha", "Hora", "Valor", "Unidad"];
  const unit = sensorUnits[sensorType];

  const rows = data.map((point) => {
    const date = point.timestamp.toLocaleDateString("es-MX");
    const time = point.timestamp.toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" });
    return `${date},${time},${point.value},${unit}`;
  });

  return [headers.join(","), ...rows].join("\n");
};

export const exportToJSON = (data: TimeSeriesDataPoint[], sensorType: SensorType): string => {
  const exportData = {
    sensorType,
    unit: sensorUnits[sensorType],
    exportedAt: new Date().toISOString(),
    dataPoints: data.map((point) => ({
      timestamp: point.timestamp.toISOString(),
      value: point.value,
    })),
  };

  return JSON.stringify(exportData, null, 2);
};

export { sensorUnits, sensorRanges };
