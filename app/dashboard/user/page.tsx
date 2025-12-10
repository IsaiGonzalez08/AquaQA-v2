import { getCurrentUser } from "../../utils/auth";

export default async function UserDashboard() {
  const user = await getCurrentUser();

  return (
    <div>
      <h1 className="text-4xl font-bold mt-10">Bienvenido, {user?.name} 👋</h1>
      <p className="mt-2 text-gray-400">Aquí está tu resumen de actividad</p>
    </div>
  );
}
