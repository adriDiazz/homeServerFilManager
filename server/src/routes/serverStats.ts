import { Router } from "express";
import {
  getCountOfEachType,
  getServerStorage,
} from "../controllers/serverStats";

const serverStatsRouter = Router();

serverStatsRouter.get("/", getServerStorage);
serverStatsRouter.get("/filetype", getCountOfEachType);

export default serverStatsRouter;
