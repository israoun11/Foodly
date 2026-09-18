/**
 * Represents a known, operational error — one we deliberately throw
 * because of bad input, a missing resource, an authentication failure,
 * or another expected application condition.
 */
export class AppError extends Error {
  /**
   * @param {string} message - Human-readable error message.
   * @param {number} [statusCode=500] - HTTP status code.
   */
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = "AppError";

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Error thrown when a requested resource cannot be found.
 */
export class NotFoundError extends AppError {
  /**
   * @param {string} [resource="Resource"]
   */
  constructor(resource = "Resource") {
    super(`${resource} not found, 404`);
    this.name = "NotFoundError";
  }
}

/**
 * Error thrown when the request contains invalid data.
 */
export class BadRequestError extends AppError {
  /**
   * @param {string} [message="Invalid request"]
   */
  constructor(message = "Invalid request") {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

/**
 * Error thrown when authentication is required or has failed.
 */
export class UnauthorizedError extends AppError {
  /**
   * @param {string} [message="Unauthorized"]
   */
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError";
  }
}

/**
 * Error thrown when the authenticated user does not have permission
 * to access or modify a resource.
 */
export class ForbiddenError extends AppError {
  /**
   * @param {string} [message="Forbidden"]
   */
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError";
  }
}

/**
 * Error thrown when the AI service fails or returns an unusable response.
 */
export class AIServiceError extends AppError {
  /**
   * @param {string} [message="AI service is temporarily unavailable"]
   */
  constructor(message = "AI service is temporarily unavailable") {
    super(message, 502);
    this.name = "AIServiceError";
  }
}