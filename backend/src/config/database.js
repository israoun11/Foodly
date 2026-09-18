import mongoose from "mongoose";
import { env, isProduction } from "./env.js";

// Avoid Mongoose buffering commands indefinitely if the connection
// hasn't been established yet — fail fast instead of hanging requests.
mongoose.set("bufferCommands", false);

// Reduce noisy query logging in production, keep it on in development
// for easier debugging.
mongoose.set("debug", !isProduction);

/**
 * Connects to MongoDB using the URI from validated environment config.
 * Should be called once during server startup, before the HTTP server
 * begins accepting requests.
 * @returns {Promise<void>}
 */
export async function connectDatabase() {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log(`✅ MongoDB connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    throw error;
  }
}

/**
 * Gracefully closes the MongoDB connection. Used during shutdown so
 * in-flight operations aren't abruptly terminated.
 * @returns {Promise<void>}
 */
export async function disconnectDatabase() {
  await mongoose.disconnect();
  console.log("MongoDB connection closed.");
}

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected.");
});