/**
 * Wraps an async Express route/middleware handler so that any
 * rejected promise is forwarded to next(error) automatically.
 * Without this, a thrown error inside an async handler would become
 * an unhandled rejection instead of reaching errorHandler.
 *
 * @param {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => Promise<void>} fn
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void}
 */
export function asyncHandler(fn) {
  return function wrapped(req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}