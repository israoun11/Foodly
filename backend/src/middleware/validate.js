/**
 * Creates middleware that parses and validates req.body against the
 * given Zod schema. On success, req.body is replaced with the parsed
 * (and possibly transformed/trimmed/defaulted) data. On failure, the
 * ZodError is forwarded to the centralized error handler, which
 * already knows how to format it as a 400 with field-level detail.
 *
 * @param {import('zod').ZodSchema} schema
 * @returns {(req: import('express').Request, res: import('express').Response, next: import('express').NextFunction) => void}
 */
export function validate(schema) {
  return function validateBody(req, res, next) {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      next(result.error);
      return;
    }

    req.body = result.data;
    next();
  };
}