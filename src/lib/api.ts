// Utilidad para hacer peticiones autenticadas a la API

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Si el token expiró o es inválido, redirigir al login
  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/auth/login";
    throw new Error("Sesión expirada");
  }

  return response;
}

// Ejemplo de uso:
// const response = await fetchWithAuth('/api/user/getUser');
// const data = await response.json();
