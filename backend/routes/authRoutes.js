import express from "express";
import { getCurrentUser, userLogin, userLogout, userRegister } from "../controllers/authController.js";
import { refreshAccessToken, verifyAccessToken } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);

authRouter.post("/login", userLogin);

authRouter.post("/refresh-token", refreshAccessToken);

authRouter.get("/me", verifyAccessToken, getCurrentUser);

authRouter.post("/logout", verifyAccessToken, userLogout);

export default authRouter;