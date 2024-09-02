// 認証設定
import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthorizedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

// 登録に関して
export const register = async (req, res) => {
  // 最初に登録した人は必ず管理者設定に
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  // パスワードをハッシュ化
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  // ユーザー作成
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

// ログインに関して
export const login = async (req, res) => {
  // ユーザーが存在するかをアドレスとパスワードで確認
  const user = await User.findOne({ email: req.body.email });
  const isValidUser = user && (await comparePassword(req.body.password, user.password));
  if (!isValidUser) throw new UnauthorizedError("invalid credentials");
  // JWTトークンを生成し、ペイロードの有効期限を設定
  const token = createJWT({ userId: user._id, role: user.role });
  // クッキーの設定
  const oneDay = 1000 * 60 * 60 * 24; /* １日 */
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

// ログアウトに関して
export const logout = (req, res) => {
  // セッション情報は残さずログアウト
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
