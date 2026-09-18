import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

/**
 * Schema describing every environment variable the backend relies on.
 */
const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  PORT: z
    .string()
    .default("5000")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().int().positive()),

  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required")
    .url("MONGODB_URI must be a valid connection string"),

  CLIENT_ORIGIN: z
    .string()
    .min(1, "CLIENT_ORIGIN is required")
    .default("http://localhost:5173"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET must be at least 32 characters"),

  JWT_EXPIRES_IN: z
    .string()
    .default("7d"),

  RATE_LIMIT_WINDOW_MS: z
    .string()
    .default("900000")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().int().positive()),

  RATE_LIMIT_MAX_REQUESTS: z
    .string()
    .default("100")
    .transform((val) => Number.parseInt(val, 10))
    .pipe(z.number().int().positive()),
});

/**
 * Parses and validates process.env once at module load.
 */
function loadEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:");

    for (const issue of parsed.error.issues) {
      console.error(`   • ${issue.path.join(".")}: ${issue.message}`);
    }

    process.exit(1);
  }

  return parsed.data;
}

/**
 * Validated environment configuration.
 */
export const env = loadEnv();

export const isProduction = env.NODE_ENV === "production";
export const isDevelopment = env.NODE_ENV === "development";
export const isTest = env.NODE_ENV === "test";

/**
 * Parsed list of allowed CORS origins.
 */
export const allowedOrigins = env.CLIENT_ORIGIN.split(",").map((origin) =>
  origin.trim(),
);