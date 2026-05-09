import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { getMonthlyCalendar, getTopicsByDay } from "../controllers/calendarController.js";

const calendarRouter = express.Router();

calendarRouter.get("/", verifyAccessToken, getMonthlyCalendar);
// Api usage : 
// GET /api/calendar?month=5&year=2026

calendarRouter.get("/day", verifyAccessToken, getTopicsByDay);
// Api usage :
// GET /api/calendar/day?date=2026-05-12

export default calendarRouter;