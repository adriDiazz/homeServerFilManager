import { Router } from "express";
import { loginController, register } from "../controllers/auth";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", register);

export default authRouter;
