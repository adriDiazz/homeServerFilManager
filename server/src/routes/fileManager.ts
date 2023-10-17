import { Router } from "express";
import {
  getDirRootTreeFromPath,
  getDirTreeFromPath,
  uploadMultipleFile,
  uploadSingleFile,
} from "../controllers/fileManager";
import multer from "multer";
import { storage } from "../config/storage";
import { checkExtension } from "../utils/fileManager";

const fileManagerRouter = Router();

const upload = multer({
  storage: storage,
  limits: {
    files: 15, // allow up to 5 files per request,
    fieldSize: 5 * 1024 * 1024, // 2 MB (max file size)
  },
  fileFilter(_req, file, cb) {
    console.log(checkExtension(file.originalname));
    if (!checkExtension(file.originalname)) {
      return cb(new Error("File type not allowed"));
    }
    cb(null, true);
  },
});

fileManagerRouter.post(
  "/:path(*)",
  upload.single("uploadedFile"),
  uploadSingleFile
);
fileManagerRouter.post(
  "/multiple/:path(*)",
  upload.array("uploadedFiles", 5),
  uploadMultipleFile
);
fileManagerRouter.get("/uploads/:path(*)", getDirTreeFromPath);
fileManagerRouter.get("/uploads", getDirRootTreeFromPath);

export default fileManagerRouter;
