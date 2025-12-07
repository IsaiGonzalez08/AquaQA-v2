"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import { useState } from "react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Mi Perfil</h1>
          <p className="mt-2 text-gray-400">Gestiona tu información personal</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "secondary" : "primary"}>
          {isEditing ? "Cancelar" : "Editar Perfil"}
        </Button>
      </div>

      {/* Profile Card */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8">
        <div className="mb-6 flex items-center gap-6">
          <div className="bg-primary flex h-24 w-24 items-center justify-center rounded-full text-4xl font-bold">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {user?.name} {user?.lastname}
            </h2>
            <p className="text-gray-400">@{user?.username}</p>
          </div>
        </div>

        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FieldGroup>
              <Field>
                <FieldLabel className="text-gray-200">Nombre</FieldLabel>
                <Input defaultValue={user?.name} disabled={!isEditing} placeholder="Tu nombre" />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel className="text-gray-200">Apellido</FieldLabel>
                <Input defaultValue={user?.lastname} disabled={!isEditing} placeholder="Tu apellido" />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel className="text-gray-200">Username</FieldLabel>
                <Input defaultValue={user?.username} disabled={!isEditing} placeholder="Tu username" />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel className="text-gray-200">Email</FieldLabel>
                <Input defaultValue={user?.email} disabled={!isEditing} type="email" placeholder="tu@email.com" />
              </Field>
            </FieldGroup>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary">
                Guardar Cambios
              </Button>
              <Button type="button" variant="secondary" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Security Section */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Seguridad</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4">
            <div>
              <p className="font-medium">Cambiar Contraseña</p>
              <p className="text-sm text-gray-400">Actualiza tu contraseña regularmente</p>
            </div>
            <Button variant="secondary">Cambiar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
