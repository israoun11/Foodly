import express from "express";

const app = express();

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Foodly backend is working",
  });
});

export default app;