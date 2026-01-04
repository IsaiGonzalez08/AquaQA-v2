"use client";

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/sidebar";
import { AppSidebar } from "./components/Sidebar";
import { useAuthCheck } from "@/hooks/useAuthCheck";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  useAuthCheck();

  return (
    <SidebarProvider>
      <div className="flex min-h-dvh w-full">
        <AppSidebar />
        <SidebarInset className="flex-1 p-10">
          <SidebarTrigger className="mb-10" />
          <div>{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
