import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", verifyAccessToken, getDashboardData);

export default dashboardRouter;