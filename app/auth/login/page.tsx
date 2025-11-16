"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4">
      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <h1 className="text-primary text-center text-5xl font-bold">Iniciar sesión</h1>
      <h3 className="text-center text-xl font-semibold text-gray-200">Bienvenido, por favor ingrese sus datos</h3>

      <Button variant="primary" size="lg" className="w-72 text-2xl" onClick={() => console.log("login")}>
        Iniciar sesión
      </Button>
    </div>
  );
}
