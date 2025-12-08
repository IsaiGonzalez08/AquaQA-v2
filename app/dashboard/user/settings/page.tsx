"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">Configuración</h1>
        <p className="mt-2 text-gray-400">Personaliza tu experiencia en AquaQA</p>
      </div>

      {/* Notifications */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Notificaciones</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4">
            <div>
              <p className="font-medium">Notificaciones Push</p>
              <p className="text-sm text-gray-400">Recibe notificaciones en tiempo real</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                notifications ? "bg-primary" : "bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  notifications ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4">
            <div>
              <p className="font-medium">Actualizaciones por Email</p>
              <p className="text-sm text-gray-400">Recibe resúmenes semanales por correo</p>
            </div>
            <button
              onClick={() => setEmailUpdates(!emailUpdates)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                emailUpdates ? "bg-primary" : "bg-gray-600"
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  emailUpdates ? "left-5" : "left-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        <h2 className="mb-4 text-2xl font-semibold">Apariencia</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-gray-800/50 p-4">
            <div>
              <p className="font-medium">Tema</p>
              <p className="text-sm text-gray-400">Modo oscuro activado</p>
            </div>
            <Button variant="secondary">Cambiar Tema</Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-red-500">Zona de Peligro</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-lg bg-red-500/10 p-4">
            <div>
              <p className="font-medium text-red-400">Eliminar Cuenta</p>
              <p className="text-sm text-gray-400">Esta acción no se puede deshacer</p>
            </div>
            <Button variant="secondary" className="border-red-500 text-red-500">
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
