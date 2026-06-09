import User from "../models/userModel.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// Get User Data
export const getProfile = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const user = await User.findById(userId).select("name email createdAt");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(

        new ApiResponse(
            200,
            user,
            "Profile fetched successfully"
        )
    );

})

// Update User Data
export const updateProfile = asyncHandler(async (req, res) => {

    const userId = req.user._id;

    const { name, email } = req.body;

    if (!name || !email) {
        throw new ApiError(400, "Name and Email are required")
    };

    // Check if any user exists with the email
    const existingUser = await User.findOne({
        email,
        _id: {
            $ne: userId
        }
    });

    if (existingUser) {
        throw new ApiError(409, "Email already exists");
    }

    const updatedUser = await User.findByIdAndUpdate(

        userId,
        {
            name,
            email
        },
        {
            new: true,
            runValidators: true
        }
    ).select("name email createdAt");

    return res.status(200).json(

        new ApiResponse(
            200,
            updatedUser,
            "Profile updated successfully"
        )
    );

})