import { PrismaClient } from "@prisma/client";
import { encrypt, verifyPassword } from "../utils/passwordHandle";
import { generateJWT } from "../utils/jwt";
import { UserInput, UserRegister } from "../types/user";
const prisma = new PrismaClient();

export const login = async (user: UserInput) => {
  const userExist = await prisma.user.findFirst({
    where: {
      name: user.name,
    },
  });
  if (!userExist) return "El usuario no existe";

  const hashedPassword = userExist.password;
  const isValidPassword = await verifyPassword(user.password, hashedPassword);
  if (!isValidPassword) return "Contrasena no valida";

  const token = await generateJWT({
    name: userExist.name,
    email: userExist.email,
  });

  return {
    token,
    user: {
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
    },
  };
};

export async function crearUsuario({ email, name, password }: UserRegister) {
  const userExist = await prisma.user.findFirst({
    where: {
      name: name,
    },
  });
  if (userExist) return "El usuario ya existe";
  const hashedPassword = await encrypt(password);

  const usuario = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return usuario;
}
