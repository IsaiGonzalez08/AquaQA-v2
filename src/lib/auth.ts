import { NextResponse } from "next/server";
import { verifyToken, JWTPayload } from "./jwt";

export function getTokenFromRequest(request: Request): string | null {
  const authHeader = request.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7); // Quita "Bearer "
}

export function authenticateRequest(request: Request):
  | {
      success: true;
      user: JWTPayload;
    }
  | {
      success: false;
      response: NextResponse;
    } {
  const token = getTokenFromRequest(request);

  if (!token) {
    return {
      success: false,
      response: NextResponse.json({ error: "No token provided" }, { status: 401 }),
    };
  }

  const user = verifyToken(token);

  if (!user) {
    return {
      success: false,
      response: NextResponse.json({ error: "Invalid or expired token" }, { status: 401 }),
    };
  }

  return {
    success: true,
    user,
  };
}
