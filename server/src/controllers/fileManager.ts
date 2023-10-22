import { NextFunction, Request, Response } from "express";
import { readdirRecursive } from "../utils/fileManager";
import { readdir, statSync } from "node:fs";
import { join } from "node:path";

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
  const path = req.params.path || "";

  const uploadsPath = join(__dirname, `../uploads/${path}`);
  try {
    const dirTree = readdirRecursive(uploadsPath);
    res.send(dirTree);
  } catch (error) {
    return next(error);
  }
};

export const getDirRootTreeFromPath = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploadsPath = join(__dirname, `../uploads`);

  try {
    const dirTree = readdirRecursive(uploadsPath);
    res.send(dirTree);
  } catch (error) {
    return next(error);
  }
};

export const getLastFiles = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const uploadsPath = join(__dirname, `../uploads`);

    readdir(uploadsPath, (err, files) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al leer el directorio de subidas" });
      }

      // Ordena los archivos por fecha de modificación en orden descendente
      const sortedFiles = files
        .map((filename) => {
          const filePath = join(uploadsPath, filename);
          const stats = statSync(filePath);
          return {
            name: filename,
            date: stats.mtime,
            isDirectory: stats.isDirectory(),
            fileSize: stats.size / (1024 * 1024 * 1024),
          } as {
            name: string;
            date: Date;
            isDirectory: boolean;
            fileSize: number;
          };
        })
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      const numberOfFiles = 10;
      const latestFiles = sortedFiles.slice(0, numberOfFiles);

      res.send(latestFiles);
    });
  } catch (error) {}
};
