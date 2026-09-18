import { Router } from "express";
import mongoose from "mongoose";

export const healthRouter = Router();

const DB_STATES = ["disconnected", "connected", "connecting", "disconnecting"];

/**
 * GET /api/health
 * Lightweight liveness/readiness check. Reports API status, uptime,
 * and current database connection state — useful for load balancers,
 * uptime monitors, and quick manual verification during development.
 */
healthRouter.get("/", (_req, res) => {
  const dbState = DB_STATES[mongoose.connection.readyState] ?? "unknown";

  res.status(200).json({
    status: "ok",
    message: "PantryPal API is running",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: dbState,
  });
});