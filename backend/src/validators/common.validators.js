import { z } from "zod";

/**
 * Shared pagination params for list endpoints. z.coerce.number()
 * handles the fact that query string values always arrive as
 * strings (e.g. "2"), converting them before the positive/max checks.
 */
export const paginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(50).default(12),
});