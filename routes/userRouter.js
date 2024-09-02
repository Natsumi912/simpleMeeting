// ユーザー用ルーターの管理
import { Router } from "express";
const userRouter = Router();

import { getCurrentUser, getApplicationStats, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, checkForTestUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

// GETメゾット
userRouter.get("/current-user", getCurrentUser);
userRouter.get("/admin/app-stats", [authorizePermissions("admin"), getApplicationStats]);
// PATCHメゾット
userRouter.patch("/update-user", checkForTestUser, upload.single("avatar"), validateUpdateUserInput, updateUser);

export default userRouter;
