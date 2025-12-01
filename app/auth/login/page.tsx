"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { formSchema } from "../../../lib/schemas";
import Image from "next/image";

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <div className="flex h-dvh w-full flex-col items-center justify-center gap-4 px-8">
      <Image width={50} height={50} src="/aquaQA.svg" alt="Logo" />

      <h1 className="text-primary text-center text-5xl font-bold">Iniciar sesión</h1>
      <h3 className="text-center text-xl font-semibold text-gray-200">Bienvenido, por favor ingrese sus datos</h3>

      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="flex w-full lg:w-1/4 flex-col gap-4">
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-rhf-demo-email">Correo electrónico</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Correo electrónico"
                  autoComplete="off"
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
                <FieldLabel htmlFor="form-rhf-demo-password">Contraseña</FieldLabel>
                <Input
                  {...field}
                  id="form-rhf-demo-password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Contraseña"
                  autoComplete="off"
                  type="password"
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>
      </form>

      <Button variant="primary" className="mt-4 text-lg" type="submit" form="form-rhf-demo">
        Iniciar sesión
      </Button>
    </div>
  );
}
