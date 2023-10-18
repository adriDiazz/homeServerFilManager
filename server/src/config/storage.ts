import { Request } from "express";
import multer from "multer";
import { extname } from "path";

export const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `src/uploads/${req.params.path}`);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  },
});
