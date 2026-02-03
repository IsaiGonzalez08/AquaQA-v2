"use client";

import { useSelector } from "react-redux";
import { RootState } from "shared/store/store";

export function InitPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div>
      <h1 className="text-4xl font-bold">Bienvenido, {user?.name} 👋</h1>
      <p className="mt-2 text-gray-400">Admin</p>
    </div>
  );
}
