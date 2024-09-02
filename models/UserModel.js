import mongoose from "mongoose";

// ユーザーモデル
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    // 管理者またはユーザー
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  // 画像設定
  avatar: String,
  avatarPublicId: String,
});
// パスワード情報をオブジェクトから削除し,表示しないようにする
UserSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", UserSchema);
