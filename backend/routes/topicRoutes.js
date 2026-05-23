import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createTopic, deleteTopic, getAllTopics, getTopic, 
    reviseTopic, upadteTopicStatus, updateTopic } from "../controllers/topicController.js";

const topicRouter = express.Router();

topicRouter.post("/create", verifyAccessToken, createTopic);

topicRouter.get("/", verifyAccessToken, getAllTopics);
// API Usage
// get all topics : /api/topics
// filter by subject : /api/topics?subjectId=69fb88c4b00f84ffcd532925
// filter by status : /api/topics?status=completed
// filter by date : /api/topics?date=2026-05-01
// search topics : /api/topics?search=solve reasoning problems

// Multiple filters together : /api/topics?subjectId=123&status=pending
// OR : /api/topics?search=ai&status=revision

topicRouter.get("/:id", verifyAccessToken, getTopic);

topicRouter.put("/update/:id", verifyAccessToken, updateTopic);

topicRouter.delete("/delete/:id", verifyAccessToken, deleteTopic);

// schedule revision
topicRouter.patch("/:id/revise", verifyAccessToken, reviseTopic);

// update topic status
topicRouter.patch("/:id/status", verifyAccessToken, upadteTopicStatus);

export default topicRouter;