"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/button";
import { Clock, Mail } from "lucide-react";

export function PendingPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-6 p-4">
      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-500/20">
        <Clock className="h-12 w-12 text-yellow-500" />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <h1 className="text-primary text-4xl font-bold sm:text-5xl">Solicitud Pendiente</h1>
        <h3 className="text-xl font-semibold text-gray-200 sm:text-2xl">Tu cuenta está en revisión</h3>
      </div>

      <div className="w-full rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-6 sm:max-w-4/6 xl:max-w-2/6">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-5 w-5 shrink-0 text-yellow-500" />
            <div className="flex flex-col gap-2">
              <p className="text-base font-medium text-foreground">Estamos revisando tu solicitud de registro</p>
              <p className="text-sm text-foreground/60">
                Un agente de soporte se pondrá en contacto contigo por correo electrónico para confirmar tu cuenta y
                proporcionarte acceso al sistema.
              </p>
            </div>
          </div>

          <div className="mt-2 rounded-md bg-yellow-500/5 p-4">
            <p className="text-sm text-foreground/60">
              <span className="font-semibold text-foreground">Tiempo estimado:</span> Este proceso puede tomar entre 24 a
              48 horas hábiles.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col items-center gap-2">
        <p className="text-sm text-foreground">¿Necesitas ayuda?</p>
        <Link href="/auth/login">
          <Button variant="secondary" className="text-foreground">
            Volver al inicio de sesión
          </Button>
        </Link>
      </div>
    </div>
  );
}
