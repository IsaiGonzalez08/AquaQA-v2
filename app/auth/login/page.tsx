"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { loginFormSchema } from "../../utils/schemas";
import { useState } from "react";
import Image from "next/image";
import Loading from "@/components/ui/loading";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof loginFormSchema>) {
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ ...data, rememberMe }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Error inesperado");
        setIsLoading(false);
        return;
      }

      const { role } = result.user;

      if (role === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/user");
      }
    } catch (e) {
      setError("Error de conexión");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 px-8">
      {isLoading && <Loading />}

      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <h1 className="text-primary text-center text-5xl font-bold">Iniciar sesión</h1>
      <h3 className="text-center text-xl font-semibold text-gray-200">Bienvenido, por favor ingrese sus datos</h3>

      {error && (
        <div className="w-full rounded-lg border border-red-500 bg-red-500/10 p-3 text-center text-red-500 lg:w-1/4">
          {error}
        </div>
      )}

      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 lg:w-1/4">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-email" className="text-gray-200">
                  Correo electrónico
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Correo electrónico"
                  autoComplete="off"
                  disabled={isLoading}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-password" className="text-gray-200">
                  Contraseña
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contraseña"
                  autoComplete="off"
                  type="password"
                  disabled={isLoading}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <span className="my-2 text-sm text-gray-200">
          ¿Aún no tienes una cuenta?{" "}
          <Link className="text-primary font-medium" href="/auth/register">
            Solicita una cuenta.
          </Link>
        </span>

        <div className="flex w-full items-center gap-2">
          <Switch id="remember-me" checked={rememberMe} onCheckedChange={setRememberMe} disabled={isLoading} />
          <label htmlFor="remember-me" className="text-sm font-medium text-gray-200">
            Recordar sesión
          </label>
        </div>

        <Button
          variant="primary"
          className="mt-4 w-full text-lg"
          type="submit"
          form="form-rhf-demo"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
        </Button>
      </form>
    </div>
  );
}
