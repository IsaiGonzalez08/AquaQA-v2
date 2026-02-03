export async function meService() {
  const res = await fetch("/api/user/me", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error al obtener usuario");
  }

  return res.json();
}
