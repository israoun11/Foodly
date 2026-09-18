import { User } from "../models/index.js";
import { BadRequestError, UnauthorizedError } from "../utils/AppError.js";
import { signToken, parseDurationToMs } from "../utils/jwt.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { env, isProduction } from "../config/env.js";
import { AUTH_COOKIE_NAME } from "../middleware/auth.middleware.js";

const COOKIE_MAX_AGE_MS = parseDurationToMs(env.JWT_EXPIRES_IN);

/**
 * Signs a JWT for the given user and sets it as an httpOnly cookie.
 * httpOnly prevents client-side JS (and therefore XSS payloads) from
 * ever reading the token; secure is enabled in production to
 * require HTTPS; sameSite: "lax" gives reasonable CSRF protection
 * for a same-site frontend while still allowing top-level navigation.
 * @param {import('express').Response} res
 * @param {string} userId
 */
function issueSession(res, userId) {
  const token = signToken({ sub: userId });

  res.cookie(AUTH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: COOKIE_MAX_AGE_MS,
  });
}

/**
 * POST /api/auth/register
 * Creates a new user account and starts a session.
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("An account with this email already exists");
  }

  // Password hashing happens automatically in User's pre("save") hook.
  const user = await User.create({ name, email, password });

  issueSession(res, user._id.toString());

  res.status(201).json({
    status: "success",
    data: { user },
  });
});

/**
 * POST /api/auth/login
 * Verifies credentials and starts a session.
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Password is select:false by default — explicitly requested here
  // since we need it to compare against the submitted password.
  const user = await User.findOne({ email }).select("+password");

  // Deliberately identical error for "no such user" and "wrong
  // password" so the endpoint doesn't reveal which emails are registered.
  if (!user || !(await user.comparePassword(password))) {
    throw new UnauthorizedError("Invalid email or password");
  }

  issueSession(res, user._id.toString());

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

/**
 * POST /api/auth/logout
 * Clears the session cookie. Stateless JWTs can't be "revoked"
 * server-side without a blocklist, but clearing the cookie is
 * sufficient for the normal logout flow.
 */
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME, {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax",
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
});