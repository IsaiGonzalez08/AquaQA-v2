"use client";

import { useEffect, useState } from "react";
import { GaugeCard } from "./components/GaugeCard";
import { Thermometer, Droplets, Waves, Magnet } from "lucide-react";
import { UserData, SensorData } from "./types/user.dashboard.types";

export function InitPage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [sensorData, setSensorData] = useState<SensorData>({
    temperature: 22.5,
    ph: 7.2,
    turbidity: 15.3,
    magnetism: 45.8,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    const interval = setInterval(() => {
      setSensorData({
        temperature: 18 + Math.random() * 12,
        ph: 6.5 + Math.random() * 2,
        turbidity: Math.random() * 50,
        magnetism: 30 + Math.random() * 40,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">Bienvenido, {userData?.name} 👋</h1>
        <p className="text-muted-foreground mt-2">Monitoreo en tiempo real de la calidad del agua</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <GaugeCard
          title="Temperatura"
          value={sensorData.temperature}
          unit="°C"
          min={0}
          max={50}
          icon={Thermometer}
          colorRange={["#3b82f6", "#22c55e", "#ef4444"]}
          description="Rango óptimo: 18-28°C"
        />

        <GaugeCard
          title="pH"
          value={sensorData.ph}
          unit=""
          min={0}
          max={14}
          icon={Droplets}
          colorRange={["#ef4444", "#22c55e", "#ef4444"]}
          description="Rango óptimo: 6.5-8.5"
        />

        <GaugeCard
          title="Turbidez"
          value={sensorData.turbidity}
          unit=" NTU"
          min={0}
          max={100}
          icon={Waves}
          colorRange={["#22c55e", "#eab308", "#ef4444"]}
          description="Menor valor indica agua más clara"
        />

        <GaugeCard
          title="Magnetismo"
          value={sensorData.magnetism}
          unit=" μT"
          min={0}
          max={100}
          icon={Magnet}
          colorRange={["#22c55e", "#3b82f6", "#a855f7"]}
          description="Campo magnético detectado"
        />
      </div>

      <div className="bg-card rounded-lg border p-6">
        <h2 className="mb-4 text-xl font-semibold">Estado General del Sistema</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Última actualización</p>
            <p className="text-lg font-medium">{new Date().toLocaleString("es-MX")}</p>
          </div>
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm">Estado de sensores</p>
            <p className="text-lg font-medium text-green-600">Todos operando correctamente</p>
          </div>
        </div>
      </div>
    </div>
  );
}
