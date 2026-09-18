import { User } from "../models/index.js";
import { UnauthorizedError } from "../utils/AppError.js";
import { verifyToken } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const AUTH_COOKIE_NAME = "pantrypal_token";

/**
 * Extracts the JWT from either the httpOnly cookie (primary path, used
 * by the PantryPal frontend) or an "Authorization: Bearer <token>"
 * header (secondary path, useful for testing tools like curl/Postman).
 * @param {import('express').Request} req
 * @returns {string | null}
 */
function extractToken(req) {
  if (req.cookies?.[AUTH_COOKIE_NAME]) {
    return req.cookies[AUTH_COOKIE_NAME];
  }

  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith("Bearer ")) {
    return authHeader.slice("Bearer ".length);
  }

  return null;
}

/**
 * Protects a route: requires a valid, non-expired JWT identifying an
 * existing user. On success, attaches the user document (without the
 * password field) to req.user. On failure, forwards an
 * UnauthorizedError to the centralized error handler.
 */
export const protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req);

  if (!token) {
    throw new UnauthorizedError("Authentication required");
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch {
    throw new UnauthorizedError("Invalid or expired session");
  }

  const user = await User.findById(payload.sub);
  if (!user) {
    throw new UnauthorizedError("User no longer exists");
  }

  req.user = user;
  next();
});