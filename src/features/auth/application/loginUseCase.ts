import { loginService } from "../services/authServices";
import { LoginInput, LoginResult } from "../domain/loginSchema";

export async function loginUseCase(input: LoginInput): Promise<LoginResult> {
  return await loginService(input);
}
