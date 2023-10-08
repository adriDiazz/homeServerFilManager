import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization || "";
    const tokenSplitted = token?.split(" ")[1];

    const isValid = await verifyToken(tokenSplitted);
    if (!isValid) {
      res.status(400);
      res.send("Not valid token");
    } else {
      next();
    }
  } catch (error) {}
};
