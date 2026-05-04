import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import User from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";

export const generateTokens = async (userId) => {

    const user = await User.findById(userId);

    const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )

    return { accessToken, refreshToken };
}


export const userRegister = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const exists = await User.findOne({ $or: [{ name }, { email }] });

    if (exists) {
        throw new ApiError(400, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: hashedPassword
    });

    return res.status(201).json(
        new ApiResponse(201, user, "Registration Successful")
    );

});

export const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Invalid credentials");
    }

    //generate access and refresh tokens if the user is valid
    const { accessToken, refreshToken } = await generateTokens(user._id);

    //we need to store the hashed refresh token in the db
    const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    user.refreshToken = hashedRefreshToken;

    await user.save({ validateBeforeSave: false });

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        maxAge: process.env.REFRESH_TOKEN_EXPIRY
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, { ...cookieOptions, maxAge: process.env.ACCESS_TOKEN_EXPIRY })
        .cookie("refreshToken", refreshToken, { cookieOptions })
        .json(new ApiResponse(200, {
            accessToken,
            user: {
                name: user.name,
                email: user.email
            }
        }, "Login Successful"
        ))

})

export const userLogout = asyncHandler(async (req, res) => {

    const token = req.cookies?.refreshToken;

    if (token) {
        //hash the token i.e. refreshToken
        const hashedRefreshToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        //finding the user with hashed refreshToken
        await User.findOneAndUpdate(
            { refreshToken: hashedRefreshToken },
            { $set: { refreshToken: null } }
        );
    }

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }

    return res
        .status(200)
        .clearCookie("refreshToken", { cookieOptions })
        .json(
            new ApiResponse(200, {}, "Logged out successfully")
        )
})