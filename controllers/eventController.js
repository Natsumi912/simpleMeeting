// 会議情報設定
import { StatusCodes } from "http-status-codes";
import Event from "../models/EventModel.js";

// 全ての会議情報取得
export const getAllEvents = async (req, res) => {
  const { search, eventStatus, eventPlace, sort } = req.query; // リクエストから検索クエリを取得
  // MongoDBのクエリオブジェクトにユーザーIdを追加
  const queryObject = {
    createdBy: req.user.userId,
  };
  // 検索クエリがある場合は、$or条件を追加して検索を絞り込む
  if (search) {
    queryObject.$or = [{ about: { $regex: search, $options: "i" } }, { department: { $regex: search, $options: "i" } }];
  }
  // queryObjectにeventStatusプロパティを追加
  if (eventStatus && eventStatus !== "all") {
    queryObject.eventStatus = eventStatus;
  }
  // queryObjectにeventPlaceプロパティを追加
  if (eventPlace && eventPlace !== "all") {
    queryObject.eventPlace = eventPlace;
  }
  // 並び替え
  const sortOptions = {
    newest: "-createdAt", // createdAtを降順で
    oldest: "createdAt", // createdAtを昇順で
  };
  // クライアントから渡されたソートパラメータに対応するキーを選択
  const sortKey = sortOptions[sort] || sortOptions.newest;
  // ページ設定
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  // MongoDBのEventコレクションから検索条件に一致する会議情報を取得し、指定された形式で並び替える
  const events = await Event.find(queryObject).sort(sortKey).skip(skip).limit(limit);
  // 検索条件に一致する会議の総数を取得
  const totalEvents = await Event.countDocuments(queryObject);
  // 全イベントの総数からページ数を計算
  const numOfPages = Math.ceil(totalEvents / limit);
  // 検索結果の総数、ページ数、現在のページ番号、および会議リストをJSON形式で返す
  res.status(StatusCodes.OK).json({ totalEvents, numOfPages, currentPage: page, events });
};

// 会議新規作成
export const createEvent = async (req, res) => {
  req.body.createdBy = req.user.userId; // req.bodyオブジェクトにcreatedByキーを追加
  // startDate をチェックし、必要に応じて変換
  if (req.body.startDate) {
    req.body.startDate = new Date(req.body.startDate);
  }
  const event = await Event.create(req.body);
  res.status(StatusCodes.CREATED).json({ event });
};
// 会議情報1件取得
export const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.status(StatusCodes.OK).json({ event });
};
// 会議情報を更新
export const updateEvent = async (req, res) => {
  // startDate をチェックし、必要に応じて変換
  if (req.body.startDate) {
    req.body.startDate = new Date(req.body.startDate);
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "event modified", event: updatedEvent });
};
// 会議情報削除
export const deleteEvent = async (req, res) => {
  const removedEvent = await Event.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: "event deleted", event: removedEvent });
};
