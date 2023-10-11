import { NextFunction, Request, Response } from "express";
import { join } from "path";
import { readdirRecursive } from "../utils/fileManager";

export const uploadSingleFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    return next(error);
  }
  res.send(file);
};

export const uploadMultipleFile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please upload a file");
    return next(error);
  }
  res.send(files);
};

export const getDirTreeFromPath = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadsPath = join(__dirname, "../uploads");
  console.log(uploadsPath);
  try {
    const dirTree = readdirRecursive(uploadsPath);
    res.send(dirTree);
  } catch (error) {
    return next(error);
  }
};
