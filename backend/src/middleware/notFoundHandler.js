import { NotFoundError } from "../utils/AppError.js";

/**
 * Catches any request that didn't match a defined route and forwards
 * a consistent 404 error to the centralized error handler, rather
 * than letting Express send its default HTML "Cannot GET /x" page.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} _res
 * @param {import('express').NextFunction} next
 */
export function notFoundHandler(req, _res, next) {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl}`));
}