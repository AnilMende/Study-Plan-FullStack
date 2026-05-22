import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getNotifications } from "../controllers/notificationController.js";

const notificationRouter = express.Router();

notificationRouter.get("/", verifyAccessToken, getNotifications);

export default notificationRouter;

