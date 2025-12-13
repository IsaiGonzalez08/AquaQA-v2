import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  username: string;
}

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signToken(payload: SessionPayload) {
  return await new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("7d").sign(secretKey);
}

export async function getCurrentUser(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as SessionPayload;
  } catch (err) {
    return null;
  }
}
