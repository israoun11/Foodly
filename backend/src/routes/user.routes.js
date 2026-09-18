import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getMe } from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.get("/me", protect, getMe);