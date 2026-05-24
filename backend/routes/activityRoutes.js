import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getRecentActivity } from "../controllers/activityController.js";

const activityRouter = express.Router();

activityRouter.get("/recent", verifyAccessToken, getRecentActivity);

export default activityRouter;