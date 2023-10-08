import express from "express";
import cors from "cors";
import "dotenv/config";
import fileManagerRouter from "./routes/fileManager";
import { errorHandler } from "./middlewares/errorsHandler";
import authRouter from "./routes/auth";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/files", fileManagerRouter);
app.use("/api/v1/auth", authRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
