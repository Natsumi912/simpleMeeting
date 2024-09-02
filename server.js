// サーバー設定
import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
// ルーター
import eventRouter from "./routes/eventRouter.js";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
// public(画像設定)
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
// ミドルウェア
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// expressを使用
const app = express();
// 画像設定
const __dirname = dirname(fileURLToPath(import.meta.url));
// cloudinary設定
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// use設定
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, "./client/dist")));
// Hello World
app.get("/", (req, res) => {
  res.send("Hello World");
});
// キャッシュを1日以上保存しないよう設定
// app.use(
//   express.static(path.resolve(__dirname, "./client/dist"), {
//     maxAge: "1d", // 1日間キャッシュ
//   })
// );
// app.use((req, res, next) => {
//   res.set("Cache-Control", "no-store");
//   next();
// });
// テスト用コード
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});
// ルーター
app.use("/api/v1/events", authenticateUser, eventRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);
// ファイルを送信する際は必ずindex.htmlから
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});
// Not Found
app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
// エラーハンドリング
app.use(errorHandlerMiddleware);

// モンゴDB設定
const port = process.env.PORT || 5100;
try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
