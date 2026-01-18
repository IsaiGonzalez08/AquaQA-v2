import { signAccessToken, verifyRefreshToken } from "shared/utils/auth";
import { clearAuthSession, getRefreshToken, setAuthCookies } from "../services/sessionService";

export async function refreshUsecase() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("NO_REFRESH_TOKEN");
  }

  const payload = await verifyRefreshToken(refreshToken.toString());

  if (!payload) {
    clearAuthSession();
    throw new Error("INVALID_REFRESH_TOKEN");
  }

  const newAccessToken = await signAccessToken(payload);
  setAuthCookies(newAccessToken);

  return { message: "Token refreshed successfully" };
}
