import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";

const userRouter = express.Router();

// get profile data
userRouter.get("/profile", verifyAccessToken, getProfile);

// Updated  user profile
userRouter.put("/profile", verifyAccessToken, updateProfile);

export default userRouter;