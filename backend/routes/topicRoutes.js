import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { createTopic, deleteTopic, getAllTopics, getTopic, 
    reviseTopic, updateTopic } from "../controllers/topicController.js";

const topicRouter = express.Router();

topicRouter.post("/create", verifyAccessToken, createTopic);

topicRouter.get("/", verifyAccessToken, getAllTopics);

topicRouter.get("/:id", verifyAccessToken, getTopic);

topicRouter.put("/update/:id", verifyAccessToken, updateTopic);

topicRouter.delete("/delete/:id", verifyAccessToken, deleteTopic);

// schedule revision
topicRouter.patch("/:id/revise", verifyAccessToken, reviseTopic);

export default topicRouter;