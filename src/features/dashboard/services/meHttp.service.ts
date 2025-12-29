export async function meService() {
  const res = await fetch("/api/user/me");

  if (!res.ok) {
    throw new Error("Error al obtener el usuario");
  }

  return res.json();
}