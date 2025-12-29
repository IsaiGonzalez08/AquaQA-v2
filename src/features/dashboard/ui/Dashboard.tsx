"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/Sidebar";
import { refreshUsecase } from "@/features/auth/application/refresh.usecase.client";
import { meUseCase } from "@/features/dashboard/application/me.usecase.server";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await meUseCase();

        if (response.status === 401) {
          const refreshResponse = await refreshUsecase();

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
          <SidebarTrigger className="mb-10" />
          <div>{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
