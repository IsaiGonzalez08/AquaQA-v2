import { meService } from "../services/meHttp.service";

export async function meUseCase() {
  return await meService();
}
