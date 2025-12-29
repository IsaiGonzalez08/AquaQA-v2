"use client";

import { useEffect, useState } from "react";

interface UserData {
  userId: string;
  email: string;
  name: string;
}

export function InitPage() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/user/me");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Bienvenido, {userData?.name} 👋</h1>
      <p className="mt-2 text-gray-400">Aquí está tu resumen de actividad</p>
    </div>
  );
}
