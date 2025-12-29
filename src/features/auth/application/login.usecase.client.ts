import { loginService } from "../services/authHttp.service";
import { LoginInput, LoginResult } from "../domain/loginSchema";

export async function loginUseCase(input: LoginInput): Promise<LoginResult> {
  return await loginService(input);
}
