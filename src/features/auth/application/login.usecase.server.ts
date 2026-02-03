import { findUserByEmail } from "../services/authRepository";
import { comparePassword } from "../services/passwordService";
import { generateTokens } from "../services/tokenService";
import { setAuthCookies } from "../services/sessionService";
import { InvalidCredentialsError, MissingCredentialsError, UserNotApprovedError } from "../domain/authErrors";

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

  if (user.role === "USER" && user.status !== "APPROVED") {
    throw new UserNotApprovedError();
  }

  const payload = {
    userId: user.id,
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    role: user.role,
    createdAt: user.createdAt,
  };

  const { accessToken, refreshToken } = await generateTokens(payload);

  await setAuthCookies(accessToken, rememberMe ? refreshToken : undefined);

  return {
    id: user.id,
    role: user.role,
  };
}
