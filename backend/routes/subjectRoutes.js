import express from "express";
import {
    createSubject, deleteSubject, getAllSubjects,
    getSubject, updateSubject
} from "../controllers/subjectController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const subjectRouter = express.Router();

subjectRouter.post("/create",verifyAccessToken, createSubject);

subjectRouter.get("/all", verifyAccessToken, getAllSubjects);

subjectRouter.get("/:id", verifyAccessToken, getSubject);

subjectRouter.put("/update/:id", verifyAccessToken, updateSubject);

subjectRouter.delete("/delete/:id", verifyAccessToken, deleteSubject);

export default subjectRouter;