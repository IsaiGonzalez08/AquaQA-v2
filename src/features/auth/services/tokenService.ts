import { signAccessToken, signRefreshToken, SessionPayload } from "@/utils/auth";

export async function generateTokens(payload: SessionPayload) {
  return {
    accessToken: await signAccessToken(payload),
    refreshToken: await signRefreshToken(payload),
  };
}
