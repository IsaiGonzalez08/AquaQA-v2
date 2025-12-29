import { LoginInput, LoginResult } from "../domain/loginSchema";
import { RegisterInput, RegisterResult } from "../domain/registerSchema";

export async function loginService(input: LoginInput): Promise<LoginResult> {
  const res = await fetch("/api/auth/login", {
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

export async function registerService(input: RegisterInput): Promise<RegisterResult> {
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
