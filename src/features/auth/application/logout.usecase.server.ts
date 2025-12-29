import { clearAuthSession } from "../services/sessionService";

export async function logoutUseCase() {
  clearAuthSession();
  return { message: "Logged out" };
}
