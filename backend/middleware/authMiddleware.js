import dotenv from "dotenv";
dotenv.config();
import { generateTokens } from "../controllers/authController.js";
import User from "../models/userModel.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "node:crypto";

import jwt from "jsonwebtoken";

export const verifyAccessToken = asyncHandler(async (req, res, next) => {

    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized");
    }

    //if the token is avialable then verify the token
    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401, "Token expired");
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
        throw new ApiError(401, "Invalid token");
    }

    req.user = user;

    next();
})

//handling the expiry of the access token
export const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken = req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "No refresh token");
    }

    let decoded;
    try {
        decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (error) {
        throw new ApiError(401, "Expired or invalid refresh token");
    }

    const hashedIncomingToken = crypto
        .createHash("sha256")
        .update(incomingRefreshToken)
        .digest("hex");

    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== hashedIncomingToken) {
        throw new ApiError(401, "Invalid refresh token");
    }

    //token rotation
    const { accessToken, refreshToken } = await generateTokens(user._id);

    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }

    return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200, { accessToken }, "Tokens refreshed")
        );

})

export const optionalAuth = asyncHandler(async (req, res, next) => {

    try {

        const token = req.cookies?.accessToken;

        if (!token) {
            req.user = null;

            return next();
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        req.user = user || null;

        next();

    } catch (error) {

        req.user = null;
        next();
    }
})