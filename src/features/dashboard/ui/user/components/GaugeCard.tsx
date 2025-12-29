"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GaugeCardProps {
  title: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  icon: LucideIcon;
  colorRange: string[];
  description?: string;
}

export function GaugeCard({ title, value, unit, min, max, icon: Icon, colorRange, description }: GaugeCardProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  const data = [
    { name: "value", value: percentage },
    { name: "remaining", value: 100 - percentage },
  ];

  const getColor = () => {
    if (percentage < 33) return colorRange[0];
    if (percentage < 66) return colorRange[1];
    return colorRange[2];
  };

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="relative">
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
              >
                <Cell fill={getColor()} />
                <Cell fill="#e5e7eb" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <div className="text-3xl font-bold">{value.toFixed(1)}</div>
            <div className="text-muted-foreground text-sm">{unit}</div>
          </div>
        </div>

        {description && <p className="text-muted-foreground mt-2 text-center text-xs">{description}</p>}

        <div className="text-muted-foreground mt-4 flex justify-between text-xs">
          <span>
            {min}
            {unit}
          </span>
          <span>
            {max}
            {unit}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
