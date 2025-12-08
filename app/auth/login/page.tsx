"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { formSchema } from "../../utils/schemas";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Error al iniciar sesión");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      router.push("/dashboard/user");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  }

  return isLoading ? (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 px-8">
      <Spinner className="size-10 text-primary" />
    </div>
  ) : (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 px-8">
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
                <FieldLabel htmlFor="form-rhf-demo-email" className="text-gray-200">Correo electrónico</FieldLabel>
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
                <FieldLabel htmlFor="form-rhf-demo-password" className="text-gray-200">Contraseña</FieldLabel>
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
      </form>

      <Button variant="primary" className="mt-4 text-lg" type="submit" form="form-rhf-demo" disabled={isLoading}>
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </div>
  );
}
