"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Configuración del Sistema</h1>
        <p className="mt-2 text-gray-400">Administra las configuraciones globales de AquaQA</p>
      </div>

      {/* General Settings */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Configuración General</h2>
        <form className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel className="text-gray-200">Nombre del Sistema</FieldLabel>
              <Input defaultValue="AquaQA" placeholder="Nombre del sistema" />
            </Field>
          </FieldGroup>

          <FieldGroup>
            <Field>
              <FieldLabel className="text-gray-200">Email de Contacto</FieldLabel>
              <Input defaultValue="admin@aquaqa.com" placeholder="email@ejemplo.com" type="email" />
            </Field>
          </FieldGroup>

          <Button variant="primary">Guardar Cambios</Button>
        </form>
      </div>

      {/* Security */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Seguridad</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4">
            <div>
              <p className="font-medium">Autenticación de Dos Factores</p>
              <p className="text-sm text-gray-400">Requiere 2FA para todos los administradores</p>
            </div>
            <Button variant="secondary">Configurar</Button>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4">
            <div>
              <p className="font-medium">Registro de Actividad</p>
              <p className="text-sm text-gray-400">Ver logs de actividad del sistema</p>
            </div>
            <Button variant="secondary">Ver Logs</Button>
          </div>
        </div>
      </div>

      {/* Database */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Base de Datos</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4">
            <div>
              <p className="font-medium">Respaldo de Base de Datos</p>
              <p className="text-sm text-gray-400">Último respaldo: Hace 2 días</p>
            </div>
            <Button variant="secondary">Crear Respaldo</Button>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Información del Sistema</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm text-gray-400">Versión</p>
            <p className="text-lg font-medium">1.0.0</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Servidor</p>
            <p className="text-lg font-medium">Neon PostgreSQL</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Estado</p>
            <p className="text-lg font-medium text-green-500">● Operativo</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Uptime</p>
            <p className="text-lg font-medium">99.9%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
