import express from "express";
import cors from "cors";
import "dotenv/config";
import fileManagerRouter from "./routes/fileManager";
import { errorHandler } from "./utils/errorsHandler";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/files", fileManagerRouter);
app.use(errorHandler);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listen to port ${PORT}`));
