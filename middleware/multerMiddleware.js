import multer from "multer";
import DataParser from "datauri/parser.js";
import path from "path";

// ウェブアプリケーションでのファイルのアップロード
const storage = multer.memoryStorage();
const upload = multer({ storage });
// アップロードされたファイルをデータURI形式に変換し、cloudinaryに載せる
const parser = new DataParser();

export const formatImage = (file) => {
  const fileExtension = path.extname(file.originalname).toString();
  return parser.format(fileExtension, file.buffer).content; // Data URIスキーマの生成
};

export default upload;
