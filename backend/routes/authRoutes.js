import express from "express";
import { userLogin, userRegister } from "../controllers/authController.js";
import { refreshAccessToken } from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", userRegister);

authRouter.post("/login", userLogin);

authRouter.post("/refresh-token", refreshAccessToken);

export default authRouter;