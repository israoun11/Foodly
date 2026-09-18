import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase, disconnectDatabase } from "./config/database.js";

async function start() {
  await connectDatabase();

  const app = createApp();

  const server = app.listen(env.PORT, () => {
    console.log(
      `🚀 PantryPal API listening on http://localhost:${env.PORT} [${env.NODE_ENV}]`,
    );
    console.log(`   Health check: http://localhost:${env.PORT}/api/health`);
  });

  // ── Graceful shutdown ─────────────────────────────────────
  // On SIGINT/SIGTERM, stop accepting new connections, close the
  // DB connection cleanly, then exit. Prevents dropped requests
  // and dangling connections during deploys or restarts.
  const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);

    server.close(async () => {
      try {
        await disconnectDatabase();
        console.log("Shutdown complete.");
        process.exit(0);
      } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
      }
    });

    // Force-exit if shutdown hangs for too long.
    setTimeout(() => {
      console.error("Forced shutdown after timeout.");
      process.exit(1);
    }, 10_000).unref();
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));

  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Promise Rejection:", reason);
    // Fail loudly rather than continuing in a possibly-corrupt state.
    shutdown("unhandledRejection");
  });
}

start().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});