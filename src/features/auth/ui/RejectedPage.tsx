"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { XCircle, AlertTriangle } from "lucide-react";

export function RejectedPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 p-4">
      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-500/20">
        <XCircle className="h-12 w-12 text-red-500" />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-primary text-4xl font-bold sm:text-5xl">Solicitud Rechazada</h1>
        <h3 className="text-xl font-semibold text-gray-200 sm:text-2xl">No pudimos aprobar tu cuenta</h3>
      </div>

      <div className="w-full rounded-lg border border-red-500/30 bg-red-500/10 p-6 sm:max-w-4/6 xl:max-w-2/6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-red-500" />
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-gray-100">Tu solicitud no parece ser apta</p>
              <p className="text-sm text-gray-300">
                Después de revisar tu información, determinamos que tu solicitud no cumple con los requisitos necesarios
                para acceder al sistema en este momento.
              </p>
            </div>
          </div>

          <div className="mt-2 rounded-md bg-red-500/5 p-4">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-gray-200">Posibles razones:</span>
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-300">
              <li>Información incompleta o incorrecta</li>
              <li>No cumples con los criterios de elegibilidad</li>
              <li>Datos de contacto inválidos</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
        <Link href="/auth/register">
          <Button variant="primary" className="w-full sm:w-auto">
            Solicitar nuevamente
          </Button>
        </Link>
        <Link href="/auth/login">
          <Button variant="secondary" className="w-full text-gray-200 sm:w-auto">
            Volver al inicio de sesión
          </Button>
        </Link>
      </div>
    </div>
  );
}
