"use client";

import { RequestsProvider } from "@/features/dashboard/contexts/RequestsContext";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <RequestsProvider>{children}</RequestsProvider>;
}
