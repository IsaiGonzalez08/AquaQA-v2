import { findUserByEmail } from "../services/authRepository";
import { comparePassword } from "../services/passwordService";
import { generateTokens } from "../services/tokenService";
import { setAuthCookies } from "../services/sessionService";
import { InvalidCredentialsError, MissingCredentialsError } from "../domain/authErrors";

type LoginInput = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export async function loginUseCase(input: LoginInput) {
  const { email, password, rememberMe } = input;

  if (!email || !password) {
    throw new MissingCredentialsError();
  }

  const user = await findUserByEmail(email);

  if (!user) {
    throw new InvalidCredentialsError();
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new InvalidCredentialsError();
  }

  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
  };

  const { accessToken, refreshToken } = await generateTokens(payload);

  await setAuthCookies(accessToken, rememberMe ? refreshToken : undefined);

  return {
    id: user.id,
    role: user.role,
    status: user.status,
  };
}
