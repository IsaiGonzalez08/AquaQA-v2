import { refreshService } from "../services/authHttp.service";

export async function refreshUsecase() {
  return await refreshService();
}
