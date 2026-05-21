import Subject from "../models/subjectModel.js";
import Topic from "../models/topicModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import mongoose from "mongoose";

// Create Subject
export const createSubject = asyncHandler(async (req, res) => {

    const { name } = req.body;

    if (!name) {
        throw new ApiError(400, "Subject name is required");
    }

    //we are taking the userId from the authMiddleware
    const userId = req.user._id;

    //check if the user has already has the subject with the subject name specified
    const existing = await Subject.findOne({ userId, name });

    if (existing) {
        throw new ApiError(400, "Subject already exists");
    }

    const subject = await Subject.create({
        userId,
        name
    })

    return res.status(200).json(
        new ApiResponse(200, subject, "Subject created successfully")
    );

});

// Get all Subjects (User specific)
export const getAllSubjects = asyncHandler(async (req, res) => {

    // user will get the he's own subjects so we need the userId
    const userId = req.user._id;

    const subjects = await Subject.find({ userId, isDeleted: false });

    return res.status(200).json(
        new ApiResponse(200, subjects, "Subjects fetched successfully")
    );

})

// Get Single Subject By id
export const getSubject = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const userId = req.user._id;

    //console.log("Searching for Subject:", id);
    //console.log("Belonging to User:", userId);

    // find the subject with the id
    const subject = await Subject.findOne({
        _id: id,
        userId: userId,
        isDeleted: false
    });

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    return res.status(200).json(
        new ApiResponse(200, subject, "Subject fetched Succfully")
    )
})

// Update Subject By Id
export const updateSubject = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const userId = req.user._id;

    const { name } = req.body;

    const subject = await Subject.findOneAndUpdate(
        { _id: id, userId: userId, isDeleted: false },
        {
            $set: {
                name
            }
        },
        { new: true }
    );

    if (!subject) {
        throw new ApiError(404, "Subject not found or Unauthorized");
    }

    return res.status(200).json(
        new ApiResponse(200, subject, "Subject updated successfully")
    );

});

// Delete Subject by Id
//here we are making the isDeleted : true this is the soft deletion
//in the frontend we only fetch the subjects where the isDeleted is false
export const deleteSubject = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const userId = req.user._id;

    const subject = await Subject.findOneAndUpdate(
        { _id: id, userId },
        { isDeleted: true },
        { new: true }
    );

    if (!subject) {
        throw new ApiError(404, "Subject not found or unauthorized");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Subject deleted successfully")
    );

});

// Subject specific analytics
// Subject progress
export const getSubjectProgress = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const userId = req.user._id;

    // Verify if the subject exists
    const subject = await Subject.findOne({
        _id: id,
        userId,
        isDeleted: false
    });

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    }

    // Total topics in that subject
    const totalTopics = await Topic.countDocuments({
        subjectId: id,
        userId,
        isDeleted: false
    });

    // Completed topics => status : "completed"
    const completedTopics = await Topic.countDocuments({
        subjectId: id,
        userId,
        status: "completed",
        isDeleted: false
    });

    // Pending topics => status : "pending"
    const pendingTopics = await Topic.countDocuments({
        subjectId: id,
        userId,
        status: "pending",
        isDeleted: false
    });

    // Revision topics => status : "revision"
    const revisionTopics = await Topic.countDocuments({
        subjectId: id,
        userId,
        status: "revision",
        isDeleted: false
    });

    // Study-time aggregation
    const studyTime = await Topic.aggregate([

        {
            $match: {
                subjectId: new mongoose.Types.ObjectId(id),
                userId: new mongoose.Types.ObjectId(userId),
                isDeleted: false
            }
        },

        {
            $group: {
                _id: null,
                totalMinutes: {
                    $sum: "$estimatedMinutes"
                }
            }
        }
    ]);

    const totalStudyMinutes = studyTime[0]?.totalMinutes || 0;

    // Completion %
    const completionPercentage = totalTopics === 0 ? 0 : Math.round(
        (completedTopics / totalTopics) * 100
    );

    return res.status(200).json(

        new ApiResponse(
            200,
            {
                subject: subject.name,
                totalTopics,
                completedTopics,
                pendingTopics,
                revisionTopics,
                completionPercentage,
                totalStudyMinutes
            },
            "Subject progress fetched successfully"
        )
    );

});

export const getAllSubjectsProgress = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    // Get all subjects
    const subjects = await Subject.find({
        userId,
        isDeleted: false
    });

    // Build progress data
    const progressData = await Promise.all(

        subjects.map(async (subject) => {

            // Total topics
            const totalTopics = await Topic.countDocuments({
                subjectId: subject._id,
                userId,
                isDeleted: false
            });

            // Completed topics
            const completedTopics = await Topic.countDocuments({
                subjectId: subject._id,
                userId,
                status: "completed",
                isDeleted: false
            });

            // Progress %
            const progress = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

            return {
                _id: subject._id,
                name: subject.name,
                totalTopics,
                completedTopics,
                progress
            };
        })
    );

    return res.status(200).json(

        new ApiResponse(
            200,
            progressData,
            "Subjects progress fetched successfully"
        )
    );

});