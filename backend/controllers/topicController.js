import Subject from "../models/subjectModel.js";
import Topic from "../models/topicModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import validateDate from "../utils/validateDate.js";


export const createTopic = asyncHandler(async (req, res) => {

    const { subjectId, title, priority, plannedDate, estimatedMinutes } = req.body;

    const userId = req.user._id;

    if (!subjectId || !title) {
        throw new ApiError(400, "SubjectID or title are missing");
    }

    // Validate date Format
    if (plannedDate && !validateDate(plannedDate)) {
        throw new ApiError(
            400,
            "Invalid date format. Use YYYY-MM-DD"
        );
    }

    // verify the subject belongs to the user by using the subjectId
    const subject = await Subject.findOne({
        _id: subjectId,
        userId,
        isDeleted: false
    });

    if (!subject) {
        throw new ApiError(404, "Subject not found");
    };

    const topic = await Topic.create({
        subjectId,
        userId,
        title,
        priority,
        plannedDate,
        estimatedMinutes
    });

    return res.status(201).json(
        new ApiResponse(201, topic, "Topic created successfully")
    );
});

export const getAllTopics = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { subjectId, status, date, search } = req.query;

    // Base query
    const query = { userId, isDeleted: false };

    // Filter by subject
    if (subjectId) {
        query.subjectId = subjectId;
    }

    // Filter by status
    if (status) {
        query.status = status;
    }

    // Filter by planned date
    if (date && !validateDate(date)) {
        throw new ApiError(
            400,
            "Invalid date format. Use YYYY-MM-DD"
        )
    };

    if (date) {

        const startDate = new Date(date);
        const endDate = new Date(date);

        endDate.setHours(23, 59, 59, 999);

        query.plannedDate = {
            $gte: startDate,
            $lte: endDate
        }
    }

    // Search by title
    if (search) {
        query.title = {
            $regex: search,
            $options: "i"
        };
    }

    const topics = await Topic.find(query)
        .populate("subjectId", "name")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, topics, "Topics fetched successfully")
    );
});

// Get Single Topic By ID
export const getTopic = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const userId = req.user._id;

    const topic = await Topic.findOne({
        _id: id,
        userId,
        isDeleted: false
    }).populate("subjectId", "name");

    if (!topic) {
        throw new ApiError(404, "Topic not found");
    };

    return res.status(200).json(
        new ApiResponse(200, topic, "Topic fetched successfully")
    );
});

// Update Topic By ID
export const updateTopic = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const { title, status, priority, plannedDate, estimatedMinutes } = req.body;

    const userId = req.user._id;

    const topic = await Topic.findOne({
        _id: id,
        userId,
        isDeleted: false
    });

    if (!topic) {
        throw new ApiError(404, "Topic not found");
    }

    // handling completed date automatically
    if (status === "completed" && topic.status !== "completed") {
        topic.completedDate = new Date();
    }

    topic.title = title || topic.title;
    topic.status = status || topci.status;
    topic.priority = priority || topic.priority;
    topic.plannedDate = plannedDate || topic.plannedDate;
    topic.estimatedMinutes = estimatedMinutes || topic.estimatedMinutes;

    await topic.save();

    return res.status(200).json(
        new ApiResponse(200, topic, "Topic updated successfully")
    );

});

// Delete Topic By ID
export const deleteTopic = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const userId = req.user._id;

    const topic = await Topic.findOneAndUpdate(
        {
            _id: id,
            userId,
            isDeleted: false
        },
        {
            isDeleted: true
        },
        { new: true }
    );

    if (!topic) {
        throw new ApiError(404, "Topic not found");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Topic deleted successfully")
    );

})