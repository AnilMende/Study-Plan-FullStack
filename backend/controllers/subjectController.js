import Subject from "../models/subjectModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";


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
    const { userId } = req.user._id;

    // find the subject with the id
    const subject = await Subject.fidOne({
        _id: id,
        userId,
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

    const subject = await Subject.findOneAndUpdate(
        { _id: id, userId, isDeleted: false },
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