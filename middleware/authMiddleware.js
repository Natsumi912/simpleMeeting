import { BadRequestError, ForbiddenError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

// クッキーからトークンを取得し、認証状態を確認
export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthorizedError("authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    const testUser = userId === "668a0c63e29a9d0bcbecc96b";
    req.user = { userId, role, testUser };
    next();
  } catch (error) {
    throw new UnauthorizedError("authentication invalid");
  }
};
// 管理者(admin)のみがapp statsを表示できるように
export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError("Unauthorized to access this route");
    }
    next();
  };
};
// 未登録のユーザーかどうかを確認(閲覧のみ)
export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
