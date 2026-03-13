"use client";

import { motion } from "framer-motion";
import { TimeSeriesDataPoint } from "../types/charts.types";
import { SensorType } from "../types/sensor.types";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/button";
import { exportToCSV, exportToJSON } from "../data/mockChartsData";
import { cn } from "@/lib/cn";

interface DataExportProps {
  data: TimeSeriesDataPoint[];
  sensorType: SensorType;
}

const sensorLabels: Record<SensorType, string> = {
  temperature: "Temperatura",
  ph: "pH",
  turbidity: "Turbidez",
  magnetism: "Magnetismo",
};

export function DataExport({ data, sensorType }: DataExportProps) {
  const handleExportCSV = () => {
    const csvContent = exportToCSV(data, sensorType);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `aquaqa_${sensorType}_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJSON = () => {
    const jsonContent = exportToJSON(data, sensorType);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `aquaqa_${sensorType}_${new Date().toISOString().split("T")[0]}.json`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="rounded-lg bg-primary/10 p-2">
          <Download className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Exportar Datos</h3>
          <p className="text-sm text-muted-foreground">
            Descarga los datos de {sensorLabels[sensorType]} para análisis externo
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-lg border bg-background hover:border-primary/50 transition-colors cursor-pointer"
          onClick={handleExportCSV}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-md bg-emerald-100 dark:bg-emerald-900/30 p-2">
              <FileSpreadsheet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-medium">Exportar CSV</h4>
              <p className="text-xs text-muted-foreground">Compatible con Excel</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {data.length} registros • Formato tabular
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-lg border bg-background hover:border-primary/50 transition-colors cursor-pointer"
          onClick={handleExportJSON}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-md bg-blue-100 dark:bg-blue-900/30 p-2">
              <FileJson className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium">Exportar JSON</h4>
              <p className="text-xs text-muted-foreground">Para desarrolladores</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {data.length} registros • Formato estructurado
          </p>
        </motion.div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          Los datos exportados incluyen marca de tiempo, valor y unidad de medida
        </p>
      </div>
    </motion.div>
  );
}
