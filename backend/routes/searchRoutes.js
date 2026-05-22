import express from "express";
import { verifyAccessToken } from "../middleware/authMiddleware.js";
import { globalSearch } from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", verifyAccessToken, globalSearch);

export default searchRouter;