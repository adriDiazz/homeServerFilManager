import { hash, compare } from "bcryptjs";

export const encrypt = async (pass: string) => {
  const hashed = await hash(pass, 10);
  return hashed;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const isValid = await compare(password, hashedPassword);
  return isValid;
};
