import mongoose from "mongoose";
import { EVENT_STATUS, EVENT_PLACE } from "../utils/constants.js";

// イベントモデル
const EventSchema = new mongoose.Schema(
  {
    about: String,
    department: String,
    moderator: {
      type: String,
      default: "Hanna Green",
    },
    eventStatus: {
      type: String,
      enum: Object.values(EVENT_STATUS),
      default: EVENT_STATUS.BOOKED,
    },
    eventPlace: {
      type: String,
      enum: Object.values(EVENT_PLACE),
      default: EVENT_PLACE.ROOM_A,
    },
    startDate: {
      type: Date,
      required: true, // 開始日時は必須
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User", // 参照ID
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
