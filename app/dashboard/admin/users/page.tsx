"use client";

import { fetchWithAuth } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetchWithAuth("/api/user/getUser");
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Gestión de Usuarios</h1>
          <p className="mt-2 text-gray-400">Administra todos los usuarios del sistema</p>
        </div>
        <Button variant="primary">➕ Nuevo Usuario</Button>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
        {loading ? (
          <p className="text-center text-gray-400">Cargando usuarios...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800 text-left text-sm text-gray-400">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Nombre</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Username</th>
                  <th className="pb-3">Fecha de Registro</th>
                  <th className="pb-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {users.map((u) => (
                  <tr key={u.id} className="text-sm">
                    <td className="py-3 font-mono text-xs text-gray-500">{u.id.slice(0, 8)}...</td>
                    <td className="py-3 font-medium">{u.name}</td>
                    <td className="py-3 text-gray-400">{u.email}</td>
                    <td className="py-3 text-gray-400">@{u.username}</td>
                    <td className="py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <button className="rounded px-2 py-1 text-xs text-blue-400 hover:bg-blue-500/10">Editar</button>
                        <button className="rounded px-2 py-1 text-xs text-red-400 hover:bg-red-500/10">Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
