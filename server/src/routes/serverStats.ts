import { Router } from "express";
import { getServerStorage } from "../controllers/serverStats";

const serverStatsRouter = Router();

serverStatsRouter.get("/", getServerStorage);

export default serverStatsRouter;
