"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/field";
import { registerUseCase } from "../application/register.usecase.client";
import { registerFormSchema, RegisterFormData } from "../domain/registerSchema";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/loading";

export function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      lastname: "",
      username: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    setError("");

    try {
      const result = await registerUseCase(data);

      const { role } = result.user;

      if (role === "admin") {
        router.replace("/dashboard/admin");
        return;
      }

      router.replace("/dashboard/user");
    } catch (e) {
      setError(`Error de conexión: ${e}`);
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 p-4">
      {isLoading && <Loading />}

      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <h1 className="text-primary text-center text-5xl font-bold">Solicita una cuenta</h1>
      <h3 className="text-center text-xl font-semibold text-gray-200">Bienvenido, por favor ingrese sus datos.</h3>

      {error && (
        <div className="w-full rounded-lg border border-red-500 bg-red-500/10 p-3 text-center text-red-500 lg:w-3/6">
          {error}
        </div>
      )}

      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4 lg:w-3/6">
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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-name" className="text-gray-200">
                    Nombre
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Nombre"
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
              name="lastname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-lastname" className="text-gray-200">
                    Apellido
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-demo-lastname"
                    aria-invalid={fieldState.invalid}
                    placeholder="Apellido"
                    autoComplete="off"
                    type="text"
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
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-username" className="text-gray-200">
                  Usuario
                </FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-username"
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
