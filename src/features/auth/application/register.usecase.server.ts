import { prisma } from "../../../server/db/prisma";
import { generateTokens } from "../services/tokenService";
import { setAuthCookies } from "../services/sessionService";
import { InvalidCredentialsError, MissingCredentialsError } from "../domain/authErrors";
import { findUserByEmail } from "../services/authRepository";
import bcrypt from "bcryptjs";

type RegisterInput = {
  email: string;
  password: string;
  name: string;
  lastname: string;
};

export async function registerUseCase(input: RegisterInput) {
  const { email, password, name, lastname } = input;

  if (!email || !password || !name || !lastname) {
    throw new MissingCredentialsError();
  }

  const user = await findUserByEmail(email);

  if (user) {
    throw new InvalidCredentialsError();
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      lastname,
    },
  });

  const payload = {
    userId: newUser.id,
    email: newUser.email,
    name: newUser.name,
    lastname: newUser.lastname,
    role: newUser.role,
  };

  const { accessToken, refreshToken } = await generateTokens(payload);

  await setAuthCookies(accessToken, refreshToken);

  return {
    id: newUser.id,
    role: newUser.role,
  };
}
