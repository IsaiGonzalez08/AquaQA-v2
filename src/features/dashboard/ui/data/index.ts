import { Home, BarChart3, ChartLine, User } from "lucide-react";

export const menuItems = [
  {
    title: "Inicio",
    url: "/dashboard/user",
    icon: Home,
  },
  {
    title: "Análisis general",
    url: "/dashboard/user/analysis",
    icon: BarChart3,
  },
  {
    title: "Gráficas de resultados",
    url: "/dashboard/user/charts",
    icon: ChartLine,
  },
];

export const adminMenuItems = [
  {
    title: "Dashboard",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Solicitudes",
    url: "/dashboard/admin/request",
    icon: User,
  },
];
