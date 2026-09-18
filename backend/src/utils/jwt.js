import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const UNIT_TO_MS = {
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
  w: 7 * 24 * 60 * 60 * 1000,
};

/**
 * Converts a duration string like "7d", "12h", "30m" into milliseconds.
 * Used to keep the cookie's maxAge in sync with the JWT's own expiry.
 * @param {string} duration
 * @returns {number} Milliseconds.
 */
export function parseDurationToMs(duration) {
  const match = /^(\d+)(s|m|h|d|w)$/.exec(duration);
  if (!match) {
    throw new Error(`Invalid duration format: ${duration}`);
  }
  const [, amount, unit] = match;
  return Number.parseInt(amount, 10) * UNIT_TO_MS[unit];
}

/**
 * Signs a JWT for the given payload using the app's secret and
 * configured expiry.
 * @param {object} payload - Should include at least { sub: userId }.
 * @returns {string} Signed JWT.
 */
export function signToken(payload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  });
}

/**
 * Verifies a JWT and returns its decoded payload.
 * Throws if the token is missing, malformed, expired, or has an
 * invalid signature — callers should catch and translate this into
 * an UnauthorizedError.
 * @param {string} token
 * @returns {object} Decoded payload.
 */
export function verifyToken(token) {
  return jwt.verify(token, env.JWT_SECRET);
}