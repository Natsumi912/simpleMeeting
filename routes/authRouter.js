// 認証用ルーターの管理
import { Router } from "express";
const authRouter = Router();

import { register, login, logout } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validationMiddleware.js";

// POSTメゾット
authRouter.post("/register", validateRegisterInput, register);
authRouter.post("/login", validateLoginInput, login);
// GETメゾット
authRouter.get("/logout", logout);

export default authRouter;
