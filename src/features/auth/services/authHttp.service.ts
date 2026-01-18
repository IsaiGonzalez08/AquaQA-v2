import { NetworkError } from "@/utils/httpErrors";
import { LoginInput, LoginResponse } from "../domain/loginSchema";
import { RegisterInput, RegisterResponse } from "../domain/registerSchema";

export class AuthHttpError extends Error {
  constructor(public code: string) {
    super(code);
  }
}

export async function loginService(input: LoginInput): Promise<LoginResponse> {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(input),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (!res.ok) {
      throw new AuthHttpError(result.error?.code || "UNKNOWN_ERROR");
    }

    return result;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new NetworkError();
    }

    throw error;
  }
}

export async function registerService(input: RegisterInput): Promise<RegisterResponse> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Error al iniciar sesión");
  }

  return result;
}

export async function logoutService() {
  const res = await fetch("/api/auth/logout", { method: "POST" });

  if (!res.ok) {
    throw new Error("Error al cerrar sesión");
  }

  return res.json();
}

export async function refreshService() {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
  });

  if (!res.ok) {
    throw new Error("Error al refrescar sesión");
  }

  return res.json();
}
