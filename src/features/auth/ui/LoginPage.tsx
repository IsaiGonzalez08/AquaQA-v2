"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Switch } from "@/components/switch";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/field";
import { loginUseCase } from "../application/login.usecase.client";
import { loginFormSchema, LoginFormData } from "../domain/loginSchema";
import { AuthHttpError } from "../services/authHttp.service";
import { NetworkError } from "@/utils/httpErrors";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/loading";
import { useDispatch } from "react-redux";
import { setUser } from "shared/store/authSlice";

export function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    setError("");

    try {
      const result = await loginUseCase({ ...data, rememberMe });

      const { user } = result;
      const { role, status } = user;

      if (role === "ADMIN") {
        router.replace("/dashboard/admin");
        return;
      }

      if (status === "PENDING") {
        router.replace("/auth/pending");
        return;
      }

      if (status === "REJECTED") {
        router.replace("/auth/rejected");
        return;
      }

      router.replace("/dashboard/user");
    } catch (e) {
      if (e instanceof NetworkError) {
        setError("No hay conexión a internet. Intenta nuevamente.");
        setIsLoading(false);
        return;
      }

      if (e instanceof AuthHttpError) {
        if (e.code === "AUTH_INVALID_CREDENTIALS") {
          setError("Email o contraseña incorrectos");
        }
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 p-4">
      {isLoading && <Loading />}

      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <h1 className="text-primary text-center text-5xl font-bold">Iniciar sesión</h1>
      <h3 className="text-center text-xl font-semibold text-gray-200">Bienvenido, por favor ingrese sus datos</h3>

      {error && (
        <div className="w-full rounded-lg border border-red-500 bg-red-500/10 p-3 text-center text-red-500 sm:max-w-4/6 xl:max-w-2/6">
          {error}
        </div>
      )}

      <form
        id="form-rhf-demo"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 sm:max-w-4/6 xl:max-w-2/6"
      >
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
