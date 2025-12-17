"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/user/me");

        if (response.status === 401) {
          const refreshResponse = await fetch("/api/auth/refresh", {
            method: "POST",
          });

          if (!refreshResponse.ok) {
            router.replace("/auth/login");
          }
        }
      } catch (error) {
        console.error("Auth check error:", error);
      }
    };

    checkAuth();

    const interval = setInterval(
      () => {
        checkAuth();
      },
      14 * 60 * 1000
    );

    return () => clearInterval(interval);
  }, [router]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 p-10">
          <SidebarTrigger />
          <div>{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
