import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Event from "./models/EventModel.js";
import User from "./models/UserModel.js";

try {
  // MongoDBに接続し、メールアドレスでユーザー検索
  await mongoose.connect(process.env.MONGO_URL);
  const user = await User.findOne({ email: "hanna@gmail.com" });
  // JSONに変換し, eventデータにユーザーIDを追加
  const jsonEvents = JSON.parse(await readFile(new URL("./utils/mockData.json", import.meta.url)));
  // 日付の変換とデータのマッピング
  const events = jsonEvents.map((event) => {
    const startDate = new Date(event.startDate);
    // startDate が正しいかコンソールで確認
    console.log(`Original Start Date: ${event.startDate}, Converted Start Date: ${startDate.toISOString()}`);
    return {
      ...event,
      createdBy: user._id,
      startDate: new Date(event.startDate),
    };
  });
  // 既存のものは削除し,新しいeventデータを保存
  await Event.deleteMany({ createdBy: user._id });
  await Event.create(events);
  console.log("Success!!!");
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
