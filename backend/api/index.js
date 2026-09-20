import { createApp } from "../app.js";
import { connectDatabase } from "../config/database.js";

let app;

async function getApp() {
  if (!app) {
    await connectDatabase();
    app = createApp();
  }

  return app;
}

export default async function handler(req, res) {
  const application = await getApp();
  return application(req, res);
}