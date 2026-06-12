import express from "express";
import { changePassword, getCurrentUser, userLogin, userLogout, userRegister } from "../controllers/authController.js";
import { optionalAuth, refreshAccessToken, verifyAccessToken } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);

authRouter.post("/login", userLogin);

authRouter.post("/refresh-token", refreshAccessToken);

authRouter.get("/me", verifyAccessToken, getCurrentUser);

authRouter.post("/logout", userLogout);

authRouter.put("/change-password", verifyAccessToken, changePassword);

export default authRouter;