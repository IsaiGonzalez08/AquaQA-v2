"use client";

import z from "zod";
import { useRouter } from "next/navigation";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { registerFormSchema } from "../../utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      phone: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof registerFormSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ ...data }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Error inesperado");
        setIsLoading(false);
        return;
      }

      router.replace("/dashboard/user");
    } catch (e) {
      setError("Error de conexión");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 px-8">
      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <h1 className="text-primary text-center text-5xl font-bold">Solicita una cuenta</h1>
      <h3 className="text-center text-xl font-semibold text-gray-200">Bienvenido, por favor ingrese sus datos.</h3>

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

        <div className="flex flex-row gap-5">
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password" className="text-gray-200">
                    Usuario
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Usuario"
                    autoComplete="off"
                    type="text"
                    disabled={isLoading}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-password" className="text-gray-200">
                    Telefono
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Telefono"
                    autoComplete="off"
                    type="tel"
                    disabled={isLoading}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </div>

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

        <FieldGroup>
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-password" className="text-gray-200">
                  Confirmar Contraseña
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Confirmar contraseña"
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
          ¿Ya tienes una cuenta?{" "}
          <Link className="text-primary font-medium" href="/auth/login">
            Iniciar sesión.
          </Link>
        </span>

        <Button
          variant="primary"
          className="mt-4 w-full text-lg"
          type="submit"
          form="form-rhf-demo"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Solicitar cuenta"}
        </Button>
      </form>
    </div>
  );
}
