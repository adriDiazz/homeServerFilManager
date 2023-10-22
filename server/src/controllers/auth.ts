import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { crearUsuario, login } from "../services/authService";
const prisma = new PrismaClient();

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const response = await login(user);
    res.send(response);
  } catch (error) {
    return next(error);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body;
    const response = await crearUsuario(user);
    res.send(response);
  } catch (error) {
    return next(error);
  }
};
