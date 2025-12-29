import { signAccessToken, signRefreshToken } from "@/utils/auth";

export async function generateTokens(payload: any) {
  return {
    accessToken: await signAccessToken(payload),
    refreshToken: await signRefreshToken(payload),
  };
}
