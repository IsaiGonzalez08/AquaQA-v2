import { registerService } from "../services/authHttp.service";
import { RegisterInput, RegisterResponse } from "../domain/registerSchema";

export async function registerUseCase(input: RegisterInput): Promise<RegisterResponse> {
  return await registerService(input);
}
