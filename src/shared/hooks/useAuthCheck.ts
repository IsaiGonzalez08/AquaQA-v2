"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { refreshUsecase } from "@/features/auth/application/refresh.usecase.client";
import { meUseCase } from "@/features/dashboard/application/me.usecase.server";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "shared/store/store";
import { clearUser, setUser } from "shared/store/authSlice";

export function useAuthCheck() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const checkAuth = async () => {
    try {
      if (user) return;
      const response = await meUseCase();

      if (response.status === 401) {
        const refreshResponse = await refreshUsecase();

        if (!refreshResponse.ok) {
          dispatch(clearUser());
          router.replace("/auth/login");
          return;
        }

        const retry = await meUseCase();
        if (retry.ok) {
          const data = await retry.json();
          dispatch(setUser(data));
        }
      }

      if (response.ok) {
        dispatch(setUser(response));
      }
    } catch (error) {
      console.error("Auth check error:", error);
      dispatch(clearUser());
      router.replace("/auth/login");
    }
  };

  useEffect(() => {
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
