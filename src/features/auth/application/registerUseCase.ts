import { registerService } from "../services/authServices";
import { RegisterInput, RegisterResult } from "../domain/registerSchema";

export async function registerUseCase(input: RegisterInput): Promise<RegisterResult> {
  return await registerService(input);
}
