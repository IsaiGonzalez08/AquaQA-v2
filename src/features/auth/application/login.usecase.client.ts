import { loginService } from "../services/authHttp.service";
import { LoginInput, LoginResponse } from "../domain/loginSchema";

export async function loginUseCase(input: LoginInput): Promise<LoginResponse> {
  return await loginService(input);
}
