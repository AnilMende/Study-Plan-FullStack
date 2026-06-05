import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";
import { getAnalyticsData, getStreakData } from "../controllers/analyticsController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", verifyAccessToken, getDashboardData);
// API usage :
// Get all topics : /api/topics
// Filter by subject : /api/topics?subjectId=69fb88c4b00f84ffcd532925
// Filter by status : /api/topics?status=completed
// Filter by date : /api/topics?date=2026-05-01
// Search topics : /api/topics?search=solve problems

dashboardRouter.get("/analytics", verifyAccessToken, getAnalyticsData);
// API usage :
// Last 30 days : /api/dashboard/analytics
// Last 7 days : /api/dashboard/analytics?range=7

// get streak data api
dashboardRouter.get("/analytics/streak", verifyAccessToken, getStreakData);

export default dashboardRouter;