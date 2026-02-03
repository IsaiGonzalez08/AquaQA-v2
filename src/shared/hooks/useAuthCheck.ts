"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { meUseCase } from "@/features/dashboard/application/me.usecase.server";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "shared/store/authSlice";

export function useAuthCheck() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await meUseCase();
        dispatch(setUser(data));
      } catch {
        dispatch(clearUser());
        router.replace("/auth/login");
      }
    };

    loadUser();
  }, []);
}
