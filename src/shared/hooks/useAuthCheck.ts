"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { refreshUsecase } from "@/features/auth/application/refresh.usecase.client";
import { meUseCase } from "@/features/dashboard/application/me.usecase.server";

export function useAuthCheck() {
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
}
