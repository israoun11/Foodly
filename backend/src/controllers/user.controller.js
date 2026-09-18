import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * GET /api/users/me
 * Returns the profile of the currently authenticated user.
 * Requires the protect middleware to have already run and attached
 * req.user.
 */
export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: { user: req.user },
  });
});