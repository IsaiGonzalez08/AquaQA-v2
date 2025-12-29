import { Thermometer, Droplets, Waves, Magnet } from "lucide-react";
import { SensorConfig } from "../types/user.dashboard.types";

export const SENSORS: SensorConfig[] = [
  {
    id: "temperature",
    name: "Temperatura",
    unit: "°C",
    icon: Thermometer,
    color: "#3b82f6",
    minOptimal: 18,
    maxOptimal: 28,
  },
  {
    id: "ph",
    name: "pH",
    unit: "",
    icon: Droplets,
    color: "#22c55e",
    minOptimal: 6.5,
    maxOptimal: 8.5,
  },
  {
    id: "turbidity",
    name: "Turbidez",
    unit: "NTU",
    icon: Waves,
    color: "#f59e0b",
    minOptimal: 0,
    maxOptimal: 25,
  },
  {
    id: "magnetism",
    name: "Magnetismo",
    unit: "μT",
    icon: Magnet,
    color: "#a855f7",
    minOptimal: 25,
    maxOptimal: 65,
  },
];

export const periodLabels = {
  "24h": "Últimas 24 horas",
  "7d": "Últimos 7 días",
  "30d": "Últimos 30 días",
  custom: "Rango personalizado",
} as const;

export const resolutionOptions = [
  { value: "raw", label: "Crudo (15 min)" },
  { value: "minute", label: "Por minuto" },
  { value: "hour", label: "Por hora" },
] as const;
