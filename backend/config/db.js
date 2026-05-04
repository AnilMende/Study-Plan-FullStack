import mongoose from "mongoose";

export const connectDB = async () => {

    try {
        await mongoose.connect(`${process.env.MONGO_URI}/study-planner`);
        console.log("Database Connected");
    } catch (error) {
        console.error(error.message);
    }
}