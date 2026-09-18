import { z } from "zod";

/**
 * Validates the body of POST /api/auth/register.
 */
export const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name must be at most 80 characters"),
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password must be at most 72 characters"), // bcrypt's practical limit
});

/**
 * Validates the body of POST /api/auth/login.
 * Intentionally lighter than registerSchema — we don't want to leak
 * password policy details via validation error messages at login time.
 */
export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});