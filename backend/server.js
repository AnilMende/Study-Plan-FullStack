import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import authRouter from "./routes/authRoutes.js";

const app = express();

app.use(cors({
    origin : "*",
    methods : ["GET", "POST", "PUT", "UPDATE", "DELETE"]
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

app.listen(PORT, () => console.log(`Server started running at PORT: ${PORT}`));