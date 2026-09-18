import { ZodError } from "zod";
import { AppError } from "../utils/AppError.js";
import { isProduction } from "../config/env.js";

/**
 * Single place where every error in the app ends up. Express routes
 * this way automatically for synchronous throws; async route handlers
 * must call next(error) explicitly (or be wrapped in a try/catch that
 * forwards to next).
 *
 * Must be registered LAST, after all routes, and must keep all four
 * parameters (err, req, res, next) even if unused, since Express uses
 * the function's arity to identify error-handling middleware.
 *
 * @param {unknown} err
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // Zod validation errors: map to a 400 with per-field details.
  if (err instanceof ZodError) {
    res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  // Known, operational errors we threw ourselves.
  if (err instanceof AppError) {
    const body = {
      status: "error",
      message: err.message,
    };
    if (!isProduction) body.stack = err.stack;
    res.status(err.statusCode).json(body);
    return;
  }

  // Anything else is unexpected — log the full detail server-side,
  // but never leak internals to the client.
  console.error("Unhandled error:", err);

  const body = {
    status: "error",
    message: isProduction ? "Something went wrong" : String(err),
  };
  if (!isProduction && err instanceof Error) body.stack = err.stack;

  res.status(500).json(body);
}