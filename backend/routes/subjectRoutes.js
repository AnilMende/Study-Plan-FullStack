import express from "express";
import {
    createSubject, deleteSubject, getAllSubjects,
    getAllSubjectsProgress,
    getSubject, getSubjectProgress, updateSubject
} from "../controllers/subjectController.js";
import { verifyAccessToken } from "../middleware/authMiddleware.js";

const subjectRouter = express.Router();

subjectRouter.post("/create",verifyAccessToken, createSubject);

subjectRouter.get("/all", verifyAccessToken, getAllSubjects);

// get all subjects progress
subjectRouter.get("/progress", verifyAccessToken, getAllSubjectsProgress);

subjectRouter.get("/:id", verifyAccessToken, getSubject);

subjectRouter.put("/update/:id", verifyAccessToken, updateSubject);

subjectRouter.delete("/delete/:id", verifyAccessToken, deleteSubject);

// Subject progress
subjectRouter.get("/:id/progress", verifyAccessToken, getSubjectProgress);


export default subjectRouter;