// import dotenv from "dotenv";
// dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import subjectRouter from "./routes/subjectRoutes.js";
import topicRouter from "./routes/topicRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
import calendarRouter from "./routes/calendarRoutes.js";
import searchRouter from "./routes/searchRoutes.js";
import notificationRouter from "./routes/notificationRoutes.js";
import activityRouter from "./routes/activityRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET", "POST", "PUT", "UPDATE", "DELETE", "PATCH"],
    credentials : true
}));

app.use(cookieParser());

app.use(express.json());


const PORT = process.env.PORT || 5000;

app.get("/api/test-api", (req,res) => {
    res.send("Server is up and running")
});


//Mongodb connection
await connectDB();

// API Endpoints
app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

app.use("/api/subjects", subjectRouter);

app.use("/api/topics", topicRouter);

app.use("/api/dashboard", dashboardRouter);

app.use("/api/calendar", calendarRouter);

app.use("/api/search", searchRouter);

app.use("/api/notifications", notificationRouter);

app.use("/api/activity", activityRouter);


app.listen(PORT, () => console.log(`Server started running at PORT: ${PORT}`));