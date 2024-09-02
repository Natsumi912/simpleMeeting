// エラーメッセージの管理
import { StatusCodes } from "http-status-codes";

// NotFound(404)
export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
// Bad Request(400)
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
// Unauthorized(401)
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
// Forbidden(403)
export class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
