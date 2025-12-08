"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", href: "/dashboard/admin", icon: "📊" },
    { name: "Usuarios", href: "/dashboard/admin/users", icon: "👥" },
    { name: "Tests", href: "/dashboard/admin/tests", icon: "📝" },
    { name: "Reportes", href: "/dashboard/admin/reports", icon: "📈" },
    { name: "Configuración", href: "/dashboard/admin/settings", icon: "⚙️" },
  ];

  return (
    <div className="bg-background flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-gray-900/50">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-gray-800 px-6">
            <Image width={32} height={32} src="/aquaQA.svg" alt="Logo" />
            <div>
              <span className="text-xl font-bold">AquaQA</span>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    isActive ? "bg-primary text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-gray-800/50 p-3">
              <div className="bg-primary flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-white">
                  {user?.name} {user?.lastname}
                </p>
                <p className="text-xs text-yellow-400">👑 Admin</p>
              </div>
            </div>
            <Button onClick={logout} variant="secondary" className="mt-3 w-full">
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
