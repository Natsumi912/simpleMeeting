// ユーザー設定
import { StatusCodes } from "http-status-codes";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/UserModel.js";
import Event from "../models/EventModel.js";
import { formatImage } from "../middleware/multerMiddleware.js";

// 現在のユーザー情報
export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  // パスワード情報をオブジェクトから削除し,表示しないようにする
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};
// アプリケーションの統計情報
export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const events = await Event.countDocuments();
  res.status(StatusCodes.OK).json({ users, events });
};
// ユーザー情報更新
export const updateUser = async (req, res) => {
  // パスワード情報をオブジェクトから削除し,表示しないようにする
  const newUser = { ...req.body };
  delete newUser.password;
  // cloudinary設定
  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.uploader.upload(file);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  // MongoDBユーザーデータ更新
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  // 画像を変更した場合、元の画像はcloudinaryからも削除する
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.uploader.destroy(updatedUser.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "user updated" });
};
