import { prisma } from "../../../server/db/prisma";
import bcrypt from "bcryptjs";
import { generateTokens } from "../services/tokenService";
import { setAuthCookies } from "../services/sessionService";

type RegisterInput = {
  email: string;
  password: string;
  name: string;
  lastname: string;
  username: string;
};

export async function registerUseCase(input: RegisterInput) {
  const { email, password, name, lastname, username } = input;

  if (!email || !password || !name || !lastname || !username) {
    throw new Error("Todos los campos son requeridos");
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });

  if (userExists) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      lastname,
      username,
    },
  });

  const payload = {
    userId: newUser.id,
    email: newUser.email,
    name: newUser.name,
    username: newUser.username,
    role: newUser.role,
  };

  const { accessToken, refreshToken } = await generateTokens(payload);

  await setAuthCookies(accessToken, refreshToken);

  return {
    id: newUser.id,
    role: newUser.role,
  };
}
