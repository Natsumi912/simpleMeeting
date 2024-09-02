import mongoose from 'mongoose';
import { body, param, validationResult } from "express-validator";
import Event from "../models/EventModel.js";
import User from '../models/UserModel.js';
import { EVENT_STATUS, EVENT_PLACE } from "../utils/constants.js";
import { BadRequestError, ForbiddenError, NotFoundError } from "../errors/customErrors.js";

// バリデーション設定
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        if (errorMessages[0].startsWith('会議予定がありません')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('権限がありません')) {
          throw new ForbiddenError('このページへのアクセス権限がありません');
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

// 会議情報バリデーション
export const validateEventInput = withValidationErrors([
  body('about').notEmpty().withMessage('会議内容が必要です'),
  body('department').notEmpty().withMessage('部署名が必要です'),
  body('moderator').notEmpty().withMessage('予約者が必要です'),
  body('eventStatus').isIn(Object.values(EVENT_STATUS)).withMessage('予約状況を確認してください'),
  body('eventPlace').isIn(Object.values(EVENT_PLACE)).withMessage('会議場所を確認してください'),
  body('startDate')
    .notEmpty().withMessage('開始日時が必要です')
    .isISO8601().withMessage('開始日時は正しい形で登録してください'),
]);

// パラメーターのバリデーション
export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const isValidMongoId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongoId) throw new BadRequestError('invalid MongoDB id');
    const event = await Event.findById(value);
    if (!event) throw new NotFoundError(`no event with id : ${value}`);
    // アクセス権の確認
    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === event.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new ForbiddenError('このページへのアクセス権限がありません');
  }),
]);

// ユーザー登録バリデーション
export const validateRegisterInput = withValidationErrors([
  body('name').notEmpty().withMessage('名前が必要です'),
  body('email')
    .notEmpty()
    .withMessage('メールアドレスが必要です')
    .isEmail()
    .withMessage('メールアドレスの形式を確認してください')
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new BadRequestError('そのメールアドレスはすでに存在します');
      }
    }),
  body('password')
    .notEmpty()
    .withMessage('パスワードが必要です')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上でお願いします'),
  body('lastName').notEmpty().withMessage('苗字が必要です'),
  body('location').notEmpty().withMessage('住所が必要です'),
]);
// ユーザーログインバリデーション
export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('メールアドレスが必要です')
    .isEmail()
    .withMessage('メールアドレスの形式を確認してください'),
  body('password').notEmpty().withMessage('パスワードが必要です'),
]);
// ユーザー情報更新バリデーション
export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('名前が必要です'),
  body('email')
    .notEmpty()
    .withMessage('メールアドレスが必要です')
    .isEmail()
    .withMessage('メールアドレスの形式を確認してください')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new BadRequestError('そのメールアドレスはすでに存在します');
      }
    }),
  body('lastName').notEmpty().withMessage('苗字が必要です'),
  body('location').notEmpty().withMessage('住所が必要です'),
]);
