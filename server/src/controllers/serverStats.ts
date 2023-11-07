import { Request, Response } from "express";
import os from "node:os";
import { bytesToGB } from "../utils/fileManager";
import disk from "diskusage";
import { join } from "node:path";
export const getServerStorage = (req: Request, res: Response) => {
  const path = join(__dirname, `../uploads`); // Reemplaza con la ruta de tu directorio

  disk.check(path, (error, info) => {
    if (error) {
      console.error(
        `Error al obtener información del almacenamiento: ${error.message}`
      );
      res.status(500).send("Error al obtener información del almacenamiento");
      return;
    }

    if (info) {
      const storageInfo = {
        total: `${(info.total / 1024 / 1024 / 1024).toFixed(2)} GB`,
        free: `${(info?.free / 1024 / 1024 / 1024).toFixed(2)} GB`,
        used: `${(
          info.total / 1024 / 1024 / 1024 -
          info.free / 1024 / 1024 / 1024
        ).toFixed(2)} GB`,
      };

      res.json(storageInfo);
    }
  });
};
