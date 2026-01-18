import { clearAuthSession } from "../services/sessionService";

export async function logoutUseCase() {
  await clearAuthSession();
  return { message: "Logged out" };
}
