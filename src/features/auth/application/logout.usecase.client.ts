import { logoutService } from "../services/authHttp.service";

export async function logoutUsecase () {
    return await logoutService();
}