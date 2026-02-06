import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function KPICard({ title, value, icon: Icon, iconColor = "text-blue-500", trend }: KPICardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <span
                className={`text-sm font-medium ${
                  trend.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
            )}
          </div>
        </div>
        <div className={`rounded-full bg-muted p-3 ${iconColor}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
